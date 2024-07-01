<template>
  <Title>{{ $t('blog_title') }} | {{ website_name }}</Title>
  <div v-if="data_loader" class="flex items-center justify-center h-[600px] max-h-screen w-full mx-auto">
    <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
  </div>
  <div v-else class="pb-[104px]">
    <ClientOnly>
      <Breadcrumb class="pb-[40px]" :current="$t('blog_title')"></Breadcrumb>
      <div v-if="!empty_data" class="w-full flex flex-col justify-center items-center">
        <BlogArticleItem v-for="(blog_item, index) in blog_items" :key="index" :article_data="blog_item" />
        <!-- Infinite  scroll -->
        <div v-if="!data_loader" class="flex items-center justify-center flex-col gap-5 w-full pt-4">
          <button v-if="blog_items.length != blog_data.meta.total" type="button" @click="loadMore()"
            :disabled="infinite_scroll_loading"
            class="flex justify-center items-center gap-[11px] py-[9px] w-[194px] ring-1 ring-gray-300 rounded-2xl bg-white shadow-sm text-gray-700 text-base leading-5 font-bold hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed">
            {{ $t('category_load_more_btn') }}
            <svg v-if="!infinite_scroll_loading" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              viewBox="0 0 16 16" fill="none">
              <path d="M8 4V8M8 8V12M8 8H12M8 8L4 8" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            <svg v-else aria-hidden="true"
              class="inline w-5 h-5  text-gray-300 animate-spin fill-black" viewBox="0 0 100 101"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
          </button>
          <span v-if="blog_items.length > 0" class="text-gray-900 text-base font-normal leading-5">
            لقد شاهدت {{ blog_items.length }} من أصل {{ blog_data.meta.total }} من المقالات
          </span>
          <span v-else class="text-gray-900 text-lg font-semibold leading-5">
            {{ $t('text_empty_products') }}
          </span>
        </div>
      </div>

      <div v-if="empty_data" class="w-full flex items-center justify-center text-2xl font-semibold my-52">
        لا توجد مقالات !
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
const { getArticles } = useBlog()
const data_url = ref('/blog/blog-articles/get-all')
const infinite_scroll_loading = ref(false)
const current_page = ref(1)
//Blog data reference
const blog_data = ref({})
const blog_items = ref([])
const empty_data = ref(false)
onMounted(async () => {
  initFlowbite()
  try {
    blog_data.value = await getArticles(data_url.value)
    if (blog_data.value.data && !isEmpty(blog_data.value.data)) {//success
      blog_items.value = blog_items.value.concat(blog_data.value.data)
    } else {
      empty_data.value = true
    }
  } catch (error) {
    console.log("Failed to fetch data:", error)
    throw createError({
      statusCode: 403,
      statusMessage: 'No Articles Found !',
      fatal: true
    })
  }
  data_loader.value = false
})
// console.log(blog_data.value)
async function loadMore() {
  infinite_scroll_loading.value = true
  if (current_page.value > 1 && data_url.value.includes('?page=')) {
    data_url.value = data_url.value.replace('?page=' + current_page.value, '?page=' + (current_page.value + 1))
  } else {
    data_url.value += '?page=' + (current_page.value + 1)
  }

  try {
    blog_data.value = await getArticles(data_url.value)
    if (blog_data.value.data) {//success
      blog_items.value = blog_items.value.concat(blog_data.value.data)
      if (blog_data.value.meta.total != blog_items.value.length) {
        current_page.value = current_page.value + 1
      }
    } else {//reset url page parameter
      data_url.value = data_url.value.replace('?page=' + current_page.value, '?page=' + (current_page.value - 1))
    }
  } catch (error) {
    console.log("Failed to fetch data:", error)
    data_url.value = data_url.value.replace('?page=' + current_page.value, '?page=' + (current_page.value - 1))
  }

  infinite_scroll_loading.value = false
}

</script>