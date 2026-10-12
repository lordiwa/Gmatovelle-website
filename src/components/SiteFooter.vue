<script setup>
import { computed } from 'vue';
import { pathFor } from '@/router/routes.js';
import { useI18n } from '@/i18n/index.js';
import { contact, mailtoHref, phoneDisplayHref } from '@/data/contact.js';
import SealMark from './SealMark.vue';

const { locale, t } = useI18n();

const links = computed(() => [
  { key: 'home', label: t.value.nav.home, to: pathFor('home', locale.value) },
  { key: 'profile', label: t.value.nav.profile, to: pathFor('profile', locale.value) },
  { key: 'practice', label: t.value.nav.practice, to: pathFor('practice', locale.value) },
  { key: 'faq', label: t.value.nav.faq, to: pathFor('faq', locale.value) },
  // BLOG DESACTIVADO: ver los pasos de reactivacion en src/router/routes.js.
  // { key: 'blog', label: t.value.nav.blog, to: pathFor('blog', locale.value) },
  { key: 'contact', label: t.value.nav.contact, to: pathFor('contact', locale.value) },
]);
</script>

<template>
  <footer class="site-footer">
    <div class="shell">
      <div class="site-footer__top">
        <div>
          <p class="site-footer__name">{{ t.nav.brand }}</p>
          <p class="site-footer__role">{{ t.footer.role }}</p>
        </div>

        <nav class="site-footer__links" :aria-label="t.nav.brand">
          <RouterLink v-for="link in links" :key="link.key" :to="link.to">{{
            link.label
          }}</RouterLink>
        </nav>

        <div>
          <p class="contact-panel__label">{{ t.contact.phoneLabel }}</p>
          <p class="contact-aside__value">
            <a :href="phoneDisplayHref()" rel="noopener" target="_blank">{{ contact.phone }}</a>
          </p>
          <p class="contact-panel__label">{{ t.contact.emailLabel }}</p>
          <p v-for="email in contact.emails" :key="email" class="contact-aside__value">
            <a :href="mailtoHref(email)">{{ email }}</a>
          </p>
        </div>

        <div class="site-footer__seal">
          <SealMark :text="t.seal" />
        </div>
      </div>

      <div class="site-footer__bottom">
        <p>
          {{ t.footer.madeBy }}
          <a href="https://m4to.com" rel="noopener" target="_blank">m4to.com</a>
        </p>
      </div>
    </div>
  </footer>
</template>
