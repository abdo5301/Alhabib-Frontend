<template>
  <div v-if="alert_type == 'free-shipping'"
    class="mt-8 bg-green-50 text-green-800 h-10 w-full flex items-center justify-center flex-shrink-0 text-sm leading-5 font-semibold">
    <span class="w-full flex items-center justify-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 16V6C13 5.44772 12.5523 5 12 5H4C3.44772 5 3 5.44772 3 6V16C3 16.5523 3.44772 17 4 17H5M13 16C13 16.5523 12.5523 17 12 17H9M13 16L13 8C13 7.44772 13.4477 7 14 7H16.5858C16.851 7 17.1054 7.10536 17.2929 7.29289L20.7071 10.7071C20.8946 10.8946 21 11.149 21 11.4142V16C21 16.5523 20.5523 17 20 17H19M13 16C13 16.5523 13.4477 17 14 17H15M5 17C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17M5 17C5 15.8954 5.89543 15 7 15C8.10457 15 9 15.8954 9 17M15 17C15 18.1046 15.8954 19 17 19C18.1046 19 19 18.1046 19 17M15 17C15 15.8954 15.8954 15 17 15C18.1046 15 19 15.8954 19 17"
          stroke="#047857" stroke-width="2" />
      </svg>
      {{ $t('cart_popup_alert_free_shipping') }}
    </span>
  </div>
  <div v-if="alert_type == 'add-to-cart-success'"
    class="lg:mt-8 rounded-t-md lg:rounded-t-none bg-green-50 text-green-800 h-10 w-full flex items-center justify-start flex-shrink-0 text-sm leading-5 font-semibold">
    <span class="w-full flex items-center lg:justify-start justify-center lg:gap-6 gap-3 px-4">
      <svg class="ring-1 rounded-[100%] ring-green-700" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path d="M7 13.3L9.85714 16.5L17 8.5" stroke="#047857" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      {{ $t('add_to_cart_success_alert') }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  alert_type: {
    type: String
  }
})
</script>