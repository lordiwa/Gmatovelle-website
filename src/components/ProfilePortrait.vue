<script setup>
import { useI18n } from '@/i18n/index.js';

const { t } = useI18n();

/**
 * Retrato provisional.
 *
 * El Dr. aun no tiene fotografia profesional, y una foto de banco de imagenes
 * en el sitio de un medico real seria una falsedad. Hasta que exista la foto se
 * muestra un medallon con su monograma, con el mismo marco y proporcion que
 * tendra el retrato definitivo: al llegar la foto solo se reemplaza el
 * contenido del marco.
 */
const monogram = 'GM';
</script>

<template>
  <figure class="portrait">
    <div class="portrait__frame" role="img" :aria-label="t.hero.portraitAlt">
      <span class="portrait__medallion" aria-hidden="true">{{ monogram }}</span>
    </div>
    <figcaption class="portrait__caption">{{ t.hero.portraitCaption }}</figcaption>
  </figure>
</template>
