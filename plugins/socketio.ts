// Init socketio connection in TS
import { io } from "socket.io-client";
import { useUserStore } from "~/stores/userStore";

export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig()
  const socket = io(runtimeConfig.public.socketServer);
  
  socket.on("connect", () => {
    socket.emit("users:initialisation", { user: useUserStore().getUser })
  })

  socket.on("disconnect", () => {
    useUserStore().setUser({ ...useUserStore().getUser, online: false })
  })

  socket.on("users:initialisation", ({ user }: { user: User }) => {
    useUserStore().setUser(user)
  })

  socket.on("users:disconnected", ({ user }: { user: User }) => {
    useUserStore().setUser(user)
  })

  nuxtApp.provide('socket', socket)
})