import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['ru'],
  },
  bootstrap(app: StrapiApp) {
    // Prevent browser auto-translation (Google Translate, DeepL, etc.)
    // from breaking the admin panel's React DOM
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.setAttribute('lang', 'en');

    const meta = document.createElement('meta');
    meta.name = 'google';
    meta.content = 'notranslate';
    document.head.appendChild(meta);
  },
};
