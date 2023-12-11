<template>
  <div class="w-full ring-1 ring-gray-300 rounded-lg ps-[25px] pe-[17px] py-[17px]">
    <div class="flex justify-between items-center w-full lg:h-10">
      <!-- Wallet Text -->
      <div class="flex justify-start items-center gap-3 leading-5 text-sm lg:font-bold font-semibold">
        <span class="text-gray-700">{{ $t('wallet_payment_text') }}</span>
        <span class="text-gray-500">(... {{ $t('sar') }})</span>
      </div>
      <!-- Wallet Toggle Switch -->
      <div class="flex items-center justify-center">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" v-model="use_wallet" @change="$emit('walletStatus', use_wallet)"
            class="sr-only peer" :checked="use_wallet">
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
  }
})
const use_wallet = ref(false)

</script>