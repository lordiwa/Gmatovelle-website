<script setup>
import { computed } from 'vue';
import { useI18n } from '@/i18n/index.js';
import { profile } from '@/data/profile.js';
import SectionHeading from '@/components/SectionHeading.vue';
import ContactPanel from '@/components/ContactPanel.vue';
import FramedPhoto from '@/components/FramedPhoto.vue';
import FaqList from '@/components/FaqList.vue';

const { t } = useI18n();

/** En contacto solo se repiten las preguntas que resuelven "como agendar". */
const bookingFaq = computed(() => t.value.faq.items.slice(1, 3));
</script>

<template>
  <div>
    <section class="section section--plain">
      <div class="shell">
        <SectionHeading :title="t.contact.heading" :lead="t.contact.lead" />
        <ContactPanel />
      </div>
    </section>

    <!-- Las dos preguntas de agenda y, cerrando la pagina, el balcon del
         edificio del consultorio colgado solo en la pared. -->
    <section class="section">
      <div class="shell">
        <SectionHeading :title="t.faq.heading" />
        <FaqList :items="bookingFaq" />
        <div class="contact-close">
          <FramedPhoto
            :photo="profile.photos.balcon"
            :alt="t.photos.balcon"
            :caption="t.photos.balconCaption"
            sizes="(max-width: 900px) 92vw, 440px"
          />
        </div>
      </div>
    </section>
  </div>
</template>
