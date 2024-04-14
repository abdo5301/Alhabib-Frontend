<template>
  <Title>{{ $t('similar_products_title') }} | {{ website_name }}</Title>
  <div class="w-full pb-[100px] px-5 lg:px-[35px]">
    <Breadcrumb class="pb-[40px]" :current="$t('similar_products_title')" :pages="breadcrumb" list_style="!mx-0">
    </Breadcrumb>
    <div class="flex lg:gap-[46px] flex-col justify-center items-center">
      <div v-if="data_loader" class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
        <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
      </div>
      <!-- Product listing -->
      <ClientOnly>
        <div v-if="!data_loader" class="flex justify-start flex-col lg:gap-[52px] gap-[38px] lg:mt-2 mt-5 w-full">
          <div v-if="!empty_data"
            :class="['flex flex-wrap gap-y-4 lg:gap-x-[27px] gap-x-3 items-stretch lg:justify-start justify-between gap-[42px] lg:gap-y-[55px]']">
            <CategoryProductItem v-for="product in similar_products" :key="product.id" :id="product.id"
              :name="product.name"
              :image="product.media.images && product.media.images.length ? product.media.images[0].url : null"
              :color="product.color" :price="product.started_price" :special="product.started_discounted_price"
              :link="localePath('/' + product.slug)" :favorite="product.favorite" :tags="product.tags"
              :related_products="product.related_class_products" @favorite-click="product.favorite = !product.favorite"
              :available="product.availability" />
          </div>
          <span v-else class="flex justify-center items-center text-gray-900 text-lg font-semibold leading-5">
            {{ $t('text_empty_products') }}
          </span>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ middleware: ['auth'] })
const route = useRoute();
const localePath = useLocalePath()
const { t } = useI18n()
const website_name = useState('website_name');
const { toggleFavorite } = useFavorite()
const product_data = ref({})
const similar_products = ref([])
const data_loader = ref(true)
const empty_data = ref(false)
const breadcrumb = [
  {
    'name': t('favorite_title'),
    'link': localePath('/favorite')
  }
]
onMounted(async () => {
  initFlowbite()
  try {
    product_data.value = await useNuxtApp().$apiFetch('/master-products/get?master_product_id=' + route.params.id)
  } catch (error) {
    console.log(error.data)
    throw createError({
      statusCode: 404,
      statusMessage: 'page_not_found',
      fatal: true
    })
  }
  if (product_data.value.data && product_data.value.status
    && product_data.value.data.related_products && product_data.value.data.related_products[0]
    && product_data.value.data.related_products[0].length > 0) {
    similar_products.value = product_data.value.data.related_products[0].master_products
  } else {
    empty_data.value = true
  }
  data_loader.value = false
})

</script>