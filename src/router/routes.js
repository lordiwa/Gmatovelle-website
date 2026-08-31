import { DEFAULT_LOCALE, LOCALES } from '@/site.config.js';

/**
 * Mapa canonico de paginas del sitio.
 *
 * Cada pagina existe como una URL distinta por idioma. Esto es deliberado y es
 * la razon por la que el toggle ES/EN navega en lugar de solo cambiar strings:
 * buscadores y asistentes de IA necesitan una URL indexable por idioma para
 * poder citarla, y las etiquetas hreflang solo tienen sentido si esa URL existe.
 */
export const PAGES = [
  { name: 'home', paths: { es: '/', en: '/en' } },
  { name: 'contact', paths: { es: '/contacto', en: '/en/contact' } },
  // BLOG DESACTIVADO (peticion del cliente, 2026-08-31): la seccion se retira
  // hasta que existan articulos reales. Se publicaba vacia y una pagina sin
  // contenido en el sitemap resta mas de lo que suma en SEO/GEO.
  //
  // COMO REACTIVARLA cuando haya articulos, en este orden:
  //   1. descomentar la linea de abajo (esta lista alimenta el router, el
  //      sitemap y el prerender, asi que la ruta vuelve sola en los tres);
  //   2. descomentar el import de BlogView y su entrada en VIEWS en
  //      src/router/index.js;
  //   3. descomentar el item 'blog' de links en src/components/SiteHeader.vue
  //      y en src/components/SiteFooter.vue.
  // Nada mas hay que tocar: la vista src/views/BlogView.vue, las cadenas
  // messages.*.blog / messages.*.meta.blog y los estilos .empty-state siguen
  // en el repo intactos.
  // { name: 'blog', paths: { es: '/blog', en: '/en/blog' } },
];

/** Devuelve la ruta de una pagina en un idioma dado. */
export function pathFor(page, locale) {
  const entry = PAGES.find((p) => p.name === page);
  if (!entry) throw new Error('Pagina desconocida: ' + page);
  return entry.paths[locale] || entry.paths[DEFAULT_LOCALE];
}

/** Nombre de ruta de vue-router para una pagina en un idioma. */
export function routeNameFor(page, locale) {
  return page + '-' + locale;
}

/** Todas las rutas publicas del sitio, usadas por el prerender y el sitemap. */
export function allRoutePaths() {
  const paths = [];
  for (const page of PAGES) {
    for (const locale of LOCALES) {
      paths.push({ page: page.name, locale, path: page.paths[locale] });
    }
  }
  return paths;
}
