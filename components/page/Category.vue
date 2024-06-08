<template>
  <Title>{{ category_meta_title }} | {{ website_name }}</Title>
  <!-- <div v-if="pending" class="flex items-center justify-center h-[600px] max-h-screen w-full mx-auto">
    <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
  </div> -->
  <div class="pb-[104px]">

    <Breadcrumb class="pb-[40px]" :current="category_title" :pages=breadcrumb></Breadcrumb>
    <div class="px-[25px] lg:px-[68px]">
      <!-- Top Title and Description -->
      <ClientOnly>
        <CategoryDescription v-if="category_top_title.length || category_top_content.length" :title="category_top_title"
          :content="category_top_content" :h1="true" class="pt-4" />
      </ClientOnly>
      <!-- Sub Categories -->
      <CategorySubCategory v-if="sub_category.length" :categories="sub_category" class="lg:pt-[64px] pt-8" />
    </div>
    <!-- Filter start -->
    <div v-if="!isEmpty(sorting_data) || !isEmpty(filter_data)"
      class="bg-[#F3F4F6] lg:px-[68px] mb-[15px] border-t border-b h-[60px] border-gray-100 mt-[54px] hidden lg:flex items-center justify-start">
      <!-- Desktop Filter Title -->
      <h2 class="text-gray-700 font-bold text-base leading-5 rtl:pr-3 ltr:pl-3">
        {{ $t("category_filter_title") }}
      </h2>
      <span class="border-r-2 mx-[29px] border-gray-400 h-6"></span>
      <!-- Desktop selected filter tags -->
      <div
        class="mx-[100px] flex gap-5 items-center justify-start flex-1 overflow-x-auto overflow-y-hidden no-scrollbar">
        <CategoryFilterTag v-for="selected_filter, index in filter_array" :key="index" :tag_data="selected_filter"
          @remove-filter-item="updateFilterArray" />
      </div>
      <!-- Desktop Sorting -->
      <CategorySortingMenu v-if="!isEmpty(sorting_data)" :sorting_options="sorting_data"
        @update-sorting-value="updateSortingValue" />
    </div>

    <div class="flex lg:gap-[46px] lg:px-[68px] px-6 flex-col lg:flex-row">
      <!-- Desktop Filter -->
      <div v-if="!isEmpty(filter_data)"
        class="hidden lg:block w-[295px] text-gray-700 font-bold text-base leading-5 rtl:pr-4 ltr:pl-3 pt-[15px]">
        <div id="accordion-arrow-icon" data-active-classes="bg-gray-50" data-inactive-classes="py-5"
          data-accordion="open">
          <CategoryFilterSection v-for="filter_section, index in filter_data" :filter_array="filter_section.data"
            :title="filter_section.name" :key="filter_section.key" :filter_key="filter_section.key"
            :first_item="index == 0 ? true : false" @filter-value="updateFilterArray"
            :selected_filter_array="filter_array" />
        </div>
      </div>
      <!-- Mobile Filter -->
      <div v-if="!isEmpty(sorting_data) || !isEmpty(filter_data)"
        class="lg:hidden flex justify-center items-center gap-5 pt-8">
        <!-- Mobile Filter Items -->
        <CategoryMobileFilter v-if="!isEmpty(filter_data)" @filter-reset="resetFilter" :filter_data="filter_data"
          :selected_filter_array="filter_array" @filter-value="updateFilterArray" />
        <!-- Mobile Sorting -->
        <CategoryMobileSortingMenu v-if="!isEmpty(sorting_data)" :sorting_options="sorting_data"
          @update-sorting-value="updateSortingValue" />
      </div>
      <!-- Mobile listing switch buttons -->
      <div class="lg:hidden flex justify-end items-center gap-1 pt-[26px]">
        <CategoryListingSwitch @update-listing="listingTypeUpdate" />
      </div>
      <!-- Product listing -->
      <div class="flex justify-start flex-col gap-16 mt-5 w-full" v-if="products.length > 0">
        <div :class="[listing_type == 'solo' ? 'gap-[18px]' : 'lg:gap-y-[45px] gap-y-4 lg:gap-x-[27px] gap-x-3',
          'flex flex-wrap items-stretch lg:justify-start justify-between gap-[42px] lg:gap-y-[55px]']">
          <CategoryProductItem v-for="product, index in products" :key="product.id" :id="product.id"
            :name="product.name"
            :image="product.media.images && product.media.images.length ? product.media.images[0].url : null"
            :color="product.color" :price="product.started_price" :special="product.started_discounted_price"
            :link="localePath('/' + product.slug)" :favorite="product.favorite" :tags="product.tags"
            :related_products="product.related_class_products" @favorite-click="product.favorite = !product.favorite"
            :list_type="listing_type" :available="product.availability" :category_name="product.category.name"
            :product_sort="index + 1" />
        </div>
        <!-- Infinite  scroll -->
        <div class="flex items-center justify-center flex-col gap-5 w-full">
          <button v-if="products.length != category_data.meta.total" type="button" @click="loadMore()"
            :disabled="infinite_scroll_loading"
            class="flex justify-center items-center gap-[11px] py-[9px] w-[194px] ring-1 ring-gray-300 rounded-2xl bg-white shadow-sm text-gray-700 text-base leading-5 font-bold hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed">
            {{ $t('category_load_more_btn') }}
            <svg v-if="!infinite_scroll_loading" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              viewBox="0 0 16 16" fill="none">
              <path d="M8 4V8M8 8V12M8 8H12M8 8L4 8" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            <svg v-else aria-hidden="true"
              class="inline w-5 h-5  text-gray-300 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
            </svg>
          </button>
          <span class="text-gray-900 text-base font-normal leading-5"> لقد شاهدت {{ products.length }} من أصل {{
            category_data.meta.total }} من المنتجات</span>
        </div>
        <!-- Filter end -->
      </div>
      <div v-else class="flex text-center items-center justify-center mx-auto my-40 text-gray-900 font-bold text-2xl">
        عفواً.. لم يتم العثور على منتجات!
      </div>
    </div>
    <!-- Bottom Title and Description -->
    <ClientOnly>
      <CategoryDescription v-if="category_bottom_title.length || category_bottom_content.length"
        :title="category_bottom_title" :content="category_bottom_content"
        class="mt-[90px] px-[25px] lg:rtl:pr-[68px] lg:rtl:pl-[113px] lg:ltr:pl-[68px] lg:ltr:pr-[113px]" />
    </ClientOnly>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
