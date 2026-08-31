<script setup>
import { useI18n } from '@/i18n/index.js';
import { profile } from '@/data/profile.js';

const { t } = useI18n();

/**
 * Retrato profesional del Dr.
 *
 * La fotografia vive en public/ y no en src/assets/ a proposito: el build corre
 * el bundle cliente y el prerender SSR como dos pasos separados, y una ruta
 * publica estable garantiza que el <img> del HTML estatico y el del bundle que
 * hidrata apunten exactamente al mismo archivo (un asset importado se resuelve
 * con hash en cada build por separado).
 *
 * El marco por defecto es el mismo que sostenia el medallon provisional:
 * proporcion 4/5 y anillo interior.
 *
 * La variante "hero-navy" es el encuadre del redisenio 1c: proporcion 4/4.6,
 * apoyado en el borde inferior de la banda navy y con las esquinas superiores
 * redondeadas. Se anade como variante y no como sustitucion para no romper el
 * marco 4/5, que sigue siendo el encuadre neutro del componente.
 */
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'hero-navy'].includes(value),
  },
});

const portrait = {
  src: profile.portraitPath,
  width: profile.portraitWidth,
  height: profile.portraitHeight,
};
</script>

<template>
  <figure class="portrait" :class="'portrait--' + variant">
    <div class="portrait__frame">
      <img
        class="portrait__image"
        :src="portrait.src"
        :alt="t.hero.portraitAlt"
        :width="portrait.width"
        :height="portrait.height"
        decoding="async"
      />
    </div>
    <figcaption class="portrait__caption">{{ t.hero.portraitCaption }}</figcaption>
  </figure>
</template>
