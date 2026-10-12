import { describe, it, expect, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { readFileSync } from 'node:fs';
import App from '@/App.vue';
import { buildHead } from '@/seo/meta.js';
import { renderHeadTags } from '@/seo/tags.js';
import { mountAt } from '../helpers/mount.js';

const count = (selector) => document.head.querySelectorAll(selector).length;

describe('head tras hidratar sobre el HTML prerenderizado', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  // Previene que buscadores vean dos canonical, dos juegos de hreflang o JSON-LD duplicado.
  it('deja un canonical, un juego de hreflang y un JSON-LD por @id', async () => {
    document.head.innerHTML = renderHeadTags(buildHead('home', 'es'));
    expect(count('link[rel="canonical"]')).toBe(1);

    await mountAt(App, '/');
    await nextTick();

    expect(count('link[rel="canonical"]')).toBe(1);
    const hreflangs = [...document.head.querySelectorAll('link[rel="alternate"]')].map((n) =>
      n.getAttribute('hreflang'),
    );
    expect(hreflangs).toEqual(['es-EC', 'en', 'x-default']);

    const ids = [...document.head.querySelectorAll('script[type="application/ld+json"]')].map(
      (n) => JSON.parse(n.textContent)['@id'],
    );
    expect(ids.length).toBe(4);
    expect(new Set(ids).size).toBe(ids.length);
    expect(count('meta[name="description"]')).toBe(1);
    expect(count('meta[name="robots"]')).toBe(1);
  });
});

describe('twitter:card y 404', () => {
  // Previene que la tarjeta 1200x630 se muestre recortada como miniatura.
  it('usa summary_large_image en todas las paginas', () => {
    for (const page of ['home', 'contact', 'notFound']) {
      expect(buildHead(page, 'es').twitter['twitter:card']).toBe('summary_large_image');
    }
  });

  // Previene la senal contradictoria noindex + canonical a la portada.
  it('la 404 lleva noindex y no emite canonical', () => {
    const html = renderHeadTags(buildHead('notFound', 'es'));
    expect(html).toContain('noindex');
    expect(html).not.toContain('rel="canonical"');
  });
});

describe('robots.txt', () => {
  const robots = readFileSync('public/robots.txt', 'utf-8');

  // Previene bloquear o dejar sin constancia a los rastreadores de IA vigentes.
  it('lista los agentes requeridos y no el obsoleto Claude-Web', () => {
    for (const ua of [
      'ClaudeBot',
      'Claude-SearchBot',
      'Claude-User',
      'GPTBot',
      'OAI-SearchBot',
      'ChatGPT-User',
      'PerplexityBot',
      'Perplexity-User',
      'Google-Extended',
      'Applebot-Extended',
      'Bingbot',
    ]) {
      expect(robots).toMatch(new RegExp('^User-agent: ' + ua + '\r?$', 'm'));
    }
    expect(robots).toMatch(/^User-agent: \*\r?\nAllow: \/\r?$/m);
    expect(robots).not.toContain('Claude-Web');
  });
});