const website_name = useState('website_name');
const config = useRuntimeConfig()
const route = useRoute();
const localePath = useLocalePath()
const props = defineProps({
  url_data: {
    type: Object
  }
})
// console.log(props.url_data);
const category_url_id = props.url_data && props.url_data.slug ? props.url_data.slug : null
const data_url = ref(config.public.API_URL + '/master-products/of-category?category_q=' + category_url_id)
const sorting_value = ref()
const listing_type = ref('list')
const current_page = ref(1)
const infinite_scroll_loading = ref(false)
//Filter data reference
const filter_sorting_fetch = ref([])
const filter_fetch_data = ref([])
const filter_array = ref([])
const filter_data = ref([])
const sorting_data = ref([])

//Category data reference
const category_data = ref({})
const products = ref([])
const breadcrumb = ref([])
const sub_category = ref([])
const category_title = ref('')
const category_image = ref('')
const category_top_title = ref('')
const category_top_content = ref('')
const category_bottom_title = ref('')
const category_bottom_content = ref('')

//Meta Tags Reference
const category_meta_title = ref('')
const category_meta_description = ref('')
const category_meta_keyword = ref('')
const { data: all_category_data, error, pending } = await useAsyncData(data_url.value, () => $fetch(data_url.value))
if (error.value) {
  console.log(error.value.data)
  // throw createError({
  //   statusCode: 404,
  //   statusMessage: 'Category - Server Error',
  //   fatal: true
  // })
} else {
  category_data.value = all_category_data.value ??= {}
  //Reset category data reference
  if (category_data.value.data && category_data.value.data.length) {
    products.value = products.value.concat(category_data.value.data)
    breadcrumb.value = [
      {
        'name': category_data.value.data[0].category.breadcrumb.name,
        'link': localePath('/' + category_data.value.data[0].category.breadcrumb.slug)
      }
    ]
    category_title.value = category_data.value.data[0].category.name
    category_image.value = category_data.value.data[0].category.image
    category_top_title.value = category_data.value.data[0].category.top_description.title ??= ''
    category_top_content.value = category_data.value.data[0].category.top_description.details ??= ''
    category_bottom_title.value = category_data.value.data[0].category.bottom_description.title ??= ''
    category_bottom_content.value = category_data.value.data[0].category.bottom_description.details ??= ''
    sub_category.value = (category_data.value.data[0].category.subcategory && category_data.value.data[0].category.subcategory.length) ? category_data.value.data[0].category.subcategory : []

    category_meta_title.value = category_data.value.data[0].category.meta_title
    category_meta_description.value = category_data.value.data[0].category.meta_description
    category_meta_keyword.value = category_data.value.data[0].category.meta_keyword
    useSeoMeta({
      title: category_meta_title.value + ' | ' + website_name.value,
      ogTitle: category_meta_title.value + ' | ' + website_name.value,
      description: category_meta_description.value,
      ogDescription: category_meta_description.value,
      keywords: category_meta_keyword.value,
      ogImage: category_image.value ??= config.public.BASE_URL + '/images/placeholder-logo.png',
      ogImageAlt: category_title.value,
      ogUrl: config.public.BASE_URL + localePath('/' + category_data.value.data[0].category.slug)
    })
    googlEventListing(products.value)//Google analytics
  } else {//Empty Category
    throw createError({
      statusCode: 401,
      statusMessage: ' !لا توجد منتجات في هذا القسم ',
      fatal: true
    })
  }
}

