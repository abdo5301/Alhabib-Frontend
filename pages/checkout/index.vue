<template>
  <Title>{{ $t('checkout_title') }} | {{ website_name }}</Title>
  <!-- Page content -->
  <div class="bg-gray-50 lg:bg-white flex flex-col lg:flex-row h-auto p-5 pt-[37px] lg:p-0">
    <!-- Mobile Page Logo -->
    <CheckoutLogo class="lg:hidden" />

    <!-- Mobile Steps Titles -->
    <CheckoutStepsTitle :step="current_step" class="lg:hidden" />

    <!-- Mobile Order Details Link -->
    <div
      class="order-1 lg:hidden w-full p-5 flex justify-between items-center bg-gray-100 rounded-t-lg shadow border border-b-0 border-gray-200">
      <NuxtLink @click="order_details = !order_details" to="javascript:void(0)"
        class="flex-1 flex gap-[5px] items-center justify-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4.16634 7.5H15.833L16.6663 17.5H3.33301L4.16634 7.5Z" fill="#F9FAFB" />
          <path
            d="M13.333 9.16667V5.83333C13.333 3.99238 11.8406 2.5 9.99967 2.5C8.15873 2.5 6.66634 3.99238 6.66634 5.83333V9.16667M4.16634 7.5H15.833L16.6663 17.5H3.33301L4.16634 7.5Z"
            stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="text-gray-700 text-xs font-normal">{{ order_details ?
          $t('checkout_order_details_hide') : $t('checkout_order_details_show') }}</span>
        <svg v-if="!order_details" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
          fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
            fill="#6B7280" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5.29289 12.7071C5.68342 13.0976 6.31658 13.0976 6.7071 12.7071L9.99999 9.41421L13.2929 12.7071C13.6834 13.0976 14.3166 13.0976 14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L10.7071 7.29289C10.3166 6.90237 9.68341 6.90237 9.29289 7.29289L5.29289 11.2929C4.90237 11.6834 4.90237 12.3166 5.29289 12.7071Z"
            fill="#6B7280" />
        </svg>
      </NuxtLink>
      <span class="text-gray-600 font-bold text-sm">1,165 ريال</span>
    </div>

    <!-- Shipping & Payment -->
    <div
      :class="[order_details ? 'pt-5' : '', 'lg:order-2 order-3 lg:pt-[61px] w-full flex justify-start flex-col items-center flex-1 lg:px-14']">
      <!-- Desktop Page Logo -->
      <CheckoutLogo class="hidden lg:flex" />
      <!-- Desktop Steps Titles -->
      <CheckoutStepsTitle :step="current_step" class="hidden lg:flex" />
      <div
        :class="[order_details ? 'rounded-lg' : 'border-t-0 rounded-b-lg', 'lg:w-[650px] w-full flex flex-col justify-start p-5 lg:p-[30px] bg-white border border-gray-200  lg:border-0 lg:rounded-none shadow lg:shadow-none']">
        <!-- Address -->
        <CheckoutAddress :current_address_data="current_address_data" :current_customer_data="current_customer_data" :step="current_step" @next-step="getNextStep" @save-address="saveAddress"/>
        <!-- Payment -->
        <CheckoutPayment v-if="current_step == 'select_payment'" :step="current_step" @submit="saveOrder" />
      </div>
    </div>

    <!-- Order Details -->
    <div
      :class="[order_details ? 'lg:block' : 'lg:block hidden', 'lg:order-3 order-2 lg:w-[631px] w-full lg:bg-gray-100 bg-white lg:rounded-none rounded-b-lg lg:shadow-none shadow flex-shrink-0']">
      <div class="lg:pt-[165px] p-5 w-full flex flex-col gap-5 lg:px-16">
        <!-- Title -->
        <h4
          class="py-[9px] flex items-center lg:justify-start justify-center text-gray-900 text-xl lg:font-bold font-semibold leading-5">
          {{ $t('cart_totals_title') }}
        </h4>
        <!-- Totals -->
        <CartPageTotals style_type="checkout_page" />

        <!-- Discount Code Form -->
        <CartDiscountForm v-model="discount_code" />

        <!-- Cart Products -->
        <CheckoutCartProducts :count="cart_count" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'empty' })

onMounted(() => {
  initFlowbite();
})
const website_name = useState('website_name');
const router = useRouter();
const localePath = useLocalePath()
const lang = useNuxtApp().$lang
const { t } = useI18n()
const currency = t('sar')

const order_details = ref(false) //For Mobile

const current_step = ref('select_address')
const current_customer_data = ref({
  name: 'هيله عبدالرحمن',
  phone: '+96653385466'
})
const current_address_data = ref({
  address:'',
  region:{
    id:1,
    name:'القصيم'
  },
  city:{
    id:1,
    name:'بريدة'
  },
  neighborhood:{
    id:1,
    name:'شارع الجريف'
  }
})

const cart_data = await useNuxtApp().$apiFetch('/master-products/of-category?category_id=53')
const cart_count = ref(cart_data.data && cart_data.data.length ? cart_data.data.length : 0)
const discount_code = ref('')

function getNextStep(step) {
  current_step.value = step
}

function saveAddress(address_data){
  current_address_data.value = address_data
}

function saveOrder(payment_method) {
var order_data = {
  customer:current_customer_data.value,
  address:current_address_data.value,
  payment_method:payment_method 
}
console.log(order_data)
  router.push(localePath('/checkout/success'))
}

</script>