<template>
  <div class="w-full mx-auto lg:h-auto lg:max-h-[600px] h-[281px] overflow-hidden">
    <!--  Single Image Banner -->
    <div v-if="banner_type == 'fixed'" class="w-full">
      <NuxtImg src="/images/banner/main-banner-1.jpg" alt="Alhabib-slider" loading="lazy" preload
        class="absolute h-[282px] lg:h-[515px] mx-auto right-0 left-0 top-0 w-full" />
    </div>

    <div v-else-if="banner_type == 'slider'" id="default-carousel"
      class="absolute top-0 left-0 right-0  h-[282px] lg:h-[515px] w-full mx-auto" data-carousel="slide">
      <!-- Carousel Banner -->
      <div class="relative h-full overflow-hidden">
        <!-- Item 1 -->
        <div class="transform ease-in-out h-full" data-carousel-item>
          <NuxtImg src="/images/banner/main-banner-1.jpg" loading="lazy" preload
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Alhabib-slider" />
        </div>
        <!-- Item 2 -->
        <div class="transform ease-in-out h-full" data-carousel-item>
          <NuxtImg src="/images/banner/main-banner-2.jpg" loading="lazy" preload
            class="absolute block w-full h-full  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="Alhabib-slider" />
        </div>
      </div>
    </div>

    <PrimeCarousel  v-else dir="ltr" :show-navigators="false" :show-indicators="false"
      :value="[{ src: '/images/banner/main-banner-1.jpg' }, { src: '/images/banner/main-banner-2.jpg' }]"
      :numVisible="1" :num-scroll="1" circular :autoplayInterval="6000">
      <template #item="slotProps">
        <NuxtImg :src="slotProps.data.src" loading="lazy" preload class="w-full lg:h-full h-[282px] object-cover" width="1920px" quality="80"
          alt="Alhabib-slider" />
      </template>
    </PrimeCarousel>

    <!-- <div v-else id="default-carousel" class="absolute top-0 left-0 right-0  h-[282px] lg:h-[515px] w-full mx-auto"
      data-carousel="slide"> -->
    <!-- Carousel Banner -->
    <!-- <div class="relative h-full overflow-hidden"> -->
    <!-- Item 1 -->
    <!-- <div class="transform ease-in-out h-full" data-carousel-item>
          <NuxtImg src="/images/banner/main-banner-1.jpg" loading="lazy" preload
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
            alt="Alhabib-slider" />
        </div> -->
    <!-- Item 2 -->
    <!-- <div class="transform ease-in-out h-full" data-carousel-item>
          <NuxtImg src="/images/banner/main-banner-2.jpg" loading="lazy" preload
            class="absolute block w-full h-full  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover"
            alt="Alhabib-slider" />
        </div>
      </div>
    </div> -->

  </div>
</template>

<script setup>
const props = defineProps({
  banner_data: {
    type: Object
  }
})

const banner_type = ref('static')

if (props.banner_data && props.banner_data[1].data.length > 0) {
  banner_type.value = 'slider'
} else if (props.banner_data && props.banner_data[0].data.length > 0) {
  banner_type.value = 'fixed'
} else {
  banner_type.value = 'static'
}
</script>