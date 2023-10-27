<script setup lang="ts">
const { $socket } = useNuxtApp();
import { useUserStore } from "@/stores/userStore";
const route = useRoute();
const session = ref({});
const me = computed(() => useUserStore().$state.user ?? null);

const revealed = ref(false);
const surpriseMe = ref(false);

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

$socket.on("room:user_reacted", ({ user, emoji }) => {
  //  client only
  if (process.client) {
    
    setTimeout(() => {
      const emojiElement = document.createElement("div");
      emojiElement.innerHTML = emoji;
      emojiElement.classList.add("emoji");
      emojiElement.style.left = `${Math.round(Math.random() * 100)}%`;
      document.body.appendChild(emojiElement);
      setTimeout(() => {
        emojiElement.remove();
      }, 2000);
    }, 100);
  }
});

const isModerator = computed(() => {
  return session.value.moderators
  ? session.value.moderators.includes(me.value.token)
  : false;
});

const avgVotes = computed(() => {
  return (
  session.value.users
  .filter((user) => user.lastVote && !isNaN(user.lastVote))
  .reduce((acc, user) => acc + parseFloat(user.lastVote), 0) /
  session.value.users.filter((user) => user.lastVote && !isNaN(user.lastVote))
  .length
  ) 
});

const firework = computed(() => {
  return session.value.users
  .filter((user) => user.lastVote && !isNaN(user.lastVote))
  .every(
  (val) =>
  val.lastVote ==
  session.value.users.filter(
  (user) => user.lastVote && !isNaN(user.lastVote)
  )[0].lastVote
  );
});

const lastUserVote = (user) =>
!revealed.value && user.token !== me.value.token ? "👀" : user.lastVote;

