<script setup>
import { pathFor } from '@/router/routes.js';
import { useI18n } from '@/i18n/index.js';
import { contact } from '@/data/contact.js';
import SectionHeading from '@/components/SectionHeading.vue';
import ProfilePortrait from '@/components/ProfilePortrait.vue';
import FaqList from '@/components/FaqList.vue';
import ContactPanel from '@/components/ContactPanel.vue';

const { locale, t } = useI18n();
</script>

<template>
  <div>
    <section class="hero">
      <div class="shell">
        <div class="hero__grid">
          <div>
            <p class="hero__eyebrow">{{ t.hero.eyebrow }}</p>
            <h1 class="hero__name">{{ t.hero.name }}</h1>
            <p class="hero__credential">{{ t.hero.credentialLine }}</p>
            <p class="hero__summary">{{ t.hero.summary }}</p>

            <div class="hero__actions">
              <a class="btn btn--primary" :href="contact.phoneHref">{{ t.hero.primaryCta }}</a>
              <a class="btn btn--ghost" href="#perfil">{{ t.hero.secondaryCta }}</a>
            </div>
          </div>

          <ProfilePortrait />
        </div>

        <dl class="hero__facts">
          <div v-for="fact in t.hero.facts" :key="fact.value" class="fact">
            <dt class="fact__value">{{ fact.value }}</dt>
            <dd class="fact__label">{{ fact.label }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section id="perfil" class="section">
      <div class="shell">
        <SectionHeading index="01" :title="t.about.heading" :lead="t.about.lead" />
        <div class="prose">
          <p v-for="(paragraph, index) in t.about.paragraphs" :key="index">{{ paragraph }}</p>
        </div>
      </div>
    </section>

    <!--
      Enfoque de la consulta. Solo recoge lo que el CV respalda.
      PENDIENTE: cuando el Dr. confirme las areas y tratamientos que quiere
      destacar, se agregan como una seccion propia despues de esta.
    -->
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

    <section class="section">
      <div class="shell">
        <SectionHeading index="03" :title="t.credentials.heading" :lead="t.credentials.lead" />
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
        <SectionHeading index="04" :title="t.publications.heading" :lead="t.publications.lead" />
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
        <SectionHeading index="05" :title="t.faq.heading" :lead="t.faq.lead" />
        <FaqList :items="t.faq.items" />
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <SectionHeading index="06" :title="t.contact.heading" :lead="t.contact.lead" />
        <ContactPanel />
        <p class="publication-note">
          <RouterLink :to="pathFor('contact', locale)">{{ t.nav.contact }}</RouterLink>
        </p>
      </div>
    </section>
  </div>
</template>
