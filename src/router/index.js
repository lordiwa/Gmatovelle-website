import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';
import { LOCALES, DEFAULT_LOCALE } from '@/site.config.js';
import { PAGES, routeNameFor } from './routes.js';
import HomeView from '@/views/HomeView.vue';
import ContactView from '@/views/ContactView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
// BLOG DESACTIVADO: ver la nota con los pasos de reactivacion en
// src/router/routes.js. El import queda comentado a proposito para que el
// bundle no arrastre una vista inalcanzable.
// import BlogView from '@/views/BlogView.vue';

const VIEWS = {
  home: HomeView,
  contact: ContactView,
  // blog: BlogView,
};

export function buildRoutes() {
  const routes = [];
  for (const page of PAGES) {
    for (const locale of LOCALES) {
      routes.push({
        path: page.paths[locale],
        name: routeNameFor(page.name, locale),
        component: VIEWS[page.name],
        meta: { locale, page: page.name },
      });
    }
  }
  routes.push({
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { locale: DEFAULT_LOCALE, page: 'notFound' },
  });
  return routes;
}

export function createAppRouter({ ssr = false } = {}) {
  return createRouter({
    history: ssr ? createMemoryHistory() : createWebHistory(),
    routes: buildRoutes(),
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition;
      if (to.hash) return { el: to.hash, behavior: 'smooth', top: 96 };
      return { top: 0 };
    },
  });
}
