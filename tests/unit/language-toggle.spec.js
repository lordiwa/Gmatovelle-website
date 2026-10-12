import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import App from '@/App.vue';
import { mountAt } from '../helpers/mount.js';

describe('selector de idioma ES/EN', () => {
  it('marca el espanol como idioma activo en la portada', async () => {
    const { wrapper } = await mountAt(App, '/');
    const active = wrapper.find('.lang-toggle__option.is-active');
    expect(active.text()).toBe('ES');
  });

  it('enlaza a la version inglesa de la portada', async () => {
    const { wrapper } = await mountAt(App, '/');
    const options = wrapper.findAll('.lang-toggle__option');
    expect(options.map((o) => o.text())).toEqual(['ES', 'EN']);
    expect(options[1].attributes('href')).toBe('/en');
  });

  it('conserva la pagina al cambiar de idioma en lugar de volver al inicio', async () => {
    const { wrapper } = await mountAt(App, '/contacto');
    const options = wrapper.findAll('.lang-toggle__option');
    expect(options[1].attributes('href')).toBe('/en/contact');

    const { wrapper: en } = await mountAt(App, '/en/contact');
    const enOptions = en.findAll('.lang-toggle__option');
    expect(enOptions[0].attributes('href')).toBe('/contacto');
  });

  it('cae a la portada en una ruta sin equivalente, como la 404', async () => {
    // /blog quedo fuera de PAGES al retirar la seccion de articulos: el toggle
    // no puede intentar resolver una pagina que ya no existe.
    const { wrapper } = await mountAt(App, '/blog');
    const options = wrapper.findAll('.lang-toggle__option');
    expect(options.map((o) => o.attributes('href'))).toEqual(['/', '/en']);
  });

  it('cambia el contenido al navegar al otro idioma', async () => {
    const { wrapper, router } = await mountAt(App, '/');
    expect(wrapper.text()).toContain('Perfil profesional');
    expect(wrapper.text()).not.toContain('Professional profile');

    await router.push('/en');
    await nextTick();

    expect(wrapper.text()).toContain('Professional profile');
    expect(wrapper.text()).not.toContain('Perfil profesional');
    expect(wrapper.find('.lang-toggle__option.is-active').text()).toBe('EN');
  });

  it('traduce tambien la navegacion y el pie', async () => {
    const { wrapper: es } = await mountAt(App, '/');
    expect(es.find('.site-nav').text()).toContain('Contacto');
    expect(es.find('.site-footer').text()).toContain('Médico Neuropsiquiatra');

    const { wrapper: en } = await mountAt(App, '/en');
    expect(en.find('.site-nav').text()).toContain('Contact');
    expect(en.find('.site-footer').text()).toContain('Neuropsychiatrist');
  });

  // Daño que previene: que vuelvan el disclaimer y los derechos o que se pierda el crédito enlazado.
  it('el pie muestra solo el crédito enlazado a m4to.com en ambos idiomas', async () => {
    for (const path of ['/', '/en']) {
      const { wrapper } = await mountAt(App, path);
      const footer = wrapper.find('.site-footer');
      expect(footer.find('.site-footer__bottom').text()).toContain('Made with love by');
      expect(footer.find('a[href="https://m4to.com"]').text()).toBe('m4to.com');
      expect(footer.text()).not.toMatch(/fines informativos|derechos reservados|rights reserved|information purposes/i);
    }
  });
});

describe('head sincronizado con la ruta', () => {
  it('actualiza titulo, lang y JSON-LD al cambiar de idioma', async () => {
    const { router } = await mountAt(App, '/');
    await nextTick();

    expect(document.title).toContain('Médico Neuropsiquiatra');
    expect(document.documentElement.getAttribute('lang')).toBe('es-EC');

    const blocks = () => [...document.head.querySelectorAll('script[type="application/ld+json"]')];
    // Portada: ProfilePage + Physician + WebSite (FAQPage y Book viven en sus paginas).
    expect(blocks().length).toBe(3);
    expect(blocks().some((node) => node.textContent.includes('Physician'))).toBe(true);

    await router.push('/en');
    await nextTick();

    expect(document.title).toContain('Neuropsychiatrist');
    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(document.head.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(document.head.querySelector('link[rel="canonical"]').getAttribute('href')).toContain(
      '/en',
    );
  });
});
