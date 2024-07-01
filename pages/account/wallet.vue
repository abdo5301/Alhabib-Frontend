<style scoped>
.wallet-bg {
  background: linear-gradient(279deg, #000 29.85%, rgba(0, 0, 0, 0.73) 79.63%);
}
</style>

<template>
  <Title>{{ $t('wallet_title') }} | {{ website_name }}</Title>
  <div class="w-full flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :current="$t('wallet_title')" />
    <AccountPageTitle>{{ $t('wallet_title') }}</AccountPageTitle>
    <div v-if="wallet_data"
      class="w-full flex flex-col gap-[30px] bg-white py-5 px-5 lg:py-[40px] lg:px-[30px] rounded-lg shadow">
      <!-- Wallet -->
      <div
        class="lg:p-[30px] p-5 flex gap-10 w-full lg:h-[314px] flex-col justify-start wallet-bg rounded-[20px] shadow">
        <!-- logo -->
        <div class="flex flex-row justify-end">
          <img src="/images/logo-white.png" class="w-[73px] lg:w-[87px]" alt="">
        </div>
        <!-- Total credit -->
        <div class="flex flex-col justify-start">
          <h5 class="text-[#B0B0B0] lg:text-2xl font-normal text-sm">
            {{ $t('total_balance_title') }}
          </h5>
          <!-- Permanent credit -->
          <div
            class="text-white text-3xl lg:text-[54px] font-bold leading-normal h-[67px] lg:h-[101px] flex justify-start items-center">
            {{ wallet_data.credit ? priceFormate(wallet_data.credit, true) : priceFormate(0, true) }}
          </div>
          <!-- Temporary credit-->
          <div v-if="wallet_data.temporary_credit && wallet_data.temporary_credit > 0"
            class="flex justify-start items-end h-[44px]">
            <div class="bg-white rounded py-.5 px-3 text-black text-sm font-semibold leading-20">
              <span class="font-extrabold">{{ priceFormate(wallet_data.temporary_credit, true) }}</span>
              <span>{{ $t('temporary_balance_remaining_title') }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Balance Expire Date -->
      <div v-if="wallet_data.temporary_credit && wallet_data.temporary_credit > 0"
        class="px-[10px] py-.5 flex justify-start items-center gap-[5px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
            fill="white" />
          <path
            d="M10 6.66667V10L12.5 12.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
            stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="text-black text-sm font-semibold leading-5">{{ $t('temporary_balance_expire_date_title') }}
          &nbsp;{{ format(new Date(wallet_data.temporary_credit_expiry), "yyyy/MM/dd") }}</span>
      </div>
      <!-- Transactions -->

      <div class="pt-5 flex flex-col gap-5 justify-start">
        <!-- Title -->
        <h5 class="text-black lg:text-lg text-sm font-bold leading-4">{{ $t('latest_operations_title') }}</h5>
        <!-- Data Loader -->
        <div v-if="data_loader" class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
          <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
        </div>
        <div v-show="!data_loader" class="flex flex-col gap-5 justify-start">
          <div v-if="wallet_transactions.data && wallet_transactions.data.length"
            class="flex justify-start flex-col gap-5">
            <!-- Item -->
            <AccountWalletTransactionItem v-for="(item, index) in transactions_paginate" :key="index" :item_id="item.id"
              :item_date="item.created_at" :item_amount="item.amount" :item_type="item.type" :item_class="item.class"
              :item_expire_date="item.expiry_date ? item.expiry_date : null" />
            <!-- Load  More -->
            <button v-if="transactions_paginate.length != wallet_transactions.meta.total" @click="loadMore()"
              type="button"
              class="w-full text-[#374151] font-bold text-sm h-[45px] flex gap-1 justify-center items-center rounded-md ring-1 ring-[#D0D0D0]">
              <span v-if="!infinite_scroll_loading">+</span>
              <svg v-else aria-hidden="true"
                class="inline w-5 h-5  text-gray-300 animate-spin fill-black" viewBox="0 0 100 101"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
              </svg>
              {{ $t('category_load_more_btn') }}
            </button>
          </div>
          <div v-else class="text-gray-500 font-bold text-[15px]">{{ $t('not_exist_yet') }}</div>
        </div>
      </div>
    </div>
    <CheckoutAlrajhiPoints  v-if="wallet_status"/>
  </div>
</template>

<script setup>
import { format } from "date-fns";
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const { setActiveSection } = useAccount()
const { getWalletData, getWalletTransactions } = useWallet()
const wallet_data = ref({})
const wallet_transactions = ref({})
const transactions_paginate = ref([])
const wallet_status = ref(false)
const data_loader = ref(true)
const infinite_scroll_loading = ref(false)
const current_page = ref(1)
const data_url = ref('/customer/wallet/transactions')
onMounted(async () => {
  initFlowbite()
  setActiveSection('wallet')
  wallet_data.value = await getWalletData()
  if (wallet_data.value.id) {
    wallet_transactions.value = await getWalletTransactions()
    if (wallet_transactions.value.data) {
      transactions_paginate.value = transactions_paginate.value.concat(wallet_transactions.value.data)
    }
    wallet_status.value = wallet_data.value.wallet_enabled
  }
  data_loader.value = false
})

async function loadMore() {
  infinite_scroll_loading.value = true
  if (current_page.value > 1 && data_url.value.includes('?page=')) {
    data_url.value = data_url.value.replace('?page=' + current_page.value, '?page=' + (current_page.value + 1))
  } else {
    data_url.value += '?page=' + (current_page.value + 1)
  }
  try {
    wallet_transactions.value = await getWalletTransactions(data_url.value)
    if (wallet_transactions.value.data) {//success
      transactions_paginate.value = transactions_paginate.value.concat(wallet_transactions.value.data)
      if (wallet_transactions.value.meta.total != transactions_paginate.value.length) {
        current_page.value = current_page.value + 1
      }
    } else {//reset url page parameter
      data_url.value = data_url.value.replace('?page=' + current_page.value, '?page=' + (current_page.value + 1))
    }
  } catch (error) {
    console.log("Failed to fetch data:", error)
    data_url.value = data_url.value.replace('?page=' + current_page.value, '?page=' + (current_page.value + 1))
  }

  infinite_scroll_loading.value = false
}

</script>