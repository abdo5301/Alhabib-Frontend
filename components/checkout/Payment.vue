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
    <CheckoutWallet @wallet-status='getWalletStatus' />

    <!-- Payment Methods Container -->
    <div v-if='payment_methods_array && payment_methods_array.length > 0' class='flex flex-col gap-[15px]'>
      <!-- Selected Item -->
      <CheckoutPaymentItem v-for='(method, index) in payment_methods_array' :key='index' :payment_method_value='method.id'
        :payment_method_name='method.title' :payment_method_image='method.image' :payment_method_code='method.code'
        :payment_method_description='method.description' :selected_payment='payment_method'
        @payment-value='getPaymentValue' @payment-code='getPaymentCode' />
    </div>
    <div v-else class='flex items-center justify-center text-gray-700 text-2xl font-semibold'>
      {{ $t('text_empty_payment_methods') }}
    </div>

    <!-- Alrajhi Mokafaah Points -->
    <CheckoutAlrajhiPoints />

    <!-- Order Submit -->
    <button v-if='!selectedApplePayMethod' id='order-save-btn' :disabled='!payment_method'
      @click="$emit('submit', payment_method)"
      class='w-full rounded-md shadow bg-gray-900 h-[50px] flex justify-center items-center text-white font-semibold text-base disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed'>
      {{ $t('confirm_order_btn') }}
    </button>

    <!-- Apple Pay  -->
    <div v-show='selectedApplePayMethod'
      class='w-full rounded-md shadow bg-black h-[50px] flex justify-center items-center'>
      <div @click='onApplePayButtonClicked' class='apple-pay-button apple-pay-button-black'></div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['submit', 'walletStatus'])
const props = defineProps({
  step: {
    type: String,
    default: 'add_address'
  }
})
const localePath = useLocalePath()
const { cartTotal } = useCart()
const { setSuccessOrderId } = useOrder()
const config = useRuntimeConfig()
const selectedApplePayMethod = ref(false)
const user_token = await useAuth().getUserToken()

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
        emits('submit', payment_method)//client order

        //setSuccessOrderId(outcome.order_id)//server order
        //return navigateTo(localePath('/checkout/success'))
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

let pay = async applePayToken => {
  try {
    return await $fetch(config.public.API_URL + '/applepay/payment-completed', {
      method: 'POST',
      body: {
        applePayToken: applePayToken
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + user_token
      }
    })

  } catch (error) {
    console.log('after-pay-error')
    console.log(error)
  }
}

const { allPaymentMethods } = usePaymentMethod()

const payment_methods_array = ref(await allPaymentMethods())

const payment_method = ref(0)

function getWalletStatus(status) {
  console.log('Wallet Status: ' + status)
}

function getPaymentValue(value) {
  payment_method.value = value
}

function getPaymentCode(code) {
  if (code == 'applepay') {
    selectedApplePayMethod.value = true
  } else {
    selectedApplePayMethod.value = false
  }
}
</script>