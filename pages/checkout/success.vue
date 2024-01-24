
<template>
  <Title>{{ $t('checkout_success_page_title') }} | {{ website_name }}</Title>
  <!-- Page content -->
  <ClientOnly>
    <template #fallback>
      <div class="flex items-center justify-center h-[600px] max-h-screen w-full mx-auto">
        <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[110px]" />
      </div>
    </template>
    <div class="bg-gray-50 lg:bg-white h-full flex flex-col lg:flex-row p-5 pt-[37px] lg:p-0">
      <!-- Mobile Page Logo -->
      <CheckoutLogo class="lg:hidden" />
      <!-- Success Notes Right Section -->
      <div :class="['lg:order-2 order-1 lg:pt-[61px] w-full flex justify-start flex-col items-center  lg:px-14']">
        <!-- Desktop Page Logo -->
        <CheckoutLogo class="hidden lg:flex" />
        <div
          :class="[order_details ? 'rounded-lg' : 'border-t-0 rounded-b-lg', 'lg:w-[650px] w-full flex flex-col justify-start']">
          <!-- Success image -->
          <CheckoutSuccessBanner :order_id="order_data.id" :email="order_data.customer_email" />
          <!-- Desktop Success help -->
          <CheckoutSuccessPageNotes :tracking_url="order_data.tracking_url" class="hidden lg:flex my-[50px]" />
        </div>
      </div>

      <!-- Order Details Left Section-->
      <div
        :class="['lg:order-2 order-1 lg:w-[631px] w-full lg:bg-gray-50 lg:rounded-none rounded-b-lg flex-shrink-0  border border-t-0 border-gray-200']">
        <!-- Mobile Order Details Link -->
        <CheckoutSuccessOrderDetailsToggle :order_id="order_data.id" :order_date="order_data.created_at"
          :order_details="order_details" @toggle-show="order_details = !order_details" />
        <!-- Order Details Content -->
        <div
          :class="[order_details ? 'lg:block' : 'lg:block hidden', 'lg:pt-[69px] p-5 w-full flex flex-col gap-5 lg:px-16']">

          <!-- Desktop Order ID & Date -->
          <CheckoutSuccessOrderDetails :order_id="order_data.id" :order_date="order_data.created_at" />
          <!-- Customer -->
          <CheckoutSuccessPersonalInfo :customer_name="order_data.customer_name"
            :customer_email="order_data.customer_email" :customer_phone="order_data.customer_mobile" />
          <!-- Address -->
          <CheckoutSuccessShippingAddress :country="order_data.customer_country" :region="order_data.customer_region"
            :city="order_data.customer_city" :neighborhood="order_data.customer_neighborhood"
            :street="order_data.customer_street" />
          <!-- Products -->
          <div v-if="order_data && order_data.order_items && order_data.order_items.length > 0"
            class="w-full no-scrollbar flex flex-col lg:p-[30px] lg:pb-0 justify-start items-start gap-5 lg:max-h-[350px] overflow-hidden hover:overflow-y-auto">
            <h3 class="text-gray-900 font-semibold lg:font-bold lg:text-xl text-base leading-5">
              {{ $t('products_title') }} ({{ order_data.order_items.length }})
            </h3>
            <LazyCheckoutSuccessProductItem v-for="(item, index) in order_data.order_items" :key="index"
              :product="item" />
          </div>
          <!-- Payment -->
          <LazyCheckoutSuccessPaymentMethod v-if="order_data.payment_gateway" :method_data="order_data.payment_gateway" />
          <!-- Totals -->
          <div class="flex flex-col lg:p-[30px] lg:pb-0 lg:pt-0 lg:pe-16">
            <CartPageTotals style_type="checkout_success" :subtotal="order_data.subtotal" :shipping="order_data.shipping"
              :tax="order_data.tax" :total="order_data.total" />
          </div>
          <!-- Mobile Tax Invoice Link -->
          <div class="lg:hidden flex justify-center items-center lg:p-[30px] lg:pb-0 lg:pt-0">
            <NuxtLink :to="localePath('/')" target="_blank"
              class="w-[165px] h-[38px] lg:h-[42px] flex items-center justify-center gap-2 ring-1 ring-gray-300 shadow-sm rounded-md bg-white">
              <span class="text-gray-700 text-sm font-semibold leading-5">{{ $t('text_tax_invoice') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.5 4V7H3.5C2.39543 7 1.5 7.89543 1.5 9V12C1.5 13.1046 2.39543 14 3.5 14H4.5V16C4.5 17.1046 5.39543 18 6.5 18H12.5C13.6046 18 14.5 17.1046 14.5 16V14H15.5C16.6046 14 17.5 13.1046 17.5 12V9C17.5 7.89543 16.6046 7 15.5 7H14.5V4C14.5 2.89543 13.6046 2 12.5 2H6.5C5.39543 2 4.5 2.89543 4.5 4ZM12.5 4H6.5V7H12.5V4ZM12.5 12H6.5V16H12.5V12Z"
                  fill="#6B7280" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- Mobile Success help -->
      <div :class="['lg:hidden shadow bg-white mt-5 order-3 w-full rounded-b-lg flex-shrink-0']">
        <CheckoutSuccessPageNotes />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'empty', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const { successOrderId, getOrder } = useOrder()
const { setCartData } = useCart()
const order_details = ref(false) //For Mobile
const order_data = ref([])
const cart_data = ref([])
if (!successOrderId.value) {
  navigateTo(localePath('/cart'))
}

onMounted(async () => {
  initFlowbite();
  //console.log(successOrderId.value)
  if (successOrderId.value) {
    order_data.value = await getOrder(successOrderId.value)
    //console.log(order_data.value)
  }

  cart_data.value = await useCart().getAll()
  if (cart_data.value && cart_data.value.id) {
    setCartData(cart_data.value)
  }
})

</script>