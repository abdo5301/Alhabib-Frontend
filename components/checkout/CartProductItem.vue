<template>
  <!-- Product Data -->
  <div class="flex gap-[10px] border-b border-b-gray-200 w-full pb-[15px]">
    <!-- image -->
    <div class="w-[80px] h-[80px] flex-shrink-0">
      <img class="w-full h-full rounded-md" src="/images/product/product-2.jpeg"
        alt="Alhabib-Shop">
    </div>
    <!-- details -->
    <div class="flex flex-col justify-start gap-[10px] py-1 xl:max-w-[268px] max-w-[190px]">
      <!-- name -->
      <span class="text-gray-500 text-sm font-normal leading-5">
        مفرش سياتل شتوي مفرد و نص مخمل لحمي عدد القطع 4
      </span>
      <!-- quantity -->
      <span class="text-gray-500 text-sm font-normal leading-5">
        {{ $t('label_quantity') }}: 1
      </span>
    </div>
    <!-- price -->
    <div class="flex items-center justify-end leading-5 flex-1">
      <div class="inline-flex gap-1 lg:flex-row flex-col">
        <span class="text-red-600 font-bold text-sm">370 ريال</span>
        <span class="text-gray-900 font-normal line-through text-sm">480 ريال</span>
      </div>
      <div class="text-[#000] font-bold hidden text-sm">
        370 ريال
      </div>
    </div>
  </div>
</template>

<script setup>
let shown = ref(true);
const props = defineProps({
  last_item: {
    type: Boolean,
    default: false
  }

})
</script>