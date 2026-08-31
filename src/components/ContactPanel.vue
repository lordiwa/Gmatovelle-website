<script setup>
import { computed } from 'vue';
import { useI18n } from '@/i18n/index.js';
import { contact, whatsappUrl } from '@/data/contact.js';

const { t } = useI18n();

/** Null mientras el numero internacional de WhatsApp no este confirmado. */
const whatsapp = computed(() => whatsappUrl());
</script>

<template>
  <div class="contact-panel">
    <div>
      <p class="contact-panel__label">{{ t.contact.phoneLabel }}</p>
      <a class="contact-panel__phone" :href="contact.phoneHref">{{ contact.phone }}</a>
      <p class="contact-panel__note">{{ t.contact.noBookingNote }}</p>

      <div class="contact-panel__actions">
        <a class="btn btn--on-dark" :href="contact.phoneHref">{{ t.contact.callCta }}</a>
        <a
          v-if="whatsapp"
          class="btn btn--on-dark"
          :href="whatsapp"
          rel="noopener"
          target="_blank"
          >{{ t.contact.whatsappCta }}</a
        >
      </div>
    </div>

    <div>
      <div class="contact-aside">
        <p class="contact-panel__label">{{ t.contact.locationLabel }}</p>
        <p class="contact-aside__value">{{ t.contact.locationValue }}</p>
        <iframe
          class="contact-map"
          src="https://www.google.com/maps?q=Av.+Eloy+Alfaro+y+Republica,+Quito,+Ecuador&output=embed"
          :title="t.contact.mapTitle"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div class="contact-aside">
        <p class="contact-panel__label">{{ t.contact.emergencyTitle }}</p>
        <p class="contact-aside__value">{{ t.contact.emergencyBody }}</p>
      </div>
    </div>
  </div>
</template>
