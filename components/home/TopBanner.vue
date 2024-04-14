<template>
  <div class="container w-full mx-auto  h-[281px] lg:h-[515px]">
    <!--  Single Image Banner -->
    <div v-if="banner_type == 'fixed'" class="w-full">
      <img src="/images/banner/main-banner-1.jpg" alt="Alhabib"
        class="absolute h-[282px] lg:h-[515px] mx-auto right-0 left-0 top-0 w-full">
    </div>

    <div v-else-if="banner_type == 'slider'" id="default-carousel"
      class="absolute top-0 left-0 right-0  h-[282px] lg:h-[515px] w-full mx-auto" data-carousel="slide">
      <!-- Carousel Banner -->
      <div class="relative h-full overflow-hidden">
        <!-- Item 1 -->
        <div class="transform ease-in-out h-full" data-carousel-item>
          <img src="/images/banner/main-banner-1.jpg"
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="slider">
        </div>
        <!-- Item 2 -->
        <div class="transform ease-in-out h-full" data-carousel-item>
          <img src="/images/banner/main-banner-2.jpg"
            class="absolute block w-full h-full  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="slider">
        </div>
      </div>
    </div>

    <div v-else id="default-carousel"
      class="absolute top-0 left-0 right-0  h-[282px] lg:h-[515px] w-full mx-auto" data-carousel="slide">
      <!-- Carousel Banner -->
      <div class="relative h-full overflow-hidden">
        <!-- Item 1 -->
        <div class="transform ease-in-out h-full" data-carousel-item>
          <img src="/images/banner/main-banner-1.jpg"
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="slider">
        </div>
        <!-- Item 2 -->
        <div class="transform ease-in-out h-full" data-carousel-item>
          <img src="/images/banner/main-banner-2.jpg"
            class="absolute block w-full h-full  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="slider">
        </div>
      </div>
    </div>

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