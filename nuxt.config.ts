import tailwindcss from "@tailwindcss/vite";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const Preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{stone.50}",
      100: "{stone.100}",
      200: "{stone.200}",
      300: "{stone.300}",
      400: "{stone.400}",
      500: "{stone.500}",
      600: "{stone.600}",
      700: "{stone.700}",
      800: "{stone.800}",
      900: "{stone.900}",
      950: "{stone.950}",
    },
  },
});

export default defineNuxtConfig({
  site: {
    url: "https://controlla.com.mx",
    name: "Controlla",
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://controlla.com.mx",
      web3formsApiKey: process.env.NUXT_PUBLIC_WEB3FORMS_API_KEY || "",
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  nitro: {
    preset: "netlify",
  },
  app: {
    head: {
      titleTemplate: "%s",
      meta: [
        { name: "theme-color", content: "#2563eb" },
        { name: "apple-mobile-web-app-title", content: "Controlla" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-96x96.png",
          sizes: "96x96",
        },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: [
    "~/assets/css/main.css",
    "primeicons/primeicons.css",
    "locomotive-scroll/dist/locomotive-scroll.css",
  ],
  modules: [
    "@primevue/nuxt-module",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxtjs/i18n",
  ],
  i18n: {
    baseUrl: "https://controlla.com.mx",
    locales: [
      { code: "en", language: "en-US", name: "English", file: "en.json" },
      { code: "es", language: "es-MX", name: "Español", file: "es.json" },
    ],
    langDir: "locales",
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
  },
  // Sin IPX: en dev las imágenes de ~/assets se sirven como /_nuxt/* desde Vite; IPX solo ve `public/`
  // en disco y no puede abrir esos assets, así que las peticiones a /_ipx/* fallan.
  image: {
    provider: "none",
    quality: 80,
  },
  robots: {
    sitemap: ["/sitemap.xml"],
  },
  sitemap: {
    defaults: {
      changefreq: "weekly",
      priority: 0.7,
    },
  },
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Preset,
      },
    },
  },
  fonts: {
    provider: "google",
    families: [
      {
        name: "Inter",
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
