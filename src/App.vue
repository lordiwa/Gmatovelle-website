<script setup>
import { useI18n } from '@/i18n/index.js';
import { useHead } from '@/seo/useHead.js';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';

const { t } = useI18n();

useHead();
</script>

<template>
  <a class="skip-link" href="#contenido">{{ t.nav.skipToContent }}</a>
  <SiteHeader />
  <main id="contenido">
    <RouterView />
  </main>
  <SiteFooter />
</template>
