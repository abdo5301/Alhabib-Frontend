<style scoped>
.last-product-bg {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), lightgray 50% / cover no-repeat;
}
</style>
<template>
  <div
    class="w-full flex flex-col gap-[25px] flex-shrink-0 bg-white py-[23px] px-5 lg:py-[23px] lg:px-[30px] rounded-md shadow-md">
    <!-- Order Info -->
    <div class="w-full flex justify-between">
      <div class="flex-1 flex justify-start lg:items-start gap-5 lg:gap-8">
        <img v-if="item_status == 'pending' || item_status == 'shipping'" src="/images/icons/cube-green.png"
          class="w-[35px] lg:w-[45px] h-[35px] lg:h-[45px]" alt="Order">
        <img v-else-if="item_status == 'cancel'" src="/images/icons/cube-red.png"
          class="w-[35px] lg:w-[45px] h-[35px] lg:h-[45px]" alt="Order">
        <img v-else src="/images/icons/cube-gray.png" class="w-[35px] lg:w-[45px] h-[35px] lg:h-[45px]" alt="Order">
        <!-- ID -->
        <div class="flex flex-col gap-[5px] lg:gap-3 justify-start items-start">
          <span class="text-gray-900 text-[10px] lg:text-sm font-semibold leading-[15px]">{{ $t('text_order_number')
          }}</span>
          <div class="text-gray-900 flex gap-[5px] text-base justify-center items-center font-bold leading-[15px] ">
            <span>
              #{{ item_id }} 
            </span>
            <span class="cursor-pointer" @click="copyText(item_id)" :title="$t('text_copy')">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M5 10H3.75C3.05964 10 2.5 9.44036 2.5 8.75V3.75C2.5 3.05964 3.05964 2.5 3.75 2.5H8.75C9.44036 2.5 10 3.05964 10 3.75V5M6.25 12.5H11.25C11.9404 12.5 12.5 11.9404 12.5 11.25V6.25C12.5 5.55964 11.9404 5 11.25 5H6.25C5.55965 5 5 5.55964 5 6.25V11.25C5 11.9404 5.55965 12.5 6.25 12.5Z"
                  stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
        </div>
        <!-- Date -->
        <div class="flex flex-col gap-[5px] lg:gap-3 justify-start items-start">
          <span class="font-semibold text-[10px] lg:text-sm text-gray-900 leading-[15px]">
            {{ $t('text_order_date') }}
          </span>
          <span dir="ltr"
            class="flex justify-center items-center text-xs gap-[5px] lg:text-base lg:leading-[15px] leading-[15px] text-gray-500 font-semibold uppercase max-w-[150px]">
            <!-- {{ order_date }} -->
            22 feb, 2020
          </span>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button v-if="item_status == 'pending' || item_status == 'shipping'" type="button"
          class="w-[100px] h-[28px] lg:w-[126px] lg:h-[34px] flex items-center justify-center gap-2 ring-1 ring-gray-300 shadow-sm rounded-md bg-white">
          <span class="text-gray-700 lg:text-sm text-[10px] font-semibold leading-5">{{ $t('cancel_order_btn') }}</span>
        </button>
        <div v-else-if="item_status == 'cancel'"
          class="w-[100px] h-[28px] lg:w-[126px] lg:h-[34px] flex items-center justify-center gap-2 ring-1 ring-red-200 shadow-sm rounded-md bg-red-100">
          <span class="text-red-700 lg:text-sm text-[10px] font-semibold leading-5">{{ $t('order_canceled_text') }}</span>
        </div>
        <div v-else
          class="w-[100px] h-[28px] lg:w-[126px] lg:h-[34px] flex items-center justify-center gap-2 ring-1 ring-gray-200 shadow-sm rounded-md bg-gray-100">
          <span class="text-gray-400 lg:text-sm text-[10px] font-semibold leading-5">{{ $t('cancel_order_btn') }}</span>
        </div>
      </div>
    </div>
    <!-- Divider -->
    <div class="flex items-center justify-center w-full">
      <div class="border-b border-b-[#F3F4F6] w-full"></div>
    </div>
    <!-- Order Products -->
    <div class="w-full flex justify-between">
      <!-- Images -->
      <div class="flex justify-start items-center gap-5">
        <div class="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-md">
          <img src="/images/product/product-3.jpeg" class="w-full h-full rounded-md" alt="product">
        </div>
        <div class="lg:block hidden relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-md">
          <img src="/images/product/product-3.jpeg" class="w-full h-full rounded-md" alt="product">
        </div>
        <!-- Last Image -->
        <div class="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px]">
          <img src="/images/product/product-3.jpeg" class="w-full h-full rounded-md" alt="product">
          <span
            class="absolute w-full h-full top-0 rounded-md  last-product-bg opacity-50 flex justify-center items-center">
          </span>
          <span dir="ltr"
            class="absolute w-full h-full flex justify-center items-center text-white font-bold text-lg top-0">+2</span>
        </div>
      </div>
      <!-- Tracking -->
      <div v-if="item_status == 'pending' || item_status == 'shipping'" class="flex flex-col justify-end items-end">
        <button
          class="w-[100px] h-[28px] lg:w-[126px] lg:h-[34px] flex justify-center items-center gap-2 rounded-md bg-black shadow-sm">
          <span class="text-white text-xs lg:text-base font-semibold leading-4">{{ $t('text_track') }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path
              d="M8.80002 3.04883C8.3582 3.04883 8.00002 3.407 8.00002 3.84883C8.00002 4.29066 8.3582 4.64883 8.80002 4.64883H10.8687L5.83434 9.68314C5.52192 9.99556 5.52192 10.5021 5.83434 10.8145C6.14676 11.1269 6.65329 11.1269 6.96571 10.8145L12 5.7802V7.84883C12 8.29066 12.3582 8.64883 12.8 8.64883C13.2419 8.64883 13.6 8.29066 13.6 7.84883V3.84883C13.6 3.407 13.2419 3.04883 12.8 3.04883H8.80002Z"
              fill="white" />
            <path
              d="M4.00002 4.64883C3.11637 4.64883 2.40002 5.36517 2.40002 6.24883V12.6488C2.40002 13.5325 3.11637 14.2488 4.00002 14.2488H10.4C11.2837 14.2488 12 13.5325 12 12.6488V10.2488C12 9.807 11.6419 9.44883 11.2 9.44883C10.7582 9.44883 10.4 9.807 10.4 10.2488V12.6488H4.00002V6.24883L6.40002 6.24883C6.84185 6.24883 7.20002 5.89066 7.20002 5.44883C7.20002 5.007 6.84185 4.64883 6.40002 4.64883H4.00002Z"
              fill="white" />
          </svg>
        </button>
      </div>
      <!-- Mobile Complete Actions -->
      <div v-if="item_status == 'complete'"
        class="flex lg:hidden flex-col lg:flex-row justify-end items-center gap-3 lg:gap-[17px]">
        <button type="button"
          class="flex justify-center items-center gap-2 w-[100px] h-[28px] lg:w-[150px] lg:h-[34px] bg-white shadow-sm rounded-md ring-1 ring-gray-300">
          <img src="/images/icons/return.png" class="w-4 h-4 lg:w-5 lg:h-5" alt="return product">
          <span class="text-gray-700 text-[10px] lg:text-sm font-medium lg:font-semibold leading-5">{{
            $t('order_return_btn') }}</span>
        </button>
        <button type="button"
          class="flex justify-center items-center gap-2 w-[100px] h-[28px] lg:w-[150px] lg:h-[34px] bg-white shadow-sm rounded-md ring-1 ring-gray-300">
          <img src="/images/icons/edit.png" class="w-4 h-4 lg:w-5 lg:h-5" alt="return product">
          <span class="text-gray-700 text-[10px] lg:text-sm font-medium lg:font-semibold leading-5">{{
            $t('order_product_evaluation_btn') }}</span>
        </button>
      </div>
    </div>
    <!-- Divider -->
    <div class="flex items-center justify-center w-full">
      <div class="border-b border-b-[#F3F4F6] w-full"></div>
    </div>
    <!-- Progress bar -->
    <div v-if="item_status == 'pending' || item_status == 'shipping'"
      class="w-full flex flex-col justify-start gap-[14px]">
      <div class="w-full bg-gray-200 rounded-[10px] h-[11px]">
        <div v-if="item_status == 'pending'" class="bg-green-500 h-2.5 rounded-[10px]" style="width: 35%"></div>
        <div v-if="item_status == 'shipping'" class="bg-green-500 h-2.5 rounded-[10px]" style="width: 60%"></div>
      </div>
      <div class="w-full flex justify-between items-center">
        <span class="text-green-600 text-xs lg:text-sm font-bold leading-4">{{ $t('order_status_pending') }}</span>
        <span
          :class="['text-xs lg:text-sm leading-4', item_status == 'shipping' ? 'text-green-600 font-bold' : 'text-gray-500 font-semibold']">{{
            $t('order_status_shipped') }}</span>
        <span class="text-gray-500 text-xs lg:text-sm font-semibold leading-4">{{ $t('order_status_complete') }}</span>
      </div>
    </div>
    <!-- Desktop Complete Actions -->
    <div v-if="item_status == 'complete'"
      class="hidden lg:flex flex-col lg:flex-row justify-end items-center gap-3 lg:gap-[17px]">
      <button type="button"
        class="flex justify-center items-center gap-2 w-[100px] h-[28px] lg:w-[150px] lg:h-[34px] bg-white shadow-sm rounded-md ring-1 ring-gray-300">
        <img src="/images/icons/return.png" class="w-4 h-4 lg:w-5 lg:h-5" alt="return product">
        <span class="text-gray-700 text-[10px] lg:text-sm font-medium lg:font-semibold leading-5">{{
          $t('order_return_btn') }}</span>
      </button>
      <button type="button"
        class="flex justify-center items-center gap-2 w-[100px] h-[28px] lg:w-[150px] lg:h-[34px] bg-white shadow-sm rounded-md ring-1 ring-gray-300">
        <img src="/images/icons/edit.png" class="w-4 h-4 lg:w-5 lg:h-5" alt="return product">
        <span class="text-gray-700 text-[10px] lg:text-sm font-medium lg:font-semibold leading-5">{{
          $t('order_product_evaluation_btn') }}</span>
      </button>
    </div>
    <!-- Notes -->
    <div class="flex justify-start items-center gap-[5px] text-gray-500 font-semibold text-xs lg:text-sm leading-[15px]">
      <!-- Shipping or Pending -->
      <span v-if="item_status == 'pending' || item_status == 'shipping'">
        {{ $t('order_shipping_time_notes') }}
      </span>
      <!-- Canceled -->
      <div v-else-if="item_status == 'cancel'" class="flex justify-start items-center gap-[5px]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 lg:w-[26px] lg:h-[26px]" viewBox="0 0 26 26" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M13 23.457C18.5228 23.457 23 18.9799 23 13.457C23 7.93418 18.5228 3.45703 13 3.45703C7.47715 3.45703 3 7.93418 3 13.457C3 18.9799 7.47715 23.457 13 23.457ZM11.3839 10.0731C10.8957 9.58499 10.1043 9.58499 9.61612 10.0731C9.12796 10.5613 9.12796 11.3528 9.61612 11.8409L11.2322 13.457L9.61612 15.0731C9.12796 15.5613 9.12796 16.3528 9.61612 16.8409C10.1043 17.3291 10.8957 17.3291 11.3839 16.8409L13 15.2248L14.6161 16.8409C15.1043 17.3291 15.8957 17.3291 16.3839 16.8409C16.872 16.3528 16.872 15.5613 16.3839 15.0731L14.7678 13.457L16.3839 11.8409C16.872 11.3528 16.872 10.5613 16.3839 10.0731C15.8957 9.58499 15.1043 9.58499 14.6161 10.0731L13 11.6893L11.3839 10.0731Z"
            fill="#F87171" />
        </svg>
        <span>
          {{ $t('order_cancel_date_notes') }}
        </span>
        <span dir="ltr" class="font-normal">
          03 apr, 2020
        </span>
      </div>
      <!-- Complete -->
      <div v-else-if="item_status == 'complete'" class="flex justify-start items-center gap-[5px]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 lg:w-[26px] lg:h-[26px]" viewBox="0 0 26 26" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M13 23.457C18.5228 23.457 23 18.9799 23 13.457C23 7.93418 18.5228 3.45703 13 3.45703C7.47715 3.45703 3 7.93418 3 13.457C3 18.9799 7.47715 23.457 13 23.457ZM17.6339 11.8409C18.122 11.3528 18.122 10.5613 17.6339 10.0731C17.1457 9.58499 16.3543 9.58499 15.8661 10.0731L11.75 14.1893L10.1339 12.5731C9.64573 12.085 8.85427 12.085 8.36611 12.5731C7.87796 13.0613 7.87796 13.8528 8.36611 14.3409L10.8661 16.8409C11.3543 17.3291 12.1457 17.3291 12.6339 16.8409L17.6339 11.8409Z"
            fill="#10B981" />
        </svg>
        <span>
          {{ $t('order_complete_date_notes') }}
        </span>
        <span dir="ltr" class="font-normal">
          03 apr, 2020
        </span>
      </div>
      <span v-else></span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item_id: {
    type: Number
  },
  item_date: {
    type: String
  },
  item_tracking_link: {
    type: String
  },
  item_products: {
    type: Object
  },
  item_status: {
    type: String
  }
})
</script>