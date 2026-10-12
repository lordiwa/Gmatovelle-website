# Product

<!-- impeccable:product-schema 1 -->

<!-- Derived from PROJECT.md (hivemind intake, 2026-08-31) and the client
     corrections of 2026-09-01. Nothing here was invented for this file. -->

## Platform

web

## Users

Primary: people in Quito and the rest of Ecuador looking for a psychiatrist
for themselves or for a family member, often while anxious, on a phone, and
needing to decide whom to call. Secondary: physicians who refer patients to a
psychiatrist. Tertiary and explicit project goal: AI assistants (ChatGPT,
Perplexity, Claude, Gemini) and search engines that must find, cite and
recommend Dr. Matovelle by name with a link.

## Product Purpose

Personal presentation site (landing page) of Dr. Gonzalo Patricio Matovelle
Mediavilla, neuropsychiatrist with 40 years of private practice in Quito. It
exists because he had no web presence at all. Success: the site ranks on the
first page for "psiquiatra en Quito" / "psiquiatra en Ecuador" and is cited by
name and link by at least one AI assistant; a visitor can reach the practice
by phone or WhatsApp within seconds.

## Positioning

Forty years of continuous private practice as a psychiatrist and
psychopharmacologist in Quito, with expert medication management and control
as the axis of the consultation, backed by a verifiable record: Past President
of the Ecuadorian Psychiatric Association and of the Ecuadorian Society of
Biological Psychiatry, visiting lecturer in Psychopharmacology at the
Universidad Central del Ecuador, member of the WPA and WFSBP, author of the
Manual Latinoamericano para la Enfermedad Depresiva and of Enfermedad de
Alzheimer. A neighbouring practice cannot truthfully copy that record.

## Operating Context

- The consultation is arranged only by phone or WhatsApp on a single number
  (0999835666). There is no form, no online booking, no telemedicine.
- Private practice at Centro de Negocios del centro comercial La Esquina,
  calle Chimborazo y Av Pampite, torre 1, piso 2 oficina 3A, Quito.
- Bilingual site, Spanish (default, es-EC) and English, one indexable URL per
  language: `/`, `/contacto`, `/en`, `/en/contact`.
- Static site, Vue 3 + Vite, prerendered to HTML with JSON-LD (Physician,
  ProfilePage, WebSite, FAQPage); deployed to Firebase Hosting at
  https://gmatovelle-site.web.app/ until the final domain exists.

## Capabilities and Constraints

- Content is strictly what the CV and the client confirmed. Five declared
  areas of expertise: anxiety, depression, bipolar disorder,
  obsessive-compulsive disorder (OCD), autism. Two practice pillars:
  medication management and control; psychoeducation.
- Retired claims that must never return (a test sweeps src/, dictionaries,
  JSON-LD and the prerender): "neurocientifico"/neurosciences as his field,
  the landline 022892716, the forensic/expert-witness role, the veterans
  evaluation (VES) role.
- Self-description fixed by the client: "Medico Neuropsiquiatra" /
  "Neuropsychiatrist".
- The hero credential band is a client-fixed literal: "40 años de
  experiencia / Quito / WPA · WFSBP" (EN: "40 years of experience").
- Section order on the home page is locked by tests: profile, practice
  focus, areas of expertise, contact, credentials, publications, FAQ.
- The blog is disabled until real articles exist.
- Undecided: opening hours (omitted, not invented); final domain
  (`SITE_ORIGIN` placeholder gonzalomatovelle.com); whether the English site
  should display the phone as +593 99 983 5666; confirmation of the email
  info@gmail.com; external verifiable profiles for `sameAs` (none yet).

## Brand Commitments

- Name: "Dr. Gonzalo Matovelle" (display), full name "Dr. Gonzalo Patricio
  Matovelle Mediavilla" for the entity.
- Voice: sober, factual, verifiable; no testimonials, no marketing
  superlatives, no claims beyond the CV. Spanish copy uses the formal
  "usted".
- No logo or wordmark exists; the name set in type is the mark.

## Evidence on Hand

- Seven professional photographs of Dr. Matovelle in his office, delivered
  2026-10-12 in `pics/1.jpeg` to `pics/7.jpeg` (1600px on the long side):
  standing by the window in front of a cobalt-blue wall (1), on the balcony
  rail (2), seated in the leather armchair (3), in front of his two framed
  Universidad Central diplomas (4), at his desk in window light (5, 6, 7).
- The CV facts in `src/data/profile.js` and `src/i18n/{es,en}.js`.
- The official Google Maps listing of the practice (embedded by CID).
- Absent, do not fabricate: patient testimonials, outcome statistics, prices,
  opening hours, external profiles.

## Product Principles

- Only what is true today: every statement on the site is backed by the CV
  or by the client, and retired claims stay retired.
- The phone number is the product: calling or messaging the practice must be
  the obvious action on every screen, including on a phone held by someone
  in distress.
- Citable before clickable: prose, FAQ and structured data are written so a
  search engine or an AI assistant can attribute facts to the Dr. verbatim.
- Bilingual parity: the English site carries the complete profile, not a
  summary.

## Accessibility & Inclusion

Readers may be anxious, elderly, or reading on behalf of a relative: large
legible type, WCAG AA contrast everywhere, native disclosure for the FAQ so
answers stay in the HTML, reduced-motion respected, skip link present.
