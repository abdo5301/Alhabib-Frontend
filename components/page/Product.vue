<template>
  <div v-if="pending" class="flex items-center justify-center h-[600px] max-h-screen w-full mx-auto">
    <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
  </div>
  <div v-show="!pending">
    <!-- <Title>{{ product_data.name }} | {{ website_name }}</Title> -->
    <Breadcrumb v-show="!pending" class="lg:pb-[80px] pb-6" :current="product_data.name" :pages=breadcrumb>
    </Breadcrumb>
    <div
      class="w-full lg:pb-20 pb-3 lg:px-[70px] px-[23px] lg:gap-[100px] gap-10 flex flex-col lg:flex-row justify-start max-w-full">
      <!-- Images -->
      <div
        :class="[product_images.length || product_videos.length ? 'basis-1/2' : 'hidden', 'lg:max-w-[50%] max-w-full']">
        <LazyProductGallery v-if="product_images.length || product_videos.length" :images="product_images"
          :videos="product_videos" />
      </div>
      <div
        :class="[product_images.length || product_videos.length ? 'basis-1/2' : 'basis-full max-w-full', ' flex justify-start items-start flex-col gap-6 lg:max-w-[660px] md:max-w-[660px]']">

        <!-- Title -->
        <h1
          class="h-16 flex items-start justify-start text-gray-900 lg:font-bold font-semibold lg:text-xl text-base leading-8">
          {{ product_data.name }}
        </h1>
        <!-- Tags -->
        <div v-if="product_data.tags && product_data.tags.length > 0"
          class="flex flex-wrap justify-start lg:gap-5 gap-3">
          <ProductTag v-for="tag, index in product_data.tags" :key="index">{{ tag.name }}</ProductTag>
        </div>
        <!-- price -->
        <div v-if="discount_price" class="flex lg:gap-2 gap-1 justify-start">
          <span class="text-red-600 lg:font-extrabold font-semibold lg:text-xl text-base leading-5">
            {{ discount_price }}
          </span>
          <del class="text-gray-900 font-normal lg:text-xl text-base leading-5">
            {{ price }}
          </del>
        </div>
        <div v-else class="flex gap-2 justify-start">
          <span class="text-gray-900 lg:font-extrabold font-bold lg:text-xl text-base leading-5">
            {{ price }}
          </span>
        </div>
        <!-- Tabby -->
        <div id="tabbyPromo" class="!w-full font-semibold flex rounded-md flex-shrink-0">
        </div>
        <!-- Tamara -->
        <div id="tamara-product-widget" class="tamara-product-widget w-full font-semibold !font-sans rounded-md"
          :data-lang="lang.code" :data-price="discount_price ? discount_price : price" data-currency="SAR"
          data-country-code="sa" data-payment-type="installment" data-number-of-installments="4"
          data-installment-minimum-amount="100" data-disable-paylater="true">
        </div>
        <!-- Colors -->
        <div v-if="product_data.color">
          <h2 class="pb-2 text-gray-900 text-base lg:text-lg font-bold leading-5 lg:leading-5">
            {{ $t('product_color_title') }} {{ product_data.color.name }}
          </h2>
          <div
            v-if="product_data.related_class_products && product_data.related_class_products.length && product_data.color && product_data.color.hex"
            class="flex justify-start gap-[5px] flex-wrap pt-2">
            <span
              class="ring-1 ring-gray-900 relative flex items-center justify-center rounded-full lg:w-[28px] lg:h-[28px] w-[24px] h-[24px] z-20">
              <span class="rounded-full lg:w-6 lg:h-6 w-5 h-5 z-40"
                :style="['background-color:' + product_data.color.hex]">
              </span>
            </span>
            <span v-for="related, index in product_data.related_class_products" :key="index" class="empty:hidden">
              <NuxtLink v-if="related.color && index < 5 && related.color.hex != product_data.color.hex"
                :to="localePath('/' + related.slug)" :title="related.color.name ? related.color.name : '..'"
                class="empty:hidden">
                <span :class="[('relative  flex items-center justify-center rounded-full lg:w-7 lg:h-7 w-6 h-6 z-20')]">
                  <span class="rounded-full lg:w-6 lg:h-6 w-5 h-5 z-40"
                    :style="['background-color:' + related.color.hex]">
                  </span>
                  <span v-if="related.stock" class="absolute border-b-black border-b w-8 -rotate-45 z-50"></span>
                </span>
              </NuxtLink>
            </span>
          </div>
        </div>
        <!-- SKU -->
        <div
          class="flex justify-start items-center gap-2 text-gray-900 text-base lg:text-lg font-bold leading-5 lg:leading-5">
          <span>SKU:</span> <span>{{ product_sku }}</span>
        </div>
        <!-- Size -->
        <ProductOptionsSection v-if="product_data.products && product_data.products.length > 0"
          :options="product_data.products" @update-option-value="getSelectedOption" />

        <!-- Add Cart or Stock Alert -->
        <div v-show="!pending" class="w-full gap-2 lg:gap-5 relative py-4 flex justify-between items-center">
          <!-- Out stock btn -->
          <button type="button" v-show="out_stock" id="stockNotifyAlertButton" data-dropdown-placement="bottom"
            data-dropdown-offset-skidding="0" data-dropdown-toggle="stockNotifyAlert" @click="outStockNotify"
            :disabled="disable_out_stock_btn"
            class="flex flex-1 lg:gap-8 gap-6 items-center justify-center lg:h-12 h-[52px] bg-black rounded-md lg:w-[498px] w-[315px] text-white lg:text-2xl text-sm leading-5 lg:font-bold font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
              <path
                d="M5 21.8965H11.25H18.75H25L23.2438 20.1403C22.7676 19.6641 22.5 19.0181 22.5 18.3445V14.3965C22.5 11.1309 20.413 8.35284 17.5 7.32325V6.89648C17.5 5.51577 16.3807 4.39648 15 4.39648C13.6193 4.39648 12.5 5.51577 12.5 6.89648V7.32325C9.58702 8.35284 7.5 11.1309 7.5 14.3965V18.3445C7.5 19.0181 7.23243 19.6641 6.75617 20.1403L5 21.8965Z"
                fill="white" />
              <path
                d="M18.75 21.8965H25L23.2438 20.1403C22.7676 19.6641 22.5 19.0181 22.5 18.3445V14.3965C22.5 11.1309 20.413 8.35284 17.5 7.32325V6.89648C17.5 5.51577 16.3807 4.39648 15 4.39648C13.6193 4.39648 12.5 5.51577 12.5 6.89648V7.32325C9.58702 8.35284 7.5 11.1309 7.5 14.3965V18.3445C7.5 19.0181 7.23243 19.6641 6.75617 20.1403L5 21.8965H11.25M18.75 21.8965V23.1465C18.75 25.2176 17.0711 26.8965 15 26.8965C12.9289 26.8965 11.25 25.2176 11.25 23.1465V21.8965M18.75 21.8965H11.25"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ out_stock_btn }}
          </button>
          <!-- cart btn -->
          <button v-if="!pending" type="button" v-show="!out_stock" @click="addToCart()"
            :disabled="product_data.products && product_data.products.length > 0 ? disable_cart_btn : false"
            class="flex flex-1 items-center justify-center lg:h-12 h-[52px] bg-black rounded-md lg:w-[498px] w-[315px] text-white lg:text-2xl text-sm leading-5 lg:font-bold font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed">
            {{ $t('home_products_cart_btn') }}
          </button>
          <!-- favorite -->
          <button v-show="!pending" type="button" @click="toggleFavoriteCall()" data-dropdown-toggle="favoriteAlert"
            :data-dropdown-placement="lang.dir == 'rtl' ? 'right' : 'left'"
            class="w-14 lg:h-12 h-[52px] flex justify-center items-center flex-shrink-0 rounded-md ring-1 ring-gray-400 bg-white">
            <svg v-if="favorite" xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43"
              fill="#A30000">
              <path
                d="M7.55653 11.4366C4.48116 14.5227 4.48116 19.5263 7.55653 22.6124L21.0001 36.1028L34.4435 22.6124C37.5188 19.5263 37.5188 14.5227 34.4435 11.4366C31.3681 8.35055 26.3819 8.35055 23.3065 11.4366L21.0001 13.7513L18.6935 11.4366C15.6181 8.35055 10.6319 8.35055 7.55653 11.4366Z"
                stroke="#A30000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" fill="none">
              <path
                d="M7.55653 11.4366C4.48116 14.5227 4.48116 19.5263 7.55653 22.6124L21.0001 36.1028L34.4435 22.6124C37.5188 19.5263 37.5188 14.5227 34.4435 11.4366C31.3681 8.35055 26.3819 8.35055 23.3065 11.4366L21.0001 13.7513L18.6935 11.4366C15.6181 8.35055 10.6319 8.35055 7.55653 11.4366Z"
                stroke="#1F2937" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <!-- Out stock alert -->
          <div id="stockNotifyAlert"
            class="hidden top-0 left-0 z-10 transition-transform -translate-x-full duration-300">
            <Alert color="green" :alert_icon="true">
              {{ $t('product_stock_notify_alert') }}
            </Alert>
          </div>
          <!-- Favorite alert -->
          <div id="favoriteAlert"
            class="hidden top-0 rtl:left-0 ltr:right-0 z-10 transition-transform rtl:-translate-x-full ltr:translate-x-full duration-300">
            <Alert color="green" :alert_icon="true">
              {{ favorite ? $t('product_add_favorite_alert') : $t('product_remove_favorite_alert') }}
            </Alert>
          </div>
        </div>
        <!-- Receive From Shop -->
        <!-- <ProductReceiveFromShop /> -->
        <!-- Details -->
        <div v-if="!pending" class="w-full bg-[#F9FAFB] max-h-[300px] overflow-y-auto no-scrollbar"
          id="product-details-accordion" data-active-classes="py-[1px]" data-inactive-classes="py-[1px]"
          data-accordion="open">
          <ProductDetailsCollapse v-for="(product_details, index) in product_data.description"
            :opened="index == 0 ? true : false" :title="product_details.title" :key="index"
            :section_key="index + '-' + product_details.title" :description="product_details.description" />
        </div>
      </div>
    </div>
    <div v-show="!pending" class="w-full flex justify-center items-center mb-6 lg:px-[70px] px-6">
      <span class="bg-gray-400 w-full h-[1px]"></span>
    </div>
    <div class="w-full lg:pb-20 pb-8 lg:mt-16 mt-6 lg:px-[70px] px-6 flex flex-col justify-start lg:gap-14 gap-6">
      <LazyProductRelatedProducts v-for="related_products in product_data.related_products"
        :products="related_products.master_products">{{ related_products.title }}</LazyProductRelatedProducts>
    </div>
    <!-- Cart Popup Content -->
    <div id="add-cart-alert" aria-labelledby="add-cart-alert-label"
      :class="[!isMobile ? '-translate-y-full' : 'translate-y-full', 'fixed rounded-t-md lg:rounded-t-none lg:top-0 bottom-0 rtl:left-0 ltr:right-0 z-[100] lg:w-[600px] lg:max-w-[600px] w-full lg:min-h-[700px] min-h-[638px] lg:max-h-screen max-h-96  overflow-hidden hover:overflow-y-auto duration-700 transition-transform translate-x-1 bg-white']"
      tabindex="-1">
      <ProductAddCartPopup :key="'add-cart-key-' + addCartKey" @hide-popup="addCartDrawer.hide()"
        :add_cart_data="addCartSuccess" />
    </div>
  </div>
