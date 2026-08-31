<script setup>
import { useI18n } from '@/i18n/index.js';
import SectionHeading from '@/components/SectionHeading.vue';
import ContactPanel from '@/components/ContactPanel.vue';
import FaqList from '@/components/FaqList.vue';
import { computed } from 'vue';

const { t } = useI18n();

/** En contacto solo se repiten las preguntas que resuelven "como agendar". */
const bookingFaq = computed(() => t.value.faq.items.slice(1, 3));
</script>

<template>
  <div>
    <section class="section section--plain">
      <div class="shell">
        <SectionHeading index="01" :title="t.contact.heading" :lead="t.contact.lead" />
        <ContactPanel />
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <SectionHeading index="02" :title="t.faq.heading" />
        <FaqList :items="bookingFaq" />
      </div>
    </section>
  </div>
</template>
