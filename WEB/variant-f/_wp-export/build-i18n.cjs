#!/usr/bin/env node
/**
 * Generate translated, WP-ready page HTML for DLL-Transports from the LV source
 * pages. Output is minified single-line HTML with:
 *   - text translated via per-language dictionaries (exact-substring replace)
 *   - internal links rewritten to each language's localized slug + lang prefix
 *   - the language switcher rebuilt as working <a> links (active lang highlighted)
 *
 * Per-language localized slugs (better SEO + avoids WP slug "-2" collisions):
 *   services: lv pakalpojumi | en services | ru uslugi | de leistungen
 *   contact : lv kontakti    | en contact  | ru kontakty| de kontakt
 *   home    : front page (URL is just /{lang}/)
 *
 * Usage: node build-i18n.cjs [lang ...]   (default: en ru de)
 * Output: i18n/{lang}/{home,services,contact}.html
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'pages');
const OUT = path.join(ROOT, 'i18n');
const MEDIA = 'https://dll.coredigify.com/wp-content/uploads/2026/06';

const PAGES = ['home', 'services', 'contact'];
const ALL_LANGS = ['lv', 'en', 'ru', 'de'];
const LABELS = { lv: 'LV', en: 'EN', ru: 'RU', de: 'DE' };

// Localized slug per page per language. '' = front page (no slug segment).
const SLUG = {
  home:     { lv: '', en: '', ru: '', de: '' },
  services: { lv: 'pakalpojumi', en: 'services', ru: 'uslugi', de: 'leistungen' },
  contact:  { lv: 'kontakti', en: 'contact', ru: 'kontakty', de: 'kontakt' },
};

// Public URL path for a page in a language, e.g. ('en','services') -> /en/services/
function langPath(lang, page) {
  const pref = lang === 'lv' ? '' : lang + '/';
  const slug = SLUG[page][lang];
  return '/' + pref + (slug ? slug + '/' : '');
}

function switcher(curLang, page) {
  const links = ALL_LANGS.map((L) => {
    const on = L === curLang ? ' class="on"' : '';
    return `<a${on} href="${langPath(L, page)}">${LABELS[L]}</a>`;
  }).join('');
  return `<div class="lang">${links}</div>`;
}

const DICT = require('./i18n-dict.cjs');

function minify(html) {
  return html
    .replace(/\{\{MEDIA\}\}/g, MEDIA)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/[\t\r\n]+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function translate(html, lang) {
  if (lang === 'lv') return html;
  const dict = DICT[lang] || {};
  const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
  for (const k of keys) html = html.split(k).join(dict[k]);
  return html;
}

// Rewrite LV-source internal links to the target language's localized paths.
function rewriteLinks(html, lang) {
  const home = langPath(lang, 'home');         // /en/
  const services = langPath(lang, 'services'); // /en/services/
  const contact = langPath(lang, 'contact');   // /en/contact/
  return html
    .split('href="/pakalpojumi/').join(`href="${services}`)
    .split('href="/kontakti/').join(`href="${contact}`)
    .split('href="/#').join(`href="${home}#`)
    .split('href="/"').join(`href="${home}"`);
}

function injectSwitcher(html, curLang, page) {
  return html.replace(/<div class="lang">[\s\S]*?<\/div>/, switcher(curLang, page));
}

const langs = process.argv.slice(2).length ? process.argv.slice(2) : ['en', 'ru', 'de'];

for (const lang of langs) {
  const dir = path.join(OUT, lang);
  fs.mkdirSync(dir, { recursive: true });
  for (const page of PAGES) {
    let html = minify(fs.readFileSync(path.join(SRC, `${page}.html`), 'utf8'));
    html = translate(html, lang);
    html = rewriteLinks(html, lang);
    html = injectSwitcher(html, lang, page);
    fs.writeFileSync(path.join(dir, `${page}.html`), html);
  }
  console.log(`[i18n] ${lang}: built ${PAGES.length} pages -> i18n/${lang}/  (slugs: services=${SLUG.services[lang]}, contact=${SLUG.contact[lang]})`);
}
