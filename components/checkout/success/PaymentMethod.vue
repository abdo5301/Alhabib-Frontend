<template>
  <div v-if="method_data" class="flex flex-col lg:p-[30px] pb-0">
    <h5 class="pb-5 lg:pb-[20px] text-gray-900 text-base lg:text-lg font-semibold leading-5">
      {{ $t('payment_method_title') }}
    </h5>
    <div class="flex justify-between items-center text-gray-500 text-sm font-normal leading-5">
      <span>{{ method_data.title }}</span>
      <img v-if="method_data.image" :src="method_data.image" class="w-[50px] h-[50px] rounded-xl lg:me-8"
        alt="Payment-Method">
      <img v-else src="/images/payment/cash.png" class="w-[50px] h-[50px] rounded-xl lg:me-8" alt="Payment-Method">
    </div>
    <!-- Divider -->
    <div class="flex items-center justify-start w-full lg:pe-8 pt-[20px] lg:pt-[30px]">
      <div class="border-b border-b-gray-200 w-full"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  method_data: {
    type: Object
  }
})
</script>