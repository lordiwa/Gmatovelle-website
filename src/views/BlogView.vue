<script setup>
import { pathFor } from '@/router/routes.js';
import { useI18n } from '@/i18n/index.js';
import SectionHeading from '@/components/SectionHeading.vue';

const { locale, t } = useI18n();

/**
 * VISTA DESCONECTADA A PROPOSITO (peticion del cliente, 2026-08-31).
 *
 * Este archivo ya no lo monta ninguna ruta: la seccion de articulos se retiro
 * del sitio hasta que el Dr. tenga articulos reales, porque una pagina vacia
 * indexada resta mas de lo que suma. Se conserva completo, y no borrado, para
 * que reactivar la seccion sea descomentar y no reescribir.
 *
 * Los pasos exactos de reactivacion estan en src/router/routes.js, junto a la
 * entrada comentada de PAGES.
 *
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
