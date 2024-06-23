<template>
  <div v-if="article_data"
    class="flex flex-col flex-wrap lg:gap-5 gap-6 justify-start items-center bg-white rounded-lg shadow lg:w-[801px] w-[95%] mb-[100px]">
    <NuxtImg :src="article_data.image ??= '/images/placeholder-logo.png'"  
      class="w-full h-[394px] object-cover rounded-lg" :alt="article_data.title" />
      <div class="relative flex flex-col justify-center items-center lg:gap-8 gap-6 pb-8 px-8 max-w-full">
        <span dir="ltr" v-if="article_data.created_at"
          class="text-gray-500 lg:text-[20px] text-[14px] font-bold leading-6">
          {{ format(new Date(article_data.created_at), "dd MMMM yyyy") }}
        </span>
        <h2 v-if="article_data.title" class="font-bold lg:text-[25px] text-[18px] leading-6 text-black">
          {{ article_data.title }}
        </h2>
        <p v-if="article_data.content" v-html="decodeHtml(article_data.content)"
          class="w-full max-w-full overflow-hidden line-clamp-5"></p>
        <div class="w-full flex-row justify-end items-center">
          <NuxtLink class="flex lg:gap-5 gap-4 pt-2 justify-end items-center"
            :to="localePath('/blog/' + article_data.id)">
            <span class="lg:text-[20px] text-[14px] font-bold text-black leading-6">{{ $t('btn_read_more') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-5 lg:h-5 w-4 h-4" viewBox="0 0 21 22" fill="none">
              <path d="M0.317009 11.6885L20.2511 21.5577L19.702 0.780311L0.317009 11.6885Z" fill="black" />
            </svg>
          </NuxtLink>
        </div>
      </div>
  </div>
</template>

<script setup>
import { format } from "date-fns";
const localePath = useLocalePath()
const props = defineProps({
  article_data: {
    type: Object
  }
})
</script>