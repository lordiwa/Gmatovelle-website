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

describe('posicionamiento: neurocientifico y manejo de la medicacion', () => {
  it('el resumen de la portada nombra la neurociencia en ambos idiomas', () => {
    expect(messages.es.hero.summary.toLowerCase()).toMatch(/neurocientífico|neurociencia/);
    expect(messages.en.hero.summary.toLowerCase()).toMatch(/neuroscientist|neuroscience/);
  });

  it('el manejo y control de la medicacion aparece como eje de la consulta', () => {
    expect(messages.es.hero.summary).toContain('manejo y control');
    expect(messages.en.hero.summary.toLowerCase()).toContain('medication management');
  });

  it('nombra exactamente las tres condiciones confirmadas, y ninguna otra, como areas de experiencia destacada', () => {
    const expectedEs = ['Ansiedad', 'Depresión', 'Trastorno bipolar'];
    const expectedEn = ['Anxiety', 'Depression', 'Bipolar disorder'];
    expect(messages.es.expertise.items.map((i) => i.title)).toEqual(expectedEs);
    expect(messages.en.expertise.items.map((i) => i.title)).toEqual(expectedEn);
    expect(profile.declaredConditions).toEqual(['anxiety', 'depression', 'bipolar_disorder']);
  });

  it('la FAQ responde que condiciones trata, nombrando las tres', async () => {
    for (const locale of ['es', 'en']) {
      const answer = messages[locale].faq.items.find((item) =>
        /condiciones|conditions/i.test(item.question),
      ).answer;
      for (const term of locale === 'es'
        ? ['ansiedad', 'depresión', 'trastorno bipolar']
        : ['anxiety', 'depression', 'bipolar disorder']) {
        expect(answer.toLowerCase()).toContain(term);
      }
    }
  });

  it('el JSON-LD Physician declara knowsAbout con neurociencias y las tres condiciones', () => {
    const es = physicianJsonLd('es').knowsAbout.join(' | ').toLowerCase();
    expect(es).toContain('neurocienc');
    expect(es).toContain('ansiedad');
    expect(es).toContain('depresión');
    expect(es).toContain('trastorno bipolar');

    const en = physicianJsonLd('en').knowsAbout.join(' | ').toLowerCase();
    expect(en).toContain('neuroscience');
    expect(en).toContain('anxiety');
    expect(en).toContain('depression');
    expect(en).toContain('bipolar disorder');
  });
});

/**
 * CV completo del Dr. entregado por el cliente el 2026-08-31. Cada entrada es
 * un hecho literal del curriculum que el sitio debe exponer en los dos
 * idiomas. Se comparan contra el copy renderizable y no contra los modulos de
 * datos, para que recortar una seccion de credenciales rompa la suite en vez
 * de publicarse: el CV es la razon de ser del sitio y su perdida silenciosa es
 * el fallo mas caro posible aqui.
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
    'Psiquiatra para Ecuador del Veterans Evaluation System (VES), Estados Unidos',
    'Profesor invitado de Psicofarmacología',
    'Perito Psiquiatra certificado de la Función Judicial de Pichincha',
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
    'Psychiatrist for Ecuador of the Veterans Evaluation System (VES), United States',
    'Visiting lecturer in Psychopharmacology',
    'Certified Forensic Psychiatrist of the Judiciary of Pichincha',
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

    expect(iframe.attributes('loading')).toBe('lazy');
    expect(iframe.attributes('referrerpolicy')).toBe('no-referrer-when-downgrade');
    expect(iframe.attributes('title')).toBeTruthy();
  });
});