</template>

<script setup>
import { initFlowbite, Drawer } from 'flowbite';
const props = defineProps({
  url_data: {
    type: Object
  }
})
const config = useRuntimeConfig()
const nuxtApp = useNuxtApp()
const url_product_id = props.url_data && props.url_data.slug ? props.url_data.slug : null
const addCartDrawer = ref()
const addCartSuccess = ref({})
const addCartKey = ref(1)
const description_key = ref(11)
const { setCartData } = useCart()
const isMobile = ref(false)
const website_name = useState('website_name');
const route = useRoute();
const localePath = useLocalePath()
const lang = useNuxtApp().$lang
const { $i18n } = useNuxtApp();
const t = $i18n.t;
const disable_cart_btn = ref(true)
const out_stock = ref(false)
const out_stock_btn = ref(t('product_stock_notify_button'))
const disable_out_stock_btn = ref(false)
//////Product data reference\\\\\\
const product_data = ref({})
const selected_option = ref({})
const price = ref(null)
const discount_price = ref(null)
const favorite = ref(false)
const product_sku = ref(null)
const product_images = ref([])
const product_videos = ref([])
const product_description = ref([])
const breadcrumb = ref([])
const { data: product_fetch_data, error, pending } = await useFetch(config.public.API_URL + '/master-products/get', {
  query: { master_product_q: url_product_id },
  transform(input) {
    return {
      ...input,
      fetchedAt: new Date()
    }
  },
  getCachedData(key) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    // If data is not fetched yet
    if (!data) {
      // Fetch the first time
      return
    }
    // Is the data too old?
    const expirationDate = new Date(data.fetchedAt)
    expirationDate.setTime(expirationDate.getTime() + 86400 * 1000)//One day
    const isExpired = expirationDate.getTime() < Date.now()
    if (isExpired) {
      // Refetch the data
      return
    }
    return data
  }
})
if (error.value) {
  console.log(error.value.data)
  // throw createError({
  //   statusCode: 404,
  //   statusMessage: 'Product - Server Error',
  //   fatal: true
  // })
} else {
  //Reset product data reference
  product_data.value = product_fetch_data.value.data ??= {}
  if (product_data.value && product_data.value.name) {
    price.value = product_data.value.started_price ? priceFormate(product_data.value.started_price) : null
    discount_price.value = product_data.value.started_discounted_price ? priceFormate(product_data.value.started_discounted_price) : null
    favorite.value = product_data.value.favorite
    product_description.value = product_data.value.description
    description_key.value += 3
    breadcrumb.value = [
      {
        'name': product_data.value.breadcrumb.name,
        'link': localePath('/' + product_data.value.breadcrumb.slug)
      }
    ]

    if (product_data.value.media && product_data.value.media.images && product_data.value.media.images.length) {
      product_images.value = product_images.value.concat(product_data.value.media.images)
    }
    if (product_data.value.media && product_data.value.media.videos && product_data.value.media.videos.length) {
      product_videos.value = product_videos.value.concat(product_data.value.media.videos)
    }
    if (product_data.value.products && product_data.value.products.length > 0) {
      product_sku.value = product_data.value.products[0].sku
    }
    useSeoMeta({
      title: product_data.value.meta_title + ' | ' + website_name.value,
      ogTitle: product_data.value.meta_title + ' | ' + website_name.value,
      description: product_data.value.meta_description,
      ogDescription: product_data.value.meta_description,
      keywords: product_data.value.meta_keyword,
      ogImage: product_data.value.media && product_data.value.media.images[0] ? product_data.value.media.images[0].url : config.public.BASE_URL + '/images/placeholder-logo.png',
      ogImageAlt: product_data.value.name,
      ogUrl: config.public.BASE_URL + localePath('/' + product_data.value.slug)
    })
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product Not Found - Server Error',
      fatal: true
    })
  }
}

