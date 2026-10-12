<script setup>
import { useI18n } from '@/i18n/index.js';
import { profile } from '@/data/profile.js';
import SectionHeading from '@/components/SectionHeading.vue';
import FramedPhoto from '@/components/FramedPhoto.vue';

const { t } = useI18n();
</script>

<template>
  <div>
    <!-- Enfoque de la consulta: la foto ancha colgada arriba, dos tarjetas
         debajo. Abre la pagina, asi que su titulo es el h1. -->
    <section id="consulta" class="section section--plain">
      <div class="shell">
        <SectionHeading as="h1" :title="t.practice.heading" :lead="t.practice.lead" />
        <FramedPhoto
          :photo="profile.photos.paredAzul"
          :alt="t.photos.paredAzul"
          sizes="(max-width: 1200px) 92vw, 1120px"
          wide
        />
        <div class="card-grid">
          <article v-for="item in t.practice.items" :key="item.title" class="card">
            <h2 class="card__title">{{ item.title }}</h2>
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
    <section id="experiencia" class="section section--sunk">
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
  </div>
</template>
