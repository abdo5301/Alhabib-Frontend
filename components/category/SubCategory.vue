<template>
  <div
    class="overflow-hidden hover:overflow-x-auto flex w-full mx-auto items-start justify-start lg:gap-5 gap-[10px] pb-4">
    <NuxtLink :to="localePath('/category/'+category.id)" v-for="category in categories" :key="category.id"
      class="relative flex flex-shrink-0 flex-col w-[73px] lg:w-[150px] lg:h-[150px] gap-1 items-center justify-start">
      <img v-if="category.image" class="rounded-[10px] lg:w-[150px] w-[73px] lg:h-[150px] h-[70px] object-cover" :src="category.image"
        :alt="category.name">
      <img v-else class="rounded-[10px] lg:w-[150px] w-[73px] lg:h-[150px] h-[70px]"
        src="https://via.placeholder.com/640x480.png/004400?text=Alhabib-shop" :alt="category.name">
      <div
        class="lg:absolute lg:bottom-0 text-center lg:h-[58px] lg:w-[150px] flex lg:justify-center justify-start items-center flex-col lg:px-2">
        <span
          class="lg:drop-shadow-xlg lg:text-white text-gray-500 text-center text-[10px] lg:text-sm lg:font-bold font-semibold lg:leading-[22px] leading-[15px]">{{
            category.name
          }}</span>
      </div>

    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Object,
  }
});

const localePath = useLocalePath()

</script> 