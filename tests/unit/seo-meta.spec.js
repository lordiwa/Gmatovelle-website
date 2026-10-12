import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import { buildHead, physicianJsonLd, faqJsonLd } from '@/seo/meta.js';
import { messagesFor } from '@/i18n/index.js';
import { renderHeadTags } from '@/seo/tags.js';
import { contact, mapsUrl } from '@/data/contact.js';
import { profile } from '@/data/profile.js';
import { SITE_ORIGIN, CONTENT_UPDATED } from '@/site.config.js';

describe('JSON-LD de la entidad medica', () => {
  it('describe al Dr. como Physician con especialidad, ciudad y telefono', () => {
    const node = physicianJsonLd('es');

    expect(node['@type']).toBe('Physician');
    expect(node.name).toContain('Gonzalo Patricio Matovelle Mediavilla');
    expect(node.medicalSpecialty).toBe('Psychiatric');
    // schema.org espera el telefono en formato internacional: el JSON-LD
    // publica la version E.164 del numero unico del consultorio, no la local
    // (que es la que se muestra en pantalla).
    expect(node.telephone).toBe(contact.phoneE164);
    expect(node.telephone).toMatch(/^\+593/);
    expect(node.contactPoint.telephone).toBe(contact.phoneE164);
    expect(node.address.addressLocality).toBe('Quito');
    expect(node.address.addressCountry).toBe('EC');
  });

  it('declara los 40 anos de experiencia en la descripcion citable', () => {
    expect(physicianJsonLd('es').description).toContain('40 años');
    expect(physicianJsonLd('en').description).toContain('40 years');
  });

  it('publica direccion y correos confirmados, pero no perfiles externos sin confirmar', () => {
    const node = physicianJsonLd('es');
    expect(node.address.streetAddress).toBe(contact.address);
    expect(node.address.streetAddress).toContain('La Esquina');
    expect(node.email).toEqual(contact.emails);
    expect(node.contactPoint.email).toEqual(contact.emails);
    expect(node.openingHours).toBeUndefined();
    // Sin perfiles externos confirmados: sameAs solo lleva la ficha de Maps.
    expect(profile.sameAs).toEqual([]);
    expect(node.sameAs).toEqual([mapsUrl()]);
  });

  it('lista las membresias cientificas tal como constan en el CV', () => {
    const names = physicianJsonLd('en').memberOf.map((org) => org.name);
    expect(names).toEqual(profile.memberships);
  });
});

describe('FAQ estructurada', () => {
  it('publica un FAQPage con todas las preguntas del idioma', () => {
    const node = faqJsonLd('es');
    expect(node['@type']).toBe('FAQPage');
    expect(node.mainEntity.length).toBeGreaterThanOrEqual(5);
    for (const question of node.mainEntity) {
      expect(question['@type']).toBe('Question');
      expect(question.acceptedAnswer.text.length).toBeGreaterThan(20);
    }
  });

  it('responde en la FAQ como agendar, indicando el telefono del consultorio', () => {
    for (const locale of ['es', 'en']) {
      const answers = faqJsonLd(locale).mainEntity.map((q) => q.acceptedAnswer.text);
      expect(answers.some((text) => text.includes(contact.phone))).toBe(true);
    }
  });

  it('responde a la consulta tipo "psiquiatra en Quito" en ambos idiomas', () => {
    const es = JSON.stringify(faqJsonLd('es'));
    const en = JSON.stringify(faqJsonLd('en'));
    expect(es).toContain('Quito');
    expect(en).toContain('Quito');
  });
});

