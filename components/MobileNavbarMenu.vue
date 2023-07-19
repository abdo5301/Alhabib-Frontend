<template>
  <!-- Start Mobile Navigation -->
  <div class="flex items-start rounded-m lg:hidden cursor-pointer" data-drawer-target="mobile-main-menu"
    data-drawer-show="mobile-main-menu" data-drawer-placement="right" aria-controls="mobile-main-menu">
    <span class="sr-only">Open menu</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
      <path d="M3.2923 7.19141H23.0461" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
      <path d="M11 12.2268L23 12.2268" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
      <path d="M12 17.262L23 17.262" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <span class="font-bold text-sm rtl:-mr-[7px] ltr:-ml-[7px] mt-[6.5px] lg:hidden cursor-pointer">الأقسام</span>
  </div>

  <!-- Start Mobile Main Menu -->
  <div id="mobile-main-menu"
    class="fixed flex top-0 left-0 z-40 h-screen overflow-y-auto transition-transform -translate-x-full duration-500 bg-white w-full dark:bg-gray-800"
    tabindex="-1">

    <div class="flex basis-full flex-col">
      <ul class="flex flex-col gap-7 pt-[64px] px-7">
        <li v-if="menu_data.pages.length" v-for="page in menu_data.pages" :key="page.name"
          class="border-b border-gray-300 pb-4">
          <NuxtLink :to="page.href" class="bg-transparent rounded-lg w-full flex justify-between rtl:pl-4 ltr:pr-4">
            <span class="text-red-500 text-base font-semibold">
              {{ page.name }}
            </span>
          </NuxtLink>
        </li>

        <li v-for="category in menu_data.categories" :key="category.id" class="border-b border-gray-300 pb-4">
          <button v-if="category.featured.length" type="button" :data-drawer-target="'mobile-menu-' + category.id"
            :data-drawer-show="'mobile-menu-' + category.id" data-drawer-hide="mobile-main-menu"
            :aria-controls="'mobile-menu-' + category.id" data-drawer-placement="right"
            class="bg-transparent rounded-lg w-full flex justify-between rtl:pl-4 ltr:pr-4">
            <span class="text-gray-600 text-base font-semibold">{{
              category.name }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M12.7593 7.90625L4.66602 15.9996L12.7593 24.0929" stroke="#4B5563" stroke-width="0.6"
                stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M27.3326 16H4.89258" stroke="#4B5563" stroke-width="0.6" stroke-miterlimit="10"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <NuxtLink v-else :to="category.href"
            class="bg-transparent rounded-lg w-full flex justify-between rtl:pl-4 ltr:pr-4">
            <span class="text-gray-600 text-base font-semibold">{{
              category.name }}</span>
          </NuxtLink>
        </li>

        <li class="border-b border-gray-300 pb-5">
          <div class="flex items-center justify-center gap-10 px-5">
            <!-- Language -->
            <SelectMenu :select_data="language_data" :label_selected="true" :with_image="true" :with_name="true" />
            <span class="h-8 w-[0.5px] bg-[#4B5563] mx-[10px]" aria-hidden="true" />
            <!-- Currency -->
            <SelectMenu :select_data="currency_data" :label_selected="true" :with_name="true"
              :label_selected_name="true" />
          </div>
        </li>

      </ul>
    </div>

    <div class="bg-[#1a191961] basis-[77px] flex justify-center pt-5">
      <button type="button" data-drawer-hide="mobile-main-menu" aria-controls="mobile-main-menu"
        class="bg-transparent rounded-lg w-8 h-7 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none">
          <path d="M24.1027 22.8425L6.19238 4.93164" stroke="white" stroke-width="1.5" stroke-miterlimit="10"
            stroke-linecap="round" stroke-linejoin="round" />
          <path d="M24.0139 5.02075L6.10352 22.9316" stroke="white" stroke-width="1.5" stroke-miterlimit="10"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
    </div>
  </div>
  <!-- End Mobile Main Menu -->

  <!-- Start Mobile Sub Menu -->
  <div v-for="category in menu_data.categories" :id="'mobile-menu-' + category.id"
    class="fixed flex top-0 left-0 z-40 h-screen overflow-y-auto transition-transform -translate-x-full duration-500 bg-white w-full dark:bg-gray-800"
    tabindex="-1">

    <div class="flex basis-full flex-col" v-if="category.featured.length">
      <button type="button" :data-drawer-hide="'mobile-menu-' + category.id" data-drawer-show="mobile-main-menu"
        :aria-controls="'mobile-menu-' + category.id"
        class="bg-transparent rounded-lg w-8 h-8 pt-[21px] rtl:mr-6 ltr:ml-6 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M19.24 7.90674L27.3333 16.0001L19.24 24.0934" stroke="#6B7280" stroke-width="1.5"
            stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4.66675 16H27.1067" stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <ul class="flex flex-col gap-7 pt-[19px] px-7">
        <li class="border-b border-gray-300 pb-4">
          <NuxtLink :to="category.href"
            class="bg-transparent text-gray-600 rounded-lg w-full flex justify-between rtl:pl-4 ltr:pr-4">
            <span class="text-gray-600 text-base font-semibold"> عرض الكل </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M12.7593 7.90625L4.66602 15.9996L12.7593 24.0929" stroke="#4B5563" stroke-width="0.6"
                stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M27.3326 16H4.89258" stroke="#4B5563" stroke-width="0.6" stroke-miterlimit="10"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
        </li>

        <li v-for="featured in category.featured" :key="featured.id" class="border-b border-gray-300 pb-4">
          <NuxtLink :to="featured.href"
            class="bg-transparent text-gray-600 rounded-lg w-full flex justify-between rtl:pl-4 ltr:pr-4">
            <span class="text-gray-600 text-base font-semibold">{{
              featured.name }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M12.7593 7.90625L4.66602 15.9996L12.7593 24.0929" stroke="#4B5563" stroke-width="0.6"
                stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M27.3326 16H4.89258" stroke="#4B5563" stroke-width="0.6" stroke-miterlimit="10"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="bg-[#1a191961] basis-[77px] flex justify-center pt-5" v-if="category.featured.length">
      <button type="button" :data-drawer-hide="'mobile-menu-' + category.id" :aria-controls="'mobile-menu-' + category.id"
        class="bg-transparent rounded-lg w-8 h-7 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none">
          <path d="M24.1027 22.8425L6.19238 4.93164" stroke="white" stroke-width="1.5" stroke-miterlimit="10"
            stroke-linecap="round" stroke-linejoin="round" />
          <path d="M24.0139 5.02075L6.10352 22.9316" stroke="white" stroke-width="1.5" stroke-miterlimit="10"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
    </div>
  </div>
  <!-- End Mobile Sub Menu -->

  <!-- End Mobile Navigation -->
</template>


<script setup>
const props = defineProps({
  menu_data: {
    type: Object
  },
  language_data: {
    type: Object
  },currency_data: {
    type: Object
  }

})


</script>