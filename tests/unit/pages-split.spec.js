import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import App from '@/App.vue';
import { messages } from '@/i18n/index.js';
import { PAGES, allRoutePaths, pathFor } from '@/router/routes.js';
import { mountAt } from '../helpers/mount.js';

/**
 * Locks de la division del sitio en cinco paginas (TASK-015). Cada uno nombra
 * el dano que previene.
 */

const NEW_PAGES = {
  profile: { es: '/perfil', en: '/en/profile', ids: ['perfil', 'credenciales', 'publicaciones'], key: 'about' },
  practice: { es: '/consulta', en: '/en/practice', ids: ['consulta', 'experiencia'], key: 'practice' },
  faq: { es: '/preguntas', en: '/en/faq', ids: ['preguntas'], key: 'faq' },
};

describe('registro de paginas', () => {
  // Dano: una pagina o idioma sin ruta, sitemap o hreflang por un registro incompleto.
  it('registra las cinco paginas con sus dos idiomas', () => {
    expect(PAGES.map((p) => p.name)).toEqual(['home', 'profile', 'practice', 'faq', 'contact']);
    for (const [page, def] of Object.entries(NEW_PAGES)) {
      expect(pathFor(page, 'es')).toBe(def.es);
      expect(pathFor(page, 'en')).toBe(def.en);
    }
    expect(allRoutePaths()).toHaveLength(10);
  });

  // Dano: que verify-deploy deje de comprobar una pagina publicada al olvidar
  // actualizar su lista espejo (el script no puede importar el alias '@/').
  it('verify-deploy comprueba exactamente los paths del registro', () => {
    const src = readFileSync('scripts/verify-deploy.js', 'utf8');
    const listed = [...src.slice(src.indexOf('const pages = [')).split('];')[0].matchAll(/'(\/[^']*)'/g)].map(
      (m) => m[1],
    );
    expect(listed.sort()).toEqual(allRoutePaths().map((r) => r.path).sort());
  });
});

describe('paginas interiores', () => {
  // Dano: una pagina sin h1 propio, o con una seccion perdida al moverla de la portada.
  for (const [page, def] of Object.entries(NEW_PAGES)) {
    for (const locale of ['es', 'en']) {
      it('/' + page + ' (' + locale + ') abre con su h1 y conserva sus secciones', async () => {
        const { wrapper } = await mountAt(App, def[locale]);
        const h1s = wrapper.findAll('h1');
        expect(h1s).toHaveLength(1);
        expect(h1s[0].text()).toBe(messages[locale][def.key].heading);
        expect(wrapper.find('main section h1, #contenido h1').exists()).toBe(true);
        for (const id of def.ids) expect(wrapper.find('section#' + id).exists(), id).toBe(true);
      });
    }
  }
});

describe('portada', () => {
  // Dano: que la portada vuelva a cargar las secciones completas, o que un
  // teaser quede sin enlace a su pagina.
  it('muestra un teaser por pagina con heading, lead y enlace, sin las secciones completas', async () => {
    for (const locale of ['es', 'en']) {
      const { wrapper } = await mountAt(App, locale === 'es' ? '/' : '/en');
      const teasers = wrapper.findAll('.card--teaser');
      expect(teasers).toHaveLength(3);
      const expected = [
        [messages[locale].about, 'profile'],
        [messages[locale].practice, 'practice'],
        [messages[locale].faq, 'faq'],
      ];
      expected.forEach(([section, page], i) => {
        expect(teasers[i].find('.card__title').text()).toBe(section.heading);
        expect(teasers[i].find('.card__body').text()).toBe(section.lead);
        const link = teasers[i].find('a');
        expect(link.attributes('href')).toBe(pathFor(page, locale));
        expect(link.text()).toBe(messages[locale].nav[page]);
      });
      for (const id of ['credenciales', 'publicaciones', 'experiencia', 'preguntas', 'perfil']) {
        expect(wrapper.find('#' + id).exists(), id).toBe(false);
      }
      expect(wrapper.findAll('h1')).toHaveLength(1);
    }
  });
});

describe('navegacion de cinco enlaces', () => {
  // Dano: un enlace ausente o sin estado activo, o el activo en la pagina equivocada.
  for (const locale of ['es', 'en']) {
    it('lista los cinco enlaces y marca solo el de la pagina actual en ' + locale, async () => {
      const labels = ['home', 'profile', 'practice', 'faq', 'contact'].map(
        (k) => messages[locale].nav[k],
      );
      for (const entry of PAGES) {
        const { wrapper } = await mountAt(App, pathFor(entry.name, locale));
        const links = wrapper.findAll('.site-nav__link');
        expect(links.map((l) => l.text())).toEqual(labels);
        const active = links.filter((l) => l.classes('is-active'));
        expect(active.map((l) => l.attributes('href'))).toEqual([pathFor(entry.name, locale)]);
      }
    });
  }
});
