import { defineConfig } from 'aeo.js';

export default defineConfig({
  title: 'Youssef Elsaid - Software Engineer & AI Architect | pplo.dev',
  url: 'https://pplo.dev',
  description:
    'Youssef Elsaid (pplo) — Software Engineer & AI Architect from Alexandria, Egypt. 10+ years specializing in Python, Machine Learning, and scalable full-stack web applications.',
  outDir: 'public',

  schema: {
    enabled: true,
    organization: {
      name: 'Youssef Elsaid',
      url: 'https://pplo.dev',
      logo: 'https://s6.imgcdn.dev/YBxHLg.png',
      sameAs: [
        'https://github.com/youssef-pplo',
        'https://instagram.com/pplo.dev'
      ],
    },
    defaultType: 'WebPage',
  },

  og: {
    enabled: true,
    image: 'https://s6.imgcdn.dev/YBxHLg.png',
    twitterHandle: '@pplo_dev',
    type: 'website',
  },

  generators: {
    robotsTxt: true,
    llmsTxt: true,
    llmsFullTxt: true,
    rawMarkdown: true,
    manifest: true,
    sitemap: true,
    aiIndex: true,
    schema: true,
  },

  robots: {
    allow: ['/'],
    disallow: [],
    crawlDelay: 0,
    sitemap: 'https://pplo.dev/sitemap.xml',
  },

  widget: {
    enabled: false,
  },
});
