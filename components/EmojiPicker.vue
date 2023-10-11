<script setup lang="ts">

import data from './emojis-data.json';

const props = defineProps({
  show_arrow: {
    type: Boolean,
    required: false,
    default: true
  }
})

const emits = defineEmits({
  launch: (emoji) => ({ emoji })
});

const categories = computed(() => {
  return Object.keys(data);
});

const categoryEmojis = (category: string) => {
  return Object.values(data[category]);
};

const handleEmojiClick = (e: Event, emoji: string) => {
  e.preventDefault();
  emits('launch', emoji);
}; 


</script>

<template>
  <div class="emoji_picker">
    <div class="picker_container">
      <div class="category" v-for="category in categories" :key="`category_${category}`">
        <span>{{ category }}</span>
        <div class="emojis_container">
          <button @click="handleEmojiClick($event, emoji)" v-for="(emoji, index) in categoryEmojis(category)" :key="`emoji_${index}`">
            {{ emoji }}
          </button>
        </div>
      </div>
    </div>
    <div class="bottom_arrow" v-if="show_arrow"></div>
  </div>
</template>

<style scoped>

.emoji_picker
{
  position: absolute;left: 0; right: 0;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 20rem;
  max-width: 100%;
  text-align: left;
}

.emoji_picker,
.bottom_arrow
{
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, .0975);
}

.emoji_picker,
.picker_container
{
  border-radius: 0.5rem;
  background: white;
}

.picker_container
{
  position: relative;
  padding: 1rem;
  overflow: auto;
  z-index: 1;
}

.category
{
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  color: rgb(169, 169, 169);
}

.emojis_container
{
  display: flex;
  flex-wrap: wrap;
}

.category button
{
  margin: 0.25rem;
  margin-left: 0;
  background: inherit;
  border: none;
  font-size: 1rem;
  padding: 0;
}

.bottom_arrow
{
  position: absolute;
  left: 50%;
  top: 0;
  width: 0.75rem;
  height: 0.75rem;
  transform: translate(-50%, -50%) rotate(45deg);
  background: white;
}

</style>