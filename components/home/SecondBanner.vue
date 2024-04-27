<template>
  <div class="container mt-[32px] mb-[41px] lg:mt-[54px] lg:mb-[60px] mx-auto flex justify-center items-center">
    
      <div class="mx-auto w-full px-[22px] lg:px-[75px] flex items-center justify-center flex-col lg:gap-7 gap-5">
        <div v-for="banner, index in banners" :key="index"
          class="w-full lg:h-[69px] h-[41px] flex items-center justify-center">
          <NuxtImg format="webp" preload :src="banner" sizes="100vw" alt="Alhabib-Bedding" class="lg:max-h-[110px] max-h-[75px] w-full object-cover" loading="lazy"/>
        </div>
      </div>
    
  </div>
</template>

<script setup>

const props = defineProps({
  banners: {
    type: Object
  }
})
</script>