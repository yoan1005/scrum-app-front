// Init socketio connection in TS
import { io } from "socket.io-client";

export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig()
  const socket = io(runtimeConfig.public.socketServer);

  nuxtApp.provide('socket', socket)
})