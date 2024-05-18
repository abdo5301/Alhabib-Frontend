<template>
  <Title>{{ $t('return_title') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :current="$t('return_title')" />
    <AccountPageTitle>{{ $t('return_title') }}</AccountPageTitle>
    <div v-if="data_loader || empty_data"
      class="w-full flex flex-col gap-[25px] bg-white lg:py-[40px] lg:px-[30px] py-5 px-5 rounded-lg shadow">
      <div v-if="data_loader" class="flex items-center justify-center h-[310px] max-h-screen w-full mx-auto">
        <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
      </div>
      <div v-else>
        <!-- Empty -->
        <div v-if="empty_data" class="w-full flex flex-col lg:gap-8 gap-5 justify-center items-center h-[310px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="51" height="45" viewBox="0 0 51 45" fill="none">
            <path
              d="M33.75 20.625V13.125C33.75 8.98286 30.0563 5.625 25.5 5.625C20.9437 5.625 17.25 8.98286 17.25 13.125V20.625M11.0625 16.875H39.9375L42 39.375H9L11.0625 16.875Z"
              stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="text-gray-900 text-base font-normal leading-8 lg:leading-5 text-center">{{
            $t('text_empty_return_orders') }}</span>
        </div>
      </div>
    </div>
    <!-- Items -->
    <div v-else>
    
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const route = useRoute()
const { t } = useI18n()
const { setActiveSection } = useAccount()
const { getReturnOrders } = useOrder()
const data_loader = ref(true)
const empty_data = ref(false)
const return_orders = ref([])
onMounted(async () => {
  initFlowbite()
  setActiveSection('return')
  try {
    return_orders.value = await getReturnOrders()
  } catch (error) {
    console.log(error.data)
    throw createError({
      statusCode: 404,
      statusMessage: 'page_not_found',
      fatal: true
    })
  }
  if (isEmpty(return_orders.value)) {
    empty_data.value = true
  }
  data_loader.value = false
})

</script>