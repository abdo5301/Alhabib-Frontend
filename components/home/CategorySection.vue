<template>
  <div v-if="categories.length > 0" class="flex mx-auto container flex-col gap-12 justify-center items-center px-[22px] lg:px-[75px]">
    <h1 class="text-gray-700 text-xl lg:text-[28px] font-bold">
      <slot />
    </h1>
    <div class="overflow-hidden hover:overflow-x-auto flex w-full mx-auto items-center justify-start lg:gap-14 gap-10 pb-4">
      <NuxtLink :to="localePath('/category/'+category.id)" v-for="category in categories" :key="category.id" class="flex flex-shrink-0 flex-col gap-5 items-center justify-center">
        <img v-if="category.image && category.image != null"  class="rounded-md lg:w-[300px] w-[210px] lg:h-[225px] h-[200px]" :src="category.image.url" :alt="category.name">
        <img v-else class="rounded-md lg:w-[300px] w-[210px] lg:h-[225px] h-[200px]" :src="'https://via.placeholder.com/640x480.png/cccccc?text=Alhabib-Shop'" :alt="category.name">
        <span class="text-gray-700 text-base lg:text-xl font-bold">{{ category.name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()

const props = defineProps({
  categories: {
    type: Object
  }
})

</script>