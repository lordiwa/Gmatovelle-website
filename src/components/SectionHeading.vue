<script setup>
defineProps({
  index: { type: String, default: null },
  title: { type: String, required: true },
  lead: { type: String, default: null },
  id: { type: String, default: null },
});
</script>

<template>
  <div class="section__head">
    <span v-if="index" class="section__index">{{ index }}</span>
    <h2 class="section__title" :id="id">{{ title }}</h2>
    <p v-if="lead" class="section__lead">{{ lead }}</p>
  </div>
</template>
