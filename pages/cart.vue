<template>
  <Title>{{ $t('cart_title') }} | {{ website_name }}</Title>
  <div v-if="data_loader" class="flex items-center justify-center h-[600px] max-h-screen w-full mx-auto">
    <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
  </div>
  <div v-show="!data_loader" :class="[favorite_products.data && favorite_products.data.length ? 'pb-[104px]' : '']">
    <ClientOnly>
      <!-- Empty Cart -->
      <CartPageEmpty v-if="!cart_data.cart_items || !cart_data.cart_items.length">
        {{ $t('empty_cart_text') }}
      </CartPageEmpty>

      <!-- Cart Content -->
      <div v-else class="flex flex-col lg:flex-row gap-[10px] justify-start px-[9px] lg:px-0 lg:ps-7">

        <!-- Cart Items -->
        <div class="flex flex-1 flex-col">
          <Breadcrumb :current="$t('cart_title')"></Breadcrumb>
          <CartTitle :count="cartCount" />
          <!-- <CartReceiveFromShop /> -->
          <div v-if="cartItems && cartItems.length > 0"
            class="w-full lg:bg-gray-50 bg-white lg:rounded-none rounded-lg lg:shadow-none shadow no-scrollbar my-5 lg:my-10 lg:px-0 px-[6px] lg:py-0 py-5 flex flex-col justify-start items-start gap-6 lg:gap-10 lg:max-h-[800px] overflow-hidden hover:overflow-y-auto">
            <CartPageProductItem v-for="(item, index) in cartItems" :key="index" :cart_item="item"
              :last_item="index + 1 == cartItems.length" @product-has-error="disable_checkout = true"
              @refresh-cart="resetTotals()" @empty-cart="reloadNuxtApp()" />
          </div>
        </div>

        <!-- Cart Totals -->
        <div
          class="lg:!w-[602px] w-full lg:bg-gray-100 bg-white lg:rounded-none rounded-lg lg:shadow-none shadow flex-shrink-0 h-auto">
          <div class="lg:pt-[120px] p-5 w-full flex flex-col gap-6 lg:gap-8 lg:px-14">
            <!-- Title -->
            <h4
              class="lg:pt-[7px] lg:pb-[17px] py-[9px] flex items-center lg:justify-start justify-center text-gray-900 text-xl lg:font-bold font-semibold leading-5">
              {{ $t('cart_totals_title') }}
            </h4>

            <!-- Totals -->
            <CartPageTotals :totals="cartTotals" :key="totals_key" />
            <!-- Tamara -->

            <!-- Tabby -->
            <div id="tabbyPromo"></div>
            <!-- Tamara -->
            <div id="tamara-product-widget" class="tamara-product-widget font-semibold !font-sans rounded-md"
              :data-lang="lang.code" :data-price="cartTotal" data-currency="SAR" data-country-code="sa"
              data-payment-type="installment" data-number-of-installments="4" data-installment-minimum-amount="100"
              data-disable-paylater="true">
            </div>
            <!-- Free Shipping Alert -->
            <div
              class="bg-green-50 text-green-800 rounded-lg h-10 w-full flex items-center justify-center flex-shrink-0 lg:text-base text-sm leading-5 font-semibold">
              <span class="w-full flex items-center justify-center gap-[10px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 16V6C13 5.44772 12.5523 5 12 5H4C3.44772 5 3 5.44772 3 6V16C3 16.5523 3.44772 17 4 17H5M13 16C13 16.5523 12.5523 17 12 17H9M13 16L13 8C13 7.44772 13.4477 7 14 7H16.5858C16.851 7 17.1054 7.10536 17.2929 7.29289L20.7071 10.7071C20.8946 10.8946 21 11.149 21 11.4142V16C21 16.5523 20.5523 17 20 17H19M13 16C13 16.5523 13.4477 17 14 17H15M5 17C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17M5 17C5 15.8954 5.89543 15 7 15C8.10457 15 9 15.8954 9 17M15 17C15 18.1046 15.8954 19 17 19C18.1046 19 19 18.1046 19 17M15 17C15 15.8954 15.8954 15 17 15C18.1046 15 19 15.8954 19 17"
                    stroke="#047857" stroke-width="2" />
                </svg>
                {{ $t('cart_popup_alert_free_shipping') }}
              </span>
            </div>

            <!-- Discount Code Form -->
            <CartDiscountForm v-model="discount_code" @submit-discount-code="resetTotals()" />

            <!-- Checkout Link -->
            <NuxtLink :to="localePath('/checkout')"
              :class="['flex items-center justify-center h-[52px] shadow-sm text-base font-bold leading-5 rounded-md text-white bg-black', disable_checkout ? 'bg-gray-300 pointer-events-none cursor-not-allowed' : '']">
              {{ $t('cart_checkout_link') }}
            </NuxtLink>

            <!-- Desktop Notes & Support -->
            <div class="hidden lg:flex">
              <CartPageNotes />
            </div>

          </div>
        </div>

        <!-- Mobile Notes & Support -->
        <div class="lg:hidden flex px-[29px] py-5">
          <CartPageNotes />
        </div>
      </div>

      <!-- Favorite Products -->
      <div v-if="favorite_products.length" class="hidden lg:flex justify-start w-full pt-16 px-9">
        <ProductRelatedProducts :products="favorite_products">
          {{ $t('favorite_title') }}
        </ProductRelatedProducts>
      </div>
    </ClientOnly>
  </div>
