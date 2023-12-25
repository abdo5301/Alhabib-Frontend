<template>
  <div class="flex mx-auto container flex-col justify-center items-center px-[22px] lg:px-[75px] pb-20">
    <h3 class="text-gray-700 text-xl lg:text-[34px] leading-4 font-bold lg:pb-9 pb-3">
      {{ $t('home_customer_image_title') }}
    </h3>
    <div class="lg:pb-5 pb-2 text-center text-gray-600 lg:text-2xl text-base font-normal px-4">
      {{ $t('home_customer_image_description') }}
    </div>
    <NuxtLink dir="ltr" to="https://www.instagram.com/alhabib_shop/" class="flex items-center justify-center gap-2 lg:pb-9 pb-7">
      <img src="/images/insta_icon.svg" alt="" class="lg:w-[27px] lg:h-[26px] w-[23px]">  <span class="text-gray-600 text-base lg:text-xl font-semibold">@alhabib_shop</span> 
    </NuxtLink>
    <div  
      class="overflow-hidden hover:overflow-x-auto flex w-full mx-auto items-center justify-start lg:gap-[34px] gap-5 pb-4">
      <div v-for="image in images" :key="image.id"
        class="relative flex flex-shrink-0 flex-col gap-5 items-center justify-center">
        <img class="lg:w-[302px] w-[180px] lg:h-[350px] h-[200px]" :src="image.image">
        <NuxtLink :to="image.link"  class="absolute bg-white lg:p-2 p-1 rounded-full lg:top-[17px] top-[10px] lg:right-[14px] right-2 text-gray-700 text-base lg:text-xl font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-[34px] w-5 h-5 lg:h-[34px] " viewBox="0 0 35 35" fill="none">
            <path
              d="M11.1719 11.411V10.0469C11.1719 6.88287 13.7172 3.77506 16.8813 3.47975C20.65 3.11412 23.8281 6.08131 23.8281 9.77975V11.7204"
              stroke="#4B5563" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M13.2813 31.5625H21.7188C27.3719 31.5625 28.3844 29.2984 28.6797 26.5422L29.7344 18.1047C30.1141 14.6734 29.1297 11.875 23.125 11.875H11.875C5.87034 11.875 4.88597 14.6734 5.26566 18.1047L6.32034 26.5422C6.61566 29.2984 7.62816 31.5625 13.2813 31.5625Z"
              stroke="#4B5563" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M22.4155 17.5H22.4281" stroke="#4B5563" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M12.5704 17.5H12.583" stroke="#4B5563" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>


<script setup>
const images = [
  {
    'id': 1,
    'image': '/images/customer/customer-image-1.png',
    'link': '#'
  },
  {
    'id': 2,
    'image': '/images/customer/customer-image-2.png',
    'link': '#'
  },
  {
    'id': 3,
    'image': '/images/customer/customer-image-1.png',
    'link': '#'
  },
  {
    'id': 4,
    'image': '/images/customer/customer-image-2.png',
    'link': '#'
  },
  {
    'id': 5,
    'image': '/images/customer/customer-image-1.png',
    'link': '#'
  }
]
</script>