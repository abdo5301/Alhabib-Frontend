<template>
  <Title>{{ $t('return_title') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :current="$t('return_title')" />
    <AccountPageTitle>{{ $t('return_title') }}</AccountPageTitle>
    <div class="w-full flex flex-col gap-[25px] lg:gap-[40px] bg-white py-5 px-5 lg:py-[40px] lg:px-[30px] rounded-lg shadow">
      <ClientOnly>
        <div class="flex justify-center lg:justify-start gap-[50px] items-center font-semibold">
          <!-- ID -->
          <div class="flex flex-col gap-1 lg:gap-3 justify-start items-start">
            <span class="text-gray-900 text-xs lg:text-sm font-semibold leading-[15px] lg:leading-[15px]">{{
              $t('text_order_number')
              }}</span>
            <div
              class="text-gray-500 flex gap-[1px] lg:gap-[5px] text-[10px] lg:text-xs justify-center items-center font-semibold leading-[15px] lg:leading-[15px]">
              <span>
                #{{ order_id }}
              </span>
              <span class="cursor-pointer" @click="copyText(order_id)" :title="$t('text_copy')">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M5 10H3.75C3.05964 10 2.5 9.44036 2.5 8.75V3.75C2.5 3.05964 3.05964 2.5 3.75 2.5H8.75C9.44036 2.5 10 3.05964 10 3.75V5M6.25 12.5H11.25C11.9404 12.5 12.5 11.9404 12.5 11.25V6.25C12.5 5.55964 11.9404 5 11.25 5H6.25C5.55965 5 5 5.55964 5 6.25V11.25C5 11.9404 5.55965 12.5 6.25 12.5Z"
                    stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </div>
          <!-- Date -->
          <div class="flex flex-col gap-[5px] lg:gap-3 justify-start items-start">
            <span class="font-semibold text-xs lg:text-sm text-gray-900 lg:leading-[15px] leading-[15px]">
              {{ $t('text_order_date') }}
            </span>
            <span dir="ltr"
              class="flex justify-center items-center text-[10px] gap-[5px] lg:text-xs lg:leading-[15px] leading-[15px] text-gray-500 font-semibold uppercase max-w-[150px]">
              {{ format(new Date(order_data.created_at), "dd MMM, yyyy") }}
            </span>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { format } from "date-fns";
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const route = useRoute()
const { t } = useI18n()
const { setActiveSection } = useAccount()
const { getOrder } = useOrder()
const order_id = Number(route.params.id)
const order_status = ref('')
const order_data = ref([])
onMounted(async () => {
  initFlowbite()
  setActiveSection('return')
  if (!isNaN(order_id)) {
    order_data.value = await getOrder(order_id)
    order_status.value = order_data.value.state.id
   // console.log(order_data.value)
  }
})

</script>