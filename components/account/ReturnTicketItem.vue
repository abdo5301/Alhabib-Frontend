<template>
  <div
    class="w-full flex flex-col lg:gap-[25px] gap-5 lg:p-[18px] p-[15px] rounded-lg border border-gray-300 shadow-sm">
    <!-- Product Data -->
    <div class="w-full flex lg:gap-[25px] gap-[15px]">
      <!-- Image -->
      <NuxtImg :src="product_data.image ??= '/images/placeholder-logo.png'" width="110px" height="110px" loading="lazy"
        :alt="product_data.name" class="lg:w-[110px] lg:h-[110px] w-[100px] h-[100px] rounded-md" />
      <!-- Data -->
      <div
        class="flex flex-col w-full lg:max-w-[321px] lg:gap-[5px] gap-[3px] text-gray-600 lg:text-sm text-xs font-semibold leading-5">
        <!-- Total Price -->
        <span class="font-bold text-gray-900 text-sm lg:py-2 pb-2">{{ priceFormate(product_data.total) }}</span>
        <!-- Quantity -->
        <span>{{ $t('label_quantity') }}: {{ product_data.quantity }}</span>
        <!-- Name -->
        <span>{{ product_data.name }}</span>
      </div>
    </div>
    <!-- Divider -->
    <div class="flex items-center justify-center w-full">
      <div class="border-b border-b-gray-200 w-full"></div>
    </div>
    <!-- Return Data -->
    <div class="w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-[25px] gap-5">
      <!-- Reason -->
      <div class="flex flex-col gap-2 text-sm leading-5">
        <h3 class="text-gray-900 font-bold">{{ $t('return_reason_title') }}</h3>
        <span class="text-gray-600 font-semibold"> عيب بالمنتج </span>
      </div>
      <!-- Is opened ? -->
      <div class="flex flex-col gap-2 text-sm leading-5">
        <h3 class="text-gray-900 font-bold">{{ $t('label_is_return_product_opened') }}</h3>
        <span class="text-gray-600 font-semibold">لا</span>
      </div>
      <!-- Notes -->
      <div class="lg:col-span-2 flex flex-col gap-2  text-sm leading-5">
        <h3 class="text-gray-900 font-bold">{{ $t('text_notes') }}</h3>
        <span class="text-gray-600 font-semibold"> عيب بقماش المفرش </span>
      </div>
      <!-- Images -->
      <div class="lg:col-span-2 w-full flex flex-col gap-3 text-sm leading-5">
        <h3 class="text-gray-900 font-bold">{{ $t('pictures_included') }}</h3>
        <div class="flex gap-5 w-full flex-wrap">
          <NuxtImg src="/images/product/product-1.jpeg" w="80px" loading="lazy" format="webp" quality="80"
            class="w-[80px] h-[80px] rounded-[5px]" />
          <NuxtImg src="/images/product/product-1.jpeg" w="80px" loading="lazy" format="webp" quality="80"
            class="w-[80px] h-[80px] rounded-[5px]" />
          <NuxtImg src="/images/product/product-1.jpeg" w="80px" loading="lazy" format="webp" quality="80"
            class="w-[80px] h-[80px] rounded-[5px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const props = defineProps({
  product_data: {
    type: Object,
    default: {}
  },
  return_data: {
    type: Object,
    default: {}
  },

})

</script>