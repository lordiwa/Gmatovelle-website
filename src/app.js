import { createSSRApp } from 'vue';
import App from './App.vue';
import { createAppRouter } from './router/index.js';
// Fuentes autoalojadas (fontsource): Bodoni con eje optico para los titulares,
// la grotesca para leer y la gotica del diploma solo para el nombre del Dr.
import '@fontsource-variable/bodoni-moda/opsz.css';
import '@fontsource-variable/bodoni-moda/opsz-italic.css';
import '@fontsource-variable/schibsted-grotesk/index.css';
import '@fontsource-variable/grenze-gotisch/index.css';
import './styles/main.css';

/**
 * Fabrica compartida por el cliente y por el prerender. createSSRApp permite
 * que el HTML estatico generado en build se hidrate en el navegador en lugar de
 * volver a renderizarse desde cero.
 */
export function createApp({ ssr = false } = {}) {
  const app = createSSRApp(App);
  const router = createAppRouter({ ssr });
  app.use(router);
  return { app, router };
}
