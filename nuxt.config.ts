// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  plugins: [
    '~/plugins/socketio.ts',
  ],
  runtimeConfig: {
    public: {
      socketServer: process.env.SOCKET_SERVER,
    }
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  }
})
