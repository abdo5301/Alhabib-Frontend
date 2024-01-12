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
  <div class="w-full flex flex-col gap-5 lg:gap-[30px] lg:pt-[50px] pt-10">
    <!-- Payment Method Title -->
    <h4
      :class="['flex items-center justify-start lg:py-[9px] text-gray-500 lg:text-gray-900 font-bold leading-6 lg:leading-5 text-base lg:text-xl']">
      {{ $t('payment_method_title') }}
    </h4>

    <!-- Wallet -->
    <CheckoutWallet @wallet-status="getWalletStatus" />

    <!-- Payment Methods Container -->
    <div v-if="payment_methods_array && payment_methods_array.length > 0" class="flex flex-col gap-[15px]">
      <!-- Selected Item -->
      <CheckoutPaymentItem v-for="(method, index) in payment_methods_array" :key="index" :payment_method_value="method.id"
        :payment_method_name="method.title" :payment_method_image="method.image" :payment_method_code="method.code"
        :payment_method_description="method.description" :selected_payment="payment_method"
        @payment-value="getPaymentValue" @payment-code="getPaymentCode" />
    </div>
    <div v-else class="flex items-center justify-center text-gray-700 text-2xl font-semibold">
      {{ $t('text_empty_payment_methods') }}
    </div>

    <!-- Alrajhi Mokafaah Points -->
    <CheckoutAlrajhiPoints />

    <!-- Order Submit -->
    <button v-if="!selectedApplePayMethod" id="order-save-btn" :disabled="!payment_method"
      @click="$emit('submit', payment_method)"
      class="w-full rounded-md shadow bg-gray-900 h-[50px] flex justify-center items-center text-white font-semibold text-base disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed">
      {{ $t('confirm_order_btn') }}
    </button>

    <!-- Apple Pay  -->
    <div v-show="selectedApplePayMethod"
      class="w-full rounded-md shadow bg-black h-[50px] flex justify-center items-center">
      <div @click="applepay" class="apple-pay-button apple-pay-button-black"></div>
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
const config = useRuntimeConfig()
const selectedApplePayMethod = ref(false)

function applepay(){

  let applePaySession = new ApplePaySession(6, {
    countryCode: 'SA',
    currencyCode: 'SAR',
    supportedNetworks: ["visa", "masterCard", "amex", "discover", "mada"],
    merchantCapabilities: ["supports3DS"],
    total: { label: "alhabibshop", amount: cartTotal.value }
  });
  console.log('132')
  console.table(applePaySession)

  applePaySession.begin();

  console.table(applePaySession)
  console.log('135')

  //this is the first event that apple triggers.
  //validate applepay session
  applePaySession.onvalidatemerchant = function(event){
    console.log(event)
    console.log('139')
    let theValidationURL = event.validationURL;
     validateTheSession(theValidationURL, function (merchantSession) {
      console.log('before-validation')
      applePaySession.completeMerchantValidation(merchantSession);
    });
  };

  //this is the trigger after the user confirmed the transaction with Touch ID or face ID
  //this  will contain the payment token
  applePaySession.onpaymentauthorized = function (event) {
    console.log('before-pay')
    let applePayToken = event.payment.token;

    pay(applePayToken, function (outcome) {

      if (outcome) {
        console.log(outcome)
        if (outcome.response_code == "14000") {
          applePaySession.completePayment(applePaySession.STATUS_SUCCESS);
          emits('submit', payment_method)//create order
        } else {
          applePaySession.completePayment(applePaySession.STATUS_FAILURE);
        }
      } else {
        applePaySession.completePayment(applePaySession.STATUS_FAILURE);
        alert('Server Error !');
      }
    })
  }
}


const validateTheSession = function (theValidationURL, callback) {
  //we send the validation URL to our backend
  try {
    let resp = $fetch(config.public.API_URL + '/applepay/session-validation', {
      method: 'POST',
      body: {
        theValidationURL: theValidationURL,
      },
      headers: { "Access-Control-Allow-Origin": "*" }
    })
    if (resp.data) {
      console.log('after-validation-success')
      callback(resp.data)
    }
  } catch (error) {
    console.log('validation-error')
    console.log(error.data)
  }

};

let pay = function (applePayToken, callback) {
  try {
    const resp = $fetch(config.public.API_URL + '/applepay/payment-completed', {
      method: 'POST',
      body: {
        applePayToken: applePayToken,
      },
      headers: { "Access-Control-Allow-Origin": "*" }
    })
    if (resp.data) {
      console.log('after-pay-success')
      callback(resp.data)
    }
  } catch (error) {
    console.log('after-pay-error')
    console.log(error.data)
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