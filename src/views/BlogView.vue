<script setup>
import { pathFor } from '@/router/routes.js';
import { useI18n } from '@/i18n/index.js';
import SectionHeading from '@/components/SectionHeading.vue';

const { locale, t } = useI18n();

/**
 * La seccion existe vacia a proposito: la ruta, el titulo, los metadatos y la
 * entrada en el sitemap ya estan publicados para que los articulos SEO/GEO del
 * Dr. se puedan sumar despues sin volver a tocar la arquitectura del sitio.
 * Cuando existan articulos, este estado vacio se sustituye por su listado.
 */
</script>

<template>
  <div>
    <section class="section section--plain">
      <div class="shell">
        <SectionHeading index="01" :title="t.blog.heading" :lead="t.blog.lead" />

        <div class="empty-state">
          <span class="empty-state__badge">{{ t.blog.comingSoonTitle }}</span>
          <h3 class="empty-state__title">{{ t.blog.heading }}</h3>
          <p class="empty-state__body">{{ t.blog.comingSoonBody }}</p>
          <div class="empty-state__actions">
            <RouterLink class="btn btn--primary" :to="pathFor('home', locale)">{{
              t.blog.backHome
            }}</RouterLink>
            <RouterLink class="btn btn--ghost" :to="pathFor('contact', locale)">{{
              t.nav.contact
            }}</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
