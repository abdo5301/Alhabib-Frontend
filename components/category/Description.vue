<template>
  <div class="flex flex-col lg:gap-8 gap-5 justify-start">
    <h3 class="font-bold lg:text-2xl text-base leading-5 text-gray-900">
      {{ title }}
    </h3>
    <div v-html="content" class="font-light lg:font-normal lg:text-base text-xs leading-5 text-gray-900">
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String
  },
  content: {
    type: String
  }
});
</script> 