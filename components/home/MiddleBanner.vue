<template>
  <div class="flex mx-auto container flex-col gap-12 justify-center items-center px-[22px] lg:px-[75px]">
    <!-- IF Image Banner -->
    <NuxtLink :to="localePath('/')" v-if="banner_type == 'fixed'" class="w-full">
      <img src="/images/banner/slider-banner-1.png" alt="Alhabib-Shop"
        class="relative hidden lg:block h-[348px] mx-auto w-full">

      <img src="/images/banner/slider-banner-mobile-1.png" alt="Alhabib-Shop"
        class="relative lg:hidden h-[395px] mx-auto w-full">
    </NuxtLink>


    <!-- IF Desktop Slider Banner -->
    <div dir="ltr" v-if="banner_type == 'slider'" id="default-carousel" class="hidden lg:block relative w-full" data-carousel="slide">
      <div class="relative overflow-hidden h-[348px]">
        <!-- Item -->
        <NuxtLink :to="localePath(item.slug)" v-for="item, index in banners" :key="index" class="hidden duration-700 ease-in-out"
          data-carousel-item>
          <img :src="item.image.url" class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Alhabib-Shop">
        </NuxtLink>
      </div>
      <!-- Slider indicators -->
      <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2 dark">
        <button v-for="item, index in banners" :key="index" type="button" class="w-4 h-4 rounded-full"
          :aria-current="index === 0 ? true : false" :data-carousel-slide-to="index"></button>
      </div>
    </div>

    <!-- IF Mobile Slider Banner -->
    <div dir="ltr" v-if="banner_type == 'slider'" id="default-carousel" class="lg:hidden relative w-full"
      data-carousel="slide">
      <div class="relative overflow-hidden h-[395px]">
        <!--Mobile Item -->
        <NuxtLink :to="localePath(item.slug)" v-for="item, index in banners" :key="index" class="hidden duration-700 ease-in-out"
          data-carousel-item>
          <img :src="item.image.url" class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Alhabib-Shop">
        </NuxtLink>
      </div>
      <!-- Slider indicators -->
      <div class="absolute z-30 flex space-x-2 -translate-x-1/2 bottom-3 left-1/2 dark">
        <button v-for="item, index in banners" :key="index" type="button" :class="['w-2 h-2 rounded-full']"
          :aria-current="index === 0 ? true : false" :data-carousel-slide-to="index"></button>
      </div>
    </div>

  </div>
</template>

<script setup>
const localePath = useLocalePath()
const banner_type = ref('static')
const props = defineProps({
  banner_data: {
    type: Object
  }
})

if (props.banner_data && props.banner_data[1].data.length > 0) {
  banner_type.value = 'slider'
} 

if (props.banner_data && props.banner_data[0].data.length > 0) {
  banner_type.value = 'fixed'
}

</script>