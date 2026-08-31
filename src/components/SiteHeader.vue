<script setup>
import { computed } from 'vue';
import { pathFor } from '@/router/routes.js';
import { useI18n } from '@/i18n/index.js';
import LanguageToggle from './LanguageToggle.vue';

const { locale, t } = useI18n();

const links = computed(() => [
  { key: 'home', label: t.value.nav.home, to: pathFor('home', locale.value) },
  // BLOG DESACTIVADO: ver los pasos de reactivacion en src/router/routes.js.
  // { key: 'blog', label: t.value.nav.blog, to: pathFor('blog', locale.value) },
  { key: 'contact', label: t.value.nav.contact, to: pathFor('contact', locale.value) },
]);
</script>

<template>
  <header class="site-header">
    <div class="shell site-header__inner">
      <RouterLink class="brand" :to="pathFor('home', locale)">
        <span class="brand__name">{{ t.nav.brand }}</span>
        <span class="brand__role">{{ t.nav.brandRole }}</span>
      </RouterLink>

      <nav class="site-nav" :aria-label="t.nav.brand">
        <RouterLink
          v-for="link in links"
          :key="link.key"
          class="site-nav__link"
          active-class="is-active"
          :to="link.to"
          >{{ link.label }}</RouterLink
        >
        <LanguageToggle />
      </nav>
    </div>
  </header>
</template>