</template>


<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ middleware: ['auth'] })
const lang = useNuxtApp().$lang
const cart_data = ref([])
const { cartData, setCartData, cartCount, cartItems, cartTotal, cartTotals } = useCart()
const emptyText = ref('')
const website_name = useState('website_name');
const localePath = useLocalePath()
const { t } = useI18n()
const discount_code = ref('');
const favorite_products_fetch = ref({})
const favorite_products = ref([])
const data_loader = ref(true)
const disable_checkout = ref(false)
const totals_key = ref(123)
useHead({
  script: [{ src: "https://cdn.tamara.co/widget/product-widget.min.js", defer: true }]
})
onMounted(async () => {
  initFlowbite();

  cart_data.value = await useCart().getAll()
  if (cart_data.value && cart_data.value.id) {
    setCartData(cart_data.value)
  }

  emptyText.value = t('empty_cart_text')

  // Tabby 
  new TabbyPromo({
    selector: '#tabbyPromo', //selector
    currency: 'SAR', // required
    price: parseFloat(cartTotal.value),// required, price or the product. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
    installmentsCount: 4,
    lang: lang.code,
    source: 'cart', //cart or product
    publicKey: 'pk_test_d8638745-5fe7-4236-aacf-db9b16e0683d',// required
    merchantCode: 'tabby'// required
  });

  //Tamara
  window.tamara = [];
  window.langCode = lang.code;
  window.tamara.currencyCode = "SAR";
  window.checkTamaraProductWidgetCount = 0;
  window.tamara.widgetPublicKey = "";
  var existTamaraProductWidget = setInterval(function () {
    if (window.TamaraProductWidget) {
      window.TamaraProductWidget.init({ lang: window.tamara.langCode, currency: window.tamara.currencyCode });
      window.TamaraProductWidget.render();
      clearInterval(existTamaraProductWidget);
    }
    window.checkTamaraProductWidgetCount += 1;
    if (window.checkTamaraProductWidgetCount > 33) {
      clearInterval(existTamaraProductWidget);
    }
  }, 300);
 
  data_loader.value = false

  //Favorites
  try {
    favorite_products_fetch.value = await useFavorite().getFavorites('/customer/favorites/get-available')
  } catch (error) {
    console.log(error.data)
  }
  if (favorite_products_fetch.value.data) {
    favorite_products.value = favorite_products_fetch.value.data
  }
})
function resetTotals() {
  totals_key.value += 11
}
</script>
