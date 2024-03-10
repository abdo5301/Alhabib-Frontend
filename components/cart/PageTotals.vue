<template>
  <div v-if="totals_array && totals_array.length"
    :class="[style_type == 'checkout_success' ? 'divide-y-0' : '', style_type == 'checkout_page' || style_type == 'checkout_success' ? 'text-sm' : '', 'flex flex-col divide-y text-base text-gray-600 leading-5 font-semibold divide-gray-200']">
    <!-- Total Item -->
    <div v-for="(item, index) in totals_array" :key="index" class="flex justify-between items center py-4">
      <span :class="[item.key == 'total' ? 'font-bold text-gray-900' : '', 'flex items-center justify-start']">
        {{ item.title }}
      </span>
      <span v-if="item.key == 'shipping'" class="flex items-center justify-end">
        {{ item.value > 0 ? priceFormate(item.value) : $t('free') }}
      </span>
      <span v-else :class="['flex items-center justify-end', item.key == 'total' ? 'font-bold text-gray-900' : '']">
        {{ item.value ? priceFormate(item.value) : '0.00' }}
      </span>
    </div>
  </div>
  <div v-else
    :class="[style_type == 'checkout_success' ? 'divide-y-0' : '', style_type == 'checkout_page' || style_type == 'checkout_success' ? 'text-sm' : '', 'flex flex-col divide-y text-base text-gray-600 leading-5 font-semibold divide-gray-200']">
    <!-- Subtotal -->
    <div class="flex justify-between items center py-4">
      <span class="flex items-center justify-start">{{ $t('sub_total') }}</span>
      <span class="flex items-center justify-end">{{ subtotal ? priceFormate(subtotal) : priceFormate(cartSubtotal)
        }}</span>
    </div>
    <!-- Shipping -->
    <div class="flex justify-between items center py-4">
      <span class="flex items-center justify-start">{{ $t('shipping_title') }}</span>
      <span v-if="shipping || shipping == 0" class="flex items-center justify-end">{{ shipping > 0 ?
    priceFormate(shipping) : $t('free') }}</span>
      <span v-else class="flex items-center justify-end">{{ cartShipping > 0 ? priceFormate(cartShipping) : $t('free')
        }}</span>
    </div>
    <!-- Wallet -->
    <div v-if="wallet_credit" class="flex justify-between items center py-4">
      <span class="flex items-center justify-start">{{ $t('wallet_credit_title') }}</span>
      <span class="flex items-center justify-end">{{ wallet_credit ? priceFormate(wallet_credit) :
    priceFormate(cartWalletCredit) }}</span>
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
  totals: {
    type: Object
  },
  subtotal: {
    type: Number,
  },
  shipping: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  wallet_credit: {
    type: Number,
  },
  total: {
    type: Number,
  }
})
const { cartTotal, cartSubtotal, cartTax, cartShipping, cartWalletCredit, cartTotals } = useCart()

const totals_array = props.totals && props.totals.length ? props.totals : cartTotals
</script>