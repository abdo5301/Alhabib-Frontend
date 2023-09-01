<template>
  <!-- Flyout menus -->
  <div class="hidden lg:flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    <div class="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1">
      <ul class="flex gap-6 font-sans-serif font-bold text-lg  leading-[23px]">
        <li v-for="category in menu_data.categories" :key="category.id">
          <NuxtLink v-if="category.featured.length" to="#" :data-popover-target="category.id" data-popover-offset="0"
            :id="category.id + '-link'" data-popover-placement="bottom"
            class="text-gray-900 pb-1 focus:border-b-2 focus:border-b-gray-400 text-center hover:border-b-2 hover:border-b-gray-400">
            {{ category.name }}
          </NuxtLink>

          <NuxtLink v-else :to="category.href"
            class="text-gray-900 pb-1 focus:border-b-2 focus:border-b-gray-400 text-center hover:border-b-2 hover:border-b-gray-400">
            {{ category.name }}
          </NuxtLink>
        </li>
        <li v-if="menu_data.pages.length" v-for="page in menu_data.pages" :key="page.name">
          <NuxtLink :to="page.href"
            class="text-red-500 pb-1 focus:border-b-2 focus:border-b-red-500 text-center hover:border-b-2 hover:border-b-red-500">
            {{ page.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>

  <div v-for="category in menu_data.categories" :key="category.id" :id="category.id" data-popover role="tooltip"
    class="bg-white max-h-[400px] h-[400px] rounded-lg border-gray-200 shadow-sm border-y w-full px-8 pb-4 invisible">

    <h2 class="pt-8 pb-2 px-[100px] text-gray-900 font-bold text-lg">{{ category.name }}</h2>
    <div class="w-full h-full flex max-w-screen-xl px-4 mb-8 py-5 mx-auto text-base text-gray-500">
      <div class="w-1/2 h-full flex justify-between">
        <ul class="h-3/4 grid grid-cols-1 gap-16 font-sans-serif font-semibold  text-gray-900">
          <li v-if="category.featured" v-for="featured in category.featured" :key="featured.id">
            <a href="#" class="hover:text-gray-500">
              {{ featured.name }}
            </a>
          </li>
        </ul>
      </div>

      <div class="flex h-full">
        <span class="h-3/4 w-[0.5px] bg-[#9CA3AF] mx-[60px]" aria-hidden="true" />
        <NuxtLink to="/">
          <img :src="category.image" class="h-[258px] w-[504px]">
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  menu_data: {
    type: Object
  }

})

</script>