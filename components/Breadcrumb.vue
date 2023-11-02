<template>
  <ol class="mt-[35px] lg:mt-[63px] mx-7 lg:gap-4 gap-[6px] flex items-center flex-wrap">
    <li class="flex items-center lg:gap-4 gap-[6px] flex-shrink-0">
      <NuxtLink class="flex items-center" :to="localePath('/')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10.7071 2.29289C10.3166 1.90237 9.68342 1.90237 9.29289 2.29289L2.29289 9.29289C1.90237 9.68342 1.90237 10.3166 2.29289 10.7071C2.68342 11.0976 3.31658 11.0976 3.70711 10.7071L4 10.4142V17C4 17.5523 4.44772 18 5 18H7C7.55228 18 8 17.5523 8 17V15C8 14.4477 8.44772 14 9 14H11C11.5523 14 12 14.4477 12 15V17C12 17.5523 12.4477 18 13 18H15C15.5523 18 16 17.5523 16 17V10.4142L16.2929 10.7071C16.6834 11.0976 17.3166 11.0976 17.7071 10.7071C18.0976 10.3166 18.0976 9.68342 17.7071 9.29289L10.7071 2.29289Z"
            fill="#9CA3AF" />
        </svg>
      </NuxtLink>
    </li>
    <li v-if="pages[0] && pages[0].name" v-for="page, index in pages" :key="index"
      class="flex flex-shrink-0 items-center lg:gap-4 gap-[6px] empty:hidden">
      <svg v-if="lang.dir == 'rtl'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
        fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
          fill="#9CA3AF" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M7.29289 5.29289C6.90237 5.68342 6.90237 6.31658 7.29289 6.70711L10.5858 10L7.29289 13.2929C6.90237 13.6834 6.90237 14.3166 7.29289 14.7071C7.68342 15.0976 8.31658 15.0976 8.70711 14.7071L12.7071 10.7071C13.0976 10.3166 13.0976 9.68342 12.7071 9.29289L8.70711 5.29289C8.31658 4.90237 7.68342 4.90237 7.29289 5.29289Z"
          fill="#9CA3AF" />
      </svg>
      <NuxtLink class="flex items-center text-gray-500 font-semibold lg:text-base text-xs leading-5"
        :to="localePath(page.link)">
        {{ page.name }}
      </NuxtLink>
    </li>
    <li v-if="current" class="flex flex-shrink-0 items-center lg:gap-4 gap-[6px]">
      <svg v-if="lang.dir == 'rtl'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
        fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
          fill="#9CA3AF" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M7.29289 5.29289C6.90237 5.68342 6.90237 6.31658 7.29289 6.70711L10.5858 10L7.29289 13.2929C6.90237 13.6834 6.90237 14.3166 7.29289 14.7071C7.68342 15.0976 8.31658 15.0976 8.70711 14.7071L12.7071 10.7071C13.0976 10.3166 13.0976 9.68342 12.7071 9.29289L8.70711 5.29289C8.31658 4.90237 7.68342 4.90237 7.29289 5.29289Z"
          fill="#9CA3AF" />
      </svg>
      <span class="flex items-center text-gray-500 font-bold lg:text-lg text-xs leading-5">
        {{ current }}
      </span>
    </li>
  </ol>
</template>


<script setup>
defineProps({
  pages: {
    type: Object,
  },
  current: {
    type: String
  }
});

const localePath = useLocalePath()
const lang = useNuxtApp().$lang

</script>