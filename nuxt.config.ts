// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  ssr: false,

  runtimeConfig: {
    MONGODB_URL: process.env.MONGODB_URL,
  }
})