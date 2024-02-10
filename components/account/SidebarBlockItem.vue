<template>
  <button v-if="item_key == 'delete_account'" data-modal-target="delete-account-popup-modal"
    data-modal-show="delete-account-popup-modal"
    class="flex justify-start items-center gap-3 min-h-[45px] lg:px-[38px] px-[20px] text-red-600 hover:bg-gray-100 hover:border-r-2 hover:border-r-black">
    <img class="w-9 h-9" :src="item_icon" :alt="item_name">
    <span>{{ item_name }}</span>
  </button>
  <button v-else-if="item_key == 'logout'" @click="userLogout"
    class="flex justify-start items-center gap-3 min-h-[45px] lg:px-[38px] px-[20px] hover:bg-gray-100 hover:border-r-2 hover:border-r-black">
    <img class="w-9 h-9" :src="item_icon" :alt="item_name">
    <span>{{ item_name }}</span>
  </button>
  <NuxtLink v-else :to="item_link"
    :class="[activeSection == item_key ? 'bg-gray-100 border-r-2 border-r-black' : '',
      'flex justify-start items-center gap-3 min-h-[45px] lg:px-[38px] px-[20px] hover:bg-gray-100 hover:border-r-2 hover:border-r-black']">
    <img class="w-9 h-9" :src="item_icon" :alt="item_name">
    <span>{{ item_name }}</span>
  </NuxtLink>
  <!-- Delete Account Popup -->
  <AccountPopup popup_id="delete-account-popup-modal" popup_type="confirm" popup_data_type="delete"
    :popup_title="$t('popup_delete_account_confirm')" :popup_confirm_accept="$t('delete_account_title')"
    :popup_confirm_reject="$t('popup_back_title')" @accept-confirm="console.log('customer deleted !')">
    {{ $t('popup_delete_account_confirm') }}
    </AccountPopup>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
onMounted(() => {
  initFlowbite()
})
const { activeSection } = useAccount()
const props = defineProps({
  item_name: {
    type: String
  },
  item_key: {
    type: String,
    default: ''
  },
  item_link: {
    type: String,
    default: ''
  },
  item_icon: {
    type: String
  },

})

const { userLogout } = useAuth()
const { deleteCustomer } = useCustomer()

</script>
