/**
 * Prerender del sitio a HTML estatico.
 *
 * Por que existe: el objetivo declarado del proyecto es que buscadores y
 * asistentes de IA encuentren y CITEN al Dr. Una SPA normal entrega un <div>
 * vacio y deja el contenido detras de JavaScript; varios rastreadores de
 * modelos generativos no ejecutan JS y se llevarian una pagina en blanco. Este
 * paso escribe cada ruta (ES y EN) como HTML completo con su head y su JSON-LD,
 * y el bundle cliente luego hidrata esa misma marca.
 *
 * Se ejecuta al final de "npm run build", despues del build cliente y del SSR.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const ssrEntry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href;

const { render, allRoutePaths, buildSitemap } = await import(ssrEntry);

const template = await readFile(join(distDir, 'index.html'), 'utf8');

if (!template.includes('<!--app-html-->') || !template.includes('<!--head-tags-->')) {
  throw new Error('index.html perdio los marcadores <!--app-html--> o <!--head-tags-->');
}

/** '/' -> dist/index.html ; '/contacto' -> dist/contacto/index.html */
function outputPathFor(routePath) {
  if (routePath === '/') return join(distDir, 'index.html');
  return join(distDir, routePath.replace(/^\//, ''), 'index.html');
}

const routes = allRoutePaths();

for (const route of routes) {
  const { html, headTags, lang } = await render(route.path);

  const page = template
    .replace('<html lang="es-EC">', '<html lang="' + lang + '">')
    .replace('<!--head-tags-->', headTags)
    .replace('<!--app-html-->', html);

  const outputPath = outputPathFor(route.path);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, page, 'utf8');
  console.log('prerender  ' + route.path.padEnd(14) + ' -> ' + outputPath.replace(root + '/', ''));
}

// 404.html propio: sin el, un hosting estatico devolveria la portada ante una
// URL inexistente y los buscadores la indexarian como contenido duplicado.
const notFound = await render('/404');
await writeFile(
  join(distDir, '404.html'),
  template
    .replace('<html lang="es-EC">', '<html lang="' + notFound.lang + '">')
    .replace('<!--head-tags-->', notFound.headTags)
    .replace('<!--app-html-->', notFound.html),
  'utf8',
);
console.log('prerender  404            -> dist/404.html');

const lastmod = new Date().toISOString().slice(0, 10);
await writeFile(join(distDir, 'sitemap.xml'), buildSitemap({ lastmod }), 'utf8');
console.log('sitemap    ' + routes.length + ' URLs -> dist/sitemap.xml');
