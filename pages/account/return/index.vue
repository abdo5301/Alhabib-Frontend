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
    <div v-else class="w-full flex flex-col gap-5 lg:gap-[25px] lg:max-h-[950px] max-h-[450px] overflow-y-auto no-scrollbar">
      <!-- Item -->
      <AccountReturnOrderItem v-for="(item, index) in return_orders" :key="index" :item_products="item.order_items"
        :item_id="item.id" :item_status="item.state.id" :item_create_date="item.created_at"
        :item_update_date="item.updated_at" />
    </div>
    <!-- FAQ -->
    <ClientOnly>
      <div
        class="w-full flex flex-col gap-[25px] bg-white lg:pt-[20px] lg:pb-[30px] lg:px-[30px] py-5 px-5 rounded-lg shadow">
        <!-- Title -->
        <div class="flex items-center justify-center w-full gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-6 lg:h-6 w-8 h-8" viewBox="0 0 20 20" fill="none">
            <path
              d="M6.85638 7.5C7.31398 6.52901 8.54869 5.83333 10 5.83333C11.841 5.83333 13.3334 6.95262 13.3334 8.33333C13.3334 9.49953 12.2687 10.4792 10.8286 10.7555C10.3766 10.8422 10 11.2064 10 11.6667M10 14.1667H10.0083M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
              stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h2 class="min-w-max text-gray-900 font-extrabold leading-5 lg:text-lg text-sm">{{ $t('text_faq_title') }}
          </h2>
          <div class="border-b-2 border-b-gray-200 w-full"></div>
        </div>
        <!-- Questions -->
        <UAccordion color="white"
          :ui="{ item: { icon: '!h-6 !w-6 text-gray-400 ms-auto transform transition-transform duration-200' }, default: { class: 'py-3 px-0 w-full text-gray-900 font-bold lg:text-base lg:text-sm text-xs leading-5' } }"
          :items="faq_arr">
          <template #item="{ item }">
            <p class="text-gray-600 font-semibold leading-5 lg:text-sm text-xs">
              {{ item.content }}
            </p>
          </template>
        </UAccordion>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const { t } = useI18n()
const { setActiveSection } = useAccount()
const { getReturnOrders } = useOrder()
const data_loader = ref(true)
const empty_data = ref(false)
const return_orders = ref([])
const faq_arr = [
  { label: 'كم المدة المسموحة للاسترجاع ؟', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', defaultOpen: true },
  { label: 'ما هي شروط الاستبدال والاسترجاع؟', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }
]
onMounted(async () => {
  initFlowbite()
  setActiveSection('return')
  try {
    return_orders.value = await getReturnOrders()
    //return_orders.value = await useOrder().getAllOrders()
    console.log(return_orders.value);
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