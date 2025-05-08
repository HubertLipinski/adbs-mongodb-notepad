// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@sidebase/nuxt-auth', '@nuxt/ui'],
  ssr: false,

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    authSecret : process.env.AUTH_SECRET,
  },

  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'authjs',
      addDefaultCallbackUrl: false
    }
  }
})