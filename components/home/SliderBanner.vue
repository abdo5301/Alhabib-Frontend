<template>
  <div class="flex mx-auto container flex-col gap-12 justify-center items-center px-[22px] lg:px-[75px]">
    <!-- IF Image Banner -->
    <NuxtLink to="#" v-if="slider_banner == 'image'" class="w-full">
      <img src="/images/banner/slider-banner-1.png" alt="Alhabib-Shop"
        class="relative hidden lg:block h-[348px] mx-auto w-full">

      <img src="/images/banner/slider-banner-mobile-1.png" alt="Alhabib-Shop"
        class="relative lg:hidden h-[395px] mx-auto w-full">
    </NuxtLink>


    <!-- IF Desktop Slider Banner -->
    <div dir="ltr" v-if="slider_banner == 'slider'" id="default-carousel" class="hidden lg:block relative w-full" data-carousel="static">
      <div class="relative overflow-hidden h-[348px]">
        <!-- Item -->
        <NuxtLink to="#" v-for="item in slider_array" :key="item.id" class="hidden duration-700 ease-in-out"
          data-carousel-item>
          <img :src="item.image" class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Alhabib-Shop">
        </NuxtLink>
      </div>
      <!-- Slider indicators -->
      <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2 dark">
        <button v-for="item, index in slider_array" :key="index" type="button" class="w-4 h-4 rounded-full"
          :aria-current="index === 0 ? true : false" :data-carousel-slide-to="index"></button>
      </div>
    </div>


    <!-- IF Mobile Slider Banner -->
    <div dir="ltr" v-if="slider_banner == 'slider'" id="default-carousel" class="lg:hidden relative w-full"
      data-carousel="slide">
      <div class="relative overflow-hidden h-[395px]">
        <!--Mobile Item -->
        <NuxtLink to="#" v-for="item in mobile_slider_array" :key="item.id" class="hidden duration-700 ease-in-out"
          data-carousel-item>
          <img :src="item.image" class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Alhabib-Shop">
        </NuxtLink>
      </div>
      <!-- Slider indicators -->
      <div class="absolute z-30 flex space-x-2 -translate-x-1/2 bottom-3 left-1/2 dark">
        <button v-for="item, index in mobile_slider_array" :key="index" type="button" :class="['w-2 h-2 rounded-full']"
          :aria-current="index === 0 ? true : false" :data-carousel-slide-to="index"></button>
      </div>
    </div>

  </div>
</template>

<script setup>
const slider_banner = ref('slider')
const slider_array = [
  {
    'id': 1,
    'image': '/images/banner/slider-banner-1.png',
    'link': '#'
  },
  {
    'id': 2,
    'image': '/images/banner/slider-banner-1.png',
    'link': '#'
  },
  {
    'id': 3,
    'image': '/images/banner/slider-banner-1.png',
    'link': '#'
  }
]
const mobile_slider_array = [
  {
    'id': 1,
    'image': '/images/banner/slider-banner-mobile-1.png',
    'link': '#'
  },
  {
    'id': 2,
    'image': '/images/banner/slider-banner-mobile-1.png',
    'link': '#'
  },
  {
    'id': 3,
    'image': '/images/banner/slider-banner-mobile-1.png',
    'link': '#'
  }
]  
</script>