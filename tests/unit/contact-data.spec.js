import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { contact, whatsappUrl, mailtoHref, mapEmbedUrl } from '@/data/contact.js';

const srcDir = resolve(process.cwd(), 'src');

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? sourceFiles(full) : [full];
  });
}

/**
 * Los datos de contacto definitivos entregados por el cliente son un unico
 * numero de telefono, los dos correos y la direccion del Centro de Negocios La
 * Esquina. Estas pruebas evitan las tres formas de estropearlos: que se filtren
 * a un lugar del codigo donde no sean el contacto del consultorio, que alguien
 * "complete" los datos que faltan inventandolos, y que reaparezcan los
 * placeholders descartados.
 *
 * El 2026-09-01 el cliente pidio retirar el fijo del consultorio ("remove the
 * conventional phone number. Just leave the 0-999-835-666"): el sitio quedo con
 * un solo numero, el movil, que es a la vez el de las llamadas y el de
 * WhatsApp. Los locks de abajo dejaron de tratar fijo y WhatsApp como canales
 * distintos y ahora fijan lo contrario: que los tres formatos publicados sean
 * el mismo numero.
 */
describe('datos de contacto', () => {
  it('mantiene el telefono en un unico modulo fuente', () => {
    const withLiteral = sourceFiles(srcDir).filter((file) =>
      readFileSync(file, 'utf8').includes(contact.phone),
    );
    expect(withLiteral.map((f) => f.replace(srcDir + '/', ''))).toEqual(['data/contact.js']);
  });

  it('expone el telefono como enlace de llamada, en formato internacional', () => {
    // El href marca en E.164 y no en formato local: el sitio es bilingue y
    // recibe visitantes fuera de Ecuador, para los que 0999835666 no marca.
    expect(contact.phoneHref).toBe('tel:' + contact.phoneE164);
    expect(contact.phoneHref).toBe('tel:+593999835666');
  });

  it('publica el numero unico definitivo del consultorio', () => {
    expect(contact.phone).toBe('0999835666');
    expect(contact.phoneE164).toBe('+593999835666');
  });

  it('ya no publica el fijo que el cliente pidio retirar', () => {
    const sources = sourceFiles(srcDir)
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n');
    expect(sources).not.toContain('022892716');
  });

  it('deja en null todo dato de contacto no confirmado', () => {
    expect(contact.openingHours).toBeNull();
  });

  it('publica los dos correos confirmados y sus enlaces mailto', () => {
    expect(contact.emails).toEqual(['info@gmail.com', 'Gonzalo.matovelle@gmail.com']);
    expect(contact.emails.map(mailtoHref)).toEqual([
      'mailto:info@gmail.com',
      'mailto:Gonzalo.matovelle@gmail.com',
    ]);
  });

  it('publica la direccion completa confirmada por el cliente', () => {
    expect(contact.address).toBe(
      'Centro de Negocios del centro comercial La Esquina, calle Chimborazo y Av Pampite, ' +
        'torre 1, piso 2 oficina 3A',
    );
  });

  it('apunta el mapa embebido a la ficha oficial del Dr. y no exige API key', () => {
    // El CID sale del enlace de la ficha verificada por Google
    // (data=!4m2!3m1!1s0x91d5910062e59cc3:0xcf9888a68bb2dc14): el segundo
    // hexadecimal en decimal. Es el identificador inmutable de la ficha.
    expect(contact.mapCid).toBe(String(BigInt('0xcf9888a68bb2dc14')));

    const url = mapEmbedUrl();
    expect(url).toBe('https://www.google.com/maps?cid=14958856411200805908&output=embed');
    expect(url).toContain('output=embed');
    expect(url).not.toContain('key=');
  });

  it('no vuelve a la busqueda de texto generica que caia fuera de la ficha', () => {
    // El embed anterior era ?q=Centro+de+Negocios+La+Esquina...: resolvia un
    // punto del edificio, no la ficha del consultorio con sus resenas.
    expect(mapEmbedUrl()).not.toContain('q=');
    expect(contact.mapQuery).toBeUndefined();
  });

  it('conserva el nombre exacto de la ficha como referencia legible', () => {
    expect(contact.mapPlaceName).toBe(
      'Dr. Gonzalo Matovelle Médico Psiquiatra, Chimborazo y Av Pampite, Quito',
    );
  });

  it('no deja rastro de los placeholders descartados en el codigo fuente', () => {
    const sources = sourceFiles(srcDir)
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n');
    // El celular y la direccion viejos eran provisionales: el cliente los
    // reemplazo por los datos definitivos y no deben volver al sitio.
    expect(sources).not.toContain('099835666');
    expect(sources).not.toContain('Eloy Alfaro');
  });

  it('publica el WhatsApp confirmado en el formato internacional de wa.me', () => {
    // El celular confirmado es 0999835666. wa.me solo acepta digitos, sin + y
    // sin el 0 inicial del numero local: 593 (Ecuador) + 999835666.
    expect(contact.whatsapp).toBe('593999835666');
    expect(contact.whatsapp).toMatch(/^593\d{9}$/);
    expect(contact.whatsapp.startsWith('5930')).toBe(false);
    expect(whatsappUrl()).toBe('https://wa.me/593999835666');
  });

  it('publica un solo numero: llamada y WhatsApp son el mismo en tres formatos', () => {
    // 0999835666 (local, el que se muestra) -> +593999835666 (E.164, el del
    // href y del JSON-LD) -> 593999835666 (wa.me). Las dos conversiones se
    // derivan del numero local en vez de compararse contra literales sueltos:
    // asi, si alguien cambia el numero, los tres formatos tienen que moverse
    // juntos o el lock cae.
    const local = contact.phone;
    expect(local).toMatch(/^0\d{9}$/);
    expect(contact.phoneE164).toBe('+593' + local.slice(1));
    expect(contact.whatsapp).toBe('593' + local.slice(1));
    expect(whatsappUrl()).toBe('https://wa.me/593' + local.slice(1));
    expect(contact.phoneHref).toBe('tel:' + contact.phoneE164);
  });

  it('vuelve a ocultar el enlace si algun dia el numero se retira', () => {
    const original = contact.whatsapp;
    contact.whatsapp = null;
    expect(whatsappUrl()).toBeNull();
    contact.whatsapp = original;
  });

  it('no publica formularios ni reserva en linea en ninguna vista', () => {
    const markup = sourceFiles(srcDir)
      .filter((file) => file.endsWith('.vue'))
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n');
    expect(markup).not.toMatch(/<form[\s>]/);
    expect(markup).not.toMatch(/<input[\s>]/);
  });
});
