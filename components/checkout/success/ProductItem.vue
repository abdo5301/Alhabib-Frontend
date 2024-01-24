<template>
  <!-- Product Data -->
  <div v-if="product" class="flex gap-[10px] border-b border-b-gray-200 w-full pb-[15px]">
    <!-- image -->
    <div class="relative w-[80px] h-[80px] flex-shrink-0">
      <img v-if="product.image && product.image != null" class="w-full h-full rounded-md" :src="product.image"
        alt="Alhabib-Shop">
      <img v-else class="w-full h-full rounded-md" src="https://via.placeholder.com/640x480.png/cccccc?text=Alhabib-Shop"
        alt="Alhabib-Shop">
      <span
        class="absolute -top-1.5 -end-2 lg:hidden flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-900">
        <span class="text-white text-xs font-bold leading-5">{{ product.quantity }}</span>
      </span>
    </div>
    <!-- details -->
    <div class="flex flex-col justify-start gap-[10px] py-1 xl:max-w-[268px] max-w-[190px]">
      <!-- name -->
      <span class="text-gray-500 text-sm font-normal leading-5">
        {{ product.name }}
      </span>
      <!-- quantity -->
      <span class="hidden lg:block text-gray-500 text-sm font-normal leading-5">
        {{ $t('label_quantity') }}: {{ product.quantity }}
      </span>
    </div>
    <!-- price -->
    <div class="flex items-center justify-end leading-5 flex-1">
      <div class="text-[#000] font-bold text-sm">
        {{ priceFormate(product.total) }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object
  }
})
</script>