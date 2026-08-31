<script setup>
import { computed } from 'vue';
import { pathFor } from '@/router/routes.js';
import { useI18n } from '@/i18n/index.js';
import { contact, whatsappUrl, mailtoHref, mapEmbedUrl } from '@/data/contact.js';

const { locale, t } = useI18n();

/**
 * Dos encuadres del mismo panel:
 *   - "full": el de /contacto, con mapa, correos y aviso de emergencia.
 *   - "compact": la franja navy del redisenio 1c para la portada (telefono,
 *     nota corta y CTA). Sin mapa, sin correos y sin emergencias, porque la
 *     portada la usa como llamada a la accion y no como ficha completa.
 *
 * Las clases .contact-panel, .contact-panel__label, .contact-panel__phone y
 * .contact-panel__actions se conservan en las dos variantes: son el contrato
 * que fijan los locks del telefono y del boton de WhatsApp.
 */
defineProps({
  variant: {
    type: String,
    default: 'full',
    validator: (value) => ['full', 'compact'].includes(value),
  },
});

/**
 * Enlace wa.me del consultorio. Sigue siendo computed y con v-if porque el
 * campo puede volver a null: la fuente unica es src/data/contact.js.
 */
const whatsapp = computed(() => whatsappUrl());

/** Mapa embebido apuntando a la ficha oficial del consultorio en Google Maps. */
const mapSrc = computed(() => mapEmbedUrl());
</script>

<template>
  <div v-if="variant === 'compact'" class="contact-panel contact-panel--compact">
    <div>
      <p class="contact-panel__label">{{ t.contact.enquiriesLabel }}</p>
      <a class="contact-panel__phone" :href="contact.phoneHref">{{ contact.phone }}</a>
    </div>

    <div>
      <p class="contact-panel__note">{{ t.contact.compactNote }}</p>
      <p class="contact-panel__more">
        <RouterLink :to="pathFor('contact', locale)">{{ t.nav.contact }}</RouterLink>
      </p>
    </div>

    <div class="contact-panel__actions">
      <a class="btn btn--brass" :href="contact.phoneHref">{{ t.contact.callNowCta }}</a>
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

  <div v-else class="contact-panel">
    <div>
      <p class="contact-panel__label">{{ t.contact.phoneLabel }}</p>
      <a class="contact-panel__phone" :href="contact.phoneHref">{{ contact.phone }}</a>
      <p class="contact-panel__note">{{ t.contact.noBookingNote }}</p>

      <div class="contact-panel__emails">
        <p class="contact-panel__label">{{ t.contact.emailLabel }}</p>
        <p v-for="email in contact.emails" :key="email" class="contact-aside__value">
          <a class="contact-panel__email" :href="mailtoHref(email)">{{ email }}</a>
        </p>
      </div>

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
          :src="mapSrc"
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
