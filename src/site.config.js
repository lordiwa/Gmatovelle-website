/**
 * Configuracion global del sitio.
 *
 * NOTA: el dominio definitivo todavia no esta contratado. Mientras tanto se usa
 * SITE_ORIGIN como unico punto de cambio: al registrar el dominio basta con
 * actualizar esta constante (y public/robots.txt) para que canonical, hreflang,
 * Open Graph, JSON-LD y sitemap.xml queden consistentes.
 */
export const SITE_ORIGIN = 'https://www.gonzalomatovelle.com';

export const LOCALES = ['es', 'en'];
export const DEFAULT_LOCALE = 'es';

/** Codigos BCP-47 usados en <html lang>, hreflang y og:locale. */
export const LOCALE_TAGS = {
  es: 'es-EC',
  en: 'en',
};

export const OG_LOCALE_TAGS = {
  es: 'es_EC',
  en: 'en_US',
};

/**
 * Fecha (ISO) de la ultima revision manual del contenido del sitio. Alimenta
 * dateModified del ProfilePage y, mas adelante, lastmod del sitemap. Se edita a
 * mano cuando cambia el contenido; NO es la fecha del build.
 */
export const CONTENT_UPDATED = '2026-10-12';
