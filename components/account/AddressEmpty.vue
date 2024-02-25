<template>
  <div class="flex gap-8 flex-col justify-center items-center h-[300px]">
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="45" viewBox="0 0 50 45" fill="none">
      <path
        d="M26.8125 30V11.25C26.8125 10.2145 25.8891 9.375 24.75 9.375H8.25C7.11091 9.375 6.1875 10.2145 6.1875 11.25V30C6.1875 31.0355 7.11091 31.875 8.25 31.875H10.3125M26.8125 30C26.8125 31.0355 25.8891 31.875 24.75 31.875H18.5625M26.8125 30L26.8125 15C26.8125 13.9645 27.7359 13.125 28.875 13.125H34.2082C34.7552 13.125 35.2798 13.3225 35.6666 13.6742L42.7084 20.0758C43.0952 20.4275 43.3125 20.9044 43.3125 21.4017V30C43.3125 31.0355 42.3891 31.875 41.25 31.875H39.1875M26.8125 30C26.8125 31.0355 27.7359 31.875 28.875 31.875H30.9375M10.3125 31.875C10.3125 33.9461 12.1593 35.625 14.4375 35.625C16.7157 35.625 18.5625 33.9461 18.5625 31.875M10.3125 31.875C10.3125 29.8039 12.1593 28.125 14.4375 28.125C16.7157 28.125 18.5625 29.8039 18.5625 31.875M30.9375 31.875C30.9375 33.9461 32.7843 35.625 35.0625 35.625C37.3407 35.625 39.1875 33.9461 39.1875 31.875M30.9375 31.875C30.9375 29.8039 32.7843 28.125 35.0625 28.125C37.3407 28.125 39.1875 29.8039 39.1875 31.875"
        stroke="#111827" stroke-width="2" />
    </svg>
    <span class="text-gray-900 text-base font-medium leading-5">{{ $t('text_empty_addresses') }}</span>
    <NuxtLink :to="localePath('/account/address/add')"
      class="mt-2 bg-black w-[200px] h-[38px] rounded-md shadow-sm flex justify-center items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M10 5C10.5523 5 11 5.44772 11 6V9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H11V14C11 14.5523 10.5523 15 10 15C9.44771 15 9 14.5523 9 14V11H6C5.44772 11 5 10.5523 5 10C5 9.44771 5.44772 9 6 9L9 9V6C9 5.44772 9.44771 5 10 5Z"
          fill="white" />
      </svg>
      <span class="text-base font-bold text-white leading-5">{{ $t('add_address') }}</span>
    </NuxtLink>
  </div>
</template>

<script setup>
const emits = defineEmits(['newAddressForm'])
const localePath = useLocalePath()
</script>