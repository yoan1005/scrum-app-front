<template>
  <div
    class="antialiased text-gray-900 text-white bg-slate-800 h-screen w-screen flex flex-col"
  >
    <Header :user="user" :online="online" />
    <div class="flex items-center justify-center h-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const { $socket } = useNuxtApp();
const user = useUser().getUser();
const online = ref($socket.connected);
$socket.on("connect", () => {
  $socket.emit("users:initialisation");
});
$socket.on("users:initialisation", ({ user }) => {
  useUser().setUser(user);
});
</script>
