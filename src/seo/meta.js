/**
 * Fuente unica de metadatos SEO/GEO.
 *
 * Devuelve, para cada combinacion pagina + idioma, el head completo: titulo,
 * descripcion, canonical, hreflang, Open Graph, Twitter Card y los bloques
 * JSON-LD. Lo consumen dos lados: el cliente (useHead, para navegacion SPA) y
 * el prerender (renderHeadTags, para el HTML estatico que ven los crawlers y
 * los asistentes de IA). Un solo origen evita que ambos se desincronicen.
 */
import {
  SITE_ORIGIN,
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_TAGS,
  OG_LOCALE_TAGS,
  CONTENT_UPDATED,
} from '@/site.config.js';
import { PAGES, pathFor } from '@/router/routes.js';
import { messagesFor } from '@/i18n/index.js';
import { profile } from '@/data/profile.js';
import { contact, mapsUrl } from '@/data/contact.js';

/** URL absoluta a partir de una ruta interna. */
export function absoluteUrl(path) {
  if (path === '/') return SITE_ORIGIN + '/';
  return SITE_ORIGIN + path;
}

const PHYSICIAN_ID = SITE_ORIGIN + '/#physician';
const WEBSITE_ID = SITE_ORIGIN + '/#website';

/**
 * Nodo Physician de schema.org: la entidad medica del sitio.
 *
 * Es el bloque clave para GEO. Solo incluye campos respaldados por el CV o por
 * datos confirmados por el cliente; los pendientes (direccion exacta, correo,
 * horarios, perfiles externos) se omiten en vez de rellenarse.
 */
export function physicianJsonLd(locale) {
  const t = messagesFor(locale);
  const node = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': PHYSICIAN_ID,
    // honorificPrefix ya declara 'Dr.': el name va sin prefijo para no duplicarlo.
    name: profile.fullName,
    alternateName: profile.displayName,
    honorificPrefix: profile.honorificPrefix,
    givenName: profile.givenName,
    familyName: profile.familyName,
    url: absoluteUrl(pathFor('home', locale)),
    // Retrato profesional del Dr. Ancla la entidad a una cara concreta, que es
    // justamente lo que usan buscadores y asistentes para desambiguar a una
    // persona con nombre comun. Se construye sobre SITE_ORIGIN, asi que apunta
    // al dominio definitivo en cuanto se actualice src/site.config.js.
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(profile.portraitPath),
      width: profile.portraitWidth,
      height: profile.portraitHeight,
      caption: t.hero.portraitAlt,
    },
    description: t.hero.summary,
    // 'Psychiatric' es el unico valor del enum MedicalSpecialty de schema.org
    // que aplica: no existe un miembro "Neurologic"/"Neuropsychiatric" en ese
    // enum, asi que no se inventa uno. El matiz neuropsiquiatrico se declara en
    // jobTitle y knowsAbout, que son texto libre.
    medicalSpecialty: 'Psychiatric',
    jobTitle: locale === 'es' ? 'Médico Neuropsiquiatra' : 'Neuropsychiatrist',
    // Numero unico del consultorio en E.164: el formato que schema.org pide
    // para telephone y el que permite marcar desde fuera de Ecuador.
    telephone: contact.phoneE164,
    email: contact.emails,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address,
      addressLocality: profile.city,
      addressRegion: profile.region,
      addressCountry: profile.countryCode,
    },
    areaServed: [
      { '@type': 'City', name: profile.city },
      { '@type': 'Country', name: profile.country },
    ],
    knowsAbout:
      locale === 'es'
        ? [
            'Neuropsiquiatría',
            'Psiquiatría',
            'Psicofarmacología',
            'Manejo y control de la medicación',
            'Ansiedad',
            'Depresión',
            'Trastorno bipolar',
            'Trastorno obsesivo-compulsivo (TOC)',
            'Autismo',
          ]
        : [
            'Neuropsychiatry',
            'Psychiatry',
            'Psychopharmacology',
            'Medication management and control',
            'Anxiety',
            'Depression',
            'Bipolar disorder',
            'Obsessive-compulsive disorder (OCD)',
            'Autism',
          ],
    memberOf: profile.memberships.map((name) => ({
      '@type': 'Organization',
      name,
      ...(profile.membershipUrls[name] ? { url: profile.membershipUrls[name] } : {}),
    })),
    hasCredential: profile.degrees[locale].map((name) => ({
      '@type': 'EducationalOccupationalCredential',
      name,
      credentialCategory: 'degree',
      recognizedBy: { '@type': 'CollegeOrUniversity', name: profile.university },
    })),
    hasMap: mapsUrl(),
    alumniOf: { '@type': 'CollegeOrUniversity', name: profile.university },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: locale === 'es' ? 'Agendamiento de citas' : 'Appointments',
      telephone: contact.phoneE164,
      email: contact.emails,
    },
  };

  // La ficha de Google Maps es un perfil externo verificado (CID del cliente).
  node.sameAs = [...profile.sameAs, mapsUrl()];
  return node;
}

