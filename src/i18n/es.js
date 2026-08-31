import { profile } from '@/data/profile.js';
import { contact } from '@/data/contact.js';

export default {
  htmlLang: 'es-EC',

  meta: {
    home: {
      title: 'Dr. Gonzalo Matovelle · Médico Psiquiatra en Quito, Ecuador',
      description:
        'El Dr. Gonzalo Matovelle es médico psiquiatra y psicofarmacólogo con 40 años de práctica privada en Quito, Ecuador. Past Presidente de la Asociación Ecuatoriana de Psiquiatría. Consultas al ' +
        contact.phone + '.',
    },
    contact: {
      title: 'Contacto · Dr. Gonzalo Matovelle, Psiquiatra en Quito',
      description:
        'Contacte al Dr. Gonzalo Matovelle, médico psiquiatra en Quito, Ecuador. Las consultas se coordinan por teléfono al ' +
        contact.phone + '.',
    },
    blog: {
      title: 'Artículos · Dr. Gonzalo Matovelle, Psiquiatra en Quito',
      description:
        'Espacio de artículos de divulgación en psiquiatría y psicofarmacología del Dr. Gonzalo Matovelle, médico psiquiatra en Quito, Ecuador. Próximamente.',
    },
    notFound: {
      title: 'Página no encontrada · Dr. Gonzalo Matovelle',
      description: 'La página solicitada no existe en el sitio del Dr. Gonzalo Matovelle.',
    },
  },

  nav: {
    brand: 'Dr. Gonzalo Matovelle',
    brandRole: 'Médico Psiquiatra',
    home: 'Inicio',
    contact: 'Contacto',
    blog: 'Artículos',
    skipToContent: 'Saltar al contenido principal',
    languageGroupLabel: 'Idioma del sitio',
    switchLanguage: 'Ver este sitio en inglés',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
  },

  hero: {
    eyebrow: 'Médico Psiquiatra · Quito, Ecuador',
    name: 'Dr. Gonzalo Matovelle',
    credentialLine: 'Doctor en Medicina y Cirugía · Especialista en Psiquiatría',
    summary:
      'El Dr. Gonzalo Patricio Matovelle Mediavilla es médico psiquiatra y psicofarmacólogo con 40 años de práctica privada en Quito, Ecuador. Su consulta se centra en el manejo de la medicación neuropsiquiátrica y en la psicoeducación del paciente y de su familia.',
    primaryCta: 'Llamar al consultorio',
    secondaryCta: 'Conocer la trayectoria',
    portraitAlt: 'Retrato del Dr. Gonzalo Matovelle (fotografía pendiente)',
    portraitCaption: 'Fotografía profesional en preparación',
    facts: [
      { value: '40 años', label: 'de práctica privada en psiquiatría y psicofarmacología' },
      { value: 'Quito', label: 'consulta privada en Ecuador' },
      { value: 'WPA · WFSBP', label: 'miembro de sociedades científicas internacionales' },
    ],
  },

  about: {
    heading: 'Perfil profesional',
    lead: 'Cuarenta años de ejercicio clínico continuo en psiquiatría, con una trayectoria gremial, académica y pericial verificable.',
    paragraphs: [
      'El Dr. Gonzalo Patricio Matovelle Mediavilla es Doctor en Medicina y Cirugía y Especialista en Psiquiatría. Ejerce en consulta privada en Quito (Ecuador) como médico psiquiatra experto en el manejo de medicación neuropsiquiátrica y en psicoeducación.',
      'A lo largo de cuarenta años de práctica privada como psiquiatra y psicofarmacólogo ha ocupado las principales dignidades gremiales de la especialidad en el país y en la región, ha sido profesor invitado de posgrado y es perito psiquiatra certificado de la Función Judicial de Pichincha.',
      'Es además Psiquiatra para Ecuador del Veterans Evaluation System (VES) de los Estados Unidos, donde realiza evaluaciones psiquiátricas de veteranos, y ha sido conferencista nacional e internacional e invitado a advisory boards internacionales.',
    ],
  },

  practice: {
    heading: 'Enfoque de la consulta',
    lead: 'La consulta del Dr. Matovelle se apoya en dos pilares descritos en su ejercicio profesional, y se extiende al ámbito pericial y evaluativo.',
    items: [
      {
        title: 'Medicación neuropsiquiátrica',
        body: 'Manejo experto de psicofármacos, con cuatro décadas de experiencia clínica como psicofarmacólogo.',
      },
      {
        title: 'Psicoeducación',
        body: 'Trabajo explicativo con el paciente y su familia para que comprendan el diagnóstico, el tratamiento y su evolución.',
      },
      {
        title: 'Peritaje psiquiátrico',
        body: 'Perito Psiquiatra certificado de la Función Judicial de Pichincha.',
      },
      {
        title: 'Evaluación de veteranos (VES)',
        body: 'Psiquiatra para Ecuador del Veterans Evaluation System (VES) de los Estados Unidos.',
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
        title: 'Representaciones y dignidades',
        items: [
          'Past Presidente de la Asociación Ecuatoriana de Psiquiatría',
          'Past Presidente de la Sociedad Ecuatoriana de Psiquiatría Biológica',
          'Past Secretario Tesorero de la Federación Latinoamericana de Psiquiatría Biológica',
          'Psiquiatra para Ecuador del Veterans Evaluation System (VES), Estados Unidos',
        ],
      },
      {
        title: 'Docencia y peritaje',
        items: [
          'Profesor invitado de Psicofarmacología en la Escuela de Postgrado de Psiquiatría de la Universidad Central del Ecuador',
          'Perito Psiquiatra certificado de la Función Judicial de Pichincha',
        ],
      },
      {
        title: 'Membresías científicas',
        items: [
          'World Psychiatric Association (WPA)',
          'World Federation of Societies of Biological Psychiatry (WFSBP)',
          'American Academy of Sleep Disorders',
          'Sociedad Argentina de Psiquiatría Biológica',
          'Sociedad Peruana de Psiquiatría Biológica',
          'Sociedad Uruguaya de Psiquiatría Biológica',
        ],
      },
      {
        title: 'Conferencias',
        items: [
          'Conferencista nacional e internacional',
          'Invitado a advisory boards internacionales',
        ],
      },
    ],
  },

  publications: {
    heading: 'Publicaciones',
    lead: 'Obras y artículos científicos de los que el Dr. Matovelle es autor o coautor.',
    items: [
      { title: 'Manual Latinoamericano para la Enfermedad Depresiva', note: null },
      { title: 'Enfermedad de Alzheimer', note: 'Cangrejal Editores' },
    ],
    articlesNote: 'Autor de múltiples artículos científicos.',
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
          'Atiende en su consulta privada en Quito, provincia de Pichincha, Ecuador. La dirección exacta del consultorio se coordina al agendar la cita por teléfono.',
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
        question: '¿El Dr. Matovelle realiza peritajes psiquiátricos?',
        answer:
          'Sí. Es Perito Psiquiatra certificado de la Función Judicial de Pichincha y es además Psiquiatra para Ecuador del Veterans Evaluation System (VES) de los Estados Unidos, donde evalúa a veteranos.',
      },
      {
        question: '¿El Dr. Matovelle ha publicado libros o artículos?',
        answer:
          'Sí. Es autor del Manual Latinoamericano para la Enfermedad Depresiva y del libro Enfermedad de Alzheimer, publicado por Cangrejal Editores, además de múltiples artículos científicos.',
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
    callCta: 'Llamar al ' + contact.phone,
    whatsappCta: 'Escribir por WhatsApp',
    noBookingNote:
      'No hay formulario ni reserva en línea: la cita se agenda hablando directamente con el consultorio.',
    locationLabel: 'Ubicación',
    locationValue: 'Consulta privada en ' + profile.city + ', ' + profile.country + '.',
    emergencyTitle: 'En caso de emergencia',
    emergencyBody:
      'Si usted o alguien cercano está en riesgo inmediato, acuda al servicio de emergencias más cercano o llame al 911. Este sitio no atiende urgencias.',
  },

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
    role: 'Médico Psiquiatra · ' + profile.city + ', ' + profile.country,
    disclaimer:
      'Este sitio tiene fines informativos y no sustituye una consulta médica presencial ni constituye un diagnóstico.',
    rights: 'Todos los derechos reservados.',
  },
};
