/**
 * Datos de contacto del Dr. Matovelle.
 *
 * FUENTE UNICA. Solo puede contener datos confirmados explicitamente por el
 * cliente. Los valores actuales son los DEFINITIVOS entregados por el Dr.: un
 * unico numero de telefono, dos correos y la direccion completa del Centro de
 * Negocios La Esquina. Sustituyen por completo al celular y a la direccion
 * provisionales que se usaron antes: el cliente los declaro placeholders y
 * quedaron descartados, no deben reaparecer en el sitio (hay un test que lo
 * verifica sobre todo src/).
 *
 * EL CONSULTORIO TIENE UN SOLO NUMERO. El cliente pidio retirar el fijo y
 * dejar unicamente el movil 0999835666, que es el mismo numero por el que se
 * llama y por el que se escribe a WhatsApp. Ese numero vive aqui en tres
 * formatos, y los tres son el MISMO numero:
 *
 *   phone      '0999835666'      formato local ecuatoriano, el que se muestra
 *   phoneE164  '+593999835666'   formato internacional E.164, para el JSON-LD
 *                                y el href de llamada (el sitio recibe
 *                                visitantes en ingles, fuera de Ecuador)
 *   whatsapp   '593999835666'    formato que exige wa.me: solo digitos, sin +
 *
 * La conversion es la estandar de Ecuador: codigo de pais 593 + el movil sin
 * su 0 inicial, o sea 0999835666 -> 593 999835666, que se escribe
 * +593 99 983 5666 y produce https://wa.me/593999835666.
 *
 * Cualquier cambio del numero se hace aqui y en ningun otro sitio: este modulo
 * es la unica fuente de verdad y hay tests que verifican la coherencia entre
 * los tres formatos.
 *
 * PENDIENTES (no inventar, dejar en null hasta confirmacion del Dr.):
 *   - horarios de atencion
 */
export const contact = {
  /**
   * Numero unico del consultorio, en formato local (movil ecuatoriano, 10
   * digitos). Es el que se muestra en la interfaz y sirve tanto para llamar
   * como para escribir por WhatsApp.
   */
  phone: '0999835666',

  /**
   * Version E.164 del mismo numero. Se usa como telephone del JSON-LD y como
   * href de los enlaces de llamada: marcado internacional para que funcione
   * tambien desde fuera de Ecuador.
   */
  phoneE164: '+593999835666',

  /** Version para el atributo href de un enlace tel:, en E.164. */
  phoneHref: 'tel:+593999835666',

  /**
   * El mismo numero en el formato que exige wa.me: solo digitos, sin +, sin
   * espacios y sin el 0 inicial del numero local.
   */
  whatsapp: '593999835666',

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
   * Ficha oficial del consultorio en Google Maps: la entrada verificada por
   * Google, con su nombre, sus datos y sus resenas. Sustituye a la busqueda por
   * texto que se usaba antes ('Centro de Negocios La Esquina, ...'), que caia en
   * un punto generico del edificio y no en la ficha del Dr.
   *
   * El identificador estable es el CID que Google publica dentro del enlace de
   * la ficha, en el segmento data=!4m2!3m1!1s<featureId>:<cid>. Para esta ficha
   * el enlace es
   *   .../maps/place/Dr.+Gonzalo+Matovelle+Medico+Psiquiatra,...
   *   /data=!4m2!3m1!1s0x91d5910062e59cc3:0xcf9888a68bb2dc14!18m1!1e1
   * y el CID es el segundo hexadecimal, 0xcf9888a68bb2dc14, aqui en decimal.
   *
   * Se embebe por CID y no por nombre porque el CID es inmutable y apunta
   * siempre a esta ficha, mientras que una consulta de texto la resuelve Google
   * en cada carga y puede derivar a otro negocio si aparece uno con nombre
   * parecido en la misma zona.
   */
  mapCid: '14958856411200805908',

  /**
   * Nombre exacto de la ficha, tal como lo publica Google. No se usa para
   * construir el embed (eso lo hace mapCid); queda como referencia legible para
   * reencontrar la ficha si alguna vez hay que volver a resolver el CID.
   */
  mapPlaceName: 'Dr. Gonzalo Matovelle Médico Psiquiatra, Chimborazo y Av Pampite, Quito',

  openingHours: null,
};

/**
 * URL de wa.me, o null si el numero de WhatsApp aun no esta confirmado.
 *
 * Se usa wa.me y no api.whatsapp.com porque es el enlace corto oficial y
 * resuelve solo a la app en movil o a WhatsApp Web en escritorio, sin
 * parametros extra.
 */
export function whatsappUrl() {
  return contact.whatsapp ? 'https://wa.me/' + contact.whatsapp : null;
}

/** Version para el atributo href de un enlace mailto:. */
export function mailtoHref(email) {
  return 'mailto:' + email;
}

/**
 * Embed de la ficha oficial del consultorio, sin API key: el endpoint publico
 * ?cid=...&output=embed acepta el CID de una ficha de Google Maps y no exige
 * credenciales ni facturacion (la Embed API con clave es la otra via, y aqui no
 * hace falta). Google redirige este parametro a /maps/embed?pb=... resolviendo
 * la ficha del lado del servidor, asi que no dependemos de un pb opaco que
 * habria que copiar a mano y que caduca.
 */
export function mapEmbedUrl() {
  return 'https://www.google.com/maps?cid=' + contact.mapCid + '&output=embed';
}
