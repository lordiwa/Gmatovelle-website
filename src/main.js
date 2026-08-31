import { createApp } from './app.js';

const { app, router } = createApp({ ssr: false });

router.isReady().then(() => {
  app.mount('#app');
});
