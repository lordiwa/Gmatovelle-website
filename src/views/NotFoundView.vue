<script setup>
import { pathFor } from '@/router/routes.js';
import { useI18n } from '@/i18n/index.js';

const { locale, t } = useI18n();
</script>

<template>
  <section class="section section--plain">
    <div class="shell">
      <div class="empty-state">
        <span class="empty-state__badge">404</span>
        <h1 class="empty-state__title">{{ t.notFound.heading }}</h1>
        <p class="empty-state__body">{{ t.notFound.body }}</p>
        <div class="empty-state__actions">
          <RouterLink class="btn btn--primary" :to="pathFor('home', locale)">{{
            t.notFound.backHome
          }}</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
