/**
 * Traduce el objeto head de meta.js a una lista neutra de descriptores de tags.
 * De aqui salen tanto el HTML estatico del prerender como los nodos del DOM en
 * la navegacion cliente, por lo que ambos entornos publican exactamente lo
 * mismo.
 */
export function headTags(head) {
  const tags = [];

  tags.push({ tag: 'meta', attrs: { name: 'description', content: head.description } });
  tags.push({ tag: 'meta', attrs: { name: 'robots', content: head.robots } });
  tags.push({ tag: 'link', attrs: { rel: 'canonical', href: head.canonical } });

  for (const alt of head.alternates) {
    tags.push({ tag: 'link', attrs: { rel: 'alternate', hreflang: alt.hreflang, href: alt.href } });
  }

  for (const [property, content] of Object.entries(head.og)) {
    tags.push({ tag: 'meta', attrs: { property, content } });
  }

  for (const [name, content] of Object.entries(head.twitter)) {
    tags.push({ tag: 'meta', attrs: { name, content } });
  }

  for (const block of head.jsonLd) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: JSON.stringify(block),
    });
  }

  return tags;
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Evita que un "</script>" dentro del JSON-LD cierre el bloque antes de tiempo. */
function escapeJsonLd(value) {
  return String(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

/** Serializa el head a HTML, para inyectarlo en el documento prerenderizado. */
export function renderHeadTags(head) {
  const lines = ['<title>' + escapeAttr(head.title) + '</title>'];

  for (const { tag, attrs, children } of headTags(head)) {
    const attrString = Object.entries(attrs)
      .map(([key, value]) => key + '="' + escapeAttr(value) + '"')
      .join(' ');
    if (children === undefined) {
      lines.push('<' + tag + ' ' + attrString + '>');
    } else {
      lines.push('<' + tag + ' ' + attrString + '>' + escapeJsonLd(children) + '</' + tag + '>');
    }
  }

  return lines.join('\n    ');
}
