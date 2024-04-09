<template>
  <Title>{{ page_title }} | {{ website_name }}</Title>
  <div v-if="data_loader" class="flex items-center justify-center h-[600px] max-h-screen w-full mx-auto">
    <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
  </div>
  <div v-else class="pb-[104px]">
    <ClientOnly>
      <Breadcrumb class="pb-[40px]" :current="page_title"></Breadcrumb>
      <div class="w-full flex justify-center">
        <div
          class="flex flex-col lg:gap-8 gap-6 justify-start items-center bg-white rounded-lg shadow lg:w-[1017px] w-[95%] mb-[100px]">
          <img src="/images/placeholder-logo.png" class="w-full h-[394px] object-cover rounded-lg" :alt="page_title">
          <div class="flex flex-col justify-center items-center lg:gap-8 gap-6 pb-8 px-8 max-w-full">
            <h2 class="font-bold lg:text-[25px] text-[18px] leading-6 text-black">{{ page_title }}</h2>
            <p v-html="decodeHtml(page_content)" class="w-full max-w-full overflow-auto overflow-y-hidden"></p>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
const website_name = useState('website_name')
const localePath = useLocalePath()
const route = useRoute();
const data_loader = ref(true)

//Page data reference
const page_url_slug = route.params && route.params.slug ? route.params.slug : route.name
const page_fetch_data = ref({})
const page_data = ref({})
const page_title = ref('')
const page_content = ref('')
onMounted(async () => {
  initFlowbite()
  try {
    page_fetch_data.value = await useNuxtApp().$apiFetch('/page/get?slug=' + page_url_slug)
  } catch (error) {
    console.log(error.data)
    throw createError({
      statusCode: 404,
      statusMessage: 'page_not_found',
      fatal: true
    })
  }
  if (page_fetch_data.value.status && page_fetch_data.value.status == true && page_fetch_data.value.data) {
    page_data.value = page_fetch_data.value.data
    page_title.value = page_data.value.title
    page_content.value = page_data.value.content
  }
  data_loader.value = false
})
</script>