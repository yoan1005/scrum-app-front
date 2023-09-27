<script setup lang="ts">
const { $socket } = useNuxtApp();
import { useUserStore } from "@/stores/userStore";
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

const lastUserVote = (user) =>
  !revealed.value && user.token !== me.value.token ? "?" : user.lastVote;

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
  <section class="flex flex-col items-start h-full">
    <UCard v-if="session.token" class="text-black mt-12">
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">{{ session.name }}</h1>
          <div v-if="isModerator">
            <UButton
              v-if="!revealed"
              color="blue"
              variant="solid"
              @click="reveal()"
            >
              Reveal votes
            </UButton>
            <UButton
              v-if="revealed"
              color="orange"
              variant="solid"
              @click="reset()"
            >
              Start new vote
            </UButton>
          </div>
        </div>
      </template>
      <div></div>
      <div class="h-full">
        <ul class="flex gap-x-4">
          <li v-for="user in session.users" :key="user.id">
            <div class="flex flex-col justify-center items-center">
              <UAvatar
                v-if="user.lastVote"
                size="3xl"
                :text="lastUserVote(user)"
                :chip-color="user.online ? 'green' : 'red'"
              />
              <UAvatar
                v-else
                :src="user.avatar"
                size="3xl"
                :chip-color="user.online ? 'green' : 'red'"
              />
              <span class="ml-2">{{ user.pseudo }}</span>
            </div>
          </li>
        </ul>
      </div>
      <template #footer>
        <div class="card flex items-center w-full p-4">
          <div
            v-for="card in cards"
            :key="card"
            class="mx-3 w-12 h-20 bg-blue-500 text-white font-bold flex items-center justify-center border-2 border-gray-200 shadow-md rounded-md cursor-pointer transition duration-300 transform hover:-translate-y-3"
            @click="vote(card)"
          >
            {{ card }}
          </div>
        </div>
      </template>
    </UCard>

    <UAlert
      v-if="session && revealed"
      title="<i>Reveal !</i>"
      icon="i-heroicons-sparkles"
      class="mt-5"
    >
      <template #title="{ title }">
        <span v-html="title" />
      </template>
      <template #description>
        <p>
          {{ session.users.filter((user) => user.lastVote).length }} /
          {{ session.users.length }} votes ({{
            session.users
              .filter((user) => user.lastVote)
              .map((user) => user.pseudo)
              .join(", ")
          }})
        </p>
        <br />
        <p class="text-right">
          <b
            >Total:
            {{
              session.users
                .filter((user) => user.lastVote && !isNaN(user.lastVote))
                .reduce((acc, user) => acc + parseFloat(user.lastVote), 0)
            }}
            / Avg:
            {{
              session.users
                .filter((user) => user.lastVote && !isNaN(user.lastVote))
                .reduce((acc, user) => acc + parseFloat(user.lastVote), 0) /
              session.users.filter((user) => user.lastVote).length
            }}
          </b>
        </p>
      </template>
    </UAlert>
  </section>
</template>
