<template>
  <div class="flex justify-start items-center gap-[5px] text-gray-700 text-sm font-semibold leading-5">
    <span>{{ item_title }}:</span>
    <span class="font-bold" v-if="is_phone" dir="ltr">{{ item_content }}</span>
    <span class="font-bold" v-else>{{ item_content }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  item_title: {
    type: String
  },
  item_content: {
    type: String
  },
  is_phone: {
    type: Boolean,
    default: false
  }
})
</script>