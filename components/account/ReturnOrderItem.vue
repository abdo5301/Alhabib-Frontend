<template>

  <div
    class="w-full flex flex-col gap-[25px] flex-shrink-0 bg-white py-[23px] px-5 lg:py-[23px] lg:px-[30px] rounded-md shadow-md">
    <div class="w-full flex justify-between">
      <div class="flex-1 flex justify-start lg:items-start gap-1 lg:gap-8">
        <img src="/images/icons/ticket-green.png" class="w-[35px] lg:w-[45px] h-[35px] lg:h-[45px]" alt="Order">
        <!-- ID -->
        <div class="flex flex-col gap-1 lg:gap-3 justify-start items-start">
          <span class="text-gray-900 text-[10px] lg:text-sm font-semibold leading-[15px] lg:leading-[15px]">{{
            $t('text_Retrieval_ticket')
          }}</span>
          <div
            class="text-gray-900 flex gap-[1px] lg:gap-[5px] text-[10px] lg:text-base justify-center items-center font-bold leading-[15px] lg:leading-[15px]">
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
      </div>
      <div class="flex lg:flex-row flex-col lg:justify-center justify-end items-center">
        <NuxtLink :to="localePath('/account/return/ticket/' + item_id)"
          class="w-[60px] h-[25px] lg:w-[126px] lg:h-[34px] flex items-center justify-center gap-2 ring-1 ring-gray-300 shadow-sm lg:rounded-md rounded bg-white">
          <span class="text-gray-700 lg:text-sm text-[10px] font-semibold leading-5">{{ $t('text_show_details')
            }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10 5C10.5523 5 11 5.44772 11 6V9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H11V14C11 14.5523 10.5523 15 10 15C9.44771 15 9 14.5523 9 14V11H6C5.44772 11 5 10.5523 5 10C5 9.44771 5.44772 9 6 9L9 9V6C9 5.44772 9.44771 5 10 5Z"
              fill="#6B7280" />
          </svg>
        </NuxtLink>
      </div>
    </div>
    <!-- Divider -->
    <div class="flex items-center justify-center w-full">
      <div class="border-b border-b-[#F3F4F6] w-full"></div>
    </div>
    <!-- Order Products -->
    <div class="w-full flex justify-between">
      <!-- Desktop Images -->
      <div class="hidden lg:flex justify-start items-center gap-5">
        <div v-for="(item, index) in item_products" :key="index"
          class="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-md">
          <div v-if="index < 2" class="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-md">
            <img :src="item.image ? item.image : image_placeholder" class="w-full h-full rounded-md" alt="product">
          </div>
          <!-- Last Image -->
          <div v-if="index == 2 && item_products.length == 3"
            class="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-md">
            <img :src="item.image ? item.image : image_placeholder" class="w-full h-full rounded-md" alt="product">
          </div>
          <div v-if="index == 2 && item_products.length > 3"
            class="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px]">
            <img :src="item.image ? item.image : image_placeholder" class="w-full h-full rounded-md" alt="product">
            <span
              class="absolute w-full h-full top-0 rounded-md  last-product-bg opacity-50 flex justify-center items-center">
            </span>
            <span dir="ltr"
              class="absolute w-full h-full flex justify-center items-center text-white font-bold text-lg top-0">+{{
                item_products.length - 3 }}</span>
          </div>
        </div>
      </div>
      <!-- Mobile Images -->
      <div class="flex lg:hidden justify-start items-center gap-2">
        <div v-for="(item, index) in item_products" :key="index"
          class="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-md">
          <div v-if="index < 1" class="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-md">
            <img :src="item.image ? item.image : image_placeholder" class="w-full h-full rounded-md" alt="product">
          </div>
          <!-- Last Image -->
          <div v-if="index == 1 && item_products.length == 2"
            class="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-md">
            <img :src="item.image ? item.image : image_placeholder" class="w-full h-full rounded-md" alt="product">
          </div>
          <div v-if="index == 1 && item_products.length > 2"
            class="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px]">
            <img :src="item.image" class="w-full h-full rounded-md" alt="product">
            <span
              class="absolute w-full h-full top-0 rounded-md  last-product-bg opacity-50 flex justify-center items-center">
            </span>
            <span dir="ltr"
              class="absolute w-full h-full flex justify-center items-center text-white font-bold text-lg top-0">+{{
                item_products.length - 2 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
const image_placeholder = '/images/placeholder-logo.png'
const props = defineProps({
  item_id: {
    type: Number
  },
  item_create_date: {
    type: String
  },
  item_update_date: {
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