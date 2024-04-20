<template>
  <!-- Flyout menus -->
  <div class="hidden lg:flex justify-center items-center mx-auto max-w-full ">
    <div
      class="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1 overflow-y-hidden overflow-x-hidden hover:overflow-x-auto pb-3 no-scrollbar">
      <ul class="flex gap-6 items-center justify-start font-sans-serif font-bold text-lg leading-[23px] ">
        <li class="min-w-max" v-for="category in menu_data.data" :key="category.id">
          <NuxtLink to="javascript:void(0)" :data-popover-target="'desk-nav-category-' + category.id"
            data-popover-offset="0" :id="category.id + '-link'" data-popover-placement="bottom"
            class="text-gray-900  pb-1 focus:border-b-2 focus:border-b-gray-400 text-center hover:border-b-2 hover:border-b-gray-400">
            {{ category.name }}
          </NuxtLink>
        </li>
        <li v-if="menu_data.pages && menu_data.pages.length" v-for="page in menu_data.pages" :key="page.name">
          <NuxtLink :to="localePath(page.href)"
            class="text-red-500 pb-1 focus:border-b-2 focus:border-b-red-500 text-center hover:border-b-2 hover:border-b-red-500">
            {{ page.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>

  <div v-for="category in menu_data.data" :key="category.id" :id="'desk-nav-category-' + category.id" data-popover
    role="tooltip"
    class="bg-white max-h-[400px] h-[400px] rounded-b-lg border-gray-200 shadow-sm border-y w-full px-8 pb-4 invisible">
    <div class="pt-8 pb-2 px-[100px]">
      <NuxtLink :to="localePath('/' + category.slug)" class=" text-gray-900 font-bold text-lg">
        {{ category.name }}
      </NuxtLink>
    </div>

    <div class="w-full h-full flex justify-between mb-8 py-5 px-[100px] text-base text-gray-500">
      <div class="h-full flex flex-1">
        <ul v-if="category.subcategory"
          class="w-full h-3/4 flex flex-col justify-start flex-wrap gap-11 font-sans-serif font-semibold  text-gray-900">
          <li v-for="sub_category in category.subcategory" :key="sub_category.id">
            <NuxtLink :to="localePath('/' + sub_category.slug)" class="hover:text-gray-500">
              {{ sub_category.name }}
            </NuxtLink>
            <ul v-if="sub_category.subcategory"
              class="flex gap-2 flex-col flex-wrap font-sans-serif font-semibold text-base text-gray-500 pt-2">
              <li v-for="m_sub_category in sub_category.subcategory" :key="m_sub_category.id">
                <NuxtLink :to="localePath('/' + m_sub_category.slug)" class="hover:text-gray-500">
                  {{ m_sub_category.name }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="flex h-full ">
        <span class="h-3/4 w-[0.5px] bg-[#9CA3AF] mx-[60px]" aria-hidden="true" />
        <ClientOnly>
          <NuxtLink :to="localePath('/' + category.slug)">
          <img v-if="category.image" :src="category.image" class="h-[258px] w-[504px]">
          <img v-else src="/images/placeholder-logo.png"
            class="h-[258px] w-[504px] object-cover">
        </NuxtLink>
        </ClientOnly>
        
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
const props = defineProps({
  menu_data: {
    type: Object
  }

})

</script>