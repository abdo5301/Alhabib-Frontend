<template>
  <ol class="my-[41px] lg:my-[38px] lg:gap-4 gap-[10px] flex items-center justify-center flex-wrap">
    <li class="flex flex-shrink-0 items-center">
      <div
        :class="[step != 'select_payment' ? 'text-gray-500 lg:text-gray-600 font-bold lg:font-extrabold text-sm lg:text-base' : 'text-gray-500 text-sm font-semibold', 'flex items-center leading-5']">
        {{ $t('shipping_address_title') }}
      </div>
    </li>
    <li class="flex items-center">
      <svg v-if="lang.dir == 'rtl'" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21"
        fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
          fill="#9CA3AF" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M7.29289 5.29289C6.90237 5.68342 6.90237 6.31658 7.29289 6.70711L10.5858 10L7.29289 13.2929C6.90237 13.6834 6.90237 14.3166 7.29289 14.7071C7.68342 15.0976 8.31658 15.0976 8.70711 14.7071L12.7071 10.7071C13.0976 10.3166 13.0976 9.68342 12.7071 9.29289L8.70711 5.29289C8.31658 4.90237 7.68342 4.90237 7.29289 5.29289Z"
          fill="#9CA3AF" />
      </svg>
    </li>
    <li class="flex flex-shrink-0 items-center">
      <div
        :class="[step == 'select_payment' ? 'text-gray-500 lg:text-gray-600 font-bold lg:font-extrabold text-sm lg:text-base' : 'text-gray-500 text-sm font-semibold', 'flex items-center leading-5']">
        {{ $t('payment_method_title') }}
      </div>
    </li>
  </ol>
</template>

<script setup>
const lang = useNuxtApp().$lang
const props = defineProps({
  step: {
    type: String,
    default: 'select_address'
  }
})
</script>