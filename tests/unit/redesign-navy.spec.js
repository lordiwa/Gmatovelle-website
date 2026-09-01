import { describe, it, expect } from 'vitest';
import App from '@/App.vue';
import { messages } from '@/i18n/index.js';
import { contact } from '@/data/contact.js';
import { mountAt } from '../helpers/mount.js';

/**
 * Locks del redisenio "Navy de confianza" (opcion 1c) elegido por el cliente:
 * cabecera navy con boton de llamada, hero a sangre, banda de credenciales,
 * areas de experiencia sin caja y contacto compacto por delante del CV.
 *
 * Cada bloque fija la pieza estructural que la 1c introduce, no su apariencia:
 * el color y la tipografia ya estaban en el sistema visual y no cambiaron.
 */

const HOME = { es: '/', en: '/en' };

describe('cabecera navy con boton de llamada', () => {
  for (const locale of ['es', 'en']) {
    it('ofrece el boton de laton con el telefono del consultorio en ' + locale, async () => {
      const { wrapper } = await mountAt(App, HOME[locale]);
      const call = wrapper.find('.site-header .btn--brass');

      expect(call.exists(), 'falta el boton de llamada de la cabecera en ' + locale).toBe(true);
      expect(call.attributes('href')).toBe(contact.phoneHref);
      expect(call.attributes('href')).toMatch(/^tel:\+/);
      expect(call.text()).toBe(contact.phone);
      // El texto visible es una cifra suelta: sin aria-label el boton se anuncia
      // como un numero y no como la accion de llamar al consultorio.
      expect(call.attributes('aria-label')).toBe(messages[locale].contact.callCta);
    });
  }

  it('conserva el selector de idioma junto al boton: el bilinguismo no se negocia', async () => {
    const { wrapper } = await mountAt(App, '/');
    expect(wrapper.findAll('.site-header .lang-toggle__option')).toHaveLength(2);
  });
});

describe('hero navy a sangre de la portada', () => {
  it('es una banda navy y ya no lleva la fila de "facts"', async () => {
    const { wrapper } = await mountAt(App, '/');
    expect(wrapper.find('.hero--navy').exists()).toBe(true);
    expect(wrapper.find('.hero__facts').exists()).toBe(false);
  });

  for (const locale of ['es', 'en']) {
    it('lleva el CTA de WhatsApp como accion secundaria en ' + locale, async () => {
      const { wrapper } = await mountAt(App, HOME[locale]);
      const links = wrapper.findAll('.hero__actions a');
      const hrefs = links.map((a) => a.attributes('href'));

      // Llamar primero, WhatsApp despues: es el mismo numero unico del
      // consultorio, y la llamada sigue siendo la accion principal.
      expect(hrefs).toEqual([contact.phoneHref, 'https://wa.me/593999835666']);

      const whatsapp = links[1];
      expect(whatsapp.text()).toBe(messages[locale].contact.whatsappCta);
      expect(whatsapp.attributes('target')).toBe('_blank');
      expect(whatsapp.attributes('rel')).toContain('noopener');
    });
  }

  it('mantiene el retrato con width y height explicitos en su encuadre del hero', async () => {
    const { wrapper } = await mountAt(App, '/');
    const portrait = wrapper.find('.hero .portrait--hero-navy');
    expect(portrait.exists()).toBe(true);
    // Lock de CLS: sin las dimensiones el retrato desplaza el hero al cargar.
    expect(portrait.find('img').attributes('width')).toBeTruthy();
    expect(portrait.find('img').attributes('height')).toBeTruthy();
  });
});

