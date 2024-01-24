<template>
  <div
    :class="[style_type == 'checkout_success' ? 'divide-y-0' : '',style_type == 'checkout_page' || style_type == 'checkout_success' ? 'text-sm' : '','flex flex-col divide-y text-base text-gray-600 leading-5 font-semibold divide-gray-200']">
    <!-- Subtotal -->
    <div class="flex justify-between items center py-4">
      <span class="flex items-center justify-start">{{ $t('sub_total') }}</span>
      <span class="flex items-center justify-end">{{ subtotal ? priceFormate(subtotal) : priceFormate(cartSubtotal) }}</span>
    </div>
    <!-- Shipping -->
    <div class="flex justify-between items center py-4">
      <span class="flex items-center justify-start">{{ $t('shipping_title') }}</span>
      <span v-if="shipping || shipping == 0" class="flex items-center justify-end">{{ shipping > 0 ? priceFormate(shipping) : $t('free') }}</span>
      <span v-else class="flex items-center justify-end">{{ cartShipping > 0 ? priceFormate(cartShipping) : $t('free') }}</span>
    </div>
    <!-- VAT -->
    <div class="flex justify-between items center py-4">
      <span class="flex items-center justify-start">{{ $t('vat_title') }}</span>
      <span class="flex items-center justify-end">{{ tax ? priceFormate(tax) : priceFormate(cartTax) }}</span>
    </div>
    <!-- Total -->
    <div class="flex justify-between items center py-4 font-bold text-gray-900">
      <span class="flex items-center justify-start">{{ $t('total') }}</span>
      <span class="flex items-center justify-end">{{ total ? priceFormate(total) : priceFormate(cartTotal) }}</span>
    </div>
  </div>
</template>


<script setup>
const props = defineProps({
  style_type: {
    type: String,
    default: 'cart_page'
  },
  subtotal:{
    type: Number,
  },
  shipping:{
    type: Number,
  },
  tax:{
    type: Number,
  },
  total:{
    type: Number,
  }
})
const { cartTotal, cartSubtotal, cartTax, cartShipping } = useCart()
</script>