import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { messages } from '@/i18n/index.js';
import { physicianJsonLd, faqJsonLd } from '@/seo/meta.js';
import { contact } from '@/data/contact.js';
import { profile } from '@/data/profile.js';
import { SITE_ORIGIN } from '@/site.config.js';
import { mountAt } from '../helpers/mount.js';
import App from '@/App.vue';

const distDir = resolve(process.cwd(), 'dist');

/**
 * TASK-008: el Dr. NO ofrece manejo de adicciones ni terapia de pareja. Estos
 * dos servicios estan fuera de su practica declarada y no pueden aparecer en
 * ningun idioma, en ningun lugar del sitio (copy, FAQ, JSON-LD, HTML
 * prerenderizado). Este lock barre el contenido serializado en busca de esos
 * terminos para que una reintroduccion accidental (por ejemplo, copiar un
 * parrafo de otra clinica) rompa la suite en vez de publicarse.
 */
const FORBIDDEN_TERMS = [
  'adicc',
  'addict',
  'toxicoman',
  'pareja',
  'couple',
  'marital',
  'matrimon',
  'sustancias',
  'substance abuse',
];

function findForbidden(haystack) {
  const lower = haystack.toLowerCase();
  return FORBIDDEN_TERMS.filter((term) => lower.includes(term));
}

function distFiles() {
  if (!existsSync(distDir)) return [];
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (entry.endsWith('.html')) out.push(full);
    }
  };
  walk(distDir);
  return out;
}

describe('exclusiones duras: sin adicciones ni terapia de pareja', () => {
  it('no aparecen en los diccionarios ES/EN serializados', () => {
    for (const locale of ['es', 'en']) {
      const serialized = JSON.stringify(messages[locale]);
      expect(findForbidden(serialized), 'terminos prohibidos en ' + locale).toEqual([]);
    }
  });

  it('no aparecen en el JSON-LD Physician ni FAQPage de ningun idioma', () => {
    for (const locale of ['es', 'en']) {
      const serialized = JSON.stringify(physicianJsonLd(locale)) + JSON.stringify(faqJsonLd(locale));
      expect(findForbidden(serialized), 'terminos prohibidos en JSON-LD ' + locale).toEqual([]);
    }
  });

  it('no aparecen en el HTML prerenderizado (si el build ya se ejecuto)', () => {
    const files = distFiles();
    if (files.length === 0) {
      // El build (npm run build) es un paso aparte de npm test; si dist/ no
      // existe todavia este lock no tiene nada que barrer. La cobertura real
      // la dan los dos tests anteriores, que no dependen del build.
      expect(files).toEqual([]);
      return;
    }
    for (const file of files) {
      const html = readFileSync(file, 'utf8');
      expect(findForbidden(html), 'terminos prohibidos en ' + file).toEqual([]);
    }
  });
});

/**
 * Posicionamiento corregido por el cliente el 2026-09-01. Dos cambios de fondo
 * respecto de la version anterior de estos locks:
 *
 *   1. El Dr. dejo de presentarse como neurocientifico ("remove that it is
 *      neuroscientific... leave it with at least neuropsiquiatra"). Los locks
 *      que exigian la palabra neurociencia ahora exigen neuropsiquiatra, y el
 *      barrido antirretroceso de mas abajo impide que reaparezca la vieja.
 *   2. Las condiciones destacadas pasaron de tres a cinco: el cliente agrego
 *      el trastorno obsesivo-compulsivo y el autismo ("Debe tener esas
 *      especialidades si falta alguna aumenta").
 */
const CONDITIONS = {
  es: ['Ansiedad', 'Depresión', 'Trastorno bipolar', 'Trastorno obsesivo-compulsivo (TOC)', 'Autismo'],
  en: [
    'Anxiety',
    'Depression',
    'Bipolar disorder',
    'Obsessive-compulsive disorder (OCD)',
    'Autism',
  ],
};

