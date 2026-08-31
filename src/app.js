import { createSSRApp } from 'vue';
import App from './App.vue';
import { createAppRouter } from './router/index.js';
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
