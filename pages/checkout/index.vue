<template>
  <Title>{{ $t('checkout_title') }} | {{ website_name }}</Title>
  <!-- Page content -->
  <ClientOnly>
    <div class="bg-gray-50 lg:bg-white h-full flex flex-col lg:flex-row p-5 pt-[37px] lg:p-0">
      <!-- Mobile Page Logo -->
      <CheckoutLogo class="lg:hidden" />

      <!-- Mobile Steps Titles -->
      <CheckoutStepsTitle :step="current_step" class="lg:hidden" />

      <!-- Mobile Order Details Link -->
      <div v-if="!shipping_loader"
        class="order-1 lg:hidden w-full p-5 flex justify-between items-center bg-gray-100 rounded-t-lg shadow border border-b-0 border-gray-200">
        <NuxtLink @click="order_details = !order_details" to="javascript:void(0)"
          class="flex-1 flex gap-[5px] items-center justify-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4.16634 7.5H15.833L16.6663 17.5H3.33301L4.16634 7.5Z" fill="#F9FAFB" />
            <path
              d="M13.333 9.16667V5.83333C13.333 3.99238 11.8406 2.5 9.99967 2.5C8.15873 2.5 6.66634 3.99238 6.66634 5.83333V9.16667M4.16634 7.5H15.833L16.6663 17.5H3.33301L4.16634 7.5Z"
              stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="text-gray-700 text-xs font-normal">
            {{ order_details ? $t('checkout_order_details_hide') : $t('checkout_order_details_show') }}
          </span>
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
        <span class="text-gray-600 font-bold text-sm">{{ priceFormate(cartTotal) }}</span>
      </div>

      <!-- Shipping & Payment -->
      <div
        :class="[order_details ? 'pt-5' : '', 'lg:order-2 order-3 lg:pt-[61px] w-full flex justify-start flex-col items-center flex-1 lg:px-14']">
        <!-- Desktop Page Logo -->
        <CheckoutLogo class="hidden lg:flex" />
        <!-- Desktop Steps Titles -->
        <CheckoutStepsTitle :step="current_step" class="hidden lg:flex" />
        <div v-if="shipping_loader"
          class="flex items-center justify-center h-[calc(100%-10rem)] max-h-screen w-full mx-auto">
          <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[95px]" />
        </div>
        <div v-else
          :class="[order_details ? 'rounded-lg' : 'border-t-0 rounded-b-lg', 'lg:w-[650px] w-full flex flex-col justify-start p-5 lg:p-[30px] bg-white border border-gray-200  lg:border-0 lg:rounded-none shadow lg:shadow-none']">
          <!-- Address -->
          <CheckoutAddress :step="current_step" @next-step="getNextStep" @save-address="saveAddress" />
          <!-- Payment -->
          <CheckoutPayment v-if="current_step == 'select_payment'" :step="current_step" :address_id="address_id"
            @submit="saveOrder" :disable_checkout="disable_checkout" @wallet-status="resetTotals()"
            @save-payment="resetTotals()" />
        </div>
      </div>

      <!-- Order Details -->
      <div
        :class="[order_details ? 'lg:block' : 'lg:block hidden', 'lg:order-3 order-2 lg:w-[631px] w-full lg:bg-gray-100 bg-white lg:rounded-none rounded-b-lg lg:shadow-none shadow flex-shrink-0']">
        <div v-if="details_loader" class="flex items-center justify-center h-full max-h-screen w-full mx-auto">
          <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[95px]" />
        </div>
        <div v-else class="lg:pt-[165px] p-5 w-full flex flex-col gap-5 lg:px-16">
          <!-- Title -->
          <h4
            class="py-[9px] flex items-center lg:justify-start justify-center text-gray-900 text-xl lg:font-bold font-semibold leading-5">
            {{ $t('cart_totals_title') }}
          </h4>
          <!-- Totals -->
          <CartPageTotals :key="totals_key" :totals="cartTotals" style_type="checkout_page" />

          <!-- Discount Code Form -->
          <CartDiscountForm v-model="discount_code" @submit-discount-code="resetTotals()" />

          <!-- Cart Products -->
          <CheckoutCartProducts @product-has-error="disable_checkout = true" />
        </div>
      </div>

    </div>
  </ClientOnly>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'empty', middleware: ['auth'] })
const website_name = useState('website_name');
const lang = useNuxtApp().$lang
const router = useRouter();
const localePath = useLocalePath()
const { setSuccessOrderId, saveOrderAddress, saveOrderPayment } = useOrder()
const { getAll, cartTotal, setCartData, cartTotals } = useCart()
const disable_checkout = ref(false)
const totals_key = ref(123)
const shipping_loader = ref(true)
const details_loader = ref(true)
onMounted(async () => {
  initFlowbite();
  const cart_data = await getAll()
  if (!cart_data.id || !cart_data.cart_items || !cart_data.cart_items.length) {
    navigateTo(localePath('/cart'))
  }
  //if totals not loaded we refresh cart 
  if (cartTotals.value.length == 0) {
    setTimeout(async () => {
      const cart_data = await getAll()
      setCartData(cart_data)
      totals_key.value += 1
    }, 2000)
  }
  totals_key.value += 1
  details_loader.value = false
  shipping_loader.value = false
})
const order_details = ref(false) //For Mobile

const current_step = ref('add_address')

const discount_code = ref('')

const address_id = ref('')

const payment_id = ref('')

function getNextStep(step) {
  current_step.value = step
}

function resetTotals() {
  totals_key.value += 1
}

async function saveAddress(new_address_id) {
  address_id.value = new_address_id
  const new_cart = await saveOrderAddress(new_address_id)
  setCartData(new_cart.data)
  resetTotals()
}

async function saveOrder(payment_method) {
  if (disable_checkout.value == false) {
    payment_id.value = payment_method
    var order_data = {
      address_id: address_id.value,
      payment_gateway_id: payment_id.value,
      gifted: "0",
      gift_phrase: ""
    }
    // console.log(order_data)
    const add_order = await useOrder().addOrder(order_data)
    if (add_order && add_order.id) {
      setSuccessOrderId(add_order.id)
      return navigateTo(localePath('/checkout/success'))
      //window.location.pathname = localePath('/checkout/success')
    }
  }
}

</script>