describe('head por pagina e idioma', () => {
  it('apunta el canonical a la URL propia de cada idioma', () => {
    expect(buildHead('home', 'es').canonical).toBe(SITE_ORIGIN + '/');
    expect(buildHead('home', 'en').canonical).toBe(SITE_ORIGIN + '/en');
    expect(buildHead('contact', 'es').canonical).toBe(SITE_ORIGIN + '/contacto');
    expect(buildHead('contact', 'en').canonical).toBe(SITE_ORIGIN + '/en/contact');
  });

  it('degrada la seccion de articulos retirada a head generico y noindex', () => {
    // Ya no esta en PAGES: no debe emitir canonical propio, ni hreflang, ni
    // JSON-LD que la anuncie como pagina existente.
    const head = buildHead('blog', 'en');
    expect(head.canonical).toBeNull();
    expect(head.robots).toContain('noindex');
    expect(head.alternates).toEqual([]);
    expect(head.jsonLd).toEqual([]);
  });

  it('cruza las dos versiones idiomaticas con hreflang y x-default', () => {
    const alternates = buildHead('contact', 'en').alternates;
    expect(alternates.map((a) => a.hreflang)).toEqual(['es-EC', 'en', 'x-default']);
    expect(alternates.find((a) => a.hreflang === 'x-default').href).toBe(
      SITE_ORIGIN + '/contacto',
    );
  });

  it('adjunta Physician, WebSite y FAQPage en la portada', () => {
    const types = buildHead('home', 'es').jsonLd.map((node) => node['@type']);
    expect(types).toContain('ProfilePage');
    expect(types).toContain('Physician');
    expect(types).toContain('WebSite');
    expect(types).toContain('FAQPage');
  });

  it('repite la ficha del medico en contacto, que es la pagina de la accion', () => {
    const types = buildHead('contact', 'es').jsonLd.map((node) => node['@type']);
    expect(types).toContain('Physician');
  });

  it('publica Open Graph completo y con el idioma alterno declarado', () => {
    const head = buildHead('home', 'en');
    expect(head.og['og:title']).toBe(head.title);
    expect(head.og['og:url']).toBe(head.canonical);
    expect(head.og['og:locale']).toBe('en_US');
    expect(head.og['og:locale:alternate']).toBe('es_EC');
    expect(head.twitter['twitter:card']).toBe('summary_large_image');
  });

  it('indexa las paginas reales y excluye la 404', () => {
    expect(buildHead('home', 'es').robots).toContain('index,follow');
    expect(buildHead('notFound', 'es').robots).toContain('noindex');
    expect(buildHead('notFound', 'es').jsonLd).toEqual([]);
  });

  it('nombra Quito y la especialidad en el titulo y la descripcion de la portada', () => {
    for (const locale of ['es', 'en']) {
      const head = buildHead('home', locale);
      expect(head.title).toContain('Quito');
      expect(head.description).toContain('Quito');
      expect(head.description).toContain(contact.phone);
    }
  });
});

describe('serializacion del head', () => {
  it('emite JSON-LD parseable y sin romper el bloque script', () => {
    const html = renderHeadTags(buildHead('home', 'es'));
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];

    expect(blocks.length).toBe(6);
    for (const [, json] of blocks) {
      expect(json).not.toContain('<');
      expect(() => JSON.parse(json)).not.toThrow();
    }
  });

  it('escapa los signos de mayor y menor dentro del JSON-LD', () => {
    const head = buildHead('home', 'es');
    head.jsonLd = [{ '@type': 'Thing', name: '</script><img src=x>' }];
    const html = renderHeadTags(head);
    expect(html).not.toContain('</script><img');
    expect(html).toContain('\\u003c');
  });

  it('incluye title, description, canonical y hreflang en el HTML del head', () => {
    const html = renderHeadTags(buildHead('contact', 'es'));
    expect(html).toContain('<title>');
    expect(html).toContain('name="description"');
    expect(html).toContain('rel="canonical"');
    expect(html).toContain('hreflang="en"');
  });
});

describe('JSON-LD enriquecido (TASK-013)', () => {
  const graph = buildHead('home', 'es').jsonLd;
  const physician = graph.find((n) => n['@type'] === 'Physician');

  // Evita: mapa y sameAs desalineados, titulos sin declarar, libros huerfanos
  // del autor, marca larga como nombre y fecha de modificacion que deriva.
  it('hasMap coincide con la entrada de Maps en sameAs', () => {
    expect(physician.hasMap).toBe('https://maps.google.com/?cid=' + contact.mapCid);
    expect(physician.sameAs).toContain(physician.hasMap);
  });

  it('hasCredential declara los dos titulos, alineados con el copy', () => {
    expect(physician.hasCredential.map((c) => c.name)).toEqual([
      'Doctor en Medicina y Cirugía',
      'Especialista en Psiquiatría',
    ]);
    for (const locale of ['es', 'en']) {
      const copy = messagesFor(locale).credentials.groups.flatMap((g) => g.items);
      for (const name of profile.degrees[locale]) expect(copy).toContain(name);
    }
  });

  it('los Book apuntan al Physician como autor', () => {
    const books = graph.filter((n) => n['@type'] === 'Book');
    expect(books).toHaveLength(2);
    for (const book of books) expect(book.author['@id']).toBe(physician['@id']);
  });

  it('WebSite.name es la marca corta y ProfilePage.dateModified es CONTENT_UPDATED', () => {
    expect(graph.find((n) => n['@type'] === 'WebSite').name).toBe(profile.displayName);
    expect(graph.find((n) => n['@type'] === 'ProfilePage').dateModified).toBe(CONTENT_UPDATED);
  });

  it('el JSON-LD prerenderizado de las cuatro paginas parsea (si el build ya se ejecuto)', () => {
    for (const rel of ['index.html', 'en/index.html', 'contacto/index.html', 'en/contact/index.html']) {
      const file = resolve(process.cwd(), 'dist', rel);
      if (!existsSync(file)) continue;
      const html = readFileSync(file, 'utf8');
      const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
      expect(blocks.length, rel).toBeGreaterThan(0);
      for (const [, json] of blocks) expect(() => JSON.parse(json), rel).not.toThrow();
    }
  });
});
