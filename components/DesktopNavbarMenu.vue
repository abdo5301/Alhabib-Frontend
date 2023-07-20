<template>
  <!-- Flyout menus -->
  <div class="hidden lg:flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    <div class="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1">
      <ul class="flex gap-6">
        <li v-for="category in menu_data.categories" :key="category.id">
          <NuxtLink v-if="category.featured.length" to="#" :data-popover-target="category.id" data-popover-offset="0" :id="category.id + '-link'"
            data-popover-placement="bottom"
            class="text-gray-900 pb-1 focus:border-b-2 focus:border-b-gray-700 text-sm text-center hover:border-b-2 hover:border-b-gray-700">
            {{ category.name }}
          </NuxtLink>

          <NuxtLink v-else :to="category.href"  
            class="text-gray-900 pb-1 focus:border-b-2 focus:border-b-gray-700 text-sm text-center hover:border-b-2 hover:border-b-gray-700" >
            {{ category.name }}
          </NuxtLink>
        </li>
        <li v-if="menu_data.pages.length" v-for="page in menu_data.pages" :key="page.name">
          <NuxtLink  :to="page.href"  
            class="text-red-500 pb-1 focus:border-b-2 focus:border-b-red-500 text-sm text-center hover:border-b-2 hover:border-b-red-500" >
            {{ page.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>

  <div v-for="category in menu_data.categories" :key="category.id" :id="category.id" data-popover role="tooltip"
    class="bg-white max-h-[400px] h-[400px] rounded-lg border-gray-200 shadow-sm border-y w-full px-8 pb-4 invisible">

    <h2 class="pt-8 pb-2 px-[100px]">{{ category.name }}</h2>
    <div class="w-full h-full flex max-w-screen-xl px-4 mb-8 py-5 mx-auto text-sm text-gray-500">
      <div class="w-1/2 h-full flex justify-between">
        <ul class="h-3/4 grid grid-cols-1 content-between">
          <li>
            <a href="#" class="hover:underline hover:text-gray-500">
              مفارش صيفية
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
              مفارش صيفية
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
              مفارش صيفية
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
              مفارش صيفية
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
              مفارش صيفية
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
              مفارش صيفية
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
              مفارش صيفية
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
              مفارش صيفية
            </a>
          </li>
        </ul>
        <ul class="h-3/4 grid grid-cols-1 content-between">
          <li>
            <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
              وسائد
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
              حشوة لحاف
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
              وسائد كراسي
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
              أطقم غطاء
            </a>
          </li>
        </ul>
      </div>

      <div class="flex h-full">
        <span class="h-3/4 w-[0.5px] bg-[#9CA3AF] mx-[60px]" aria-hidden="true" />
        <NuxtLink to="/"
          class="p-8 h-3/4 text-left bg-local bg-gray-500 bg-center bg-no-repeat bg-cover rounded-lg bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken"
          style="background-image: url(images/bedding-202.png)">
          <p class="max-w-xl mb-5 font-extrabold leading-tight tracking-tight text-white">
            مفارش الحبيب طريقك الى الراحة والسعادة
          </p>
          <button type="button"
            class="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-center text-white border border-white rounded-lg hover:bg-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700">
            <img class="w-full text-center" src="/images/logo.svg" alt="" />
          </button>
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