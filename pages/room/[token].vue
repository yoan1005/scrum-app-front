<script setup lang="ts">
const { $socket }: any = useNuxtApp();
const route = useRoute();
const session = ref({})
watch(
  () => useUserStore().getUser.online,
  () => {
 
      $socket.emit("room:join", {
        token: useUserStore().getUser.token,
        pseudo: useUserStore().getUser.pseudo,
        roomId: route.params.token,
      });

  },
  { immediate: true }
);


$socket.on("room:joined", ({ room, user }: any) => {
  useUserStore().setUser(user)
  session.value = room
});
$socket.on("room:refreshed", ({ room }: any) => {
  session.value = room
});

</script>

<template>
  <div>
    <h1>{{ session.name }}</h1>
    <div>
      <h2>Participants</h2>
      <ul>
        <li v-for="user in session.users" :key="user.id">
          {{ user.pseudo }}
        </li>
      </ul>
    </div>
  </div>
</template>
