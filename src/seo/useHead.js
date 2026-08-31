import { watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { DEFAULT_LOCALE } from '@/site.config.js';
import { buildHead } from './meta.js';
import { headTags } from './tags.js';

const MANAGED_ATTR = 'data-head';

/**
 * Mantiene el <head> del documento sincronizado con la ruta activa durante la
 * navegacion cliente. El HTML inicial ya viene con estos mismos tags desde el
 * prerender; aqui solo se reemplazan al cambiar de pagina o de idioma.
 */
export function useHead() {
  if (typeof document === 'undefined') return;

  const route = useRoute();

  watchEffect(() => {
    const page = route.meta.page || 'home';
    const locale = route.meta.locale || DEFAULT_LOCALE;
    const head = buildHead(page, locale);

    document.title = head.title;
    document.documentElement.setAttribute('lang', head.lang);

    for (const node of document.head.querySelectorAll('[' + MANAGED_ATTR + ']')) {
      node.remove();
    }

    for (const { tag, attrs, children } of headTags(head)) {
      const element = document.createElement(tag);
      for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
      if (children !== undefined) element.textContent = children;
      element.setAttribute(MANAGED_ATTR, '');
      document.head.appendChild(element);
    }
  });
}
