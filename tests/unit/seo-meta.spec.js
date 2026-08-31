import { describe, it, expect } from 'vitest';
import { buildHead, physicianJsonLd, faqJsonLd } from '@/seo/meta.js';
import { renderHeadTags } from '@/seo/tags.js';
import { contact } from '@/data/contact.js';
import { profile } from '@/data/profile.js';
import { SITE_ORIGIN } from '@/site.config.js';

describe('JSON-LD de la entidad medica', () => {
  it('describe al Dr. como Physician con especialidad, ciudad y telefono', () => {
    const node = physicianJsonLd('es');

    expect(node['@type']).toBe('Physician');
    expect(node.name).toContain('Gonzalo Patricio Matovelle Mediavilla');
    expect(node.medicalSpecialty).toBe('Psychiatric');
    expect(node.telephone).toBe(contact.phone);
    expect(node.address.addressLocality).toBe('Quito');
    expect(node.address.addressCountry).toBe('EC');
  });

  it('declara los 40 anos de experiencia en la descripcion citable', () => {
    expect(physicianJsonLd('es').description).toContain('40 años');
    expect(physicianJsonLd('en').description).toContain('40 years');
  });

  it('publica la direccion real confirmada, pero no correo ni perfiles externos sin confirmar', () => {
    const node = physicianJsonLd('es');
    expect(node.address.streetAddress).toBe('Av. Eloy Alfaro y República');
    expect(node.email).toBeUndefined();
    expect(node.openingHours).toBeUndefined();
    expect(node.sameAs).toBeUndefined();
    expect(profile.sameAs).toEqual([]);
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
    expect(buildHead('blog', 'en').canonical).toBe(SITE_ORIGIN + '/en/blog');
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
    expect(head.twitter['twitter:card']).toBe('summary');
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
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];

    expect(blocks.length).toBe(4);
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
