<template>
  <div class="flex flex-col lg:gap-8 gap-5 justify-start">
    <h1 v-if="h1" class="font-bold lg:text-2xl text-base leading-5 text-gray-900">
      {{ title }}
    </h1>
    <h2 v-else class="font-bold lg:text-2xl text-base leading-5 text-gray-900">
      {{ title }}
    </h2>
    <div v-html="decodeHtml(content)" class="font-light lg:font-normal lg:text-base text-xs leading-5 text-gray-900">
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String
  },
  content: {
    type: String
  },
  h1: {
    type: Boolean,
    default: false
  }
});

</script>