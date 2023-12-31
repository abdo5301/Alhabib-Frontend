<template>
  <div>
    <ClientOnly>
      <h5 id="cart-popup-label"
        class="flex justify-center items-center text-center pt-11 text-[#000] font-bold lg:text-2xl text-xl leading-6">
        {{ $t('cart_title') }} ({{ cartCount }})
      </h5>
      <div class="border-b border-b-gray-200 pt-5 w-full"></div>
      <CartPopupAlert v-if="cartShipping == 0" alert_type="free-shipping"></CartPopupAlert>
      <!-- Cart Items -->
      <div v-if="cartItems && cartItems.length > 0"
        class="w-full px-4 no-scrollbar pt-12 flex flex-col justify-start items-start gap-6 max-h-[440px] overflow-hidden hover:overflow-y-auto">
        <CartPopupProductItem v-for="(item, index) in cartItems" :key="index" :cart_item="item" />
      </div>
      <!-- Cart Total -->
      <div class="w-full pt-12 flex justify-between items-center px-4">
        <div class="w-full flex justify-between items-center border-b border-b-gray-200 pb-[18px]">
          <span class="text-gray-900 text-base font-bold leading-5">{{ $t('sub_total') }}</span>
          <span class="text-gray-600 text-sm font-bold leading-5 rtl:pl-4 ltr:pr-4">{{ priceFormate(cartSubtotal)
          }}</span>
        </div>
      </div>
      <!-- checkout Link -->
      <div class="px-5 lg:py-12 py-5 grid grid-cols-2 lg:gap-[25px] gap-[18px]">
        <NuxtLink :to="localePath('/checkout')" @click="$emit('hidePopup')"
          class="w-full bg-black rounded-md lg:h-[61px] h-[42px] flex flex-shrink-0 items-center justify-center text-white lg:text-xl text-base font-bold leading-5">
          {{ $t('checkout_title') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/cart')" @click="$emit('hidePopup')"
          class="w-full bg-green-600 rounded-md lg:h-[61px] h-[42px] flex flex-shrink-0 items-center justify-center text-white lg:text-xl text-base font-bold leading-5">
          {{ $t('show_cart_title') }}
        </NuxtLink>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const props = defineProps({
  cart_data: {
    type: Object
  }
})
const emits = defineEmits(['hidePopup'])
const localePath = useLocalePath()
const { t } = useI18n()
const currency = t('sar')
const { cartItems, cartCount, cartShipping, cartSubtotal } = useCart()
</script>