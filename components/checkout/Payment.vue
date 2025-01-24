<style scoped>
/* CSS */
@supports (-webkit-appearance: -apple-pay-button) {
  .apple-pay-button {
    display: inline-block;
    -webkit-appearance: -apple-pay-button;
    height: 34px;
    width: 92%;
    -apple-pay-button-type: buy;
    -apple-pay-button-style: black;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .apple-pay-button-black {
    -apple-pay-button-style: black;

  }

  .apple-pay-button-white {
    -apple-pay-button-style: white;
  }

  .apple-pay-button-white-with-line {
    -apple-pay-button-style: white-outline;
  }
}

@supports not (-webkit-appearance: -apple-pay-button) {
  .apple-pay-button {
    display: inline-block;
    background-size: 100% 60%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border-radius: 5px;
    padding: 0px;
    box-sizing: border-box;
    min-width: 95%;
    min-height: 40px;
    max-height: 64px;
    border: 0;

  }

  .apple-pay-button-black {
    background-image: -webkit-named-image(apple-pay-logo-white);
    background-color: black;
    color: white;
  }

  .apple-pay-button-white {
    background-image: -webkit-named-image(apple-pay-logo-black);
    background-color: white;
  }

  .apple-pay-button-white-with-line {
    background-image: -webkit-named-image(apple-pay-logo-black);
    background-color: white;
    border: .5px solid black;
  }
}
</style>

<template>
  <div class='w-full flex flex-col gap-5 lg:gap-[30px] lg:pt-[50px] pt-10'>
    <!-- Payment Method Title -->
    <h4
      :class="['flex items-center justify-start lg:py-[9px] text-gray-500 lg:text-gray-900 font-bold leading-6 lg:leading-5 text-base lg:text-xl']">
      {{ $t('payment_method_title') }}
    </h4>

    <!-- Wallet -->
    <CheckoutWallet v-if="admin_wallet_status" :credit="wallet_credit" :wallet_status="wallet_status"
      @wallet-status='toggleWalletStatus' />

    <!-- Payment Methods Container -->
    <div v-if='payment_methods_array && payment_methods_array.length > 0' class='flex flex-col gap-[15px]'>
      <!-- Selected Item -->
      <CheckoutPaymentItem v-for='(method, index) in payment_methods_array' :key='index'
        :payment_method_value='method.id' :payment_method_name='method.title' :payment_method_image='method.image'
        :payment_method_code='method.code' :payment_method_description='method.description'
        :selected_payment='payment_method_id' @payment-value='getPaymentValue' />
    </div>
    <div v-else class='flex items-center justify-center text-gray-700 text-2xl font-semibold'>
      {{ $t('text_empty_payment_methods') }}
    </div>

    <!-- Alrajhi Mokafaah Points -->
    <CheckoutAlrajhiPoints v-if="admin_wallet_status && $config.public.alrajhi_points_status != 'disable'" />

    <!-- Order Submit -->
    <button v-if='!selectedApplePayMethod' id='order-save-btn'
      :disabled='!payment_method_id || disable_checkout || submit_loading' @click="submitOrder(), submit_loading = true"
      class='w-full rounded-md shadow bg-gray-900 h-[50px] flex justify-center items-center text-white font-semibold text-base disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed'>
      {{ $t('confirm_order_btn') }}
    </button>

    <!-- Apple Pay  -->
    <div v-show='selectedApplePayMethod'
      class='w-full rounded-md shadow bg-black h-[50px] flex justify-center items-center'>
      <div @click='onApplePayButtonClicked'
        :class="['apple-pay-button apple-pay-button-black', submit_loading ? 'pointer-events-none' : '']"></div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['submit', 'savePayment', 'walletStatus'])
const props = defineProps({
  step: {
    type: String,
    default: 'add_address'
  },
  address_id: {
    type: Number
  },
  disable_checkout: {
    type: Boolean,
    default: false
  }
})
const submit_loading = ref(false)
const route = useRoute()
const localePath = useLocalePath()
const lang = useNuxtApp().$lang
const { cartTotal, setCartData, cartWalletCredit, cartWalletStatus } = useCart()
const { setSuccessOrderId, saveOrderPayment, cancelOrder, addOrder, getOrder } = useOrder()
const config = useRuntimeConfig()
const selectedApplePayMethod = ref(false)
const user_token = await useAuth().getUserToken()
const payment_method_id = ref(0) //payment_id
const payment_method_code = ref(0) //payment_code
const { allPaymentMethods } = usePaymentMethod()
const { getWalletData, toggleWalletCart } = useWallet()
const payment_methods_array = ref(await allPaymentMethods())

