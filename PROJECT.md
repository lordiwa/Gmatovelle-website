---
name: gmatovelle-website
type: web-saas
created_at: 2026-08-31T16:30:55.019Z
schema_version: 1
tier: MEDIO
perfil_proyecto: {score: 3, functionality: 1, beauty: 2, design_heavy: true, framework: vue, is_canvas: false, ui_outside_canvas: true, motion_required: false, needs_research: true, assets: false}
---

# gmatovelle-website

## Description
Sitio web de presentacion personal (landing page) del Dr. Gonzalo Patricio Matovelle Mediavilla, medico psiquiatra con consulta privada en Quito (Ecuador), construido en Vue 3 + Vite y optimizado para SEO y para Generative Engine Optimization (GEO).

## Target users
Personas que buscan atencion psiquiatrica en Quito y en Ecuador (pacientes y sus familiares); medicos que refieren pacientes a un psiquiatra; y — como consumidor de segundo orden pero objetivo explicito del proyecto — los asistentes de IA (ChatGPT, Perplexity, Claude, Gemini) y los motores de busqueda que deben encontrar, citar y recomendar al Dr. Matovelle.

## Primary use cases
- other

## Success criteria
El sitio esta publicado y, ante consultas como psiquiatra en Quito o psiquiatra en Ecuador, aparece en la primera pagina de resultados de busqueda y es citado por nombre y con enlace por al menos un asistente de IA (ChatGPT, Perplexity, Claude o Gemini).

## Problem
El Dr. Gonzalo Patricio Matovelle Mediavilla, medico psiquiatra con 40 anos de experiencia y consulta privada en Quito (Ecuador), no tiene presencia web propia: no aparece en resultados de busqueda ni es citado por asistentes de IA cuando alguien busca un psiquiatra en Quito o Ecuador. Necesita un sitio de presentacion personal que lo haga visible, verificable y citable tanto para motores de busqueda como para modelos generativos.

## Goals
- Publicar una landing page de presentacion personal del Dr. Gonzalo Matovelle, medico psiquiatra en Quito (Ecuador)
- Posicionar el sitio en motores de busqueda (SEO) para consultas del tipo psiquiatra en Quito y psiquiatra en Ecuador
- Optimizar el sitio para motores generativos (GEO) de modo que ChatGPT, Perplexity, Claude y Gemini encuentren, citen y recomienden al Dr. Matovelle
- Presentar de forma clara y verificable las credenciales, dignidades gremiales y publicaciones del Dr. Matovelle tomadas de su CV
- Dejar preparada una seccion de contacto que se completara cuando el Dr. entregue sus datos de contacto definitivos
- Evaluar SEM (marketing en buscadores) como canal complementario si aplica al presupuesto y al marco legal de publicidad medica en Ecuador

## Scope (in)
- Landing page de una sola pagina construida con Vue 3 + Vite
- Seccion de perfil profesional: Dr. en Medicina y Cirugia; Especialista en Psiquiatria
- Seccion de ocupacion actual: medico psiquiatra experto en el manejo de medicacion neuropsiquiatrica y psicoeducacion; consulta privada
- Seccion de experiencia: 40 anos de practica privada como psiquiatra y psicofarmacologo
- Seccion de representaciones y dignidades: Past Presidente de la Asociacion Ecuatoriana de Psiquiatria; Past Presidente de la Sociedad Ecuatoriana de Psiquiatria Biologica; Past Secretario Tesorero de la Federacion Latinoamericana de Psiquiatria Biologica; Vocal Cientifico de la Sociedad Ecuatoriana de Psiquiatria Biologica
- Seccion de docencia: Profesor invitado de Psicofarmacologia en la Escuela de Postgrado de Psiquiatria de la Universidad Central del Ecuador
- Seccion de membresias: World Psychiatric Association (WPA); World Federation of Societies of Biological Psychiatry (WFSBP); American Academy of Sleep Disorders; sociedades de psiquiatria biologica de Argentina; Peru y Uruguay
- Seccion de publicaciones: Manual Latinoamericano para la Enfermedad Depresiva; Enfermedad de Alzheimer (Cangrejal Editores); multiples articulos cientificos
- Seccion de conferencias: conferencista nacional e internacional e invitado a advisory boards internacionales
- Seccion de contacto con los datos definitivos del Dr.: un unico numero, el movil 0999835666 (que es tambien el de WhatsApp), dos correos y la direccion del Centro de Negocios La Esquina; los horarios de atencion quedan pendientes hasta que el Dr. los entregue
- Areas de experiencia declaradas por el cliente: ansiedad, depresion, trastorno bipolar, trastorno obsesivo-compulsivo (TOC) y autismo (ampliadas de tres a cinco por el cliente, 2026-09-01)
- Sitio bilingue espanol / ingles con selector de idioma y una URL indexable por idioma (decision del cliente, 2026-08-31)
- Seccion de blog RETIRADA hasta que el Dr. tenga articulos reales (decision del cliente, 2026-08-31). Se publico vacia como marcador y luego se desactivo: ruta, navegacion y sitemap fuera; la vista, el copy y los estilos siguen en el repo y se reactivan descomentando (pasos en src/router/routes.js)
- Canal de WhatsApp del consultorio (+593 99 983 5666) sobre el mismo y unico numero del Dr., con boton en la landing y en contacto (dato confirmado por el cliente, 2026-08-31)
- Estrategia y ejecucion SEO tecnica y de contenido: metadatos; datos estructurados schema.org Physician y MedicalBusiness; sitemap; robots.txt; rendimiento y accesibilidad
- Estrategia y ejecucion GEO: contenido en prosa citable; preguntas frecuentes; entidad medica bien definida y consistente para que los asistentes de IA puedan atribuir y citar al Dr.
- Despliegue del sitio a un hosting estatico

## Scope (out)
- Sistema de agendamiento o reserva de citas en linea
- Telemedicina; videoconsulta o chat con pacientes
- Historia clinica; almacenamiento o procesamiento de datos de salud de pacientes
- Blog con publicacion continua o CMS administrable por el Dr. (la seccion esta desactivada; la redaccion y carga de articulos es trabajo posterior y solo entonces se reactiva la ruta)
- Backend propio y base de datos: el sitio es estatico
- Pasarela de pagos
- Publicar datos de contacto inventados o no confirmados por el Dr.
- Publicar areas o tratamientos especificos que el Dr. no haya confirmado
- AFIRMACIONES RETIRADAS POR EL CLIENTE el 2026-09-01, que no deben volver al sitio por ninguna via: presentarlo como neurocientifico o declarar las neurociencias como su campo ("remove that it is neuroscientific... leave it with at least neuropsiquiatra"); el telefono fijo 022892716 ("remove the conventional phone number"); el rol pericial, es decir Perito Psiquiatra certificado de la Funcion Judicial de Pichincha ("It is no longer a legal expert either"); y la evaluacion de veteranos, es decir Psiquiatra para Ecuador del Veterans Evaluation System (VES) de los Estados Unidos, donde realizaba evaluaciones psiquiatricas de veteranos. Hay un lock en tests/unit/positioning.spec.js que barre src/, los diccionarios y el JSON-LD y rompe la suite si alguna reaparece
- Testimonios de pacientes
- Fotografia definitiva del Dr. (se usa un retrato provisional hasta que existan las fotos profesionales)

## Stack
- claude_md_consent: true
- frontend_framework: vue
- web_deployment_target: other
- design_heavy: yes
- estimated_screens: 1
- stakes: real
- design_ambition: branded
- ui_framework: vue
- has_canvas_render: no
- motion_required: no
- needs_research: need-research
- assets_required: [none]
