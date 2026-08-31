/**
 * Datos canonicos del perfil del Dr. Gonzalo Patricio Matovelle Mediavilla.
 *
 * Todo lo que hay aqui proviene literalmente de su CV (ver PROJECT.md). No se
 * infiere, no se infla y no se agrega ninguna credencial que el CV no respalde.
 * Este modulo alimenta el JSON-LD y las partes no traducibles de la interfaz
 * (nombres propios de instituciones, titulos de publicaciones, siglas).
 */
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

  /** Dignidades gremiales ejercidas (todas "past", tal como consta en el CV). */
  appointments: [
    'Asociación Ecuatoriana de Psiquiatría',
    'Sociedad Ecuatoriana de Psiquiatría Biológica',
    'Federación Latinoamericana de Psiquiatría Biológica',
    'Veterans Evaluation System (VES), Estados Unidos',
  ],

  /** Sociedades cientificas de las que es miembro. */
  memberships: [
    'World Psychiatric Association (WPA)',
    'World Federation of Societies of Biological Psychiatry (WFSBP)',
    'American Academy of Sleep Disorders',
    'Sociedad Argentina de Psiquiatría Biológica',
    'Sociedad Peruana de Psiquiatría Biológica',
    'Sociedad Uruguaya de Psiquiatría Biológica',
  ],

  publications: [
    { title: 'Manual Latinoamericano para la Enfermedad Depresiva', publisher: null },
    { title: 'Enfermedad de Alzheimer', publisher: 'Cangrejal Editores' },
  ],

  university: 'Universidad Central del Ecuador',

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
