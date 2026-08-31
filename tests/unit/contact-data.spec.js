import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { contact, whatsappUrl } from '@/data/contact.js';

const srcDir = resolve(process.cwd(), 'src');

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? sourceFiles(full) : [full];
  });
}

/**
 * El telefono es el unico dato de contacto real que entrego el cliente. Estas
 * pruebas evitan las dos formas de estropearlo: que se filtre a un lugar del
 * codigo donde no sea el contacto del consultorio, y que alguien "complete" los
 * datos que faltan inventandolos.
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

  it('deja en null todo dato de contacto no confirmado', () => {
    expect(contact.email).toBeNull();
    expect(contact.openingHours).toBeNull();
    expect(contact.whatsapp).toBeNull();
  });

  it('publica la direccion real confirmada por el cliente', () => {
    expect(contact.address).toBe('Av. Eloy Alfaro y República');
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
