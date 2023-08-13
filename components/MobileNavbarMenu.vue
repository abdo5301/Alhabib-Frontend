<template>
  <!-- Start Mobile Navigation -->
  <div class="flex items-start rounded-m lg:hidden cursor-pointer" data-drawer-target="mobile-main-menu"
    data-drawer-show="mobile-main-menu" data-drawer-placement="right" aria-controls="mobile-main-menu">
    <span class="sr-only">Open menu</span>
    <svg v-if="lang.code == 'ar'" xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25"
      fill="none">
      <path d="M3.2923 7.19141H23.0461" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
      <path d="M11 12.2268L23 12.2268" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
      <path d="M12 17.262L23 17.262" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none">
      <path d="M24.0054 7.0498H4.28485" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
      <path d="M16.3107 12.085L4.33091 12.085" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
      <path d="M15.3124 17.1201L4.33094 17.1201" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <span class="font-bold text-sm rtl:-mr-[7px] ltr:-ml-[7px] ltr:mt-[4px] rtl:mt-[6.5px] lg:hidden cursor-pointer">{{
      $t('header_mobile_menu') }}</span>
  </div>

  <!-- Start Mobile Main Menu -->
  <div id="mobile-main-menu"
    class="fixed flex top-0 left-0 z-40 h-screen overflow-y-auto transition-transform -translate-x-full duration-500 bg-white w-full dark:bg-gray-800"
    tabindex="-1">

    <div class="flex basis-full flex-col">
      <div class="flex items-center justify-end rtl:pl-8 ltr:pr-8 rtl:pr-4 ltr:pl-4 pt-6 pb-5">
        <!--Close menu  -->
        <div class="bg-transparent rounded-lg w-6 h-5 flex flex-1 items-center justify-start">
          <button type="button" data-drawer-hide="mobile-main-menu" aria-controls="mobile-main-menu"
            class="bg-transparent rounded-lg w-6 h-5 flex items-center justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 32 28" fill="none">
              <path d="M24.1027 22.8425L6.19238 4.93164" stroke="gray" stroke-width="1.5" stroke-miterlimit="10"
                stroke-linecap="round" stroke-linejoin="round" />
              <path d="M24.0139 5.02075L6.10352 22.9316" stroke="gray" stroke-width="1.5" stroke-miterlimit="10"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="sr-only">Close menu</span>
          </button>
        </div>
        <!-- Currency -->
        <SelectMenu :select_data="currency_data" :label_selected="true" :with_name="true" :label_selected_name="true" />
        <span class="h-6 w-[0.5px] bg-[#4B5563] mx-[8px]" aria-hidden="true" />
        <!-- Language -->
        <a v-for="locale in availableLocales" :key="locale.code" :href="switchLocalePath(locale.code)"
          :title="locale.name"><img width="23" height="22" :src="locale.icon" :alt="locale.name"></a>

      </div>
      <ul class="flex flex-col gap-7 rtl:pr-4 rtl:pl-[22px] ltr:pr-[22px] ltr:pl-4">
        <li v-if="menu_data.pages.length" v-for="page in menu_data.pages" :key="page.name"
          class="border-b border-gray-300 pb-4">
          <NuxtLink :to="page.href" class="bg-transparent rounded-lg w-full flex justify-between px-2">
            <span class="text-red-500 text-base font-semibold">
              {{ page.name }}
            </span>
          </NuxtLink>
        </li>

        <li v-for="category in menu_data.categories" :key="category.id" class="border-b border-gray-300 pb-4">
          <button v-if="category.featured.length" type="button" :data-drawer-target="'mobile-menu-' + category.id"
            :data-drawer-show="'mobile-menu-' + category.id" data-drawer-hide="mobile-main-menu"
            :aria-controls="'mobile-menu-' + category.id" data-drawer-placement="right"
            class="bg-transparent rounded-lg w-full flex justify-between px-2">
            <span class="text-gray-600 text-base font-semibold">{{
              category.name }}</span>
            <svg v-if="lang.code == 'ar'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
              fill="none">
              <path d="M12.7593 7.90625L4.66602 15.9996L12.7593 24.0929" stroke="#4B5563" stroke-width="0.6"
                stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M27.3326 16H4.89258" stroke="#4B5563" stroke-width="0.6" stroke-miterlimit="10"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M14.43 5.92969L20.5 11.9997L14.43 18.0697" stroke="#4B5563" stroke-width="0.6"
                stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3.50008 12H20.3301" stroke="#4B5563" stroke-width="0.6" stroke-miterlimit="10"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <NuxtLink v-else :to="category.href"
            class="bg-transparent rounded-lg w-full flex justify-between px-2">
            <span class="text-gray-600 text-base font-semibold">{{
              category.name }}</span>
          </NuxtLink>
        </li>
      </ul>
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
        class="bg-transparent rounded-lg w-8 h-8 pt-4 rtl:mr-4 ltr:ml-4 flex items-center justify-center">
        <svg v-if="lang.code == 'ar'" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
          fill="none">
          <path d="M19.24 7.90674L27.3333 16.0001L19.24 24.0934" stroke="#6B7280" stroke-width="1.5"
            stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4.66675 16H27.1067" stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M12.76 7.90674L4.66668 16.0001L12.76 24.0934" stroke="#6B7280" stroke-width="1.5"
            stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M27.3333 16H4.89334" stroke="#6B7280" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <ul class="flex flex-col gap-7 pt-4 rtl:pr-4 rtl:pl-[22px] ltr:pr-[22px] ltr:pl-4">
        <li class="border-b border-gray-300 pb-4 pt-3">
          <NuxtLink :to="category.href"
            class="bg-transparent text-gray-600 rounded-lg w-full flex justify-between px-2">
            <span class="text-gray-600 text-base font-semibold">{{ $t('header_mobile_menu_view_all') }}</span>
          </NuxtLink>
        </li>

        <li v-for="featured in category.featured" :key="featured.id" class="border-b border-gray-300 pb-4">
          <NuxtLink :to="featured.href"
            class="bg-transparent text-gray-600 rounded-lg w-full flex justify-between px-2">
            <span class="text-gray-600 text-base font-semibold">{{
              featured.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
  <!-- End Mobile Sub Menu -->

  <!-- End Mobile Navigation -->
</template>


<script setup>
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = useNuxtApp().$all_lang
const lang = useNuxtApp().$lang

const props = defineProps({
  menu_data: {
    type: Object
  },
  currency_data: {
    type: Object
  }

})


</script>