const cards = [
"0",
"0.5",
"1",
"2",
"3",
"5",
"8",
"13",
"21",
"34",
"55",
"?",
'<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M128 29.5c-6.557 0-12.898 3.62-18.146 10.924C104.604 47.728 101 58.51 101 70.596c0 12.085 3.605 22.866 8.854 30.17 5.248 7.303 11.59 10.923 18.146 10.923 6.557 0 12.898-3.62 18.146-10.924 5.25-7.304 8.854-18.085 8.854-30.17 0-12.086-3.605-22.868-8.854-30.172C140.898 33.12 134.556 29.5 128 29.5zm256 0c-6.557 0-12.898 3.62-18.146 10.924C360.604 47.728 357 58.51 357 70.596c0 12.085 3.605 22.866 8.854 30.17 5.248 7.303 11.59 10.923 18.146 10.923 6.557 0 12.898-3.62 18.146-10.924 5.25-7.304 8.854-18.085 8.854-30.17 0-12.086-3.605-22.868-8.854-30.172C396.898 33.12 390.556 29.5 384 29.5zm-235.736 93.912c-5.99 3.932-12.87 6.277-20.264 6.277-7.25 0-13.996-2.26-19.902-6.053l-2.67 2.67c.905 4.4 3.467 9.56 7.77 15.298 3.93 5.24 9.223 10.835 14.802 16.532 5.58-5.697 10.87-11.292 14.8-16.532 4.402-5.868 6.963-11.122 7.81-15.584l-2.346-2.608zm215.472 0l-2.345 2.61c.846 4.46 3.408 9.715 7.81 15.583 3.93 5.24 9.22 10.835 14.8 16.532 5.58-5.697 10.87-11.292 14.8-16.532 4.305-5.74 6.867-10.9 7.772-15.298l-2.67-2.67c-5.906 3.792-12.653 6.052-19.902 6.052-7.395 0-14.273-2.346-20.264-6.278zM88.998 134.826l-31.93 10.643c.077 28.387 1.13 55.42 13.496 82.132 43.338 13.938 71.534 13.938 114.872 0 12.367-26.712 13.42-53.745 13.496-82.133l-31.93-10.644c-2.11 6.28-5.692 12.1-9.803 17.58-6.577 8.768-14.837 16.963-22.837 24.963L128 183.733l-6.363-6.365c-8-8-16.26-16.196-22.836-24.964-4.11-5.48-7.693-11.3-9.802-17.58zm256 0l-31.93 10.643c.077 28.387 1.13 55.42 13.496 82.132 43.338 13.938 71.534 13.938 114.872 0 12.367-26.712 13.42-53.745 13.496-82.133l-31.93-10.644c-2.11 6.28-5.692 12.1-9.803 17.58-6.577 8.768-14.837 16.963-22.837 24.963L384 183.733l-6.363-6.365c-8-8-16.26-16.196-22.836-24.964-4.11-5.48-7.693-11.3-9.802-17.58zM18 146.5v36h22.44c-1.203-12.188-1.39-24.202-1.422-36H18zm198.982 0c-.03 11.798-.22 23.812-1.42 36h80.878c-1.203-12.188-1.39-24.202-1.422-36h-78.036zm256 0c-.03 11.798-.22 23.812-1.42 36H494v-36h-21.018zM73 247.24v63.45c5.94 4.56 14.298 7.316 23 7.316 8.627 0 17.07-2.6 23-7.086v-27.914h18v27.914c5.93 4.487 14.373 7.086 23 7.086 8.702 0 17.06-2.757 23-7.317v-63.45c-39.33 11.437-70.67 11.437-110 0zm256 0v63.45c5.94 4.56 14.298 7.316 23 7.316 8.627 0 17.07-2.6 23-7.086v-27.914h18v27.914c5.93 4.487 14.373 7.086 23 7.086 8.702 0 17.06-2.757 23-7.317v-63.45c-39.33 11.437-70.67 11.437-110 0zm-210 84.252c-7.228 3.056-15.142 4.514-23 4.514-7.847 0-15.77-1.42-23-4.45v27.364c5.93 4.487 14.373 7.086 23 7.086s17.07-2.6 23-7.086v-27.428zm18 0v27.428c5.93 4.487 14.373 7.086 23 7.086s17.07-2.6 23-7.086v-27.363c-7.23 3.03-15.153 4.45-23 4.45-7.858 0-15.772-1.46-23-4.515zm238 0c-7.228 3.056-15.142 4.514-23 4.514-7.847 0-15.77-1.42-23-4.45v27.364c5.93 4.487 14.373 7.086 23 7.086s17.07-2.6 23-7.086v-27.428zm18 0v27.428c5.93 4.487 14.373 7.086 23 7.086s17.07-2.6 23-7.086v-27.363c-7.23 3.03-15.153 4.45-23 4.45-7.858 0-15.772-1.46-23-4.515zm-274 48c-7.228 3.056-15.142 4.514-23 4.514-6.4 0-12.813-1.076-18.898-3.068 1.1 3.693 2.132 7.308 3.437 11.222 2.93 8.792 6.073 17.492 7.564 25.846H119v-38.514zm18 0v24.373c4.736-7.94 11.14-14.775 18.723-20.02-6.43-.438-12.806-1.85-18.723-4.353zm238 0c-7.228 3.056-15.142 4.514-23 4.514-6.4 0-12.813-1.076-18.898-3.068 1.1 3.693 2.132 7.308 3.437 11.222 2.93 8.792 6.073 17.492 7.564 25.846H375v-38.514zm18 0v38.514h30.896c1.49-8.354 4.634-17.054 7.565-25.846 1.306-3.914 2.34-7.53 3.438-11.223-6.085 1.993-12.497 3.07-18.898 3.07-7.858 0-15.772-1.46-23-4.515zM192 390.5c-25.512 0-46 20.488-46 46s20.488 46 46 46 46-20.488 46-46-20.488-46-46-46zM89 436.006v44h56.156C134.526 468.57 128 453.274 128 436.5c0-.166.01-.33.012-.494H89zm256 0v44h78v-44h-78z"/></svg>',
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

const launchEmoji = (emoji) => {
  $socket.emit("room:user_react", {
    token: me.value.token,
    roomId: session.value.token,
    emoji
  });
  surpriseMe.value = false;
};
</script>

<template>
  <section class="flex flex-col items-start h-full w-full ">
    <div class="table fixed inset-0 h-full w-full"></div>
    
    <div class="w-full h-[60vh] mt-8 relative grid grid-cols-5 gap-4">
      <div v-for="user in session.users" :key="user.token" class="w-52 bg-gray-800 h-52 rounded-lg shadow-md p-4 text-white transition-transform transform hover:-translate-y-2 cursor-pointer flex flex-col items-center justify-between"> 
        
        <div class="flex flex-col items-center gap-2">
          <div
          v-if="user.lastVote"
          class="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center text-3xl p-4 text-black "
          v-html="lastUserVote(user)"
          ></div>
          <img v-else :src="user.avatar" class="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center object-cover overflow-hidden" />
          <p class="text-base font-bold">{{ user.pseudo }}</p>
        </div>
        <div class="actions mt-4 space-x-2">
          <div v-if="isModerator && me.token === user.token">
            <UButton
            v-if="!revealed"
            color="blue"
            variant="solid"
            class="dark:text-white"
            @click="reveal()"
            >
            Reveal votes
          </UButton>
        </div>
        <div v-else-if="user.token === me.token && !isModerator" class="mx-auto text-center">
          <UButton
          color="yellow"
          variant="solid"
          class="dark:text-white"
          @click="surpriseMe = !surpriseMe"
          >
          React !
        </UButton>
        <EmojiPicker v-show="surpriseMe" @launch="launchEmoji"/>
      </div>
      </div>
    </div> 
  </div>
  <div class="absolute bottom-0 right-0 left-0 m-4 w-full">
    <div class="card flex items-center justify-center w-full p-4">
      <div
      v-for="(card, index) in cards"
      :key="card"
      class="mx-3 w-16 h-24 bg-green-800 text-xl text-white font-bold flex items-center justify-center border-2 border-gray-200 shadow-md rounded-md cursor-pointer transition duration-300 transform hover:-translate-y-3 p-1"
      :class="
      revealed && card >= avgVotes && cards[index - 1] < avgVotes
      ? 'bg-blue-700 -translate-y-3 cardReveal'
      : ''
      "
      @click="vote(card)"
      v-html="card"
      />
    </div>
  </div> 
  <!-- class for modal overlay  -->
  <div v-if="session && revealed" class="bg-black bg-opacity-50 fixed inset-0">
    <UAlert
    title="<i>Reveal !</i>"
    icon="i-heroicons-sparkles"
    class="mt-5 fixed left-1/2 top-32 transform -translate-x-1/2 -translate-y-1/2 z-50 w-2/3 h-30 z-50"
    >
    <template #title="{ title }">
      <span v-html="title" />
    </template>
    <template #description>
      <div class="mt-3 flex flex-col items-between justify-between">
        <p>
          {{ session.users.filter((user) => user.lastVote).length }} /
          {{ session.users.length }} votes ({{
            session.users
            .filter((user) => user.lastVote)
            .map((user) => user.pseudo)
            .join(", ")
          }})
        </p>
        
        <div class="mt-6 flex justify-between w-full">
          <UButton
          v-if="isModerator && revealed"
          color="orange"
          variant="solid"
          class="dark:text-white"
          @click="reset()"
          >
          Start new vote
        </UButton>
        <p v-else></p>
        <p class="text-right">
          <b
          >Total:
          {{
            session.users
            .filter((user) => user.lastVote && !isNaN(user.lastVote))
            .reduce((acc, user) => acc + parseFloat(user.lastVote), 0)
          }}
          / Avg:
          {{ avgVotes.toFixed(2) }}
        </b>
      </p>
    </div>
  </div> 
  
</template>
</UAlert>
<Fireworks v-if="revealed && firework" />
</div>

</section>
</template>

<style>
.table {
  z-index: 0;
  background: rgb(36,171,39);
  background: -moz-radial-gradient(circle, rgba(36,171,39,1) 0%, rgba(71,135,4,1) 50%);
  background: -webkit-radial-gradient(circle, rgba(36,171,39,1) 0%, rgba(71,135,4,1) 50%);
  background: radial-gradient(circle, rgba(36,171,39,1) 0%, rgba(71,135,4,1) 50%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#24ab27",endColorstr="#478704",GradientType=1);
} 

.emoji {
  position: fixed;
  z-index: 9999;
  bottom: 0%;
  transform: translate(-50%, -50%);
  animation: emoji 2.3s ease-in-out;
}

/* animation css for fly to up  */
@keyframes emoji {
  0% {
    bottom: 0%;
    opacity: 1;
    font-size: 3.3em;
  }
  100% {
    bottom: 100%;
    opacity: 0;
    font-size: .3em;
  }
}

.cardReveal {
  animation: cardReveal 1s ease-in-out forwards;
}

@keyframes cardReveal {
  0% { 
    transform: scale(1);
  }
  100% { 
    transform: translate(-50%, -50%) scale(1.5);
    z-index: 9999;
  }
}

</style>