//Wallet
const wallet_credit = ref(0)
const wallet_status = ref(cartWalletCredit.value && cartWalletCredit.value > 0 ? true : false)
const admin_wallet_status = ref(cartWalletStatus.value ??= false)
//Tabby
const tabby_session = ref({})
const tabby_pay_id = ref(0)
const tabby_pay_url = ref('')

//Tamara
const tamara_session = ref({})
const tamara_pay_id = ref(0)
const tamara_order_id = ref(0)
const tamara_pay_url = ref('')

onMounted(async () => {
  const wallet_data = await getWalletData()
  if (wallet_data.id && wallet_data.credit) {
    wallet_credit.value = wallet_data.credit
  }
})

async function toggleWalletStatus(status) {
  const new_cart = await toggleWalletCart(status)
  setCartData(new_cart.data)
  wallet_status.value = status
  emits('walletStatus')
  console.log('Wallet Status: ' + status)
}

async function getPaymentValue(payment_data) {//change payment data
  if (payment_method_id.value == payment_data.id) {
    return;
  }
  payment_method_id.value = 0
  payment_method_code.value = payment_data.code
  if (payment_data.code == 'applepay') {
    selectedApplePayMethod.value = true
  } else {
    selectedApplePayMethod.value = false
  }
  const new_cart = await saveOrderPayment(payment_data.id)
  setCartData(new_cart.data)
  emits('savePayment', payment_data)
  payment_method_id.value = payment_data.id
}
// Apple Pay Select
function onApplePayButtonClicked() {

  if (!ApplePaySession) {
    return
  }

  // Define ApplePayPaymentRequest
  const request = {
    'countryCode': 'SA',
    'currencyCode': 'SAR',
    'merchantCapabilities': [
      'supports3DS'
    ],
    'supportedNetworks': [
      'visa',
      'masterCard',
      'amex',
      'discover',
      'mada'
    ],
    'total': {
      'label': 'alhabibshop',
      'type': 'final',
      'amount': String(cartTotal.value)
    }
  }

  // Create ApplePaySession
  const session = new ApplePaySession(6, request)
  session.onvalidatemerchant = async event => {
    // Call your own server to request a new merchant session.
    const merchantSession = await validateMerchant(event.validationURL);
    session.completeMerchantValidation(merchantSession);
  };

  session.onpaymentauthorized = async event => {
    //console.log('160')

    const outcome = await pay(event.payment.token);
    if (outcome) {
      console.log(outcome)
      if (outcome.response_code === "14000") {
        session.completePayment(session.STATUS_SUCCESS)
        // emits('submit', payment_method)//client order
        setSuccessOrderId(outcome.order_id)//server order
        return navigateTo(localePath('/checkout/success'))
      } else {
        session.completePayment(session.STATUS_FAILURE)
        alert('Payment Failed!')
      }
    } else {
      session.completePayment(session.STATUS_FAILURE)
      alert('Server Error !')
    }
  }

  session.oncancel = event => {
    // Payment canceled by WebKit
  }

  session.begin()
}
// Apple Pay Validation
let validateMerchant = async validationURL => {
  //we send the validation URL to our backend
  try {
    return await $fetch(config.public.API_URL + '/applepay/session-validation', {
      method: 'POST',
      body: {
        validationURL: validationURL
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + user_token
      }
    })

  } catch (error) {
    console.log(error)
  }
}
// Apple Pay Confirm 
let pay = async applePayToken => {
  try {
    return await $fetch(config.public.API_URL + '/applepay/payment-completed', {
      method: 'POST',
      body: {
        applePayToken: applePayToken,
        address_id: props.address_id,
        payment_gateway_id: payment_method_id.value,
        gifted: "0",
        gift_phrase: "",
        source: "web"
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + user_token
      }
    })

  } catch (error) {
    console.log(error)
  }
}

