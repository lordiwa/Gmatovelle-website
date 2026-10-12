<script setup>
import { computed } from 'vue';
import { pathFor } from '@/router/routes.js';
import { useI18n } from '@/i18n/index.js';
import { contact, whatsappUrl } from '@/data/contact.js';
import SectionHeading from '@/components/SectionHeading.vue';
import ProfilePortrait from '@/components/ProfilePortrait.vue';
import ContactPanel from '@/components/ContactPanel.vue';

const { t, locale } = useI18n();

/**
 * WhatsApp del consultorio como CTA secundario del hero. Va detras de un v-if
 * porque el campo puede volver a null: la fuente unica es src/data/contact.js.
 */
const whatsapp = computed(() => whatsappUrl());

/** Teasers hacia las tres paginas interiores: heading y lead ya existentes. */
const teasers = computed(() =>
  [
    { page: 'profile', section: t.value.about },
    { page: 'practice', section: t.value.practice },
    { page: 'faq', section: t.value.faq },
  ].map(({ page, section }) => ({
    page,
    heading: section.heading,
    lead: section.lead,
    label: t.value.nav[page],
    to: pathFor(page, locale.value),
  })),
);
</script>

<template>
  <div>
    <!--
      Hero "La pared de titulos": texto a la izquierda, el retrato enmarcado a
      la derecha. El h1 es un titular editorial y no el nombre del Dr.; la
      linea de credencial que va justo debajo conserva el nombre y la
      titulacion, que es la senal de entidad que el SEO/GEO necesita.
      (.hero--navy es el nombre que fijan los locks; la banda navy se retiro.)
    -->
    <section class="hero hero--navy">
      <div class="shell">
        <div class="hero__grid">
          <div class="hero__copy">
            <p class="hero__eyebrow">{{ t.hero.eyebrow }}</p>
            <h1 class="hero__headline">{{ t.hero.headline }}</h1>
            <p class="hero__credential">{{ t.hero.credentialLine }}</p>
            <p class="hero__summary">{{ t.hero.summary }}</p>

            <div class="hero__actions">
              <a class="btn btn--brass" :href="contact.phoneHref">{{ t.hero.primaryCta }}</a>
              <a
                v-if="whatsapp"
                class="btn btn--ghost"
                :href="whatsapp"
                rel="noopener"
                target="_blank"
                >{{ t.contact.whatsappCta }}</a
              >
            </div>
          </div>

          <ProfilePortrait variant="hero-navy" />
        </div>
      </div>
    </section>

    <!--
      Banda de credenciales: tira grabada bajo el hero. Los tres items y su
      orden los fijo el cliente ("40 años / Quito / WPA·WFSBP").
    -->
    <section class="credential-band">
      <div class="shell credential-band__inner">
        <p v-for="entry in t.hero.credentialBand" :key="entry" class="credential-band__item">
          <strong class="credential-band__term">{{ entry }}</strong>
        </p>
      </div>
    </section>

    <!--
      Una placa por pagina interior: el titulo y el parrafo de apertura que ya
      tiene cada seccion, y un enlace con la etiqueta de la navegacion. Sin
      texto nuevo: el contenido completo vive en /perfil, /consulta y
      /preguntas.
    -->
    <section class="section section--plain">
      <div class="shell">
        <div class="card-grid">
          <article v-for="teaser in teasers" :key="teaser.page" class="card card--teaser">
            <h2 class="card__title">{{ teaser.heading }}</h2>
            <p class="card__body">{{ teaser.lead }}</p>
            <RouterLink class="btn btn--ghost" :to="teaser.to">{{ teaser.label }}</RouterLink>
          </article>
        </div>
      </div>
    </section>

    <!--
      "Contacto primero": la placa negra sube por delante de las secciones
      largas de CV. Variante compacta; la ficha completa (mapa, correos,
      emergencias) sigue viviendo en /contacto.
    -->
    <section id="contacto" class="section section--sunk">
      <div class="shell">
        <SectionHeading :title="t.contact.heading" :lead="t.contact.lead" />
        <ContactPanel variant="compact" />
      </div>
    </section>
  </div>
</template>
