<template>
  <button type="button" @click="$emit('clickTab', item_type)"
    :class="['w-[90px] h-[32px] lg:w-[180px] lg:h-[40px] px-3 flex justify-center items-center rounded-md ring-1 text-xs lg:text-base lg:leading-6 font-semibold', item_type == active_tab ? 'text-blue-800 bg-blue-50 ring-blue-900 shadow-2xl' : 'text-gray-500 bg-white ring-gray-400 ']">
    <slot />
  </button>
</template>

<script setup>
const emits = defineEmits(['clickTab'])
const props = defineProps({
  item_type: {
    type: String
  },
  active_tab: {
    type: String,
    default: 'get-all'
  }
})
</script>