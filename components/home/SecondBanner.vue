<template>
  <div class="container mt-[32px] mb-[41px] lg:mt-[54px] lg:mb-[60px] mx-auto flex justify-center items-center">
    <ClientOnly>
      <div class="mx-auto w-full px-[22px] lg:px-[75px] flex items-center justify-center flex-col lg:gap-7 gap-5">
        <div v-for="banner, index in banners" :key="index"
          class="w-full lg:h-[69px] h-[41px] flex items-center justify-center flex-shrink-0">
          <img :src="banner" class="w-full h-full flex-shrink-0">
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>

const props = defineProps({
  banners: {
    type: Object
  }
})
</script>