/** Un nodo Book por publicacion, con el Physician como autor. Sin ISBN. */
export function bookJsonLds(locale) {
  return profile.publications.map((pub, i) => ({
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': absoluteUrl(pathFor('profile', locale)) + '#book-' + (i + 1),
    name: pub.title,
    author: { '@id': PHYSICIAN_ID },
    ...(pub.publisher ? { publisher: { '@type': 'Organization', name: pub.publisher } } : {}),
  }));
}

/** Nodo WebSite, con las dos versiones idiomaticas declaradas. */
export function webSiteJsonLd(locale) {
  const t = messagesFor(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_ORIGIN + '/',
    name: profile.displayName,
    alternateName: t.meta.home.title,
    inLanguage: LOCALES.map((l) => LOCALE_TAGS[l]),
    publisher: { '@id': PHYSICIAN_ID },
  };
}

/** Nodo FAQPage con las preguntas frecuentes del idioma activo. */
export function faqJsonLd(locale) {
  const t = messagesFor(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': absoluteUrl(pathFor('faq', locale)) + '#faq',
    inLanguage: LOCALE_TAGS[locale],
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

function pageJsonLd(page, locale, title, description) {
  const url = absoluteUrl(pathFor(page, locale));
  return {
    '@context': 'https://schema.org',
    '@type': page === 'home' ? 'ProfilePage' : 'WebPage',
    '@id': url + '#page',
    url,
    name: title,
    description,
    inLanguage: LOCALE_TAGS[locale],
    ...(page === 'home' ? { dateModified: CONTENT_UPDATED } : {}),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PHYSICIAN_ID },
    ...(page === 'home' ? { mainEntity: { '@id': PHYSICIAN_ID } } : {}),
  };
}

/** Enlaces hreflang de una pagina (incluye x-default apuntando al espanol). */
export function alternatesFor(page) {
  const known = PAGES.some((p) => p.name === page);
  if (!known) return [];
  const links = LOCALES.map((locale) => ({
    hreflang: LOCALE_TAGS[locale],
    href: absoluteUrl(pathFor(page, locale)),
  }));
  links.push({ hreflang: 'x-default', href: absoluteUrl(pathFor(page, DEFAULT_LOCALE)) });
  return links;
}

/**
 * Head completo de una pagina en un idioma.
 *
 * Solo las paginas presentes en PAGES se tratan como reales; cualquier otra
 * clave (hoy 'notFound' y 'blog', que quedo desactivada) cae al head generico
 * sin canonical, robots noindex y sin JSON-LD.
 *
 * @param {'home'|'profile'|'practice'|'faq'|'contact'|'blog'|'notFound'} page
 * @param {'es'|'en'} locale
 */
export function buildHead(page, locale) {
  const t = messagesFor(locale);
  const meta = t.meta[page] || t.meta.home;
  const isRealPage = PAGES.some((p) => p.name === page);
  const url = isRealPage ? absoluteUrl(pathFor(page, locale)) : SITE_ORIGIN + '/';

  const jsonLd = [];
  if (isRealPage) {
    jsonLd.push(pageJsonLd(page, locale, meta.title, meta.description));
    // El Physician va en todas las paginas; el resto depende de lo que la
    // pagina muestra: WebSite en la portada, libros en el perfil, FAQPage en
    // las preguntas (el marcado debe coincidir con el contenido visible).
    jsonLd.push(physicianJsonLd(locale));
    if (page === 'home') jsonLd.push(webSiteJsonLd(locale));
    if (page === 'profile') jsonLd.push(...bookJsonLds(locale));
    if (page === 'faq') jsonLd.push(faqJsonLd(locale));
  }

  return {
    lang: LOCALE_TAGS[locale],
    title: meta.title,
    description: meta.description,
    // La 404 y demas rutas no reales no declaran canonical: combinarlo con
    // noindex enviaria senales contradictorias.
    canonical: isRealPage ? url : null,
    robots: isRealPage ? 'index,follow,max-snippet:-1,max-image-preview:large' : 'noindex,follow',
    alternates: alternatesFor(page),
    og: {
      'og:type': page === 'home' ? 'profile' : 'website',
      'og:site_name': t.nav.brand,
      'og:title': meta.title,
      'og:description': meta.description,
      ...(isRealPage ? { 'og:url': url } : {}),
      'og:locale': OG_LOCALE_TAGS[locale],
      'og:locale:alternate': OG_LOCALE_TAGS[locale === 'es' ? 'en' : 'es'],
      // Tarjeta de 1200x630 con el retrato del Dr.: la misma sesion que el
      // retrato del hero, recortada al formato que piden las redes.
      'og:image': absoluteUrl(profile.ogImagePath),
      'og:image:width': String(profile.ogImageWidth),
      'og:image:height': String(profile.ogImageHeight),
      'og:image:alt': t.hero.portraitAlt,
    },
    twitter: {
      'twitter:card': 'summary_large_image',
      'twitter:title': meta.title,
      'twitter:description': meta.description,
      'twitter:image': absoluteUrl(profile.ogImagePath),
    },
    jsonLd,
  };
}
