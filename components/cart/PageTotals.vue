<template>
  <div :class="[style_type == 'checkout_page'? 'text-sm' : 'text-base','flex flex-col divide-y text-gray-600 leading-5 font-semibold divide-gray-200']">
    <!-- Subtotal -->
    <div class="flex justify-between items center py-5">
      <span class="flex items-center justify-start">{{ $t('sub_total') }}</span>
      <span class="flex items-center justify-end">1,013 ريال</span>
    </div>
    <!-- Shipping -->
    <div class="flex justify-between items center py-5">
      <span class="flex items-center justify-start">{{ $t('shipping_title') }}</span>
      <span class="flex items-center justify-end">مجاني</span>
    </div>
    <!-- VAT -->
    <div class="flex justify-between items center py-5">
      <span class="flex items-center justify-start">{{ $t('vat_title') }}</span>
      <span class="flex items-center justify-end">1,165 ريال</span>
    </div>
    <!-- Total -->
    <div class="flex justify-between items center py-5 font-bold text-gray-900">
      <span class="flex items-center justify-start">{{ $t('total') }}</span>
      <span class="flex items-center justify-end">1,165 ريال</span>
    </div>
  </div>
</template>


<script setup>
const props = defineProps({
  style_type: {
    type: String,
    default:'cart_page'
  }  
})
</script>