// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@sidebase/nuxt-auth'],
  ssr: false,

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI
  },

  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    }
  }
})