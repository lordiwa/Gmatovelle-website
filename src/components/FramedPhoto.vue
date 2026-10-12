<script setup>
/**
 * Fotografia colgada en la pared: paspartu blanco, marco negro fino, sombra
 * y, si se pide, una placa negra debajo con letra grabada.
 *
 * Recibe una entrada de profile.photos. Sirve WebP cuando el navegador lo
 * acepta y JPEG como respaldo; la version chica va en el srcset para que el
 * movil no baje la grande. width/height explicitos evitan el salto de layout.
 */
defineProps({
  photo: { type: Object, required: true },
  alt: { type: String, required: true },
  caption: { type: String, default: null },
  /** Ancho maximo con el que se mostrara: alimenta el atributo sizes. */
  sizes: { type: String, default: '(max-width: 900px) 92vw, 520px' },
  wide: { type: Boolean, default: false },
  sticky: { type: Boolean, default: false },
  loading: { type: String, default: 'lazy' },
});
</script>

<template>
  <figure
    class="frame"
    :class="{ 'frame--captioned': caption, 'frame--wide': wide, 'frame--sticky': sticky }"
  >
    <span class="frame__mat">
      <picture class="frame__picture">
        <source
          type="image/webp"
          :srcset="photo.smallWebp + ' ' + photo.smallWidth + 'w, ' + photo.webp + ' ' + photo.width + 'w'"
          :sizes="sizes"
        />
        <img
          class="frame__image"
          :src="photo.src"
          :srcset="photo.small + ' ' + photo.smallWidth + 'w, ' + photo.src + ' ' + photo.width + 'w'"
          :sizes="sizes"
          :alt="alt"
          :width="photo.width"
          :height="photo.height"
          :loading="loading"
          decoding="async"
        />
      </picture>
    </span>
    <figcaption v-if="caption" class="frame__caption">{{ caption }}</figcaption>
  </figure>
</template>
