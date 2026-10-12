<script setup>
import { useI18n } from '@/i18n/index.js';
import { profile } from '@/data/profile.js';
import SectionHeading from '@/components/SectionHeading.vue';
import FramedPhoto from '@/components/FramedPhoto.vue';

const { t } = useI18n();
</script>

<template>
  <div>
    <!-- Perfil: la prosa y, colgado al lado, el sillon del consultorio. Abre la
         pagina, asi que su titulo es el h1. -->
    <section id="perfil" class="section section--plain">
      <div class="shell">
        <SectionHeading as="h1" :title="t.about.heading" :lead="t.about.lead" />
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

    <!-- Credenciales: los titulos enmarcados a la izquierda, fijos mientras se
         recorre la lista; cada grupo del CV a la derecha. -->
    <section id="credenciales" class="section section--sunk">
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
    <section id="publicaciones" class="section">
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
  </div>
</template>