describe('banda de credenciales', () => {
  /**
   * El cliente fijo el contenido y el orden de la banda ("40 años / Quito /
   * WPA·WFSBP"), asi que el lock es literal: cualquier reescritura de la banda
   * tiene que pasar por el, no por el criterio de quien edite el diccionario.
   */
  const EXPECTED = {
    es: ['40 años de experiencia', 'Quito', 'WPA · WFSBP'],
    en: ['40 years of experience', 'Quito', 'WPA · WFSBP'],
  };

  for (const locale of ['es', 'en']) {
    it('renderiza los tres items que pidio el cliente, en orden, en ' + locale, async () => {
      const { wrapper } = await mountAt(App, HOME[locale]);
      const rendered = wrapper
        .findAll('.credential-band__item')
        .map((item) => item.text().replace(/\s+/gu, ' ').trim());

      expect(rendered).toEqual(EXPECTED[locale]);
      expect(messages[locale].hero.credentialBand).toEqual(EXPECTED[locale]);
    });

    /**
     * La banda sigue sin ser una vitrina libre: las dos sociedades que cita
     * tienen que seguir publicadas en la seccion de credenciales.
     */
    it('las siglas de la banda siguen respaldadas por el CV publicado en ' + locale, async () => {
      const cv = JSON.stringify(messages[locale].credentials);
      expect(cv).toContain('(WPA)');
      expect(cv).toContain('(WFSBP)');
    });
  }
});

describe('areas de experiencia sin caja', () => {
  it('usa las tarjetas con regla y mantiene las cinco condiciones confirmadas', async () => {
    const { wrapper } = await mountAt(App, '/');
    const cards = wrapper.findAll('.card-grid--rule .card--rule');
    expect(cards).toHaveLength(5);
    expect(cards.map((card) => card.find('.card__title').text())).toEqual(
      messages.es.expertise.items.map((item) => item.title),
    );
  });

  it('no arrastra al enfoque de la consulta: esas tarjetas conservan la caja', async () => {
    const { wrapper } = await mountAt(App, '/');
    const boxed = wrapper.findAll('.card').filter((card) => !card.classes('card--rule'));
    expect(boxed).toHaveLength(messages.es.practice.items.length);
  });

  it('encabeza la seccion con antetitulo en vez de indice numerico', async () => {
    const { wrapper } = await mountAt(App, '/');
    const head = wrapper.find('.card-grid--rule').element.parentElement.querySelector(
      '.section__head',
    );
    expect(head.querySelector('.section__index').textContent).toBe(messages.es.expertise.heading);
    expect(head.querySelector('.section__title').textContent).toBe(messages.es.expertise.headline);
  });
});

describe('contacto primero en la portada', () => {
  it('la portada usa la franja compacta, sin el mapa embebido', async () => {
    const { wrapper } = await mountAt(App, '/');
    expect(wrapper.find('.contact-panel--compact').exists()).toBe(true);
    expect(wrapper.find('iframe.contact-map').exists()).toBe(false);
  });

  it('la franja compacta enlaza a la pagina de contacto', async () => {
    for (const [path, contactPath] of [
      ['/', '/contacto'],
      ['/en', '/en/contact'],
    ]) {
      const { wrapper } = await mountAt(App, path);
      const link = wrapper.find('.contact-panel--compact .contact-panel__more a');
      expect(link.attributes('href')).toBe(contactPath);
    }
  });

  it('/contacto conserva la ficha completa con mapa', async () => {
    const { wrapper } = await mountAt(App, '/contacto');
    expect(wrapper.find('.contact-panel').exists()).toBe(true);
    expect(wrapper.find('.contact-panel--compact').exists()).toBe(false);
    expect(wrapper.find('iframe.contact-map').exists()).toBe(true);
  });
});

describe('orden de las secciones de la portada', () => {
  it('pone el contacto por delante de las secciones largas de CV', async () => {
    const { wrapper } = await mountAt(App, '/');
    const titles = wrapper.findAll('.section__title').map((node) => node.text());
    expect(titles).toEqual([
      messages.es.about.heading,
      messages.es.practice.heading,
      messages.es.expertise.headline,
      messages.es.contact.heading,
      messages.es.credentials.heading,
      messages.es.publications.heading,
      messages.es.faq.heading,
    ]);
  });

  it('coloca la banda de credenciales entre el hero y la primera seccion', async () => {
    const { wrapper } = await mountAt(App, '/');
    const html = wrapper.html();
    const hero = html.indexOf('hero--navy');
    const band = html.indexOf('credential-band');
    const firstSection = html.indexOf('section__head');

    expect(hero).toBeGreaterThan(-1);
    expect(band).toBeGreaterThan(hero);
    expect(firstSection).toBeGreaterThan(band);
  });
});
