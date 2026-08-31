<script setup>
/**
 * Las respuestas se renderizan siempre en el HTML (details/summary nativo, sin
 * v-if): el plegado es puramente visual, de modo que buscadores y asistentes de
 * IA leen el texto completo aunque el acordeon este cerrado.
 */
defineProps({
  items: { type: Array, required: true },
});
</script>

<template>
  <div class="faq">
    <details v-for="item in items" :key="item.question" class="faq__item">
      <summary class="faq__question">{{ item.question }}</summary>
      <p class="faq__answer">{{ item.answer }}</p>
    </details>
  </div>
</template>
