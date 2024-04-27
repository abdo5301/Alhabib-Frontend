<template>
    <div v-if="categories.length > 0"
      class="flex mx-auto container flex-col gap-7 lg:gap-10 justify-center items-center px-[22px] lg:px-[75px]">
      <h1 class="text-gray-700 text-xl lg:text-[28px] font-bold">
        <slot />
      </h1>
      <div class="overflow-x-auto no-scrollbar flex w-full mx-auto items-center justify-start lg:gap-14 gap-6 pb-4">
        <NuxtLink :to="localePath('/' + category.slug)" v-for="category in categories" :key="category.id"
          class="flex flex-shrink-0 flex-col gap-5 items-center justify-center">
          <NuxtImg v-if="category.image && category.image != null" loading="lazy" preload width="100vw"
            class="rounded-md lg:w-[300px] w-[210px] lg:h-[225px] h-[200px]" :src="category.image" :alt="category.name" />
          <NuxtImg v-else class="rounded-md lg:w-[300px] w-[210px] lg:h-[225px] h-[200px]" width="100vw" loading="lazy" preload
            :src="'/images/placeholder-logo.png'" :alt="category.name" />
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