<script setup lang="ts">
const { $socket } = useNuxtApp();
import { useUserStore } from "~/stores/userStore";
const route = useRoute();
const session = ref({});
const me = computed(() => useUserStore().$state.user ?? null);

const revealed = ref(false);

watch(
  () => me.value.online,
  () => {
    $socket.emit("room:join", {
      token: me.value.token,
      pseudo: me.value.pseudo,
      roomId: route.params.token,
    });
  },
  { immediate: true }
);

$socket.on("room:refreshed", ({ room }) => {
  session.value = room;
});

$socket.on("room:revealing", ({ room }) => {
  session.value = room;
  revealed.value = true;
});

$socket.on("room:reseted", ({ room }) => {
  session.value = room;
  revealed.value = false;
});

const isModerator = computed(() => {
  return session.value.moderators
    ? session.value.moderators.includes(me.value.token)
    : false;
});

const cards = [
  "0",
  "0.5",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "20",
  "40",
  "100",
  "?",
  "☕️",
];

const vote = (card: string) => {
  if (revealed.value) return;
  $socket.emit("room:vote", {
    token: me.value.token,
    roomId: session.value.token,
    vote: card,
  });
};

const reveal = () => {
  $socket.emit("room:reveal", {
    token: me.value.token,
    roomId: session.value.token,
    reveal: true,
  });
};

const reset = () => {
  $socket.emit("room:reset", {
    token: me.value.token,
    roomId: session.value.token,
  });
};
</script>

<template>
  <div v-if="session.token" class="flex flex-col h-full justify-between">
    <div>
      <h1>{{ session.name }}</h1>
    </div>
    <div class="h-full">
      <h2>Participants</h2>
      <ul>
        <li v-for="user in session.users" :key="user.id">
          {{ user.pseudo }}
          <span v-if="user.lastVote"
            >({{
              !revealed && user.token !== me.token ? "?" : user.lastVote
            }})</span
          >
        </li>
      </ul>
    </div>
    <div class="card flex items-center w-full p-4">
      <p v-if="isModerator">
        <UButton
          v-if="!revealed"
          color="blue"
          variant="solid"
          @click="reveal()"
        >
          Reveal
        </UButton>
        <UButton
          v-if="revealed"
          color="orange"
          variant="solid"
          @click="reset()"
        >
          Reset
        </UButton>
      </p>
      <div
        v-for="card in cards"
        :key="card"
        class="mx-3 w-12 h-20 bg-blue-500 text-white font-bold flex items-center justify-center border-2 border-gray-200 shadow-md rounded-md cursor-pointer transition duration-300 transform hover:-translate-y-3"
        @click="vote(card)"
      >
        {{ card }}
      </div>
    </div>
  </div>
</template>
