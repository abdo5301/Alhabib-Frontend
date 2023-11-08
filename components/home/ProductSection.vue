<template>
  <div v-if="products.length > 0" class="flex mx-auto container flex-col justify-center items-center px-[22px] lg:px-[75px] pb-20">
    <h3 class="text-gray-700 text-xl lg:text-[34px] leading-4 font-bold lg:pb-12 pb-4">
     <slot />
    </h3>
    <div dir="ltr"
      class="overflow-hidden hover:overflow-x-auto flex w-full mx-auto justify-start lg:gap-[44px] gap-5 pb-4">

      <HomeProductItem v-for="product in products"
       :key="product.id"
       :id="product.id"
       :name="product.name"
       :image="product.media.images.length > 0 ? product.media.images[0].url : null"
       :color="product.color"
       :price="product.started_price != null ? product.started_price + ' ' + currency: ''"
       :special="product.started_discounted_price != null ? product.started_discounted_price + ' ' + currency : ''"
       :link="localPath('/product/'+product.id)"
       :favorite="product.favorite"
       :tags="product.tags"
       :related_products="product.related_class_products"
       @favorite-click="product.favorite = !product.favorite"
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