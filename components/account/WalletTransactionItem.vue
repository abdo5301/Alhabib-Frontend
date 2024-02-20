<template>
  <div class="relative w-full py-[5px] px-[7px] flex gap-16 justify-start items-center bg-[#FBFBFB] rounded-lg">
    <div class="flex justify-start items-center gap-3 lg:w-[300px] w-[150px]">
      <img :src="item_icon" class="w-[36px] h-[36px]" alt="wallet-transaction">
      <span :class="['text-gray-700 lg:text-sm text-xs font-bold leading-5',item_expire_date ? 'lg:mb-0 mb-3' : '']">{{ item_name }}</span>
    </div>
    <div class="flex-1 flex justify-between items-center">
      <span class="text-gray-700 text-xs lg:text-sm leading-5 font-normal">
        {{ item_date }}
      </span>
      <span dir="ltr"
        :class="['flex gap-1 text-sm font-bold leading-5', item_addition == 'plus' ? 'text-[#00AB77]' : 'text-[#C72929]']">
        <span>{{ item_addition == 'plus' ? '+' : '-' }}</span><span>{{ item_amount }}</span>
      </span>
    </div>
    <div v-if="item_expire_date"
      class="absolute lg:start-[160px] start-[50px] lg:top-auto top-[28px] lg:h-5 lg:px-[10px] px-1.5 bg-red-100 rounded flex gap-1 justify-center items-center text-red-600 lg:text-xs text-[10px]">
      <span class="font-semibold">
        {{ $t('wallet_valid_until') }}
      </span>
      <span class="font-semibold">
        {{ item_expire_date }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item_id: {
    type: Number,
  },
  item_amount: {
    type: Number,
  },
  item_date: {
    type: String,
  },
  item_type: {
    type: String,
  },
  item_expire_date: {
    type: String,
  }
})
const { t } = useI18n()
const item_name = ref('---')
const item_addition = ref('plus')
const item_icon = ref('/images/icons/cube-dark.png')
onMounted(() => {
  switch (props.item_type) {
    case 'credit_added':
      item_name.value = t('wallet_added_balance_title')
      item_addition.value = 'plus'
      item_icon.value = '/images/icons/plus-green.png'
      break;
    case 'buy':
      item_name.value = t('wallet_buy_process_title')
      item_addition.value = 'minus'
      item_icon.value = '/images/icons/cube-dark.png'
      break;
    case 'alrajhi':
      item_name.value = t('wallet_alrjhi_mokafaa_title')
      item_addition.value = 'plus'
      item_icon.value = '/images/icons/alrajhi-blue.png'
      break;
    case 'temporary':
      item_name.value = t('wallet_temporary_balance_title')
      item_addition.value = 'plus'
      item_icon.value = '/images/icons/gift-red.png'
      break;
    case 'credit_discount':
      item_name.value = t('wallet_discount_balance_title')
      item_addition.value = 'mins'
      item_icon.value = '/images/icons/cube-dark.png'
      break;
    default:
      break;
  }
})
</script>