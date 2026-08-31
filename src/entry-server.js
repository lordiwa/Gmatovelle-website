import { renderToString } from 'vue/server-renderer';
import { createApp } from './app.js';
import { DEFAULT_LOCALE } from './site.config.js';
import { buildHead } from './seo/meta.js';
import { renderHeadTags } from './seo/tags.js';

export { allRoutePaths } from './router/routes.js';
export { buildSitemap } from './seo/sitemap.js';

/**
 * Renderiza una ruta a HTML estatico. Lo usa scripts/prerender.js en el build
 * para dejar cada pagina servida como HTML completo: crawlers y asistentes de
 * IA que no ejecutan JavaScript ven el contenido y el JSON-LD directamente.
 */
export async function render(url) {
  const { app, router } = createApp({ ssr: true });

  await router.push(url);
  await router.isReady();

  const route = router.currentRoute.value;
  const page = route.meta.page || 'home';
  const locale = route.meta.locale || DEFAULT_LOCALE;
  const head = buildHead(page, locale);

  const html = await renderToString(app);

  return { html, headTags: renderHeadTags(head), lang: head.lang };
}
