import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import App from '@/App.vue';
import { messages } from '@/i18n/index.js';
import { contact } from '@/data/contact.js';
import { profile } from '@/data/profile.js';
import { PAGES, pathFor } from '@/router/routes.js';
import { mountAt } from '../helpers/mount.js';

describe('portada: perfil del Dr. Matovelle', () => {
  /**
   * El h1 dejo de ser el nombre del Dr. con el redisenio 1c "Navy de
   * confianza": el cliente eligio un titular editorial para el hero. Este test
   * cambio por esa decision de diseno, no porque la senal de entidad se haya
   * degradado: la afirmacion sobre el h1 se sustituye por el titular nuevo Y se
   * agrega la comprobacion de que el propio hero (no otra seccion de la pagina)
   * sigue nombrando al Dr. y su titulacion, que es lo que el SEO/GEO necesita.
   */
  it('presenta el titular, el nombre del Dr., su titulacion y el resumen en el hero', async () => {
    const { wrapper } = await mountAt(App, '/');
    expect(wrapper.find('h1').text()).toBe(messages.es.hero.headline);
    expect(wrapper.find('h1').text()).toBe('Cuarenta años cuidando la salud mental con rigor médico');

    const hero = wrapper.find('.hero').text();
    expect(hero).toContain('Dr. Gonzalo Matovelle');
    expect(hero).toContain('Doctor en Medicina y Cirugía');
    expect(hero).toContain('Especialista en Psiquiatría');

    expect(wrapper.text()).toContain('Doctor en Medicina y Cirugía');
    expect(wrapper.text()).toContain('Especialista en Psiquiatría');
    expect(wrapper.text()).toContain('40 años');
  });

  it('renderiza las secciones del perfil exigidas por el ticket', async () => {
    const { wrapper } = await mountAt(App, '/');
    const text = wrapper.text();
    for (const heading of [
      messages.es.about.heading,
      messages.es.practice.heading,
      messages.es.credentials.heading,
      messages.es.publications.heading,
      messages.es.faq.heading,
      messages.es.contact.heading,
    ]) {
      expect(text, 'falta la seccion ' + heading).toContain(heading);
    }
  });

  it('publica cada credencial del CV, sin perder ninguna', async () => {
    const { wrapper } = await mountAt(App, '/');
    const rendered = wrapper.findAll('.credential-list li').map((li) => li.text());
    const expected = messages.es.credentials.groups.flatMap((group) => group.items);
    expect(rendered).toEqual(expected);
  });

  /**
   * El rol pericial salio de esta lista el 2026-09-01: el cliente lo retiro
   * ("It is no longer a legal expert either"), asi que ya no es una credencial
   * publicable. El resto de las dignidades sigue igual de fijado que antes.
   */
  it('nombra las dignidades gremiales y las representaciones tal como constan', async () => {
    const { wrapper } = await mountAt(App, '/');
    const text = wrapper.text();
    expect(text).toContain('Past Presidente de la Asociación Ecuatoriana de Psiquiatría');
    expect(text).toContain('Veterans Evaluation System (VES)');
    expect(text).toContain('World Psychiatric Association (WPA)');
    expect(text).toContain('Profesor invitado de Psicofarmacología');
  });

  it('lista las publicaciones del Dr. con su editorial', async () => {
    const { wrapper } = await mountAt(App, '/');
    const text = wrapper.text();
    expect(text).toContain('Manual Latinoamericano para la Enfermedad Depresiva');
    expect(text).toContain('Enfermedad de Alzheimer');
    expect(text).toContain('Cangrejal Editores');
  });

  it('deja las respuestas de la FAQ en el HTML aunque el acordeon este cerrado', async () => {
    const { wrapper } = await mountAt(App, '/');
    const answers = wrapper.findAll('.faq__answer').map((node) => node.text());
    expect(answers.length).toBe(messages.es.faq.items.length);
    expect(answers).toEqual(messages.es.faq.items.map((item) => item.answer));
  });

  it('muestra el mismo perfil completo en la version en ingles', async () => {
    const { wrapper } = await mountAt(App, '/en');
    const rendered = wrapper.findAll('.credential-list li').map((li) => li.text());
    const expected = messages.en.credentials.groups.flatMap((group) => group.items);
    expect(rendered).toEqual(expected);
    expect(wrapper.text()).toContain('Psychiatrist for Ecuador of the Veterans Evaluation System');
  });

  it('muestra la fotografia profesional del Dr. dentro del marco del retrato', async () => {
    const { wrapper } = await mountAt(App, '/');
    expect(wrapper.find('.portrait__frame').exists()).toBe(true);

    const img = wrapper.find('.portrait img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(profile.portraitPath);
    // width/height explicitos: sin ellos el retrato del hero provoca un salto
    // de layout al cargar, que es justo la metrica que Google mide como CLS.
    expect(img.attributes('width')).toBe(String(profile.portraitWidth));
    expect(img.attributes('height')).toBe(String(profile.portraitHeight));
    // El alt tiene que describir al Dr., no quedarse en "foto" o vacio.
    expect(img.attributes('alt')).toBe(messages.es.hero.portraitAlt);
    expect(img.attributes('alt')).toContain('Matovelle');
  });

  it('sirve el retrato como archivo real dentro de public/', () => {
    expect(existsSync(resolve(process.cwd(), 'public' + profile.portraitPath))).toBe(true);
  });

  it('ya no anuncia la fotografia como pendiente en ningun idioma', () => {
    for (const locale of ['es', 'en']) {
      const hero = messages[locale].hero;
      expect(hero.portraitAlt.toLowerCase()).not.toMatch(/pendiente|pending|preparaci|preparation/);
      expect(hero.portraitCaption.toLowerCase()).not.toMatch(
        /pendiente|pending|preparaci|preparation/,
      );
    }
  });
});

describe('pagina de contacto', () => {
  it('ofrece el telefono del consultorio como enlace de llamada', async () => {
    const { wrapper } = await mountAt(App, '/contacto');
    const link = wrapper.find('.contact-panel__phone');
    expect(link.text()).toBe(contact.phone);
    // Se muestra el numero local y se marca el internacional: son el mismo.
    expect(link.attributes('href')).toBe(contact.phoneHref);
  });

  it('explica que no hay agendamiento en linea', async () => {
    const { wrapper } = await mountAt(App, '/contacto');
    expect(wrapper.text()).toContain(messages.es.contact.noBookingNote);
    expect(wrapper.find('form').exists()).toBe(false);
  });

  it('indica la ciudad de la consulta y la via de emergencia', async () => {
    const { wrapper } = await mountAt(App, '/en/contact');
    expect(wrapper.text()).toContain('Quito');
    expect(wrapper.text()).toContain(messages.en.contact.emergencyTitle);
  });
});

describe('boton de WhatsApp', () => {
  // '/' es la landing: ContactPanel se monta tanto ahi como en /contacto, y el
  // cliente pidio expresamente ver el boton en la landing.
  for (const [path, locale] of [
    ['/', 'es'],
    ['/contacto', 'es'],
    ['/en', 'en'],
    ['/en/contact', 'en'],
  ]) {
    it('ofrece el WhatsApp del consultorio en ' + path, async () => {
      const { wrapper } = await mountAt(App, path);
      const link = wrapper
        .findAll('.contact-panel__actions a')
        .find((a) => (a.attributes('href') || '').includes('wa.me'));

      expect(link, 'falta el boton de WhatsApp en ' + path).toBeDefined();
      expect(link.attributes('href')).toBe('https://wa.me/593999835666');
      expect(link.text()).toBe(messages[locale].contact.whatsappCta);
      // Pestana nueva: el visitante no pierde el sitio al saltar a WhatsApp.
      expect(link.attributes('target')).toBe('_blank');
      expect(link.attributes('rel')).toContain('noopener');
    });
  }

  it('no sustituye el boton de llamada', async () => {
    const { wrapper } = await mountAt(App, '/');
    const hrefs = wrapper.findAll('.contact-panel__actions a').map((a) => a.attributes('href'));
    expect(hrefs).toEqual([contact.phoneHref, 'https://wa.me/593999835666']);
  });
});

describe('seccion de articulos desactivada', () => {
  it('no registra /blog ni /en/blog como paginas del sitio', () => {
    expect(PAGES.map((p) => p.name)).toEqual(['home', 'contact']);
    expect(() => pathFor('blog', 'es')).toThrow();
  });

  it('trata /blog y /en/blog como ruta inexistente en vez de servir la vista vacia', async () => {
    for (const path of ['/blog', '/en/blog']) {
      const { wrapper } = await mountAt(App, path);
      expect(wrapper.text(), path + ' sigue sirviendo el estado vacio').not.toContain(
        messages.es.blog.comingSoonTitle,
      );
      expect(wrapper.text()).toContain(messages.es.notFound.heading);
      // La navegacion sigue en pie: la 404 no es una pagina rota.
      expect(wrapper.find('.site-header').exists()).toBe(true);
    }
  });

  it('no deja enlaces internos al blog en la navegacion ni en el pie', async () => {
    for (const path of ['/', '/en', '/contacto']) {
      const { wrapper } = await mountAt(App, path);
      const hrefs = wrapper.findAll('a').map((a) => a.attributes('href') || '');
      expect(hrefs.some((href) => /\/blog$/.test(href)), 'enlace a blog en ' + path).toBe(false);
    }
  });

  it('conserva la vista y las cadenas para poder reactivarla sin reescribirlas', () => {
    // El cliente pidio retirar la seccion, no borrarla: cuando haya articulos
    // se reactiva descomentando (ver src/router/routes.js).
    expect(existsSync(resolve(process.cwd(), 'src/views/BlogView.vue'))).toBe(true);
    expect(messages.es.blog.comingSoonTitle).toBeTruthy();
    expect(messages.en.blog.comingSoonTitle).toBeTruthy();
  });
});

describe('ruta inexistente', () => {
  it('muestra la pagina 404 en espanol sin romper la navegacion', async () => {
    const { wrapper } = await mountAt(App, '/no-existe');
    expect(wrapper.text()).toContain(messages.es.notFound.heading);
    expect(wrapper.find('.site-header').exists()).toBe(true);
  });
});
