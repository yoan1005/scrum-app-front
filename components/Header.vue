<template>
  <div class="w-full bg-gray-600 h-20 flex items-center justify-between p-6">
    <nuxt-link to="/" class="font-bold">♥️ ♦️ POKER PLANNING ♠️ ♣️</nuxt-link>
    <div v-if="Object.keys(user).length" class="text-center">
      <div class="flex items-center text-xs">
        <div
          class="w-2 h-2 rounded-full mr-2"
          :class="$socket.connected ? 'bg-green-500' : 'bg-red-500'"
        ></div>
        <span>Server {{ $socket.connected ? "Online" : "Offline" }}</span>
      </div>

      <div class="flex items-center justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 mr-2"
          :class="user?.online ? 'text-green-500' : 'text-red-500'"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        {{ user?.pseudo }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $socket }: any = useNuxtApp();
const user = computed(() => useUserStore().getUser)
</script>
