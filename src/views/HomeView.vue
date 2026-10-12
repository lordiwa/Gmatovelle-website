<script setup>
import { computed } from 'vue';
import { useI18n } from '@/i18n/index.js';
import { contact, whatsappUrl } from '@/data/contact.js';
import { profile } from '@/data/profile.js';
import SectionHeading from '@/components/SectionHeading.vue';
import ProfilePortrait from '@/components/ProfilePortrait.vue';
import FramedPhoto from '@/components/FramedPhoto.vue';
import FaqList from '@/components/FaqList.vue';
import ContactPanel from '@/components/ContactPanel.vue';

const { t } = useI18n();

/**
 * WhatsApp del consultorio como CTA secundario del hero. Va detras de un v-if
 * porque el campo puede volver a null: la fuente unica es src/data/contact.js.
 */
const whatsapp = computed(() => whatsappUrl());
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

    <!-- Perfil: la prosa y, colgado al lado, el sillon del consultorio. -->
    <section id="perfil" class="section section--plain">
      <div class="shell">
        <SectionHeading :title="t.about.heading" :lead="t.about.lead" />
        <div class="room">
          <div class="prose">
            <p v-for="(paragraph, index) in t.about.paragraphs" :key="index">{{ paragraph }}</p>
          </div>
          <FramedPhoto
            :photo="profile.photos.consultorio"
            :alt="t.photos.consultorio"
            :caption="t.photos.consultorioCaption"
          />
        </div>
      </div>
    </section>

    <!-- Enfoque de la consulta: la foto ancha colgada arriba, dos tarjetas debajo. -->
    <section id="consulta" class="section section--sunk">
      <div class="shell">
        <SectionHeading :title="t.practice.heading" :lead="t.practice.lead" />
        <FramedPhoto
          :photo="profile.photos.paredAzul"
          :alt="t.photos.paredAzul"
          sizes="(max-width: 1200px) 92vw, 1120px"
          wide
        />
        <div class="card-grid">
          <article v-for="item in t.practice.items" :key="item.title" class="card">
            <h3 class="card__title">{{ item.title }}</h3>
            <p class="card__body">{{ item.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <!--
      Areas de experiencia confirmadas por el cliente (ver
      profile.declaredConditions): cinco placas en fila. Esta seccion lleva
      antetitulo; es, con el del hero, uno de los dos del sitio.
    -->
    <section id="experiencia" class="section">
      <div class="shell">
        <SectionHeading
          :eyebrow="t.expertise.heading"
          :title="t.expertise.headline"
          :lead="t.expertise.lead"
        />
        <div class="card-grid card-grid--rule">
          <article v-for="item in t.expertise.items" :key="item.title" class="card card--rule">
            <h3 class="card__title">{{ item.title }}</h3>
            <p class="card__body">{{ item.body }}</p>
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

    <!-- Credenciales: los titulos enmarcados a la izquierda, fijos mientras se
         recorre la lista; cada grupo del CV a la derecha. -->
    <section id="credenciales" class="section">
      <div class="shell">
        <SectionHeading :title="t.credentials.heading" :lead="t.credentials.lead" />
        <div class="room room--frame-first">
          <FramedPhoto
            :photo="profile.photos.diplomas"
            :alt="t.photos.diplomas"
            :caption="t.photos.diplomasCaption"
            sticky
          />
          <div>
            <section
              v-for="group in t.credentials.groups"
              :key="group.title"
              class="credential-group"
            >
              <h3 class="credential-group__title">{{ group.title }}</h3>
              <ul
                class="credential-list"
                :class="{ 'credential-list--columns': group.items.length > 5 }"
              >
                <li v-for="item in group.items" :key="item">{{ item }}</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>

    <!-- Publicaciones: dos libros sobre una repisa. -->
    <section id="publicaciones" class="section section--sunk">
      <div class="shell">
        <SectionHeading :title="t.publications.heading" :lead="t.publications.lead" />
        <ul class="publications-shelf">
          <li v-for="item in t.publications.items" :key="item.title" class="publication">
            <span class="publication__title">{{ item.title }}</span>
            <span v-if="item.note" class="publication__note">{{ item.note }}</span>
          </li>
        </ul>
        <p class="publication-note">{{ t.publications.articlesNote }}</p>
      </div>
    </section>

    <section id="preguntas" class="section">
      <div class="shell">
        <SectionHeading :title="t.faq.heading" :lead="t.faq.lead" />
        <FaqList :items="t.faq.items" />
      </div>
    </section>
  </div>
</template>
