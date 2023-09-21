<script setup lang="ts">
import { ref } from "vue";
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

const state = ref({
  pseudo: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.pseudo) errors.push({ path: "email", message: "Required" });
  return errors;
};

async function submit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);
}
</script>

<template>
  <UForm :validate="validate" :state="state" @submit="submit">
    <UInput
      color="white"
      variant="outline"
      name="pseudo"
      placeholder="Votre pseudo"
      class="mb-4"
    />

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
