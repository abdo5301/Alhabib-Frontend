<template>
  <div class="relative w-full lg:mt-[57px] mt-10">
    <img src="/images/checkout-success.png"
      class="object-cover lg:w-[649px] lg:h-[516px] w-full h-[288px] lg:rounded-lg rounded-t-lg" alt="Alhabib-Shop">
    <div
      class="absolute top-[30px] lg:start-[30px] start-[20px] flex lg:gap-[15px] gap-10 justify-start items-start flex-col">
      <h4 class="lg:order-1 order-2 text-gray-900 font-bold text-xl leading-5 py-2">
        {{ $t('text_thank_you') }}
      </h4>
      <div
        class="lg:order-2 order-1 flex gap-[5px] text-gray-500 lg:font-semibold font-normal text-sm lg:text-base lg:leading-7 leading-6">
        <svg class="lg:hidden mt-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
          fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z"
            fill="#059669" />
        </svg>
        <div>
          {{ $t('checkout_success_notes1') }} <span class="font-bold"> #{{ order_id }} </span>{{
            $t('checkout_success_notes2') }}
          <br>
          {{ $t('checkout_success_notes3') }} <span class="font-bold"> {{ email }} </span>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
const props = defineProps({
  order_id: {
    type: Number,
    default:0
  },
  email: {
    type: String,
    default:' '
  },
})
</script>