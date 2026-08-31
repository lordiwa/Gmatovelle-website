import { LOCALE_TAGS, DEFAULT_LOCALE } from '@/site.config.js';
import { allRoutePaths, pathFor } from '@/router/routes.js';
import { absoluteUrl } from './meta.js';

/**
 * Genera sitemap.xml a partir del mapa de rutas, no de una lista escrita a
 * mano: cualquier pagina o idioma que se agregue al router aparece en el
 * sitemap sin pasos extra. Cada URL declara sus alternativas hreflang, que es
 * la senal que necesitan los buscadores para tratar ES y EN como la misma
 * pagina en dos idiomas y no como contenido duplicado.
 */
export function buildSitemap({ lastmod = null } = {}) {
  const entries = allRoutePaths().map(({ page, locale, path }) => {
    const alternates = allRoutePaths()
      .filter((r) => r.page === page)
      .map(
        (r) =>
          '    <xhtml:link rel="alternate" hreflang="' +
          LOCALE_TAGS[r.locale] +
          '" href="' +
          absoluteUrl(r.path) +
          '" />',
      );

    alternates.push(
      '    <xhtml:link rel="alternate" hreflang="x-default" href="' +
        absoluteUrl(pathFor(page, DEFAULT_LOCALE)) +
        '" />',
    );

    // El esquema de sitemaps exige este orden: loc, lastmod, changefreq, priority.
    const lines = ['  <url>', '    <loc>' + absoluteUrl(path) + '</loc>', ...alternates];

    if (lastmod) lines.push('    <lastmod>' + lastmod + '</lastmod>');
    lines.push('    <priority>' + (page === 'home' ? '1.0' : '0.7') + '</priority>');
    lines.push('  </url>');
    return lines.join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}
