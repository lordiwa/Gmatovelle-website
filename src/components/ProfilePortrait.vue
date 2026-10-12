<script setup>
import { useI18n } from '@/i18n/index.js';
import { profile } from '@/data/profile.js';

const { t } = useI18n();

/**
 * Retrato profesional del Dr., colgado en el hero.
 *
 * La fotografia vive en public/ y no en src/assets/ a proposito: el build corre
 * el bundle cliente y el prerender SSR como dos pasos separados, y una ruta
 * publica estable garantiza que el <img> del HTML estatico y el del bundle que
 * hidrata apunten exactamente al mismo archivo (un asset importado se resuelve
 * con hash en cada build por separado).
 *
 * El <img> conserva como src el JPEG de profile.portraitPath, que es tambien
 * la imagen del nodo Physician de schema.org; el WebP y la version chica van
 * en <source>/srcset. El pie de foto es la placa negra bajo el marco.
 *
 * La variante "hero-navy" es el nombre historico que fijan los locks del hero;
 * hoy es el marco de 2px con paspartu ancho de la pared de titulos.
 */
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'hero-navy'].includes(value),
  },
});

const photo = profile.photos.retrato;
const sizes = '(max-width: 900px) 92vw, 470px';
</script>

<template>
  <figure class="portrait" :class="'portrait--' + variant">
    <span class="portrait__frame">
      <picture>
        <source
          type="image/webp"
          :srcset="photo.smallWebp + ' ' + photo.smallWidth + 'w, ' + photo.webp + ' ' + photo.width + 'w'"
          :sizes="sizes"
        />
        <img
          class="portrait__image"
          :src="profile.portraitPath"
          :srcset="photo.small + ' ' + photo.smallWidth + 'w, ' + profile.portraitPath + ' ' + photo.width + 'w'"
          :sizes="sizes"
          :alt="t.hero.portraitAlt"
          :width="profile.portraitWidth"
          :height="profile.portraitHeight"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
    </span>
    <figcaption class="portrait__caption">{{ t.hero.portraitCaption }}</figcaption>
  </figure>
</template>
