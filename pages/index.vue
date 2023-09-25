<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
const { $socket }: any = useNuxtApp();
const router = useRouter();
const stateLogin = ref({
  pseudo: useUserStore().getUser.pseudo,
  roomId: undefined,
});
const stateRoom = ref({
  pseudo: useUserStore().getUser.pseudo,
  name: "",
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.pseudo) errors.push({ path: "pseudo", message: "requis" });
  if (!state.roomId) errors.push({ path: "roomId", message: "requis" });
  return errors;
};

async function login(event: FormSubmitEvent<any>) {
  const { pseudo, roomId } = event.data;
  $socket.emit("room:join", {
    token: useUserStore().getUser.token,
    pseudo,
    roomId,
  });
}
async function createRoom(event: FormSubmitEvent<any>) {
  const { pseudo, name } = event.data;
  $socket.emit("room:create", { 
    pseudo,
    name,
    user: useUserStore().getUser
   });
}

$socket.on("room:created", ({ room, user }: any) => {
  useUserStore().setUser(user);
  router.push(`/room/${room.token}`);
});

$socket.on("room:joined", ({ room, user }: any) => {
  useUserStore().setUser(user);
  router.push(`/room/${room.token}`);
});
</script>

<template>
  <div class="grid grid-cols-2 items-center text-center divide-x">
    <div class="p-6">
      <p>
        Vous êtes scrum master et souhaitez créer <br />
        une nouvelle session de poker planning:
      </p>
      <br />
      <UForm :state="stateRoom" @submit="createRoom">
        
        <UFormGroup class="text-left mb-3" name="name" required>
          <UInput
            color="white"
            variant="outline"
            name="name"
            v-model="stateRoom.name"
            placeholder="Nom de la session"
          />
        </UFormGroup>
        <UFormGroup class="text-left mb-3" name="pseudo" required>
          <UInput
            color="white"
            variant="outline"
            name="pseudo"
            v-model="stateRoom.pseudo"
            placeholder="Votre pseudo"
          />
        </UFormGroup>
        <UButton type="submit"> Créer une nouvelle session </UButton>
      </UForm>
    </div>
    <div class="p-6">
      <p>Se connecter à une session en cours:</p>
      <br />
      <UForm :validate="validate" :state="stateLogin" @submit="login">
        <UFormGroup class="text-left mb-3" name="roomId" required>
          <UInput
            color="white"
            variant="outline"
            name="roomId"
            v-model="stateLogin.roomId"
            placeholder="Identifiant de la session"
          />
        </UFormGroup>
        <UFormGroup class="text-left mb-3" name="pseudo" required>
          <UInput
            color="white"
            variant="outline"
            name="pseudo"
            v-model="stateLogin.pseudo"
            placeholder="Votre pseudo"
          />
        </UFormGroup>

        <UButton type="submit" class="w-full justify-center">
          Connexion
        </UButton>
      </UForm>
    </div>
  </div>
</template>