describe('posicionamiento: neuropsiquiatra y manejo de la medicacion', () => {
  it('el resumen de la portada lo presenta como neuropsiquiatra en ambos idiomas', () => {
    expect(messages.es.hero.summary.toLowerCase()).toContain('neuropsiquiatra');
    expect(messages.en.hero.summary.toLowerCase()).toContain('neuropsychiatrist');
  });

  it('el resumen ya no lo presenta como neurocientifico en ningun idioma', () => {
    expect(messages.es.hero.summary.toLowerCase()).not.toMatch(/neurocient|neurocienc/);
    expect(messages.en.hero.summary.toLowerCase()).not.toMatch(/neuroscien/);
  });

  it('el manejo y control de la medicacion aparece como eje de la consulta', () => {
    expect(messages.es.hero.summary).toContain('manejo y control');
    expect(messages.en.hero.summary.toLowerCase()).toContain('medication management');
  });

  it('nombra exactamente las cinco condiciones confirmadas, y ninguna otra, como areas de experiencia destacada', () => {
    expect(messages.es.expertise.items.map((i) => i.title)).toEqual(CONDITIONS.es);
    expect(messages.en.expertise.items.map((i) => i.title)).toEqual(CONDITIONS.en);
    expect(profile.declaredConditions).toEqual([
      'anxiety',
      'depression',
      'bipolar_disorder',
      'obsessive_compulsive_disorder',
      'autism',
    ]);
  });

  /**
   * Las tarjetas de la seccion no son la unica superficie donde el sitio
   * enumera las condiciones: la meta description es lo que ve el buscador y el
   * primer parrafo de la bio es la prosa que citan los asistentes generativos.
   * Sin este lock, revertir cualquiera de las dos a la lista vieja de tres
   * pasaba la suite en verde y solo se notaba en produccion.
   */
  it('enumera las cinco condiciones tambien en la meta description y en la bio', () => {
    for (const locale of ['es', 'en']) {
      const superficies = {
        'meta.home.description': messages[locale].meta.home.description,
        'about.paragraphs[0]': messages[locale].about.paragraphs[0],
      };
      for (const [nombre, texto] of Object.entries(superficies)) {
        const faltantes = CONDITIONS[locale].filter(
          (condicion) => !texto.toLowerCase().includes(condicion.toLowerCase()),
        );
        expect(faltantes, 'condiciones ausentes en ' + nombre + ' (' + locale + ')').toEqual([]);
      }
    }
  });

  it('anuncia cinco condiciones en el titular de la seccion, no tres', () => {
    expect(messages.es.expertise.headline).toBe('Cinco condiciones, un mismo estándar de cuidado');
    expect(messages.en.expertise.headline).toBe('Five conditions, one standard of care');
  });

  it('la FAQ responde que condiciones trata, nombrando las cinco', async () => {
    for (const locale of ['es', 'en']) {
      const answer = messages[locale].faq.items.find((item) =>
        /condiciones|conditions/i.test(item.question),
      ).answer;
      for (const term of locale === 'es'
        ? ['ansiedad', 'depresión', 'trastorno bipolar', 'obsesivo-compulsivo', 'autismo']
        : ['anxiety', 'depression', 'bipolar disorder', 'obsessive-compulsive', 'autism']) {
        expect(answer.toLowerCase(), term + ' ausente en la FAQ ' + locale).toContain(term);
      }
    }
  });

  it('el JSON-LD Physician declara knowsAbout con neuropsiquiatria y las cinco condiciones', () => {
    const es = physicianJsonLd('es').knowsAbout.join(' | ').toLowerCase();
    expect(es).toContain('neuropsiquiatría');
    expect(es).toContain('ansiedad');
    expect(es).toContain('depresión');
    expect(es).toContain('trastorno bipolar');
    expect(es).toContain('trastorno obsesivo-compulsivo');
    expect(es).toContain('autismo');

    const en = physicianJsonLd('en').knowsAbout.join(' | ').toLowerCase();
    expect(en).toContain('neuropsychiatry');
    expect(en).toContain('anxiety');
    expect(en).toContain('depression');
    expect(en).toContain('bipolar disorder');
    expect(en).toContain('obsessive-compulsive disorder');
    expect(en).toContain('autism');
  });

  it('el JSON-LD ya no declara las neurociencias como campo del Dr.', () => {
    for (const locale of ['es', 'en']) {
      const knowsAbout = physicianJsonLd(locale).knowsAbout.join(' | ').toLowerCase();
      expect(knowsAbout, 'neurociencias en knowsAbout ' + locale).not.toMatch(
        /neurocienc|neuroscien/,
      );
    }
  });

  it('el jobTitle del JSON-LD lo declara neuropsiquiatra y no neurocientifico', () => {
    expect(physicianJsonLd('es').jobTitle).toBe('Médico Neuropsiquiatra');
    expect(physicianJsonLd('en').jobTitle).toBe('Neuropsychiatrist');
  });
});

