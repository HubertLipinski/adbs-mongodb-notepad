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

  vite: {
    optimizeDeps: {
      include: ['@editorjs/editorjs'],
    },
  },

  auth: {
    isEnabled: true,
    globalAppMiddleware: true,
    auth: {
      provider: {
        type: 'local',
        endpoints: {
          signIn: { path: '/login', method: 'post' },
          signOut: { path: '/logout', method: 'post' },
        },
      },
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
