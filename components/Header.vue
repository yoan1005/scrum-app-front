<template>
  <div class="w-full bg-gray-600 h-20 flex items-center justify-between p-6">
    <h1 class="font-bold">♥️ ♦️ POKER PLANNING ♠️ ♣️</h1>
    <div v-if="user" class="text-center">
      <div v-if="props.online" class="flex items-center text-xs">
        <div class="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
        <p>Online</p>
      </div>
      <div v-else class="flex items-center text-xs">
        <div class="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
        <p>Offline</p>
      </div>
      <div class="flex items-center justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 mr-2"
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
import { defineProps } from "vue";
import type { PropType } from "vue";

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  online: {
    type: Boolean,
    required: true,
  },
});
</script>
