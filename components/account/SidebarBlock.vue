<template>
  <!-- Divider -->
  <div v-if="divider" class="lg:px-[38px] px-[20px] flex items-center justify-center w-full">
    <div class="border-b border-b-[#E5E7EB] w-full"></div>
  </div>
  <!-- Title -->
  <h5 v-if="title" class="lg:px-[38px] px-[20px] text-gray-500 font-semibold text-xl flex justify-start">{{ title }}</h5>
  <!-- Links -->
  <div
    class="flex justify-start flex-col lg:gap-[18px] gap-[22px] text-gray-700 lg:text-lg text-base font-bold leading-5">
    <AccountSidebarBlockItem v-for="(item, index) in links" :key="index" :item_key="item.key" :item_name="item.name"
      :item_link="item.link" :item_icon="item.icon" />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String
  },
  links: {
    type: Object
  },
  divider: {
    type: Boolean,
    default: false
  }
})
</script>
