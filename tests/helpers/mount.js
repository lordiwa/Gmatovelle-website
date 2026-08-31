import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { buildRoutes } from '@/router/index.js';

/**
 * Monta un componente con un router real en memoria, ya posicionado en la ruta
 * pedida. Se usa un router real y no un stub porque en este sitio el idioma se
 * deriva de la ruta: sin router no hay idioma que probar.
 */
export async function mountAt(component, path, options = {}) {
  const router = createRouter({ history: createMemoryHistory(), routes: buildRoutes() });
  await router.push(path);
  await router.isReady();

  const wrapper = mount(component, {
    ...options,
    global: { plugins: [router], ...(options.global || {}) },
  });

  return { wrapper, router };
}
