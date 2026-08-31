/**
 * Datos de contacto del Dr. Matovelle.
 *
 * FUENTE UNICA. Solo puede contener datos confirmados explicitamente por el
 * cliente. Los valores actuales son los DEFINITIVOS entregados por el Dr.:
 * telefono fijo del consultorio, dos correos y la direccion completa del
 * Centro de Negocios La Esquina. Sustituyen por completo al celular y a la
 * direccion provisionales que se usaron antes: el cliente los declaro
 * placeholders y quedaron descartados, no deben reaparecer en el sitio (hay un
 * test que lo verifica sobre todo src/).
 *
 * PENDIENTES (no inventar, dejar en null hasta confirmacion del Dr.):
 *   - horarios de atencion
 *   - numero de WhatsApp en formato internacional (ver nota en whatsapp)
 */
export const contact = {
  /**
   * Telefono fijo del consultorio (Quito, 8 digitos con el codigo provincial
   * 02). Es el canal principal de contacto confirmado por el cliente.
   */
  phone: '022892716',

  /** Version para el atributo href de un enlace tel:. */
  phoneHref: 'tel:022892716',

  /**
   * WhatsApp deshabilitado a proposito.
   *
   * wa.me exige un numero movil en formato internacional completo
   * (593 + celular sin el 0 inicial) y el dato confirmado es un fijo, que no
   * sirve para WhatsApp. Cuando el Dr. confirme un celular, el boton se activa
   * solo con editar este campo: basta con poner aqui el string internacional
   * (ej. '5939XXXXXXXX'), nada mas.
   */
  whatsapp: null,

  /**
   * Correos confirmados del consultorio, en orden de preferencia. El primero
   * es el que se declara como email principal en el JSON-LD.
   */
  emails: ['info@gmail.com', 'Gonzalo.matovelle@gmail.com'],

  /**
   * Direccion confirmada del consultorio, completa tal como la entrego el
   * cliente. La ciudad y el pais viven en profile.js (city/country) y se
   * combinan con este valor para el copy de contacto y para streetAddress en
   * el JSON-LD Physician.
   */
  // prettier-ignore -- una sola linea a proposito: hay un test que exige que el
  // literal completo de la direccion aparezca en este archivo y en ninguno mas.
  address: 'Centro de Negocios del centro comercial La Esquina, calle Chimborazo y Av Pampite, torre 1, piso 2 oficina 3A',

  /**
   * Consulta que se envia a Google Maps para el mapa embebido. Es una version
   * corta de la direccion: el buscador de Maps resuelve mejor el punto con el
   * nombre del centro de negocios y la interseccion que con el detalle de
   * torre, piso y oficina, que no aportan geolocalizacion.
   */
  mapQuery: 'Centro de Negocios La Esquina, Chimborazo y Av Pampite, Quito, Ecuador',

  openingHours: null,
};

/** URL de wa.me, o null si el numero de WhatsApp aun no esta confirmado. */
export function whatsappUrl() {
  return contact.whatsapp ? 'https://wa.me/' + contact.whatsapp : null;
}

/** Version para el atributo href de un enlace mailto:. */
export function mailtoHref(email) {
  return 'mailto:' + email;
}

/**
 * Embed de Google Maps sin API key: el endpoint publico ?q=...&output=embed
 * acepta una direccion en texto y no exige credenciales ni facturacion.
 */
export function mapEmbedUrl() {
  return 'https://www.google.com/maps?q=' + encodeURIComponent(contact.mapQuery) + '&output=embed';
}
