<template>
  <!-- Product Data -->
  <div class="flex flex-col gap-3 justify-start  border-b border-b-gray-200 w-full pb-[15px]">
    <div class="flex gap-[10px] w-full">
      <!-- image -->
      <div class="w-[80px] h-[80px] flex-shrink-0">
        <img class="w-full h-full rounded-md" v-if="product.buyable_image && product.buyable_image != null"
          :src="product.buyable_image" alt="Alhabib-Shop">
        <img class="w-full h-full rounded-md" v-else
          src="https://via.placeholder.com/640x480.png/cccccc?text=Alhabib-Shop" alt="Alhabib-Shop">
      </div>
      <!-- details -->
      <div class="flex flex-col justify-start gap-[10px] py-1 xl:max-w-[268px] max-w-[190px]">
        <!-- name -->
        <span class="text-gray-500 text-sm font-normal leading-5">
          {{ product.buyable_name }}
        </span>
        <!-- quantity -->
        <span class="text-gray-500 text-sm font-normal leading-5">
          {{ $t('label_quantity') }}: {{ cart_item.quantity }}
        </span>
      </div>
      <!-- price -->
      <div class="flex items-center justify-end leading-5 flex-1">
        <div class="inline-flex gap-1 lg:flex-row flex-col" v-if="product.discount_price">
          <span class="text-red-600 font-bold text-sm">{{ priceFormate(product.discount_price) }}</span>
          <span class="text-gray-900 font-normal line-through text-sm">{{ priceFormate(product.price) }}</span>
        </div>
        <div class="text-[#000] font-bold text-sm">
          {{ priceFormate(product.price) }}
        </div>
      </div>
    </div>
    <div v-if="cart_item.availability == false && cart_item.availability_message"
      class="flex justify-start items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 30 30" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M27 15C27 21.6274 21.6274 27 15 27C8.37258 27 3 21.6274 3 15C3 8.37258 8.37258 3 15 3C21.6274 3 27 8.37258 27 15ZM16.5 21C16.5 21.8284 15.8284 22.5 15 22.5C14.1716 22.5 13.5 21.8284 13.5 21C13.5 20.1716 14.1716 19.5 15 19.5C15.8284 19.5 16.5 20.1716 16.5 21ZM15 7.5C14.1716 7.5 13.5 8.17157 13.5 9V15C13.5 15.8284 14.1716 16.5 15 16.5C15.8284 16.5 16.5 15.8284 16.5 15V9C16.5 8.17157 15.8284 7.5 15 7.5Z"
          fill="#EF4444" />
      </svg>
      <span class="text-rose-600 text-sm font-normal leading-5">
        {{ cart_item.availability_message }}
      </span>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['productHasError'])
const props = defineProps({
  cart_item: {
    type: Object
  }
})

const product = props.cart_item && props.cart_item.product ? props.cart_item.product : {}

if (props.cart_item.availability == false) {
  emits('productHasError')
}
</script>