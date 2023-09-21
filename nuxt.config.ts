// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  plugins: [
    '~/plugins/socketio.ts',
  ],
  runtimeConfig: {
    public: {
      socketServer: process.env.SOCKET_SERVER,
    }
  },
  ui: {
    primary: 'green',
    gray: 'cool'
  }
})
