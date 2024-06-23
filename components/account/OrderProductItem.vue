<template>
  <!-- Product Data -->
  <div v-if="product" class="flex gap-[15px] lg:gap-[25px] w-full py-[6.5px]">
    <!-- image -->
    <div class="relative flex flex-col justify-center w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] flex-shrink-0">
      <img class="w-full h-full rounded-md" :src="product.image ??= '/images/placeholder-logo.png'" alt="Alhabib-Shop">
    </div>
    <!-- details -->
    <div class="flex flex-col justify-center gap-[5px] lg:gap-[10px] max-w-full">
      <!-- price -->
      <div class="flex items-center justify-start leading-5 py-2">
        <div class="text-gray-900 font-bold text-sm lg:text-base leading-5">
          {{ priceFormate(product.total) }}
        </div>
      </div>
      <!-- quantity -->
      <span class="text-gray-600 text-xs lg:text-sm font-semibold leading-5">
        {{ $t('label_quantity') }}: {{ product.quantity }}
      </span>
      <!-- name -->
      <span class="text-gray-600 text-xs lg:text-sm font-semibold leading-5">
        {{ product.name }}
      </span>
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