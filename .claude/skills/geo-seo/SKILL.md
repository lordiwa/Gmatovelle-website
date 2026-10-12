---
name: geo-seo
description: Durable, project-independent facts about GEO (generative engine optimization) and classic SEO for a small static site or an individual professional. Use when deciding robots.txt rules for AI crawlers, structured data, llms.txt, sitemaps, hreflang, or how to measure AI citations.
---

# GEO + SEO: what is documented (as of 2026-10)

Verify against the primary pages before relying on any date. Vendor blogs are marked secondary.

## Crawlers (robots.txt)
- OpenAI: OAI-SearchBot = ChatGPT search inclusion; GPTBot = training; ChatGPT-User = user-triggered fetch, robots "may not apply". Each independent. Changes take about 24 h. https://developers.openai.com/api/docs/bots
- Anthropic: ClaudeBot = training; Claude-User = user queries; Claude-SearchBot = search index. "Claude-Web" is not in the current doc. Honors robots.txt; do not block by IP. https://support.claude.com/en/articles/8896518-what-is-claude-bot
- Perplexity: PerplexityBot = search index; Perplexity-User = user fetch, generally ignores robots.txt. https://docs.perplexity.ai/guides/bots
- Google: AI Overviews and AI Mode need only normal indexing and snippet eligibility. No special schema, no llms.txt, no rewriting or chunking needed. Control with nosnippet / max-snippet / noindex. Google-Extended is for training and grounding elsewhere, not Search. https://developers.google.com/search/docs/appearance/ai-features and https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Allowing search bots and blocking training bots is possible. `User-agent: *` Allow already permits all; explicit blocks are documentation of intent.

## Structured data
- FAQ rich results ended in Google on 2026-05-07; markup still valid.
- speakable: beta, US English news only.
- ProfilePage needs mainEntity Person or Organization; recommends dateModified (human edits only), sameAs, identifier, image, description.
- schema.org Physician is under MedicalBusiness/LocalBusiness and MedicalOrganization; has medicalSpecialty, availableService, hospitalAffiliation. isAcceptingNewPatients is inherited.
- Treat JSON-LD as entity infrastructure. No engine documents it as a citation lever.

## llms.txt
- Google Search does not use it; maintaining it neither helps nor hurts. No OpenAI or Anthropic statement found. Secondary logs show near-zero crawler requests. Cheap to generate at build; never hand-maintain.

## Sitemaps, hreflang, canonical
- Google uses lastmod only if consistently accurate; ignores priority and changefreq. Never use the build date.
- hreflang: reciprocal, self-referencing, x-default for the fallback. HTML, headers and sitemap are equivalent; one method is enough.
- Do not give a noindex page a canonical to another URL.
- Canonical host must be the host that actually serves the page.

## Indexing and measurement
- IndexNow: Bing, Yandex, Naver, Seznam, Amazon, Yep. Not Google.
- Search Console has Generative AI performance reports (since 2026-06-03, subset of sites, impressions only).
- Bing Webmaster Tools AI Performance (preview since 2026-02-10) shows Copilot citations and grounding queries, CSV only.
- Other engines have no citation reports. Use a fixed monthly prompt set across engines and log mentioned / linked / accurate.

## Local and entity (individual professional)
- Google local ranking: relevance, distance, prominence. Fill the Business Profile completely. https://support.google.com/business/answer/7091
- Keep name, address and phone identical across site, Business Profile, directories and JSON-LD. Same name wording too.
- sameAs only to real profiles that link back. Never buy mentions.
- YMYL: Google weights accuracy and E-E-A-T more; trust is the most important part. Show who, credentials, verifiable identifiers.

## Pitfalls seen in prerendered Vue SPAs
- Prerendered head tags without a marker attribute are duplicated when the client head manager appends its own set. Mark both, remove by marker.
- Placeholder canonical domains make every signal point at a host that does not serve the page.
