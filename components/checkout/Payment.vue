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
    <div class="flex flex-col gap-[15px]">
      <!-- Selected Item -->
      <CheckoutPaymentItem payment_method_value="visa" :selected_payment="payment_method"
        @payment-value="getPaymentValue" />
      <CheckoutPaymentItem payment_method_value="tamara" :selected_payment="payment_method"
        @payment-value="getPaymentValue" />
      <CheckoutPaymentItem payment_method_value="Stc Pay" :selected_payment="payment_method"
        @payment-value="getPaymentValue" />
    </div>

    <!-- Alrajhi Mokafaah Points -->
    <CheckoutAlrajhiPoints />

    <!-- Order Submit -->
    <button :disabled="!payment_method" @click="$emit('submit', payment_method)"
      class="w-full rounded-md shadow bg-gray-900 h-[50px] flex justify-center items-center text-white font-semibold text-base disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed">
      {{ $t('confirm_order_btn') }}
    </button>
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

const payment_method = ref('')

function getWalletStatus(status) {
  console.log('Wallet Status: ' + status)
}
function getPaymentValue(value) {
  payment_method.value = value
}
</script>