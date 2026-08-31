import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { DEFAULT_LOCALE, LOCALES } from '@/site.config.js';
import es from './es.js';
import en from './en.js';

export const messages = { es, en };

/** Devuelve el diccionario completo de un idioma. */
export function messagesFor(locale) {
  return messages[locale] || messages[DEFAULT_LOCALE];
}

/** El otro idioma disponible (el sitio es bilingue ES/EN). */
export function otherLocale(locale) {
  return LOCALES.find((l) => l !== locale) || DEFAULT_LOCALE;
}

/**
 * Composable de traduccion. El idioma NO es un estado global mutable: se deriva
 * de la ruta activa (cada pagina existe en una URL por idioma), de modo que el
 * HTML servido, el <html lang>, el canonical y el contenido siempre coinciden.
 */
export function useI18n() {
  const route = useRoute();
  const locale = computed(() => route.meta.locale || DEFAULT_LOCALE);
  const t = computed(() => messagesFor(locale.value));
  return { locale, t };
}
