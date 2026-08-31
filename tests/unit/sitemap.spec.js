import { describe, it, expect } from 'vitest';
import { buildSitemap } from '@/seo/sitemap.js';
import { allRoutePaths } from '@/router/routes.js';
import { absoluteUrl } from '@/seo/meta.js';

describe('sitemap.xml', () => {
  const xml = buildSitemap({ lastmod: '2026-08-31' });

  it('incluye todas las rutas del sitio en los dos idiomas', () => {
    const routes = allRoutePaths();
    // 2 paginas (portada y contacto) x 2 idiomas. El blog quedo desactivado.
    expect(routes.length).toBe(4);
    for (const route of routes) {
      expect(xml).toContain('<loc>' + absoluteUrl(route.path) + '</loc>');
    }
  });

  it('ya no anuncia la seccion de articulos retirada', () => {
    expect(xml).not.toContain('/blog');
  });

  it('declara las alternativas de idioma con hreflang y x-default', () => {
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    expect(xml).toContain('hreflang="x-default"');
    expect(xml).toContain('hreflang="es-EC"');
    expect(xml).toContain('hreflang="en"');
  });

  it('da la prioridad mas alta a la portada', () => {
    const home = xml.split('<url>')[1];
    expect(home).toContain('<priority>1.0</priority>');
  });

  it('propaga la fecha de ultima modificacion cuando se entrega', () => {
    expect(xml).toContain('<lastmod>2026-08-31</lastmod>');
    expect(buildSitemap()).not.toContain('<lastmod>');
  });

  it('produce XML bien formado con una apertura por cada cierre', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect((xml.match(/<url>/g) || []).length).toBe((xml.match(/<\/url>/g) || []).length);
    expect(xml.trimEnd().endsWith('</urlset>')).toBe(true);
  });
});
