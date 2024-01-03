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
        :payment_method_name="method.title" :payment_method_image="method.image"
        :payment_method_description="method.description" :selected_payment="payment_method"
        @payment-value="getPaymentValue" />
    </div>
    <div v-else class="flex items-center justify-center text-gray-700 text-2xl font-semibold">
      {{ $t('text_empty_payment_methods') }}
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

const { allPaymentMethods } = usePaymentMethod()

const payment_methods_array = ref(await allPaymentMethods())

const payment_method = ref(0)

function getWalletStatus(status) {
  console.log('Wallet Status: ' + status)
}
function getPaymentValue(value) {
  payment_method.value = value
}
</script>