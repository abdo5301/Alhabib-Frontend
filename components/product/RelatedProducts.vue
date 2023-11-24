<template>
  <div v-if="products" class="flex mx-auto w-full flex-col justify-start">
    <h3 class="text-gray-900 text-xl lg:text-[28px] leading-4 font-bold lg:pb-9 pb-8">
      <slot />
    </h3>
    <div dir="ltr"
      class="overflow-hidden hover:overflow-x-auto flex w-full mx-auto items-stretch justify-start lg:gap-[44px] gap-5 pb-4">

      <HomeProductItem v-for="product in products"
       :key="product.id"
       :id="product.id"
       :name="product.name"
       :image="product.media.images.length > 0 ? product.media.images[0].url : null"
       :color="product.color"
       :price="product.started_price !== null ? product.started_price + ' ' + currency: ''"
       :special="product.started_discounted_price !== null ? product.started_discounted_price + ' ' + currency : ''"
       :link="localPath('/product/'+product.id)"
       :favorite="product.favorite"
       :tags="product.tags"
       :related_products="product.related_class_products"
       @favorite-click="product.favorite = !product.favorite"
       :cart_btn = false
       ></HomeProductItem>
    </div>
  </div>
</template>


<script setup>
const { t } = useI18n()
const currency = t('sar')
const localPath = useLocalePath()
const props = defineProps({
  products: {
    type: Object
  }
})
</script>