useHead({
  link: [
    {
      rel: 'canonical',
      href: config.public.BASE_URL + localePath('/' + category_url_id),
    },
  ],
})
onMounted(async () => {
  initFlowbite();
  //We Do Filter data fetching here and After Page Mounted during Flowbite library finish loading
  try {
    filter_sorting_fetch.value = await useNuxtApp().$apiFetch('/filter-and-sort/get')
  } catch (error) {
    console.log("Failed to fetch Filter and Sorting base data:", error)
  }
  //Reset Filter & Sorting Data
  if (filter_sorting_fetch.value && filter_sorting_fetch.value.status == true) {
    filter_fetch_data.value = filter_sorting_fetch.value.data
    filter_data.value = filter_fetch_data.value.filter ??= []
    sorting_data.value = filter_fetch_data.value.sorting ??= []
  }
})

async function loadMore() {
  infinite_scroll_loading.value = true
  if (current_page.value > 1 && data_url.value.includes('&page=')) {
    data_url.value = data_url.value.replace('&page=' + current_page.value, '&page=' + (current_page.value + 1))
  } else {
    data_url.value += '&page=' + (current_page.value + 1)
  }

  try {
    category_data.value = await useNuxtApp().$apiFetch(data_url.value)
    if (category_data.value.data && category_data.value.data.length) { // success
      products.value = products.value.concat(category_data.value.data)
      if (category_data.value.meta.total != products.value.length) {
        current_page.value = current_page.value + 1
      }
    } else {//reset url page parameter
      data_url.value = data_url.value.replace('&page=' + current_page.value, '&page=' + (current_page.value - 1))
    }
  } catch (error) {
    console.log("Failed to fetch data in load more process:", error)
    data_url.value = data_url.value.replace('&page=' + current_page.value, '&page=' + (current_page.value - 1))
  }

  infinite_scroll_loading.value = false
}

function listingTypeUpdate(new_list_type) { // change list type
  listing_type.value = new_list_type
}

function updateFilterArray(filter_value) {
  if (filter_array.value.includes(filter_value)) {
    filter_array.value.splice(filter_array.value.indexOf(filter_value), 1)
  } else {
    if (filter_value.type == 'price') {
      filter_array.value = filter_array.value.filter(function (obj) {
        return obj.type != 'price';
      });
    }
    filter_array.value.push(filter_value)
  }
  //console.log(filter_array.value)
  updateProductsCollection()
}

function resetFilter() {
  filter_array.value = []
  updateProductsCollection()
}

function updateSortingValue(new_sorting_value) {
  sorting_value.value = new_sorting_value
  updateProductsCollection()
}

async function updateProductsCollection() {
  current_page.value = 1
  data_url.value = '/master-products/of-category?category_q=' + category_url_id
  //filtering
  if (filter_array.value.length > 0) {
    for (let index = 0; index < filter_array.value.length; index++) {
      let filter_object = filter_array.value[index];
      switch (filter_object.type) {
        case 'price':
          data_url.value += '&min_price=' + filter_object.value.min
          data_url.value += '&max_price=' + filter_object.value.max
          break;
        case 'colors':
          data_url.value += '&colors[]=' + filter_object.value
          break;
        case 'pieces':
          data_url.value += '&pieces[]=' + filter_object.value
          break;
        case 'sizes':
          data_url.value += '&sizes[]=' + filter_object.value
          break;
        default:
          break;
      }
    }
  }
  // sorting
  if (sorting_value.value) {
    data_url.value += '&sorting=' + sorting_value.value
  }
  try {
    category_data.value = await useNuxtApp().$apiFetch(data_url.value)
    products.value = category_data.value?.data
  } catch (error) {
    console.log("Failed to fetch data in filtering or sorting processes:", error)
  }
}

function googlEventListing(category_products = []) { //for google analytics
  if (typeof dataLayer !== "undefined" && !isEmpty(category_products)) {
    let event_products = []
    category_products.forEach((item, index) => {
      var event_price = item.started_discounted_price ? item.started_discounted_price : item.started_price ? item.started_price : 0
      event_price = Number(priceFormate(event_price, false))
      var event_stock = item.availability == true ? 'In Stock' : 'Out Of Stock'
      var event_product_data = {
        "name": item.name,
        "id": String(item.id),
        "price": Number(priceFormate(event_price, false)),
        'brand': '',
        'category': item.category?.name,
        'variant': '',
        'list': item.category?.name,
        'dimension3': event_stock,
        "quantity": '',
        'position': Math.abs(index + 1),
      }
      event_products.push(event_product_data);
    });
    dataLayer.push({
      'event': 'view_item_list',
      'eventCat': 'eCommerce',
      'eventLbl': category_title.value,
      'ecommerce': {
        'currencyCode': 'SAR',
        'impressions': event_products
      }
    });
  }
  //console.log(dataLayer);
}

</script>