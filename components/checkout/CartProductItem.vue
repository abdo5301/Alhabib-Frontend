<template>
  <!-- Product Data -->
  <div class="flex gap-[10px] border-b border-b-gray-200 w-full pb-[15px]">
    <!-- image -->
    <div class="w-[80px] h-[80px] flex-shrink-0">
      <img class="w-full h-full rounded-md" v-if="product.buyable_image && product.buyable_image != null"
        :src="product.buyable_image" alt="Alhabib-Shop">
      <img class="w-full h-full rounded-md" v-else src="https://via.placeholder.com/640x480.png/cccccc?text=Alhabib-Shop"
        alt="Alhabib-Shop">
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
</template>

<script setup>
const props = defineProps({
  cart_item: {
    type: Object
  }
})

const product = props.cart_item && props.cart_item.product ? props.cart_item.product : {}

</script>