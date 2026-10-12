<script setup>
/**
 * Sello circular del sitio: anillo dentado, texto en circulo y el monograma
 * del Dr. en la letra del diploma. Es el unico lugar donde aparece el dorado.
 * Decorativo: aria-hidden, el texto del anillo ya esta en la pagina.
 */
import { useId } from 'vue';

defineProps({
  text: { type: String, required: true },
});

const ringId = useId();
</script>

<template>
  <svg class="seal" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <defs>
      <path :id="ringId" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
    </defs>
    <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2.6" />
    <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="1" />
    <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" stroke-width="1" />
    <text class="seal__ring" fill="currentColor">
      <textPath :href="'#' + ringId" startOffset="50%" text-anchor="middle">{{ text }}</textPath>
    </text>
    <text class="seal__monogram" x="60" y="72" text-anchor="middle" fill="currentColor">GM</text>
  </svg>
</template>
