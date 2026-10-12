/**
 * Verificacion post-deploy: comprueba contra un origen real (por defecto la
 * produccion en Firebase) que las rutas, robots, sitemap, canonical y JSON-LD
 * estan como el build prometia. Uso: npm run verify:deploy [-- <origen>]
 * Sale con codigo 1 si cualquier comprobacion falla.
 */
const origin = (process.argv[2] || process.env.VERIFY_ORIGIN || 'https://gmatovelle-site.web.app').replace(/\/+$/, '');

let failures = 0;
function report(ok, label, detail = '') {
  if (!ok) failures += 1;
  console.log((ok ? 'OK   ' : 'FAIL ') + label + (detail ? '  (' + detail + ')' : ''));
}

async function get(path) {
  return fetch(origin + path, { redirect: 'manual' });
}

// Espejo de los paths de PAGES (src/router/routes.js): este script corre con
// node plano y no resuelve el alias '@/'. tests/unit/sitemap.spec.js comprueba
// que esta lista siga igual que el registro.
const pages = [
  '/',
  '/en',
  '/perfil',
  '/en/profile',
  '/consulta',
  '/en/practice',
  '/preguntas',
  '/en/faq',
  '/contacto',
  '/en/contact',
];

for (const path of pages) {
  try {
    const res = await get(path);
    const ok = res.status === 200;
    report(ok, 'GET ' + path + ' -> 200 sin redireccion', 'status ' + res.status);
    if (!ok) continue;
    const html = await res.text();
    const canonicals = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi) || [];
    report(canonicals.length === 1, path + ' tiene exactamente un link canonical', canonicals.length + ' encontrados');
    const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    let physician = false;
    for (const [, body] of blocks) {
      try {
        const data = JSON.parse(body);
        const nodes = Array.isArray(data) ? data : data['@graph'] || [data];
        const hasType = (n) => n && (Array.isArray(n['@type']) ? n['@type'] : [n['@type']]).includes('Physician');
        if (nodes.some((n) => hasType(n) || hasType(n?.mainEntity))) physician = true;
      } catch {
        /* bloque invalido: no cuenta */
      }
    }
    report(physician, path + ' contiene JSON-LD con @type Physician', blocks.length + ' bloques JSON-LD');
  } catch (err) {
    report(false, 'GET ' + path, err.message);
  }
}

try {
  const res = await get('/esta-ruta-no-existe-verify');
  report(res.status === 404, 'ruta inexistente -> 404', 'status ' + res.status);
} catch (err) {
  report(false, 'ruta inexistente -> 404', err.message);
}

for (const path of ['/robots.txt', '/sitemap.xml']) {
  try {
    const res = await get(path);
    report(res.status === 200, 'GET ' + path + ' -> 200', 'status ' + res.status);
  } catch (err) {
    report(false, 'GET ' + path, err.message);
  }
}

console.log(failures ? failures + ' comprobaciones fallaron en ' + origin : 'Todo en orden en ' + origin);
process.exit(failures ? 1 : 0);
