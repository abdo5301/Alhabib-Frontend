<template>
  <div v-if="payment_method_code != 'applepay' || (payment_method_code == 'applepay' && availableApplePay)"
    @click="setPaymentData"
    :class="[selected_payment == payment_method_value ? 'ring-gray-900' : 'ring-gray-300', 'w-full cursor-pointer ring-1 rounded-lg lg:ps-[25px] lg:pe-[17px] px-4 lg:py-[17px] py-3']">
    <div class="flex justify-between items-center w-full min-h-[50px]">
      <!-- Payment Content -->
      <div class="flex justify-start items-center gap-3">
        <!-- image -->
        <div class="flex-shrink-0">
          <img v-if="payment_method_image && payment_method_image != null" class="lg:h-[50px] h-[54px] rounded-md"
            :src="payment_method_image" alt="Alhabib-Shop">
          <img v-else class="lg:h-[50px] h-[54px] rounded-md" src="/images/payment/cash.png" alt="Alhabib-Shop">
        </div>
        <!-- Text -->
        <div class="flex flex-col justify-center items-start gap-3">
          <span class="text-gray-600 leading-5 text-xs lg:text-sm font-normal">{{ payment_method_name }}</span>
          <span v-if="payment_method_discount" class="text-green-700 leading-4 text-xs font-semibold flex">
            {{ $t('payment_method_discount_text') }}
            <img class="w-4 h-4 mx-[3px]" src="/images/payment/ratio-sign.png" alt="Discount">
          </span>
        </div>
      </div>
      <!-- Payment Toggle -->
      <div class="flex items-center justify-center">
        <svg v-if="selected_payment == payment_method_value" xmlns="http://www.w3.org/2000/svg" width="16" height="17"
          viewBox="0 0 16 17" fill="none">
          <rect y="0.5" width="16" height="16" rx="8" fill="#111827" />
          <circle cx="8" cy="8.5" r="3" fill="white" />
        </svg>
        <span v-else class="rounded-lg ring-1 ring-gray-300 bg-white w-4 h-4"></span>
      </div>
    </div>

  </div>
</template>

<script setup>
const lang = useNuxtApp().$lang
const emits = defineEmits(['paymentValue', 'paymentCode', 'paymentName'])
const props = defineProps({
  payment_method_name: {
    type: String,
  },
  payment_method_value: {
    type: Number,
  },
  payment_method_code: {
    type: String,
  },
  payment_method_image: {
    type: String
  },
  payment_method_description: {
    type: String
  },
  payment_method_discount: {
    type: Boolean,
    default: false
  },
  selected_payment: {
    type: Number,
    default: 0
  }
})
const MECHAT_ID = "merchant.com.alhabibshop.web.prod";
const availableApplePay = ref(false)
onMounted(() => {
  if (
    window.ApplePaySession &&
    ApplePaySession.canMakePaymentsWithActiveCard(MECHAT_ID)

  ) {
    //show apple pay method
    availableApplePay.value = true
  }
})

function setPaymentData() {
  var payment_method_data = {
    name: props.payment_method_name,
    code: props.payment_method_code,
    id: props.payment_method_value
  }
  emits('paymentValue', payment_method_data)
}
</script>