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
 * Los datos de contacto definitivos entregados por el cliente son el fijo del
 * consultorio, los dos correos y la direccion del Centro de Negocios La
 * Esquina. Estas pruebas evitan las tres formas de estropearlos: que se filtren
 * a un lugar del codigo donde no sean el contacto del consultorio, que alguien
 * "complete" los datos que faltan inventandolos, y que reaparezcan los
 * placeholders descartados.
 */
describe('datos de contacto', () => {
  it('mantiene el telefono en un unico modulo fuente', () => {
    const withLiteral = sourceFiles(srcDir).filter((file) =>
      readFileSync(file, 'utf8').includes(contact.phone),
    );
    expect(withLiteral.map((f) => f.replace(srcDir + '/', ''))).toEqual(['data/contact.js']);
  });

  it('expone el telefono como enlace de llamada', () => {
    expect(contact.phoneHref).toBe('tel:' + contact.phone);
  });

  it('publica el fijo definitivo del consultorio', () => {
    expect(contact.phone).toBe('022892716');
  });

  it('deja en null todo dato de contacto no confirmado', () => {
    expect(contact.openingHours).toBeNull();
    expect(contact.whatsapp).toBeNull();
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

  it('apunta el mapa embebido a La Esquina y no exige API key', () => {
    const url = mapEmbedUrl();
    expect(url.startsWith('https://www.google.com/maps?q=')).toBe(true);
    expect(url).toContain('output=embed');
    expect(url).not.toContain('key=');
    expect(decodeURIComponent(url)).toContain('Centro de Negocios La Esquina');
    expect(decodeURIComponent(url)).toContain('Chimborazo y Av Pampite');
    expect(decodeURIComponent(url)).toContain('Quito');
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

  it('no genera enlace de WhatsApp mientras el numero internacional falte', () => {
    expect(whatsappUrl()).toBeNull();
  });

  it('arma el enlace de WhatsApp en cuanto el numero se confirme', () => {
    const original = contact.whatsapp;
    contact.whatsapp = '593999999999';
    expect(whatsappUrl()).toBe('https://wa.me/593999999999');
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