useHead({
  script: [{ src: "https://cdn.tamara.co/widget/product-widget.min.js", defer: true }],
  link: [
    {
      rel: 'canonical',
      href: config.public.BASE_URL + localePath('/' + url_product_id),
    },
  ],
})

onMounted(async () => {
  initFlowbite();
  // check mobile device
  if (((window.innerWidth <= 800) && (window.innerHeight <= 600)) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
  //console.log(isMobile.value, window.innerWidth, window.innerHeight)
  // set cart popup js
  const $cartPopupMenu = document.getElementById('add-cart-alert');
  const $cartPopupMenuOptions = {
    placement: lang.dir == 'rtl' ? 'left' : 'right',
    backdrop: true,
    bodyScrolling: false,
    edge: false,
    edgeOffset: '',
    backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-50'
  };
  addCartDrawer.value = new Drawer($cartPopupMenu, $cartPopupMenuOptions);

  // Tabby 
  new TabbyPromo({
    selector: '#tabbyPromo', //selector
    currency: 'SAR', // required 
    price: discount_price.value ? parseFloat(discount_price.value) : parseFloat(price.value),// required, price or the product. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
    installmentsCount: 4,
    lang: lang.code,
    source: 'product',
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

})

function getSelectedOption(option_data) {
  selected_option.value = option_data
  out_stock_btn.value = t('product_stock_notify_button')
  if (selected_option.value.sku) {
    product_sku.value = selected_option.value.sku
  }
  if (selected_option.value.price) {
    price.value = priceFormate(selected_option.value.price)
  }
  if (selected_option.value.discounted_price) {
    discount_price.value = priceFormate(selected_option.value.discounted_price)
  } else {
    discount_price.value = 0;
  }
  if (option_data.quantity <= 0) {
    out_stock.value = true
    disable_cart_btn.value = true
  } else {
    out_stock.value = false
  }
  disable_out_stock_btn.value = false
  disable_cart_btn.value = false

  if (typeof dataLayer !== 'undefined') { //for google analytics
    var event_price = discount_price.value ? discount_price.value : price.value
    event_price = +Number(priceFormate(event_price, false))
    dataLayer.push({
      'event': 'view_item',
      'eventCat': 'eCommerce',
      'eventLbl': product_data.value.name,
      'ecommerce': {
        'currencyCode': 'SAR',
        'detail': {
          'products': [{
            'name': product_data.value.name,
            'id': product_data.value.id,
            'price': event_price,
            'brand': product_data.value.brand,
            'category': product_data.value.category.name,
            'variant': '',
            'dimension3': out_stock.value == true ? 'Out Of Stock' : 'In Stock',
          }]
        }
      }
    });
  }
  // console.log(dataLayer);
}

function outStockNotify() {
  disable_out_stock_btn.value = true
  out_stock_btn.value = t('product_stock_notify_button_disabled')
}


async function addToCart() {
  disable_cart_btn.value = true
  addCartSuccess.value = {}
  const add_cart_data = {
    item_type: selected_option.value.buyable_type,
    item_id: selected_option.value.id,
    item_qty: 1,
  }

  const add_cart = await useCart().addItem(add_cart_data)
  if (add_cart && add_cart.id) {
    const refresh_cart = await useCart().getAll()
    if (refresh_cart.id) {
      setCartData(refresh_cart)
    }
    addCartSuccess.value = add_cart
    addCartKey.value += 1
    addCartDrawer.value.show()
    disable_cart_btn.value = false
    //console.log(addCartSuccess.value)
    if (typeof dataLayer !== "undefined") { //for google analytics
      var event_price = discount_price.value ? discount_price.value : price.value
      event_price = +Number(priceFormate(event_price, false))
      var event_data = {
        'event': 'add_to_cart',
        'eventCat': 'eCommerce',
        'eventLbl': product_data.value.name,
        'eventVal': event_price,
        'ecommerce': {
          'currencyCode': 'SAR',
          'add': {
            'products': [{
              'name': product_data.value.name,
              'id': product_data.value.id,
              'price': event_price,
              'brand': '',
              'category': product_data.value.category.name,
              'variant': '',
              'quantity': 1,
              'dimension3': 'In Stock',
            }]
          }
        }
      }
      dataLayer.push(event_data);
      //console.log(dataLayer);
    }
  }
}


const { toggleFavorite } = useFavorite()
async function toggleFavoriteCall() {
  const toggle = await toggleFavorite(product_data.value.id)
  if (toggle.status) {
    favorite.value = !favorite.value
  }
}

</script>