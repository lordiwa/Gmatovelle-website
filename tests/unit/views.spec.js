import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import App from '@/App.vue';
import { messages } from '@/i18n/index.js';
import { contact } from '@/data/contact.js';
import { profile } from '@/data/profile.js';
import { mountAt } from '../helpers/mount.js';

describe('portada: perfil del Dr. Matovelle', () => {
  it('presenta nombre, titulacion y resumen en el encabezado', async () => {
    const { wrapper } = await mountAt(App, '/');
    expect(wrapper.find('h1').text()).toBe('Dr. Gonzalo Matovelle');
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

  it('nombra las dignidades gremiales y el rol pericial tal como constan', async () => {
    const { wrapper } = await mountAt(App, '/');
    const text = wrapper.text();
    expect(text).toContain('Past Presidente de la Asociación Ecuatoriana de Psiquiatría');
    expect(text).toContain('Perito Psiquiatra certificado de la Función Judicial de Pichincha');
    expect(text).toContain('Veterans Evaluation System (VES)');
    expect(text).toContain('World Psychiatric Association (WPA)');
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
    expect(wrapper.text()).toContain('Certified Forensic Psychiatrist');
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
    expect(link.attributes('href')).toBe('tel:' + contact.phone);
  });

  it('explica que no hay agendamiento en linea', async () => {
    const { wrapper } = await mountAt(App, '/contacto');
    expect(wrapper.text()).toContain(messages.es.contact.noBookingNote);
    expect(wrapper.find('form').exists()).toBe(false);
  });

  it('oculta el boton de WhatsApp mientras el numero no este confirmado', async () => {
    const { wrapper } = await mountAt(App, '/contacto');
    expect(wrapper.html()).not.toContain('wa.me');
  });

  it('indica la ciudad de la consulta y la via de emergencia', async () => {
    const { wrapper } = await mountAt(App, '/en/contact');
    expect(wrapper.text()).toContain('Quito');
    expect(wrapper.text()).toContain(messages.en.contact.emergencyTitle);
  });
});

describe('blog', () => {
  it('existe como ruta publica con estado vacio en ambos idiomas', async () => {
    const { wrapper: es } = await mountAt(App, '/blog');
    expect(es.text()).toContain(messages.es.blog.comingSoonTitle);

    const { wrapper: en } = await mountAt(App, '/en/blog');
    expect(en.text()).toContain(messages.en.blog.comingSoonTitle);
  });

  it('devuelve al visitante al perfil o al contacto', async () => {
    const { wrapper } = await mountAt(App, '/blog');
    const hrefs = wrapper.findAll('.empty-state__actions a').map((a) => a.attributes('href'));
    expect(hrefs).toEqual(['/', '/contacto']);
  });
});

describe('ruta inexistente', () => {
  it('muestra la pagina 404 en espanol sin romper la navegacion', async () => {
    const { wrapper } = await mountAt(App, '/no-existe');
    expect(wrapper.text()).toContain(messages.es.notFound.heading);
    expect(wrapper.find('.site-header').exists()).toBe(true);
  });
});
