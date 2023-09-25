<script setup lang="ts">
const user = useUserStore().getUser;
const { $socket }: any = useNuxtApp();
const toast = useToast()

$socket.on('error', (error: any) => {
  toast.add({
    id: 'error',
    title: 'Oups, something went wrong!',
    description: error.message,
    icon: 'i-heroicons-exclamation-triangle text-red-500',
    timeout: 0
  })
});
</script>

<template>
  <div
    class="antialiased text-gray-900 text-white bg-slate-800 h-screen w-screen flex flex-col"
  >
    <Header />
    <div class="flex items-center justify-center h-full max-w-7xl mx-auto">
      <slot />
    </div>
    <UNotifications />
  </div>
</template>
