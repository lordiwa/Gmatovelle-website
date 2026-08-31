/**
 * Datos de contacto del Dr. Matovelle.
 *
 * FUENTE UNICA. Solo puede contener datos confirmados explicitamente por el
 * cliente. A la fecha estan confirmados el telefono y la direccion del
 * consultorio.
 *
 * PENDIENTES (no inventar, dejar en null hasta confirmacion del Dr.):
 *   - email
 *   - horarios de atencion
 *   - numero de WhatsApp en formato internacional (ver nota en whatsapp)
 */
export const contact = {
  /** Telefono confirmado, tal como fue entregado por el cliente. */
  phone: '099835666',

  /** Version para el atributo href de un enlace tel:. */
  phoneHref: 'tel:099835666',

  /**
   * WhatsApp deshabilitado a proposito.
   *
   * wa.me exige el numero en formato internacional completo (593 + celular sin
   * el 0 inicial). El numero entregado tiene 9 digitos y los celulares
   * ecuatorianos tienen 10 (09 + 8 digitos), asi que completarlo seria inventar
   * un digito. Cuando el Dr. confirme el numero completo, el boton de
   * WhatsApp se activa solo con editar este campo: basta con poner aqui el
   * string internacional (ej. '5939XXXXXXXX'), nada mas.
   */
  whatsapp: null,

  email: null,

  /**
   * Direccion confirmada del consultorio (calle e interseccion, tal como la
   * entrego el cliente). La ciudad y el pais viven en profile.js
   * (city/country) y se combinan con este valor para el copy de contacto y
   * para streetAddress en el JSON-LD Physician.
   */
  address: 'Av. Eloy Alfaro y República',

  openingHours: null,
};

/** URL de wa.me, o null si el numero de WhatsApp aun no esta confirmado. */
export function whatsappUrl() {
  return contact.whatsapp ? 'https://wa.me/' + contact.whatsapp : null;
}