/**
 * Barrido antirretroceso de las cuatro correcciones que el cliente pidio en
 * persona el 2026-09-01 y que no quiere volver a ver publicadas:
 *
 *   - ya NO se presenta como neurocientifico ni las neurociencias son su campo;
 *   - el fijo 022892716 se retiro del sitio (queda un solo numero, el movil);
 *   - ya NO es perito psiquiatra de la Funcion Judicial de Pichincha;
 *   - ya NO es Psiquiatra para Ecuador del Veterans Evaluation System (VES) ni
 *     realiza evaluaciones psiquiatricas de veteranos.
 *
 * Los locks de arriba fijan la version correcta de cada hecho; este barre todo
 * el material publicable (el codigo fuente, los dos diccionarios serializados y
 * el JSON-LD que consumen buscadores y asistentes) para que una reintroduccion
 * por cualquier via -- copiar copy viejo, restaurar un archivo, rehacer el
 * JSON-LD -- rompa la suite en vez de llegar al sitio del Dr.
 */
const RETIRED_CLAIMS = [
  { label: 'neurocientifico / neurociencias', pattern: /neurocienc|neurocient|neuroscien/i },
  { label: 'telefono fijo retirado 022892716', pattern: /022892716/ },
  {
    label: 'rol pericial',
    pattern: /perito|pericial|peritaje|forensic|funci[oó]n judicial|judiciary of pichincha/i,
  },
  {
    label: 'evaluacion de veteranos (VES)',
    pattern: /\bVES\b|veterans?\s+evaluation|\bveteranos?\b|\bveterans?\b/i,
  },
];

function retiredClaimsIn(haystack) {
  return RETIRED_CLAIMS.filter(({ pattern }) => pattern.test(haystack)).map((c) => c.label);
}

function srcFiles() {
  const srcDir = resolve(process.cwd(), 'src');
  const walk = (dir) =>
    readdirSync(dir).flatMap((entry) => {
      const full = join(dir, entry);
      return statSync(full).isDirectory() ? walk(full) : [full];
    });
  return walk(srcDir);
}