//Tamara Session
async function createTamaraSession() {
  var new_order_data = {
    address_id: props.address_id,
    payment_gateway_id: payment_method_id.value,
    gifted: "0",
    gift_phrase: ""
  }
  const create_tamara_order = await addOrder(new_order_data)
  if (!create_tamara_order || !create_tamara_order.id) {
    return;
  }
  const tamara_order_data = await getOrder(create_tamara_order.id)
  if (!tamara_order_data || !tamara_order_data.id) {
    return;
  }

  tamara_order_id.value = tamara_order_data.id
  setSuccessOrderId(tamara_order_id.value)

  const tamara_order_items = []

  tamara_order_data.order_items.forEach((item) => {
    var new_tamara_item = {
      "name": item.name,//required
      "type": "Physical",//required
      "reference_id": String(item.id),//required
      "quantity": Number(item.quantity),//required
      "sku": String(item.sku),//required
      "item_url": config.public.BASE_URL + localePath("/product/" + item.id),
      "image_url": item.image ? item.image : `${config.public.BASE_URL}/images/placeholder-logo.png`,
      "unit_price": { amount: Number(priceFormate(item.total / item.quantity, false)), currency: 'SAR' },
      "total_amount": { amount: Number(item.total), currency: 'SAR' },//required
    }
    tamara_order_items.push(new_tamara_item);
  });

  const tamara_session_data = JSON.stringify({
    total_amount: { amount: Number(tamara_order_data.total), currency: 'SAR' },
    shipping_amount: { amount: Number(tamara_order_data.shipping), currency: 'SAR' },
    tax_amount: { amount: Number(tamara_order_data.tax), currency: 'SAR' },
    order_reference_id: String(tamara_order_data.id),
    order_number: String(tamara_order_data.id),
    discount: tamara_order_data.discount_code ? { name: String(tamara_order_data.discount_code), amount: { amount: Number(tamara_order_data.discount), currency: 'SAR' } } : { name: 'Voucher A', amount: { amount: 0, currency: 'SAR' } },
    items: tamara_order_items,
    consumer: {
      email: String(tamara_order_data.customer_email),
      first_name: String(tamara_order_data.customer_name),
      last_name: '.',
      phone_number: String(tamara_order_data.customer_mobile)
    },
    country_code: 'SA',
    description: 'Enter order description here.',
    merchant_url: {
      cancel: config.public.BASE_URL + localePath("/checkout/from-tamara"),
      failure: config.public.BASE_URL + localePath("/checkout/from-tamara"),
      success: config.public.BASE_URL + localePath("/checkout/success"),
      notification: config.public.BASE_URL + localePath("/checkout/from-tamara")
    },
    payment_type: 'PAY_BY_INSTALMENTS',
    instalments: 4,
    billing_address: {
      city: String(tamara_order_data.customer_city),
      country_code: 'SA',
      first_name: String(tamara_order_data.customer_name),
      last_name: '.',
      line1: String(tamara_order_data.customer_city + ',' + tamara_order_data.customer_street),
      line2: 'string',
      phone_number: String(tamara_order_data.customer_mobile),
      region: String(tamara_order_data.customer_region),
    },
    shipping_address: {
      city: String(tamara_order_data.customer_city),
      country_code: 'SA',
      first_name: String(tamara_order_data.customer_name),
      last_name: '.',
      line1: String(tamara_order_data.customer_city + ',' + tamara_order_data.customer_street),
      line2: 'string',
      phone_number: String(tamara_order_data.customer_mobile),
      region: String(tamara_order_data.customer_region)
    },
    platform: 'platform name here',
    is_mobile: true,
    locale: 'ar_SA',
  })

  const tamara_api_url = config.public.TAMARA_ENV == 'test' ? 'https://api-sandbox.tamara.co/checkout' : 'https://api.tamara.co/checkout'
  try {
    tamara_session.value = await $fetch(tamara_api_url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'authorization': 'Bearer ' + config.public.TAMARA_API_TOKEN
      },
      body: tamara_session_data
    })
  } catch (error) {
    console.log(error.data)
  }

}

