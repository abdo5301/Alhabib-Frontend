<template>
  <Title>{{ page_title }} | {{ website_name }}</Title>
  <div v-if="data_loader" class="flex items-center justify-center h-[600px] max-h-screen w-full mx-auto">
    <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
  </div>
  <div v-else class="pb-[104px]">
    <ClientOnly>
      <Breadcrumb class="pb-[40px]" :current="page_title" :pages="breadcrumb"></Breadcrumb>
      <div v-if="page_data" class="w-full flex justify-center">
        <div
          class="flex flex-col lg:gap-8 gap-6 justify-start items-center bg-white rounded-lg shadow lg:w-[1017px] w-[95%] mb-[100px]">
          <img v-if="page_data.image" :src="page_data.image" class="w-full h-[394px] object-cover rounded-lg"
            :alt="page_title">
          <img v-else src="/images/placeholder-logo.png" class="w-full h-[394px] object-cover rounded-lg"
            :alt="page_title">
          <div class="flex flex-col justify-center items-center lg:gap-8 gap-6 pb-8 px-8 max-w-full">
            <span dir="ltr" v-if="page_data.created_at"
              class="text-gray-500 lg:text-[20px] text-[14px] font-bold leading-6">
              {{ format(new Date(page_data.created_at), "dd MMMM yyyy") }}
            </span>
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
import { format } from "date-fns";
const website_name = useState('website_name')
const localePath = useLocalePath()
const route = useRoute()
const { t } = useI18n()
const data_loader = ref(true)
const { getArticle } = useBlog()
//Page data reference
// const page_url_slug = route.params && route.params.id ? route.params.id : route.name
const page_url_id = route.params && route.params.id ? route.params.id : null
const page_data = ref({})
const page_title = ref('')
const page_content = ref('')
const breadcrumb = ref([])
onMounted(async () => {
  initFlowbite()
  try {
    page_data.value = await getArticle(page_url_id)
  } catch (error) {
    console.log(error.data)
    throw createError({
      statusCode: 404,
      statusMessage: 'page_not_found',
      fatal: true
    })
  }
  if (page_data.value.content) {
    page_title.value = page_data.value.title
    page_content.value = page_data.value.content
    breadcrumb.value = [
      {
        'name': t('blog_title'),
        'link': localePath('/blog')
      }
    ]
  }
  console.log(page_data.value);
  data_loader.value = false
})
</script>