describe('afirmaciones retiradas por el cliente', () => {
  it('no reaparecen en ningun archivo de src/, ni siquiera en un comentario', () => {
    const offenders = srcFiles()
      .map((file) => ({ file, found: retiredClaimsIn(readFileSync(file, 'utf8')) }))
      .filter(({ found }) => found.length > 0)
      .map(({ file, found }) => file.replace(resolve(process.cwd()) + '/', '') + ': ' + found.join(', '));
    expect(offenders, 'afirmaciones retiradas en src/').toEqual([]);
  });

  it('no reaparecen en los diccionarios ES/EN serializados', () => {
    for (const locale of ['es', 'en']) {
      const serialized = JSON.stringify(messages[locale]);
      expect(retiredClaimsIn(serialized), 'afirmaciones retiradas en ' + locale).toEqual([]);
    }
  });

  it('no reaparecen en el JSON-LD Physician ni FAQPage de ningun idioma', () => {
    for (const locale of ['es', 'en']) {
      const serialized =
        JSON.stringify(physicianJsonLd(locale)) + JSON.stringify(faqJsonLd(locale));
      expect(retiredClaimsIn(serialized), 'afirmaciones retiradas en JSON-LD ' + locale).toEqual(
        [],
      );
    }
  });

  /**
   * El modo de fallo propio de este ticket no es escribir mal el copy: es
   * desplegar un prerender viejo, porque dist/ se genera en un paso aparte de
   * npm test y conserva el HTML de la version anterior hasta que se rehace el
   * build. Si el build ya corrio, este barrido lo comprueba; si no, no hay
   * nada que barrer y la cobertura real la dan los tres tests de arriba.
   */
  it('no reaparecen en el HTML prerenderizado (si el build ya se ejecuto)', () => {
    const files = distFiles();
    if (files.length === 0) {
      expect(files).toEqual([]);
      return;
    }
    const offenders = files
      .map((file) => ({ file, found: retiredClaimsIn(readFileSync(file, 'utf8')) }))
      .filter(({ found }) => found.length > 0)
      .map(({ file, found }) => file.replace(resolve(process.cwd()) + '/', '') + ': ' + found.join(', '));
    expect(offenders, 'afirmaciones retiradas en el prerender').toEqual([]);
  });

  it('el barrido detecta de verdad cada una de las cuatro afirmaciones retiradas', () => {
    // Sin esto el lock podria estar verde por un regex roto en vez de por un
    // sitio limpio: se le da de comer un ejemplo de cada afirmacion retirada.
    expect(retiredClaimsIn('El Dr. es neurocientífico')).toEqual(['neurocientifico / neurociencias']);
    expect(retiredClaimsIn('He is a neuroscientist')).toEqual(['neurocientifico / neurociencias']);
    expect(retiredClaimsIn('Llame al 022892716')).toEqual(['telefono fijo retirado 022892716']);
    expect(retiredClaimsIn('Perito Psiquiatra de la Función Judicial de Pichincha')).toEqual([
      'rol pericial',
    ]);
    expect(retiredClaimsIn('Certified Forensic Psychiatrist')).toEqual(['rol pericial']);
    expect(retiredClaimsIn('Psiquiatra para Ecuador del Veterans Evaluation System (VES)')).toEqual([
      'evaluacion de veteranos (VES)',
    ]);
    expect(retiredClaimsIn('Does he evaluate veterans?')).toEqual(['evaluacion de veteranos (VES)']);
    expect(retiredClaimsIn('Médico Neuropsiquiatra en Quito')).toEqual([]);
    // Falso positivo evitado a proposito: 'ves' aparece como substring en
    // palabras normales de espanol e ingles (niveles, breves, moves...); el
    // patron esta anclado a \bVES\b y no debe cazar esta frase inocente.
    expect(
      retiredClaimsIn('Atiende en niveles de complejidad diversos y en visitas breves'),
    ).toEqual([]);
  });
});

/**
 * CV completo del Dr. entregado por el cliente el 2026-08-31, con dos
 * salvedades que el cliente retiro despues y que ya no son hechos publicables,
 * asi que salieron de estas dos listas:
 *
 *   - el rol pericial, retirado el 2026-09-01 ("It is no longer a legal
 *     expert either");
 *   - la evaluacion de veteranos (VES) / Psiquiatra para Ecuador del Veterans
 *     Evaluation System, retirada el 2026-09-01.
 *
 * Todo lo demas del CV sigue intacto. Cada entrada es un hecho literal del
 * curriculum que el sitio debe exponer en los dos idiomas. Se comparan contra
 * el copy renderizable y no contra los modulos de datos, para que recortar una
 * seccion de credenciales rompa la suite en vez de publicarse: el CV es la
 * razon de ser del sitio y su perdida silenciosa es el fallo mas caro posible
 * aqui.
 */
