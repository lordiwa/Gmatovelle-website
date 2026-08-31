<script setup>
import { computed } from 'vue';
import { useI18n } from '@/i18n/index.js';
import { contact, whatsappUrl } from '@/data/contact.js';
import SectionHeading from '@/components/SectionHeading.vue';
import ProfilePortrait from '@/components/ProfilePortrait.vue';
import FaqList from '@/components/FaqList.vue';
import ContactPanel from '@/components/ContactPanel.vue';

const { t } = useI18n();

/**
 * WhatsApp del consultorio como CTA secundario del hero (redisenio 1c). Va
 * detras de un v-if porque el campo puede volver a null: la fuente unica es
 * src/data/contact.js.
 */
const whatsapp = computed(() => whatsappUrl());
</script>

<template>
  <div>
    <!--
      Hero del redisenio 1c "Navy de confianza": banda navy a sangre de ancho
      completo (el .shell va dentro de la banda) con el retrato apoyado en su
      borde inferior. El h1 es un titular editorial y no el nombre del Dr.; la
      linea de credencial que va justo debajo conserva el nombre y la
      titulacion, que es la senal de entidad que el SEO/GEO necesita.
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
                class="btn btn--on-dark"
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
      Banda de credenciales: sustituye a la vieja fila de "facts" del hero. Solo
      resume hechos que la seccion de credenciales ya publica literalmente.
    -->
    <section class="credential-band">
      <div class="shell credential-band__inner">
        <p v-for="entry in t.hero.credentialBand" :key="entry.term" class="credential-band__item">
          <strong class="credential-band__term">{{ entry.term }}</strong>
          <span class="credential-band__detail">{{ entry.detail }}</span>
        </p>
      </div>
    </section>

    <section id="perfil" class="section section--plain">
      <div class="shell">
        <SectionHeading index="01" :title="t.about.heading" :lead="t.about.lead" />
        <div class="prose">
          <p v-for="(paragraph, index) in t.about.paragraphs" :key="index">{{ paragraph }}</p>
        </div>
      </div>
    </section>

    <!-- Enfoque de la consulta. Solo recoge lo que el CV respalda. -->
    <section class="section section--sunk">
      <div class="shell">
        <SectionHeading index="02" :title="t.practice.heading" :lead="t.practice.lead" />
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
      profile.declaredConditions). En la 1c esta seccion lleva antetitulo en vez
      de indice numerico y sus tarjetas pierden la caja: solo una regla superior.
    -->
    <section class="section">
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
      "Contacto primero": en la 1c la franja de contacto sube por delante de las
      secciones largas de CV. Usa la variante compacta del panel; la ficha
      completa (mapa, correos, emergencias) sigue viviendo en /contacto.
    -->
    <section class="section section--sunk">
      <div class="shell">
        <SectionHeading index="03" :title="t.contact.heading" :lead="t.contact.lead" />
        <ContactPanel variant="compact" />
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <SectionHeading index="04" :title="t.credentials.heading" :lead="t.credentials.lead" />
        <div>
          <section
            v-for="group in t.credentials.groups"
            :key="group.title"
            class="credential-group"
          >
            <div class="credential-group__layout">
              <h3 class="credential-group__title">{{ group.title }}</h3>
              <ul class="credential-list">
                <li v-for="item in group.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </section>

    <section class="section section--sunk">
      <div class="shell">
        <SectionHeading index="05" :title="t.publications.heading" :lead="t.publications.lead" />
        <ul>
          <li v-for="item in t.publications.items" :key="item.title" class="publication">
            <span class="publication__title">{{ item.title }}</span>
            <span v-if="item.note" class="publication__note">{{ item.note }}</span>
          </li>
        </ul>
        <p class="publication-note">{{ t.publications.articlesNote }}</p>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <SectionHeading index="06" :title="t.faq.heading" :lead="t.faq.lead" />
        <FaqList :items="t.faq.items" />
      </div>
    </section>
  </div>
</template>
