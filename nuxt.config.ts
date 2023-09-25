// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  plugins: [
    '~/plugins/socketio.ts',
  ],
  runtimeConfig: {
    public: {
      socketServer: process.env.SOCKET_SERVER,
    }
  }
})
