import { profile } from '@/data/profile.js';
import { contact } from '@/data/contact.js';

export default {
  htmlLang: 'es-EC',

  meta: {
    home: {
      title: 'Dr. Gonzalo Matovelle · Médico Neuropsiquiatra en Quito, Ecuador',
      description:
        'El Dr. Gonzalo Matovelle es médico neuropsiquiatra, con 40 años de práctica privada en Quito, Ecuador centrada en el manejo y control de la medicación en ansiedad, depresión, trastorno bipolar, trastorno obsesivo-compulsivo (TOC) y autismo. Past Presidente de la Asociación Ecuatoriana de Psiquiatría. Consultas al ' +
        contact.phone + '.',
    },
    contact: {
      title: 'Contacto · Dr. Gonzalo Matovelle, Médico Neuropsiquiatra en Quito',
      description:
        'Contacte al Dr. Gonzalo Matovelle, médico neuropsiquiatra en Quito, Ecuador. Las consultas se coordinan por teléfono al ' +
        contact.phone + '.',
    },
    blog: {
      title: 'Artículos · Dr. Gonzalo Matovelle, Médico Neuropsiquiatra en Quito',
      description:
        'Espacio de artículos de divulgación en psiquiatría, neuropsiquiatría y manejo de la medicación del Dr. Gonzalo Matovelle, médico neuropsiquiatra en Quito, Ecuador. Próximamente.',
    },
    notFound: {
      title: 'Página no encontrada · Dr. Gonzalo Matovelle',
      description: 'La página solicitada no existe en el sitio del Dr. Gonzalo Matovelle.',
    },
  },

  nav: {
    brand: 'Dr. Gonzalo Matovelle',
    brandRole: 'Médico Neuropsiquiatra',
    home: 'Inicio',
    contact: 'Contacto',
    blog: 'Artículos',
    skipToContent: 'Saltar al contenido principal',
    languageGroupLabel: 'Idioma del sitio',
    switchLanguage: 'Ver este sitio en inglés',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
  },

  /**
   * Hero de la portada, redisenio 1c "Navy de confianza".
   *
   * El h1 dejo de ser el nombre del Dr. y paso a ser un titular editorial
   * (decision de diseno del cliente). La senal de entidad no se pierde: el
   * nombre y la titulacion viven en `credentialLine`, que se renderiza
   * inmediatamente debajo del h1 dentro del mismo hero.
   */
  hero: {
    eyebrow: 'Quito, Ecuador · 40 años de práctica',
    headline: 'Cuarenta años cuidando la salud mental con rigor médico',
    credentialLine:
      'Dr. Gonzalo Matovelle · Doctor en Medicina y Cirugía · Especialista en Psiquiatría',
    summary:
      'El Dr. Gonzalo Patricio Matovelle Mediavilla es médico neuropsiquiatra, con 40 años de práctica privada en Quito, Ecuador. El eje de su consulta es el manejo y control experto de la medicación, con especial experiencia en ansiedad, depresión, trastorno bipolar, trastorno obsesivo-compulsivo (TOC) y autismo.',
    primaryCta: 'Llamar al consultorio',
    portraitAlt:
      'Retrato del Dr. Gonzalo Matovelle, médico neuropsiquiatra en Quito, Ecuador',
    portraitCaption: 'Dr. Gonzalo Patricio Matovelle Mediavilla · Quito, Ecuador',
    /**
     * Banda de credenciales que sustituye a la vieja fila de "facts" del hero.
     * El cliente fijo estos tres items y su orden ("40 años / Quito /
     * WPA·WFSBP"); hay un lock literal que lo verifica. No es una vitrina
     * libre: los tres estan respaldados por el CV (los cuarenta años de
     * practica y la ciudad en el perfil, las dos sociedades en las membresias
     * de `credentials`).
     */
    credentialBand: ['40 años de experiencia', 'Quito', 'WPA · WFSBP'],
  },

  about: {
    heading: 'Perfil profesional',
    lead: 'Cuarenta años de ejercicio clínico continuo en psiquiatría, con una trayectoria gremial y académica verificable.',
    paragraphs: [
      'El Dr. Gonzalo Patricio Matovelle Mediavilla es Doctor en Medicina y Cirugía y Especialista en Psiquiatría. Es médico neuropsiquiatra y ejerce en consulta privada en Quito (Ecuador), centrado en el manejo y control experto de la medicación neuropsiquiátrica, con particular experiencia en ansiedad, depresión, trastorno bipolar, trastorno obsesivo-compulsivo (TOC) y autismo.',
      'A lo largo de cuarenta años de práctica privada como psiquiatra y psicofarmacólogo ha ejercido como psiquiatra de enlace en las principales clínicas de Quito, ha ocupado las principales dignidades gremiales de la especialidad en el país y en la región, y ha sido profesor invitado de Psicofarmacología en la Escuela de Postgrado de Psiquiatría de la Universidad Central del Ecuador.',
      'Además, ha sido conferencista nacional e internacional e invitado a advisory boards internacionales.',
    ],
  },

  practice: {
    heading: 'Enfoque de la consulta',
    lead: 'El manejo y control de la medicación es el eje de la consulta del Dr. Matovelle, que se apoya además en la psicoeducación.',
    items: [
      {
        title: 'Manejo y control de la medicación',
        body: 'Eje central de la consulta: control experto de psicofármacos, con cuatro décadas de experiencia clínica como psicofarmacólogo neuropsiquiátrico.',
      },
      {
        title: 'Psicoeducación',
        body: 'Trabajo explicativo con el paciente y su familia para que comprendan el diagnóstico, el tratamiento y su evolución.',
      },
    ],
  },

  /**
   * Areas de experiencia clinica confirmadas por el cliente (ver
   * profile.declaredConditions). Son las unicas cinco que el sitio puede
   * nombrar como experiencia destacada: no agregar mas sin una nueva
   * confirmacion. El cliente amplio la lista de tres a cinco el 2026-09-01,
   * agregando el trastorno obsesivo-compulsivo y el autismo.
   */
  expertise: {
    heading: 'Áreas de experiencia',
    headline: 'Cinco condiciones, un mismo estándar de cuidado',
    lead: 'Las condiciones en las que el Dr. Matovelle concentra su experiencia clínica y el manejo de la medicación.',
    items: [
      {
        title: 'Ansiedad',
        body: 'Manejo y control experto de la medicación en cuadros de ansiedad.',
      },
      {
        title: 'Depresión',
        body: 'Manejo y control experto de la medicación en la enfermedad depresiva.',
      },
      {
        title: 'Trastorno bipolar',
        body: 'Manejo y control experto de la medicación en el trastorno bipolar.',
      },
      {
        title: 'Trastorno obsesivo-compulsivo (TOC)',
        body: 'Manejo y control experto de la medicación en el trastorno obsesivo-compulsivo.',
      },
      {
        title: 'Autismo',
        body: 'Manejo y control experto de la medicación en el autismo, centrado en los síntomas que responden al tratamiento farmacológico.',
      },
    ],
  },

  credentials: {
    heading: 'Credenciales y trayectoria',
    lead: 'Todos los datos de esta sección provienen del currículum del Dr. Matovelle.',
    groups: [
      {
        title: 'Formación y titulación',
        items: ['Doctor en Medicina y Cirugía', 'Especialista en Psiquiatría'],
      },
      {
        title: 'Ejercicio profesional',
        items: [
          'Cuarenta años de práctica privada como Médico Psiquiatra y Psicofarmacólogo',
          'Psiquiatra de enlace en las principales clínicas de Quito',
          'Médico Psiquiatra experto en el manejo de la medicación neuropsiquiátrica y en psicoeducación',
        ],
      },
      {
        title: 'Representaciones y dignidades',
        items: [
          'Past Presidente de la Asociación Ecuatoriana de Psiquiatría',
          'Past Presidente de la Sociedad Ecuatoriana de Psiquiatría Biológica',
          'Past Secretario Tesorero de la Federación Latinoamericana de Psiquiatría Biológica',
          'Vocal Científico de la Sociedad Ecuatoriana de Psiquiatría Biológica',
        ],
      },
      {
        title: 'Docencia',
        items: [
          'Profesor invitado de Psicofarmacología en la Escuela de Postgrado de Psiquiatría de la Universidad Central del Ecuador',
        ],
      },
      {
        title: 'Membresías científicas',
        items: [
          'World Psychiatric Association (WPA)',
          'World Federation of Societies of Biological Psychiatry (WFSBP)',
          'American Academy of Sleep Disorders',
          'Asociación Ecuatoriana de Psiquiatría (miembro y Past Presidente)',
          'Sociedad Ecuatoriana de Psiquiatría Biológica (miembro y Past Presidente)',
          'Sociedad Argentina de Psiquiatría Biológica (miembro correspondiente extranjero)',
          'Sociedad Peruana de Psiquiatría Biológica (miembro correspondiente)',
          'Sociedad Uruguaya de Psiquiatría Biológica (miembro correspondiente)',
          'Sociedad Peruana de Obstetricia y Ginecología (miembro correspondiente)',
          'Sociedad Ecuatoriana de Escritores Médicos',
        ],
      },
      {
        title: 'Conferencias y asesoría científica',
        items: [
          'Conferencista nacional e internacional',
          'Invitado a advisory boards internacionales',
          'International Scientific Advisor del Hellenic Psychiatric Congress (2004-2006)',
        ],
      },
    ],
  },

  publications: {
    heading: 'Publicaciones',
    lead: 'Obras y artículos científicos de los que el Dr. Matovelle es autor o coautor.',
    items: [
      { title: 'Manual Latinoamericano para la Enfermedad Depresiva', note: null },
      { title: 'Enfermedad de Alzheimer', note: 'Cangrejal Editores L.A.' },
    ],
    articlesNote: 'Autor de múltiples artículos y publicaciones científicas en psiquiatría.',
  },

  faq: {
    heading: 'Preguntas frecuentes',
    lead: 'Respuestas breves y verificables sobre el Dr. Matovelle y su consulta.',
    items: [
      {
        question: '¿Quién es el Dr. Gonzalo Matovelle?',
        answer:
          'El Dr. Gonzalo Patricio Matovelle Mediavilla es Doctor en Medicina y Cirugía y Especialista en Psiquiatría, con consulta privada en Quito, Ecuador. Es Past Presidente de la Asociación Ecuatoriana de Psiquiatría y Past Presidente de la Sociedad Ecuatoriana de Psiquiatría Biológica.',
      },
      {
        question: '¿Dónde atiende el Dr. Matovelle?',
        answer:
          'Atiende en su consulta privada en ' + contact.address + ', ' + profile.city + ', ' +
          profile.country + '.',
      },
      {
        question: '¿Cómo se agenda una consulta con el Dr. Matovelle?',
        answer:
          'Las consultas se agendan por teléfono al ' + contact.phone +
          '. El consultorio no utiliza formularios ni sistemas de reserva en línea: toda la coordinación se hace por vía telefónica.',
      },
      {
        question: '¿Cuántos años de experiencia tiene el Dr. Matovelle?',
        answer:
          'Cuarenta años de práctica privada como médico psiquiatra y psicofarmacólogo en Quito, Ecuador.',
      },
      {
        question: '¿Qué condiciones trata el Dr. Matovelle?',
        answer:
          'Su consulta se centra en el manejo y control de la medicación en ansiedad, depresión, trastorno bipolar, trastorno obsesivo-compulsivo (TOC) y autismo.',
      },
      {
        question: '¿El Dr. Matovelle ha publicado libros o artículos?',
        answer:
          'Sí. Es autor del Manual Latinoamericano para la Enfermedad Depresiva y del libro Enfermedad de Alzheimer, publicado por Cangrejal Editores L.A., además de múltiples artículos y publicaciones científicas en psiquiatría.',
      },
      {
        question: '¿Cuál es la diferencia entre un psiquiatra y un psicólogo?',
        answer:
          'El psiquiatra es un médico que se especializó en psiquiatría y, por serlo, puede diagnosticar enfermedades médicas y prescribir medicación. El psicólogo no es médico y no prescribe medicación: su trabajo es la evaluación y la psicoterapia. Ambos perfiles suelen trabajar de forma complementaria.',
      },
    ],
  },

  contact: {
    heading: 'Contacto',
    lead: 'La consulta del Dr. Matovelle se coordina por teléfono.',
    phoneLabel: 'Teléfono del consultorio',
    emailLabel: 'Correos del consultorio',
    callCta: 'Llamar al ' + contact.phone,
    callNowCta: 'Llamar ahora',
    whatsappCta: 'Escribir por WhatsApp',
    // Cadenas de la franja compacta de contacto de la portada (variante
    // "compact" de ContactPanel): etiqueta corta y nota con la ubicacion breve.
    enquiriesLabel: 'Consultas',
    compactNote:
      'La cita se agenda por teléfono, hablando directamente con el consultorio. Consulta privada en Quito, Ecuador.',
    noBookingNote:
      'No hay formulario ni reserva en línea: la cita se agenda hablando directamente con el consultorio.',
    locationLabel: 'Ubicación',
    locationValue:
      'Consulta privada en ' + contact.address + ', ' + profile.city + ', ' + profile.country + '.',
    mapTitle: 'Mapa de ubicación del consultorio del Dr. Matovelle',
    emergencyTitle: 'En caso de emergencia',
    emergencyBody:
      'Si usted o alguien cercano está en riesgo inmediato, acuda al servicio de emergencias más cercano o llame al 911. Este sitio no atiende urgencias.',
  },

  // Cadenas de la seccion de articulos. La seccion esta DESACTIVADA (ver los
  // pasos de reactivacion en src/router/routes.js); se conservan intactas para
  // que reactivarla no exija reescribir el copy ni sus metadatos.
  blog: {
    heading: 'Artículos',
    lead: 'Un espacio de divulgación en psiquiatría y psicofarmacología escrito por el Dr. Matovelle.',
    comingSoonTitle: 'Próximamente',
    comingSoonBody:
      'Los primeros artículos se publicarán aquí. Mientras tanto, puede revisar el perfil profesional del Dr. Matovelle o comunicarse con el consultorio.',
    backHome: 'Volver al inicio',
  },

  notFound: {
    heading: 'Página no encontrada',
    body: 'La página que busca no existe o cambió de dirección.',
    backHome: 'Volver al inicio',
  },

  footer: {
    role: 'Médico Neuropsiquiatra · ' + profile.city + ', ' + profile.country,
    disclaimer:
      'Este sitio tiene fines informativos y no sustituye una consulta médica presencial ni constituye un diagnóstico.',
    rights: 'Todos los derechos reservados.',
  },
};
