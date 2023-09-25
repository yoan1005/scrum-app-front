// Init socketio connection in TS
import { io } from "socket.io-client";

export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig()
  const socket = io(runtimeConfig.public.socketServer);
  
  socket.on("connect", () => {
    socket.emit("users:initialisation", { user: useUserStore().getUser });
  });

  socket.on("disconnect", () => {
    useUserStore().setUser({ ...useUserStore().getUser, online: false });
  });

  socket.on("users:initialisation", ({ user }) => {
    useUserStore().setUser(user);
  });
  
  socket.on("users:disconnected", ({ user }) => {
    useUserStore().setUser(user);
  });
  nuxtApp.provide('socket', socket)
})