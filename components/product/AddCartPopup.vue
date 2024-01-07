<template>
  <div>
    <ClientOnly>
      <h4 id="add-cart-alert-label"
        class="lg:flex hidden justify-center items-center text-center pt-11 text-[#000] font-bold lg:text-2xl text-xl leading-6">
        {{ $t('cart_title') }} ({{ cartCount }})
      </h4>

      <div class="lg:block hidden border-b border-b-gray-200 pt-5 w-full"></div>
      <CartPopupAlert alert_type="add-to-cart-success"></CartPopupAlert>
      <!-- Cart Items -->
      <div v-if="product"
        class="w-full px-4 no-scrollbar lg:pt-12 pt-5 flex flex-col justify-start items-start gap-6 max-h-[440px] overflow-hidden hover:overflow-y-auto">
        <CartPopupProductItem :cart_item="add_cart_data"/>
      </div>
      <!-- Cart Total -->
      <div class="w-full lg:pt-12 pt-5 flex justify-between items-center px-6">
        <div class="w-full flex justify-between items-center border-b border-b-gray-200 pb-[18px]">
          <span class="text-gray-900 text-base font-bold leading-5">{{ $t('sub_total') }}</span>
          <span class="text-gray-600 text-sm font-bold leading-5">
            {{ subtotal }}</span>
        </div>
      </div>
      <!-- checkout Link -->
      <div class="px-5 lg:py-12 py-5 grid grid-cols-2 lg:gap-[25px] gap-[18px]">
        <NuxtLink :to="localePath('/checkout')" @click="$emit('hidePopup')"
          class="w-full bg-black rounded-md lg:h-[52px] h-[42px] flex flex-shrink-0 items-center justify-center text-white lg:text-xl text-base font-bold leading-5">
          {{ $t('checkout_title') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/cart')" @click="$emit('hidePopup')"
          class="w-full bg-green-600 rounded-md lg:h-[52px] h-[42px] flex flex-shrink-0 items-center justify-center text-white lg:text-xl text-base font-bold leading-5">
          {{ $t('show_cart_title') }}
        </NuxtLink>
      </div>
      <!-- Before you go -->
      <div class="px-6 lg:pb-10 pb-6 flex flex-col justify-start lg:gap-7 gap-3"
        v-if="related_products.products && related_products.products.length > 0">
        <h6 class="text-gray-900 font-bold lg:text-2xl text-base leading-5">
          {{ related_products.title.length > 0 ? related_products.title : $t('before_go_title') }}
        </h6>
        <div
          class="flex pb-2 lg:gap-7 gap-3 justify-start items-stretch no-scrollbar overflow-x-auto w-full mx-auto">
          <ProductBeforeYouGoProduct v-for="(product, index) in related_products.products" :name="product.name"
            :key="index" :price="product.started_price" :special="product.started_discounted_price"
            :image="product.media && product.media.images && product.media.images.length > 0 ? product.media.images[0] : null"
            :link="localePath('/product/' + product.id)" @favorite-click="product.favorite != product.favorite"
            :favorite="product.favorite" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
const props = defineProps({
  add_cart_data: {
    type: Object
  }
})
const emits = defineEmits(['hidePopup'])
const localePath = useLocalePath()
const { t } = useI18n()
const currency = t('sar')
const { cartCount } = useCart()
//cart data
const product = props.add_cart_data ? props.add_cart_data.product : {}
const subtotal = props.add_cart_data && props.add_cart_data.total ? priceFormate(props.add_cart_data.total) : priceFormate(0)
const related_products = props.add_cart_data && props.add_cart_data.related_products ? props.add_cart_data.related_products : {}
</script>