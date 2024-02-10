<template>
  <div class="w-full flex flex-col gap-[25px] justify-start pb-[35px]">
    <!-- Title -->
    <div class="w-full flex justify-start items-center gap-4">
      <svg v-if="block_type = 'address'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
        fill="none">
        <path
          d="M13.3334 5.83333C13.3334 7.67428 11.841 9.16667 10.0001 9.16667C8.15913 9.16667 6.66675 7.67428 6.66675 5.83333C6.66675 3.99238 8.15913 2.5 10.0001 2.5C11.841 2.5 13.3334 3.99238 13.3334 5.83333Z"
          stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M10.0001 11.6667C6.77842 11.6667 4.16675 14.2783 4.16675 17.5H15.8334C15.8334 14.2783 13.2217 11.6667 10.0001 11.6667Z"
          stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M13.3334 5.83333C13.3334 7.67428 11.841 9.16667 10.0001 9.16667C8.15913 9.16667 6.66675 7.67428 6.66675 5.83333C6.66675 3.99238 8.15913 2.5 10.0001 2.5C11.841 2.5 13.3334 3.99238 13.3334 5.83333Z"
          stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M10.0001 11.6667C6.77842 11.6667 4.16675 14.2783 4.16675 17.5H15.8334C15.8334 14.2783 13.2217 11.6667 10.0001 11.6667Z"
          stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <h5 class="text-gray-900 font-extrabold text-sm leading-5">
        {{ block_title }}
      </h5>
      <div class="flex items-center justify-center w-full flex-1">
        <div class="border-b-2 border-b-gray-200 w-full"></div>
      </div>
    </div>
    <!-- Content -->
    <div class="w-full flex justify-start gap-[42px]">
      <div class="w-full flex-1 flex gap-y-5 ps-[60px]">
        <slot />
      </div>
      <div v-if="block_edit_link" class="flex flex-col justify-end h-[85px]">
        <NuxtLink :to="block_edit_link"
          class="bg-white rounded-md shadow-sm ring-1 ring-gray-300 w-[80px] h-[38px] flex justify-center items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path
              d="M14.0858 3.58579C14.8668 2.80474 16.1332 2.80474 16.9142 3.58579C17.6953 4.36683 17.6953 5.63316 16.9142 6.41421L16.1213 7.20711L13.2929 4.37868L14.0858 3.58579Z"
              fill="#6B7280" />
            <path d="M11.8787 5.79289L3.5 14.1716V17H6.32842L14.7071 8.62132L11.8787 5.79289Z" fill="#6B7280" />
          </svg>
          <span class="text-gray-700 text-sm font-semibold leading-5">{{ $t('edit_btn') }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const localePath = useLocalePath()
const props = defineProps({
  block_title: {
    type: String
  },
  block_type: {
    type: String
  },
  block_edit_link: {
    type: String
  },
})
</script>