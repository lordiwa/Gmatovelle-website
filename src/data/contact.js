/**
 * Datos de contacto del Dr. Matovelle.
 *
 * FUENTE UNICA. Solo puede contener datos confirmados explicitamente por el
 * cliente. A la fecha el unico dato confirmado es el telefono.
 *
 * PENDIENTES (no inventar, dejar en null hasta confirmacion del Dr.):
 *   - email
 *   - direccion del consultorio
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
   * un digito. Cuando el Dr. confirme el numero completo, basta con poner aqui
   * el string internacional (ej. '5939XXXXXXXX') y el boton aparece solo.
   */
  whatsapp: null,

  email: null,
  address: null,
  openingHours: null,
};

/** URL de wa.me, o null si el numero de WhatsApp aun no esta confirmado. */
export function whatsappUrl() {
  return contact.whatsapp ? 'https://wa.me/' + contact.whatsapp : null;
}
