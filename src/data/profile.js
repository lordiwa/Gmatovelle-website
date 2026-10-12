/**
 * Datos canonicos del perfil del Dr. Gonzalo Patricio Matovelle Mediavilla.
 *
 * Todo lo que hay aqui proviene literalmente de su CV (ver PROJECT.md). No se
 * infiere, no se infla y no se agrega ninguna credencial que el CV no respalde.
 * Este modulo alimenta el JSON-LD y las partes no traducibles de la interfaz
 * (nombres propios de instituciones, titulos de publicaciones, siglas).
 */
/** Rutas y dimensiones de una fotografia de public/images/ en sus cuatro archivos. */
function photo(base, width, height, smallWidth) {
  const dir = '/images/';
  return {
    src: dir + base + '.jpg',
    webp: dir + base + '.webp',
    small: dir + base + '-' + smallWidth + '.jpg',
    smallWebp: dir + base + '-' + smallWidth + '.webp',
    width,
    height,
    smallWidth,
  };
}

export const profile = {
  honorificPrefix: 'Dr.',
  givenName: 'Gonzalo Patricio',
  familyName: 'Matovelle Mediavilla',
  fullName: 'Gonzalo Patricio Matovelle Mediavilla',
  displayName: 'Dr. Gonzalo Matovelle',

  yearsOfExperience: 40,

  city: 'Quito',
  region: 'Pichincha',
  country: 'Ecuador',
  countryCode: 'EC',

  /**
   * Organizaciones en las que ha ejercido una dignidad o representacion. El
   * cargo concreto ("Past Presidente", "Vocal Cientifico") es texto traducible
   * y vive en src/i18n/{es,en}.js; aqui solo consta el nombre propio de la
   * institucion, que no se traduce.
   */
  appointments: [
    'Asociación Ecuatoriana de Psiquiatría',
    'Sociedad Ecuatoriana de Psiquiatría Biológica',
    'Federación Latinoamericana de Psiquiatría Biológica',
    'Hellenic Psychiatric Congress',
  ],

  /**
   * Sociedades cientificas de las que es miembro. Alimenta memberOf del nodo
   * Physician, por lo que cada entrada es el nombre limpio de la organizacion:
   * el matiz del vinculo ("miembro correspondiente extranjero", "miembro y
   * Past Presidente") se redacta en el copy de credenciales de cada idioma.
   */
  memberships: [
    'World Psychiatric Association (WPA)',
    'World Federation of Societies of Biological Psychiatry (WFSBP)',
    'American Academy of Sleep Disorders',
    'Asociación Ecuatoriana de Psiquiatría',
    'Sociedad Ecuatoriana de Psiquiatría Biológica',
    'Sociedad Argentina de Psiquiatría Biológica',
    'Sociedad Peruana de Psiquiatría Biológica',
    'Sociedad Uruguaya de Psiquiatría Biológica',
    'Sociedad Peruana de Obstetricia y Ginecología',
    'Sociedad Ecuatoriana de Escritores Médicos',
  ],

  publications: [
    { title: 'Manual Latinoamericano para la Enfermedad Depresiva', publisher: null },
    { title: 'Enfermedad de Alzheimer', publisher: 'Cangrejal Editores L.A.' },
  ],

  university: 'Universidad Central del Ecuador',

  /**
   * Retrato profesional del Dr., servido desde public/ (ver
   * ProfilePortrait.vue). Se declara aqui para que la interfaz y el nodo
   * Physician de schema.org apunten al mismo archivo sin duplicar la ruta.
   * Es el JPEG de photos.retrato: la sesion fotografica de octubre de 2026,
   * sentado en su escritorio a contraluz de la ventana.
   */
  portraitPath: '/images/dr-matovelle-retrato.jpg',
  portraitWidth: 1200,
  portraitHeight: 1500,

  /** Imagen de Open Graph (1200x630), de la misma sesion. */
  ogImagePath: '/images/dr-matovelle-og.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,

  /**
   * Fotografias profesionales del Dr. en su consultorio (sesion de octubre de
   * 2026), derivadas de los originales de pics/ por scripts del proyecto y
   * servidas desde public/images/ en JPEG (src) y WebP (<source>), cada una
   * con una version chica para el srcset. Los textos alternativos y los pies
   * de foto viven en src/i18n/{es,en}.js bajo `photos`.
   */
  photos: {
    retrato: photo('dr-matovelle-retrato', 1200, 1500, 800),
    diplomas: photo('dr-matovelle-diplomas', 1400, 934, 800),
    consultorio: photo('dr-matovelle-consultorio', 1000, 1250, 700),
    paredAzul: photo('dr-matovelle-pared-azul', 1600, 1000, 900),
    balcon: photo('dr-matovelle-balcon', 1000, 1333, 700),
  },

  /**
   * Posicionamiento y areas de experiencia declarados por el cliente. A
   * diferencia del resto de este modulo, NO provienen del CV: son la forma en
   * que el Dr. quiere presentarse (medico neuropsiquiatra, con el manejo y
   * control de la medicacion como eje) y las unicas cinco condiciones que el
   * sitio puede nombrar como experiencia destacada. El cliente corrigio las dos
   * cosas el 2026-09-01: fijo la autodescripcion en medico neuropsiquiatra y
   * amplio la lista de tres a cinco condiciones (agrego el trastorno
   * obsesivo-compulsivo y el autismo). Claves en ingles neutro a proposito:
   * cada idioma redacta su propio copy en src/i18n/{es,en}.js y en
   * src/seo/meta.js a partir de estas mismas claves.
   *
   * (La autodescripcion anterior, mas amplia que la de neuropsiquiatra, quedo
   * retirada por pedido expreso del cliente y no debe volver: hay un test que
   * barre todo src/ para impedirlo.)
   */
  declaredFocus: 'medication_management',
  declaredConditions: [
    'anxiety',
    'depression',
    'bipolar_disorder',
    'obsessive_compulsive_disorder',
    'autism',
  ],

  /**
   * Perfiles externos verificables del Dr. (sameAs de schema.org).
   *
   * Vacio a proposito: sin perfiles confirmados no se publica ninguno. Cuando
   * existan (LinkedIn, Doctoralia, ficha institucional), agregarlos aqui mejora
   * de forma directa la desambiguacion de la entidad para buscadores y para los
   * asistentes de IA.
   */
  sameAs: [],
};
