<script setup>
import { useI18n } from '@/i18n/index.js';
import SectionHeading from '@/components/SectionHeading.vue';
import FaqList from '@/components/FaqList.vue';

const { t } = useI18n();
</script>

<template>
  <div>
    <section id="preguntas" class="section section--plain">
      <div class="shell">
        <SectionHeading as="h1" :title="t.faq.heading" :lead="t.faq.lead" />
        <FaqList :items="t.faq.items" />
      </div>
    </section>
  </div>
</template>
