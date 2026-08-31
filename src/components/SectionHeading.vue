<script setup>
defineProps({
  index: { type: String, default: null },
  /**
   * Antetitulo alterno al indice numerico (redisenio 1c). Cuando viene, ocupa
   * el lugar del indice y comparte su estilo: una seccion tiene antetitulo o
   * numero, nunca las dos cosas.
   */
  eyebrow: { type: String, default: null },
  title: { type: String, required: true },
  lead: { type: String, default: null },
  id: { type: String, default: null },
});
</script>

<template>
  <div class="section__head">
    <span v-if="eyebrow" class="section__index">{{ eyebrow }}</span>
    <span v-else-if="index" class="section__index">{{ index }}</span>
    <h2 class="section__title" :id="id">{{ title }}</h2>
    <p v-if="lead" class="section__lead">{{ lead }}</p>
  </div>
</template>
