<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { LOCALES, DEFAULT_LOCALE } from '@/site.config.js';
import { PAGES, pathFor } from '@/router/routes.js';
import { useI18n } from '@/i18n/index.js';

const route = useRoute();
const { locale, t } = useI18n();

/**
 * El toggle navega a la URL equivalente en el otro idioma en lugar de cambiar
 * un estado en memoria: asi cada version tiene su propia URL indexable y el
 * usuario puede compartir o guardar la pagina en el idioma que esta leyendo.
 */
const options = computed(() => {
  const page = PAGES.some((p) => p.name === route.meta.page) ? route.meta.page : 'home';
  return LOCALES.map((code) => ({
    code,
    label: code.toUpperCase(),
    to: pathFor(page, code),
    active: code === (route.meta.locale || DEFAULT_LOCALE),
  }));
});
</script>

<template>
  <div class="lang-toggle" role="group" :aria-label="t.nav.languageGroupLabel">
    <RouterLink
      v-for="option in options"
      :key="option.code"
      class="lang-toggle__option"
      :class="{ 'is-active': option.active }"
      :to="option.to"
      :hreflang="option.code"
      :aria-current="option.active ? 'true' : undefined"
      >{{ option.label }}</RouterLink
    >
  </div>
</template>
