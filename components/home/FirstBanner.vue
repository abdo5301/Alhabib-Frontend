<template>
  <div class="container w-full mx-auto  h-[220px] lg:h-[451px]">
    <!--  Single Image Banner -->
    <div v-if="first_banner == 'image'" class="w-full">
      <img src="images/banner/main-banner-1.jpg" alt="Alhabib"
        class="absolute h-[282px] lg:h-[615px] mx-auto right-0 left-0 top-0 w-full">
    </div>

    <div v-if="first_banner == 'slider'" id="default-carousel"
      class="absolute top-0 left-0 right-0  h-[282px] lg:h-[615px] w-full mx-auto" data-carousel="slide">
      <!-- Carousel Banner -->
      <div class="relative h-full overflow-hidden">
        <!-- Item 1 -->
        <div class="hidden duration-400  ease-in-out h-full" data-carousel-item>
          <img src="/images/banner/main-banner-1.jpg"
            class="absolute block w-full h-full translate-x-1/2 top-0 rtl:right-1/2 ltr:left-1/2" alt="...">
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-400 ease-in-out h-full" data-carousel-item>
          <img src="/images/banner/main-banner-2.jpg"
            class="absolute block w-full h-full translate-x-1/2 top-0 rtl:right-1/2 ltr:left-1/2" alt="...">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const first_banner = ref('slider')   
</script>