const CV_FACTS = {
  es: [
    'Doctor en Medicina y Cirugía',
    'Especialista en Psiquiatría',
    'Psiquiatra de enlace en las principales clínicas de Quito',
    'Past Presidente de la Asociación Ecuatoriana de Psiquiatría',
    'Past Presidente de la Sociedad Ecuatoriana de Psiquiatría Biológica',
    'Past Secretario Tesorero de la Federación Latinoamericana de Psiquiatría Biológica',
    'Vocal Científico de la Sociedad Ecuatoriana de Psiquiatría Biológica',
    'Profesor invitado de Psicofarmacología',
    'World Psychiatric Association',
    'American Academy of Sleep Disorders',
    'Sociedad Argentina de Psiquiatría Biológica',
    'Sociedad Peruana de Psiquiatría Biológica',
    'Sociedad Uruguaya de Psiquiatría Biológica',
    'Sociedad Peruana de Obstetricia y Ginecología',
    'Sociedad Ecuatoriana de Escritores Médicos',
    'Hellenic Psychiatric Congress',
    'Manual Latinoamericano para la Enfermedad Depresiva',
    'Enfermedad de Alzheimer',
    'Cangrejal Editores L.A.',
  ],
  en: [
    'Doctor of Medicine and Surgery',
    'Specialist in Psychiatry',
    'Liaison psychiatrist at the leading clinics of Quito',
    'Past President of the Ecuadorian Psychiatric Association',
    'Past President of the Ecuadorian Society of Biological Psychiatry',
    'Past Secretary Treasurer of the Latin American Federation of Biological Psychiatry',
    'Scientific Officer of the Ecuadorian Society of Biological Psychiatry',
    'Visiting lecturer in Psychopharmacology',
    'World Psychiatric Association',
    'American Academy of Sleep Disorders',
    'Argentine Society of Biological Psychiatry',
    'Peruvian Society of Biological Psychiatry',
    'Uruguayan Society of Biological Psychiatry',
    'Peruvian Society of Obstetrics and Gynaecology',
    'Ecuadorian Society of Medical Writers',
    'Hellenic Psychiatric Congress',
    'Manual Latinoamericano para la Enfermedad Depresiva',
    'Enfermedad de Alzheimer',
    'Cangrejal Editores L.A.',
  ],
};

describe('CV completo del Dr. en ambos idiomas', () => {
  for (const locale of ['es', 'en']) {
    it('expone cada hecho del curriculum en el copy ' + locale, () => {
      const serialized = JSON.stringify(messages[locale]);
      const missing = CV_FACTS[locale].filter((fact) => !serialized.includes(fact));
      expect(missing, 'hechos del CV ausentes en ' + locale).toEqual([]);
    });

    it('los renderiza de verdad en la portada ' + locale, async () => {
      const { wrapper } = await mountAt(App, locale === 'es' ? '/' : '/en');
      const text = wrapper.text();
      const missing = CV_FACTS[locale].filter((fact) => !text.includes(fact));
      expect(missing, 'hechos del CV no renderizados en ' + locale).toEqual([]);
    });
  }

  it('el nombre completo del Dr. es el del CV y llega al JSON-LD', () => {
    expect(profile.fullName).toBe('Gonzalo Patricio Matovelle Mediavilla');
    expect(physicianJsonLd('es').name).toBe('Dr. Gonzalo Patricio Matovelle Mediavilla');
  });

  it('declara como memberOf las diez sociedades cientificas del CV', () => {
    const names = physicianJsonLd('en').memberOf.map((org) => org.name);
    expect(names).toEqual(profile.memberships);
    expect(names).toHaveLength(10);
  });
});

