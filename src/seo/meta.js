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
} from '@/site.config.js';
import { PAGES, pathFor } from '@/router/routes.js';
import { messagesFor } from '@/i18n/index.js';
import { profile } from '@/data/profile.js';
import { contact } from '@/data/contact.js';

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
    name: profile.honorificPrefix + ' ' + profile.fullName,
    alternateName: profile.displayName,
    honorificPrefix: profile.honorificPrefix,
    givenName: profile.givenName,
    familyName: profile.familyName,
    url: absoluteUrl(pathFor('home', locale)),
    description: t.hero.summary,
    medicalSpecialty: 'Psychiatric',
    jobTitle: locale === 'es' ? 'Médico Psiquiatra' : 'Psychiatrist',
    telephone: contact.phone,
    address: {
      '@type': 'PostalAddress',
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
            'Psiquiatría',
            'Psicofarmacología',
            'Medicación neuropsiquiátrica',
            'Psicoeducación',
            'Peritaje psiquiátrico',
          ]
        : [
            'Psychiatry',
            'Psychopharmacology',
            'Neuropsychiatric medication',
            'Psychoeducation',
            'Forensic psychiatry',
          ],
    memberOf: profile.memberships.map((name) => ({ '@type': 'Organization', name })),
    alumniOf: { '@type': 'CollegeOrUniversity', name: profile.university },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: locale === 'es' ? 'Agendamiento de citas' : 'Appointments',
      telephone: contact.phone,
    },
  };

  if (profile.sameAs.length > 0) node.sameAs = profile.sameAs;
  return node;
}

/** Nodo WebSite, con las dos versiones idiomaticas declaradas. */
export function webSiteJsonLd(locale) {
  const t = messagesFor(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_ORIGIN + '/',
    name: t.meta.home.title,
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
    '@id': absoluteUrl(pathFor('home', locale)) + '#faq',
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
 * @param {'home'|'contact'|'blog'|'notFound'} page
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
    if (page === 'home') {
      jsonLd.push(physicianJsonLd(locale));
      jsonLd.push(webSiteJsonLd(locale));
      jsonLd.push(faqJsonLd(locale));
    }
    if (page === 'contact') {
      jsonLd.push(physicianJsonLd(locale));
    }
  }

  return {
    lang: LOCALE_TAGS[locale],
    title: meta.title,
    description: meta.description,
    canonical: url,
    robots: isRealPage ? 'index,follow,max-snippet:-1,max-image-preview:large' : 'noindex,follow',
    alternates: alternatesFor(page),
    og: {
      'og:type': page === 'home' ? 'profile' : 'website',
      'og:site_name': t.nav.brand,
      'og:title': meta.title,
      'og:description': meta.description,
      'og:url': url,
      'og:locale': OG_LOCALE_TAGS[locale],
      'og:locale:alternate': OG_LOCALE_TAGS[locale === 'es' ? 'en' : 'es'],
    },
    twitter: {
      'twitter:card': 'summary',
      'twitter:title': meta.title,
      'twitter:description': meta.description,
    },
    jsonLd,
  };
}
