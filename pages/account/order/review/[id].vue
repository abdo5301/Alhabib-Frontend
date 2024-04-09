<template>
  <Title>{{ $t('order_product_evaluation_btn') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :pages="breadcrumbs_pages" :current="$t('order_product_evaluation_btn')" />
    <AccountPageTitle>{{ $t('order_product_evaluation_btn') }}</AccountPageTitle>
    <ClientOnly>
      <!-- Loader -->
      <template #fallback>
        <div class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
          <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
        </div>
      </template>
      <AccountRatingItem v-for="(product, index) in products"
        class="w-full flex flex-col gap-[30px] bg-white py-5 px-5 lg:px-[30px] rounded-lg shadow">
         تقييم المنتج هنا
      </AccountRatingItem>
    </ClientOnly>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const { setActiveSection } = useAccount()
const route = useRoute()
const { t } = useI18n()
const { getOrder } = useOrder()
const order_id = Number(route.params.id)
const order_status = ref('')
const order_data = ref([])
const products = ref([])
const rating = ref(0)
onMounted(async () => {
  initFlowbite()
  setActiveSection('orders')
  if (!isNaN(order_id)) {
    order_data.value = await getOrder(order_id)
    order_status.value = order_data.value.state.id
    if (order_data.value.order_items) {
      products.value = order_data.value.order_items
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'page_not_found',
        fatal: true
      })
    }
    //console.log(order_data.value)
  }
})

const breadcrumbs_pages = [
  {
    name: t('orders_title'),
    link: localePath('/account/order')
  }
]

</script>