describe('retrato profesional del Dr.', () => {
  it('el archivo existe en public/ y no quedan restos en src/assets/', () => {
    expect(existsSync(resolve(process.cwd(), 'public' + profile.portraitPath))).toBe(true);
    expect(existsSync(resolve(process.cwd(), 'src/assets'))).toBe(false);
  });

  it('el nodo Physician publica la foto como ImageObject absoluto', () => {
    for (const locale of ['es', 'en']) {
      const image = physicianJsonLd(locale).image;
      expect(image['@type']).toBe('ImageObject');
      expect(image.url).toBe(SITE_ORIGIN + profile.portraitPath);
      expect(image.url).toMatch(/^https:\/\//);
      expect(image.caption).toContain('Matovelle');
    }
  });
});

/**
 * Direccion confirmada, unica y literal, tal como la entrego el cliente en el
 * lote de datos definitivos que reemplazo a los placeholders. Los tests de
 * abajo comparan contra este literal en vez de contra `contact.address` para no
 * volverse tautologicos: si alguien vacia o corrompe contact.address, deben
 * fallar igual.
 */
const CONFIRMED_ADDRESS =
  'Centro de Negocios del centro comercial La Esquina, calle Chimborazo y Av Pampite, ' +
  'torre 1, piso 2 oficina 3A';

describe('direccion real del consultorio', () => {
  it('es la direccion confirmada, y vive en un unico modulo fuente', () => {
    expect(contact.address).toBe(CONFIRMED_ADDRESS);

    const srcDir = resolve(process.cwd(), 'src');
    const walk = (dir) =>
      readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry);
        return statSync(full).isDirectory() ? walk(full) : [full];
      });
    const withLiteral = walk(srcDir).filter((file) =>
      readFileSync(file, 'utf8').includes(CONFIRMED_ADDRESS),
    );
    expect(withLiteral.map((f) => f.replace(srcDir + '/', ''))).toEqual(['data/contact.js']);
  });

  it('aparece en el JSON-LD Physician como streetAddress', () => {
    const node = physicianJsonLd('es');
    expect(node.address.streetAddress).toBe(CONFIRMED_ADDRESS);
    expect(node.address.addressLocality).toBe(profile.city);
    expect(node.address.addressCountry).toBe(profile.countryCode);
  });

  it('aparece en el copy de contacto de ambos idiomas', () => {
    expect(messages.es.contact.locationValue).toContain(CONFIRMED_ADDRESS);
    expect(messages.en.contact.locationValue).toContain(CONFIRMED_ADDRESS);
  });

  it('reemplaza la vieja respuesta de "se coordina por telefono" en la FAQ de donde atiende', () => {
    for (const locale of ['es', 'en']) {
      const answer = messages[locale].faq.items.find((item) =>
        /d[oó]nde atiende|does .* practise/i.test(item.question),
      ).answer;
      expect(answer).toContain(CONFIRMED_ADDRESS);
      expect(answer.toLowerCase()).not.toMatch(/se coordina|arranged when|coordinated by phone/);
    }
  });
});

describe('mapa de Google Maps embebido', () => {
  it('ContactPanel renderiza un iframe con la URL de Google Maps sin API key', async () => {
    const { wrapper } = await mountAt(App, '/contacto');
    const iframe = wrapper.find('iframe.contact-map');
    expect(iframe.exists()).toBe(true);

    const src = iframe.attributes('src');
    expect(src).toContain('google.com/maps');
    expect(src).toContain('output=embed');
    expect(src).not.toContain('key=');
    // La ficha oficial del Dr., identificada por su CID inmutable.
    expect(src).toContain('cid=14958856411200805908');

    expect(iframe.attributes('loading')).toBe('lazy');
    expect(iframe.attributes('referrerpolicy')).toBe('no-referrer-when-downgrade');
    expect(iframe.attributes('title')).toBeTruthy();
  });
});
