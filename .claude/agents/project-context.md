---
project_name: gmatovelle-website
project_type: web-saas
generated_at: 2026-08-31T16:30:55.021Z
schema_version: 1
---

## Problem
El Dr. Gonzalo Patricio Matovelle Mediavilla, medico psiquiatra con 40 anos de experiencia y consulta privada en Quito (Ecuador), no tiene presencia web propia: no aparece en resultados de busqueda ni es citado por asistentes de IA cuando alguien busca un psiquiatra en Quito o Ecuador. Necesita un sitio de presentacion personal que lo haga visible, verificable y citable tanto para motores de busqueda como para modelos generativos.

### Goals
- Publicar una landing page de presentacion personal del Dr. Gonzalo Matovelle, medico psiquiatra en Quito (Ecuador)
- Posicionar el sitio en motores de busqueda (SEO) para consultas del tipo psiquiatra en Quito y psiquiatra en Ecuador
- Optimizar el sitio para motores generativos (GEO) de modo que ChatGPT, Perplexity, Claude y Gemini encuentren, citen y recomienden al Dr. Matovelle
- Presentar de forma clara y verificable las credenciales, dignidades gremiales y publicaciones del Dr. Matovelle tomadas de su CV
- Dejar preparada una seccion de contacto que se completara cuando el Dr. entregue sus datos de contacto definitivos
- Evaluar SEM (marketing en buscadores) como canal complementario si aplica al presupuesto y al marco legal de publicidad medica en Ecuador

### Scope (in)
- Landing page de una sola pagina construida con Vue 3 + Vite
- Seccion de perfil profesional: Dr. en Medicina y Cirugia; Especialista en Psiquiatria
- Seccion de ocupacion actual: medico psiquiatra experto en el manejo de medicacion neuropsiquiatrica y psicoeducacion; consulta privada
- Seccion de experiencia: 40 anos de practica privada como psiquiatra y psicofarmacologo
- Seccion de representaciones y dignidades: Past Presidente de la Asociacion Ecuatoriana de Psiquiatria; Past Presidente de la Sociedad Ecuatoriana de Psiquiatria Biologica; Past Secretario Tesorero de la Federacion Latinoamericana de Psiquiatria Biologica
- Seccion de docencia: Profesor invitado de Psicofarmacologia en la Escuela de Postgrado de Psiquiatria de la Universidad Central del Ecuador
- Seccion de membresias: World Psychiatric Association (WPA); World Federation of Societies of Biological Psychiatry (WFSBP); American Academy of Sleep Disorders; sociedades de psiquiatria biologica de Argentina; Peru y Uruguay
- Seccion de publicaciones: Manual Latinoamericano para la Enfermedad Depresiva; Enfermedad de Alzheimer (Cangrejal Editores); multiples articulos cientificos
- Seccion de conferencias: conferencista nacional e internacional e invitado a advisory boards internacionales
- Seccion de contacto en estado placeholder hasta que el Dr. entregue telefono; direccion de consultorio y correo
- Estrategia y ejecucion SEO tecnica y de contenido: metadatos; datos estructurados schema.org Physician y MedicalBusiness; sitemap; robots.txt; rendimiento y accesibilidad
- Estrategia y ejecucion GEO: contenido en prosa citable; preguntas frecuentes; entidad medica bien definida y consistente para que los asistentes de IA puedan atribuir y citar al Dr.
- Despliegue del sitio a un hosting estatico

### Scope (out)
- Sistema de agendamiento o reserva de citas en linea
- Telemedicina; videoconsulta o chat con pacientes
- Historia clinica; almacenamiento o procesamiento de datos de salud de pacientes
- Blog con publicacion continua o CMS administrable por el Dr.
- Backend propio y base de datos: el sitio es estatico
- Pasarela de pagos
- Sitio multi-idioma en la primera version: se publica en espanol
- Publicar datos de contacto inventados o no confirmados por el Dr.

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
- assets_required: none
- tier: MEDIO
- perfil_proyecto: [object Object]

## Testing conventions
Use the testing tool that fits this stack — the project standard is to keep a fast unit suite runnable via the project's default test command, and to write a failing test before any new behavior lands. Tests live next to the code they exercise (or under a top-level tests/ tree, whichever already exists in this repo); follow the local convention rather than introducing a new one.

## Linting and formatting
Run the project's linter and formatter before every commit. If the repo ships a config (e.g., .eslintrc, ruff.toml, .prettierrc, gofmt defaults), defer to it without arguing; if no config exists yet, use the ecosystem-standard tool and add a minimal config rather than reformatting the whole tree in a drive-by change.

## Type-specific guidance
- Treat the browser and the backend as separate trust boundaries — never assume client-supplied data is well-formed at HTTP entry points.
- Reach for end-to-end tests sparingly; cover routing and frontend state-transition logic with focused integration tests at the boundary.
- Sessions and auth tokens are sensitive — never log them, and isolate any HTTP middleware that touches them behind a small, reviewable surface.
- Performance budgets matter: measure both server latency and browser time-to-interactive when changing data-fetch patterns.
