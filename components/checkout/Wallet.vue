<template>
  <div class="w-full ring-1 ring-gray-300 rounded-lg lg:ps-[25px] lg:pe-[17px] px-4 lg:py-[17px] py-3">
    <div class="flex justify-between items-center w-full lg:h-10">
      <!-- Wallet Text -->
      <div class="flex justify-start items-center lg:gap-3 gap-2 leading-5 text-xs lg:text-sm lg:font-bold font-semibold">
        <span class="text-gray-700">{{ $t('wallet_payment_text') }}</span>
        <span class="text-gray-500">( {{ priceFormate(credit) }} )</span>
      </div>
      <!-- Wallet Toggle Switch -->
      <div class="flex items-center justify-center">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" v-model="use_wallet" @change="$emit('walletStatus', use_wallet)"
            class="sr-only peer" :checked="use_wallet" :disabled="!credit > 0">
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-gray-900">
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['walletStatus'])
const props = defineProps({
  credit: {
    type: Number,
    default: 0
  },
  wallet_status: {
    type: Boolean,
    default: false
  },
})
const use_wallet = ref(props.wallet_status)
</script>