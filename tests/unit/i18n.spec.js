import { describe, it, expect } from 'vitest';
import { messages, messagesFor, otherLocale } from '@/i18n/index.js';
import { LOCALES } from '@/site.config.js';

/**
 * El riesgo real de un sitio bilingue mantenido a mano es que una credencial se
 * agregue en un idioma y se olvide en el otro: el visitante en ingles veria un
 * perfil incompleto del Dr. Estas pruebas fijan la paridad estructural entre
 * ambos diccionarios.
 */
function shapeOf(value, path = '') {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => shapeOf(item, path + '[' + index + ']'));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      shapeOf(child, path ? path + '.' + key : key),
    );
  }
  return [path + ':' + (value === null ? 'null' : typeof value)];
}

function stringsOf(value) {
  if (Array.isArray(value)) return value.flatMap(stringsOf);
  if (value && typeof value === 'object') return Object.values(value).flatMap(stringsOf);
  return typeof value === 'string' ? [value] : [];
}

describe('diccionarios ES/EN', () => {
  it('expone exactamente los idiomas declarados en la configuracion', () => {
    expect(Object.keys(messages).sort()).toEqual([...LOCALES].sort());
  });

  it('tiene la misma estructura de claves y arrays en ambos idiomas', () => {
    expect(shapeOf(messages.en)).toEqual(shapeOf(messages.es));
  });

  it('no deja ningun texto vacio en ninguno de los dos idiomas', () => {
    for (const locale of LOCALES) {
      const empty = stringsOf(messages[locale]).filter((text) => text.trim() === '');
      expect(empty, 'textos vacios en ' + locale).toEqual([]);
    }
  });

  it('traduce de verdad: los textos largos difieren entre ES y EN', () => {
    expect(messages.en.hero.summary).not.toEqual(messages.es.hero.summary);
    expect(messages.en.about.heading).not.toEqual(messages.es.about.heading);
    expect(messages.en.faq.items[0].answer).not.toEqual(messages.es.faq.items[0].answer);
  });

  it('mantiene sin traducir los titulos propios de las publicaciones del Dr.', () => {
    const esTitles = messages.es.publications.items.map((item) => item.title);
    const enTitles = messages.en.publications.items.map((item) => item.title);
    expect(enTitles).toEqual(esTitles);
  });

  it('resuelve el idioma alterno y cae al espanol ante un codigo desconocido', () => {
    expect(otherLocale('es')).toBe('en');
    expect(otherLocale('en')).toBe('es');
    expect(messagesFor('pt')).toBe(messages.es);
  });
});