//Tabby Session
async function createTabbySession() {
  var new_order_data = {
    address_id: props.address_id,
    payment_gateway_id: payment_method_id.value,
    gifted: "0",
    gift_phrase: ""
  }
  const create_tabby_order = await addOrder(new_order_data)
  if (!create_tabby_order || !create_tabby_order.id) {
    return;
  }
  const tabby_order_data = await getOrder(create_tabby_order.id)
  if (!tabby_order_data || !tabby_order_data.id) {
    return;
  }
  setSuccessOrderId(tabby_order_data.id)
  const tabby_order_items = []
  tabby_order_data.order_items.forEach((item) => {
    var new_tabby_item = {
      "reference_id": String(item.id),
      "title": item.name,//required
      "description": "string",
      "quantity": item.quantity,//required
      "unit_price": priceFormate(item.total / item.quantity, false),//required
      "discount_amount": "0",
      "category": String(item.category),//required
      "image_url": item.image ? item.image : "",
      "product_url": config.public.BASE_URL + localePath("/product/" + item.id),
      "gender": "Male",
      "color": "string",
      "product_material": "string",
      "size_type": "string",
      "size": "string",
      "brand": "string"
    }
    tabby_order_items.push(new_tabby_item);
  });
  const tabby_session_data = {
    "payment": {
      "amount": priceFormate(tabby_order_data.total, false),
      "currency": "SAR",
      "description": "string",
      "buyer": {
        "phone": String(tabby_order_data.customer_mobile),//'500000001',
        "email": String(tabby_order_data.customer_email),//'card.success@tabby.ai',
        "name": String(tabby_order_data.customer_name),//'Tester',
        "dob": null
      },
      "shipping_address": {
        "city": String(tabby_order_data.customer_region),
        "address": String(tabby_order_data.customer_city + ',' + tabby_order_data.customer_street),
        "zip": "12271" //Riyadh Postal Code
      },
      "order": {
        "tax_amount": priceFormate(tabby_order_data.tax, false),
        "shipping_amount": priceFormate(tabby_order_data.shipping, false),
        "discount_amount": "0",
        "updated_at": tabby_order_data.created_at_raw,//"2019-08-24T14:15:22Z",
        "reference_id": String(tabby_order_data.id),
        "items": tabby_order_items
      },
      "buyer_history": {
        "registered_since": null,//"2019-08-24T14:15:22Z",
        "loyalty_level": 0,
        "wishlist_count": 0,
        "is_social_networks_connected": true,
        "is_phone_number_verified": true,
        "is_email_verified": true
      },
      "order_history": [
        {
          "purchased_at": tabby_order_data.created_at_raw,//"2019-08-24T14:15:22Z",
          "amount": priceFormate(tabby_order_data.total, false),
          "payment_method": "card",
          "status": "new",
          "buyer": {
            "phone": String(tabby_order_data.customer_mobile),
            "email": String(tabby_order_data.customer_email),
            "name": String(tabby_order_data.customer_name),
            "dob": null
          },
          "shipping_address": {
            "city": String(tabby_order_data.customer_region),
            "address": String(tabby_order_data.customer_city + ',' + tabby_order_data.customer_street),
            "zip": "12271" //Riyadh Postal Code
          }
        }
      ],
      "meta": {
        "order_id": "#" + tabby_order_data.id,
        "customer": "#customer-id"
      },
      "attachment": {
        "body": "{\"flight_reservation_details\": {\"pnr\": \"TR9088999\",\"itinerary\": [...],\"insurance\": [...],\"passengers\": [...],\"affiliate_name\": \"some affiliate\"}}",
        "content_type": "application/vnd.tabby.v1+json"
      }
    },
    "lang": lang.code,
    "merchant_code": "sa",
    "merchant_urls": {
      "success": config.public.BASE_URL + localePath("/checkout/success"),
      "cancel": config.public.BASE_URL + localePath("/checkout/from-tabby"),
      "failure": config.public.BASE_URL + localePath("/checkout/from-tabby"),
    }
  }
  try {
    tabby_session.value = await $fetch('/tabby/api/v2/checkout', {
      method: 'POST',
      body: tabby_session_data,
      headers: {
        'Authorization': 'Bearer ' + config.public.TAPPY_PUBLIC_KEY
      }
    })
  } catch (error) {
    console.log(error)
  }
}

async function submitOrder() {
  if (props.disable_checkout == false) {
    if (payment_method_code.value == 'tamarapay') { //If Tamara payment
      if (!tamara_session.value || !tamara_session.value.length) {
        await createTamaraSession()
      }
      if (tamara_session.value && tamara_session.value.status && tamara_session.value.status == "new" && tamara_order_id.value != 0) {
        //console.log(tamara_session.value)
        tamara_pay_url.value = tamara_session.value.checkout_url
        tamara_pay_id.value = tamara_session.value.order_id
        setSuccessOrderId(tamara_order_id.value)
        localStorage.setItem('tamara_payment_id', tamara_pay_id.value)
        return navigateTo(tamara_pay_url.value, {
          external: true,
        })
      } else {
        alert('Tamara Server Error Please Reload The Page!')
      }
    } else if (payment_method_code.value == 'tabby_installments') { //If Tabby payment
      if (!tabby_session.value || !tabby_session.value.length) {
        await createTabbySession()
      }
      if (tabby_session.value && tabby_session.value.payment && tabby_session.value.status == "created") {
        //console.log(tabby_session.value)
        setSuccessOrderId(tabby_session.value.payment.order.reference_id)
        tabby_pay_url.value = tabby_session.value.configuration.available_products.installments[0].web_url
        tabby_pay_id.value = tabby_session.value.payment.id
        localStorage.setItem('tabby_payment_id', tabby_pay_id.value)
        return navigateTo(tabby_pay_url.value, {
          external: true,
        })
      } else {
        alert('Tabby Server Error Please Reload The Page!')
      }
    } else { //Any payment else
      emits('submit', payment_method_id.value)
    }
  }
}

</script>