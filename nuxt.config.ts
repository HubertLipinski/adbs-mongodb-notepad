// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@sidebase/nuxt-auth', '@nuxt/ui'],
  ssr: false,
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false,
  },

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    authSecret: process.env.AUTH_SECRET,
  },
  compatibilityDate: '2024-11-01',

  // auth: {
  //   globalAppMiddleware: true,
  //   provider: {
  //     type: 'authjs',
  //     addDefaultCallbackUrl: false
  //   }
  // }

  vite: {
    optimizeDeps: {
      include: ['@editorjs/editorjs'],
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
