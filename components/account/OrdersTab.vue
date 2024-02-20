<template>
  <button type="button" @click="$emit('clickTab', item_type)"
    :class="['py-[9px] px-[13px] hover:rounded-md hover:bg-gray-200 hover:shadow-sm hover:text-gray-900 lg:text-lg text-sm font-semibold leading-5', item_type == active_tab ? 'text-gray-900 bg-gray-200 rounded-md shadow-sm' : 'text-gray-500']">
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
    default: 'all'
  }
})
</script>