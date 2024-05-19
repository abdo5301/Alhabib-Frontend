<template>
  <!-- <ClientOnly> -->
    <div class="flex mx-auto container flex-col gap-7 lg:gap-8 justify-center items-center px-[22px] lg:px-[75px]">
      <h2 class="text-gray-700 text-[20px] lg:text-[34px] font-bold">
        <slot />
      </h2>
      <div class="container relative flex flex-col lg:flex-row justify-start mx-auto mb-24 bg-[#fff]">
        <div class="flex flex-shrink-0 font-semibold justify-start">
          <NuxtImg v-if="blog_data.image" preload :src="blog_data.image" loading="lazy" width="300px" class="flex-shrink-0 lg:w-[563px] w-full lg:max-w-[563px] h-full object-cover"
            alt="Blog" />
          <NuxtImg v-else src="/images/bedding-202.png" loading="lazy" width="300px" class="flex-shrink-0 lg:w-[563px] w-full h-full" alt="Blog" />
        </div>
        <ul v-if="blog_data.topics && blog_data.topics.length"
          class="flex flex-col pt-6 pb-16 lg:pt-[45px] gap-8 lg:gap-12 underline-offset-8 text-gray-600 lg:text-[#000] font-semibold text-base lg:text-2xl flex-1 w-full rtl:mr-5 ltr:ml-5 lg:rtl:mr-24 lg:ltr:ml-20">
          <li v-for="topic, index in blog_data.topics" :key="index" class="empty:hidden">
            <NuxtLink v-if="index <= 6" :to="localPath('/blog/' + topic.id)" class="underline">{{ topic.title }}
            </NuxtLink>
          </li>
        </ul>
        <div
          class="lg:absolute lg:bottom-7 lg:rtl:left-6 lg:ltr:right-6 mx-6 mt-7 mb-4 lg:my-0 lg:mx-0 flex justify-end text-[#000] lg:font-semibold font-bold lg:text-2xl text-xs">
          <NuxtLink :to="localPath('/blog')"
            class="bg-[#D1D5DB] rounded-lg flex items-center justify-center lg:gap-3 gap-2 h-[26px] lg:h-[59px] w-[115px] lg:w-[231px] leading-4">
            {{ $t('home_blog_link_btn') }}
            <span class="hidden lg:block rtl:pr-3 ltr:pl-3 pt-1">
              <svg v-if="$lang.dir == 'rtl'" xmlns="http://www.w3.org/2000/svg" width="24" height="31"
                viewBox="0 0 24 31" fill="none">
                <path d="M9.57 8.26831L3.5 15.7294L9.57 23.1904" stroke="#292D32" stroke-width="1.5"
                  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.4999 15.7292H3.66992" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="29" viewBox="0 0 22 29" fill="none">
                <path d="M13.2275 7.16541L18.7916 14.5L13.2275 21.8346" stroke="#292D32" stroke-width="1.5"
                  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3.20836 14.5H18.6359" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span class="lg:hidden pt-[3px]">
              <svg v-if="$lang.dir == 'rtl'" xmlns="http://www.w3.org/2000/svg" width="11" height="13"
                viewBox="0 0 24 31" fill="none">
                <path d="M9.57 8.26831L3.5 15.7294L9.57 23.1904" stroke="#292D32" stroke-width="1.5"
                  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M20.4999 15.7292H3.66992" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="11" height="13" viewBox="0 0 11 13" fill="none">
                <path d="M6.27279 3.46484L8.87531 6.49984L6.27279 9.53484" stroke="#292D32" stroke-width="1.5"
                  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M1.58657 6.5H8.80243" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  <!-- </ClientOnly> -->

</template>

<script setup>
const { $lang } = useNuxtApp()
const localPath = useLocalePath()
const props = defineProps({
  blog_data: {
    type: Object
  }
})
</script>