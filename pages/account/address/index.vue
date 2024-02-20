<template>
  <Title>{{ $t('address_directory_title') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :current="$t('address_directory_title')" />
    <AccountPageTitle>{{ $t('address_directory_title') }}</AccountPageTitle>
    <AccountFormAlert v-if="address_success_state" color="green" :alert_icon="true">
      {{ address_success_state == 'add' ? $t('account_address_add_success') : address_success_state == 'edit' ?
        $t('account_address_edit_success') : $t('account_address_default_success') }}
    </AccountFormAlert>
    <div class="w-full flex flex-col lg:gap-[25px] gap-10 bg-white py-5 px-5 lg:py-[35px] lg:px-7 rounded-lg shadow">
      <ClientOnly>
        <!-- Loader -->
        <template #fallback>
          <div class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
            <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
          </div>
        </template>
        <!-- View All -->
        <div :key="items_key" class="w-full flex flex-col lg:gap-[25px] gap-10">
          <!-- Addresses Items -->
          <AccountAddressItem @change-default="refresh_items" v-if="all_addresses.length" v-for="(item, index) in all_addresses"
            :key="index" :item_id="item.id" :item_country="item.country" :item_region="item.region" :item_city="item.city"
            :item_neighborhood="item.neighborhood" :item_street="item.street" :item_default="item.default">
            <!-- Delete Address Confirm Popup -->
            <AccountPopup v-if="!item.default" :popup_id="'delete-address-popup-modal-' + item.id" popup_type="confirm"
              popup_data_type="cancel-warning" :popup_confirm_accept="$t('popup_delete_address_title')"
              :popup_confirm_reject="$t('popup_back_title')" @accept-confirm="delete_address(item.id)">
              {{ $t('popup_delete_address_confirm') }}
            </AccountPopup>
          </AccountAddressItem>
          <!-- Empty -->
          <AccountAddressEmpty v-else />
          <!-- New address btn -->
          <div v-if="all_addresses.length && all_addresses.length < 7" class="w-full flex justify-center items-center">
            <NuxtLink :to="localePath('/account/address/add')"
              class="lg:mt-5 lg:mb-3 w-full lg:w-[320px] h-[50px] lg:h-[38px] flex justify-center items-center gap-2 bg-white rounded-md shadow-sm ring-1 ring-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M10 5C10.5523 5 11 5.44772 11 6V9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H11V14C11 14.5523 10.5523 15 10 15C9.44771 15 9 14.5523 9 14V11H6C5.44772 11 5 10.5523 5 10C5 9.44771 5.44772 9 6 9L9 9V6C9 5.44772 9.44771 5 10 5Z"
                  fill="#6B7280" />
              </svg>
              <span class="text-sm font-semibold text-gray-700 leading-5">{{ $t('add_address') }}</span>
            </NuxtLink>
          </div>
        </div>
        <!-- Success Popup -->
        <div id="address-delete-success-popup" tabindex="-1" aria-hidden="true"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div
            class="relative p-6 w-full max-w-[384px] max-h-full flex flex-col gap-5 items-center justify-center bg-white rounded-lg shadow-xl">
            <!-- icon -->
            <img class="w-12 h-12px" src="/images/icons/true-green.png" alt="success">
            <!-- title -->
            <h3 class="text-gray-900 font-medium text-lg leading-9">
              {{ $t('popup_delete_address_confirm') }}
            </h3>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite, Modal } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const { setActiveSection } = useAccount()
const all_addresses = ref([])
const { t } = useI18n()
const address_success_state = useState('account_address_success')
const delete_success_modal = ref({})
onMounted(async () => {
  initFlowbite();
  setActiveSection('address')
  all_addresses.value = await useAddress().getAllAddresses()
  setTimeout(() => {
    clearNuxtState(['account_address_success'])
  }, 5000)

  // set the modal menu element
  const $delete_success_popup = document.getElementById('address-delete-success-popup');

  // options with default values
  const delete_success_popup_options = {
    placement: 'center',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      console.log('modal is hidden');
    },
    onShow: () => {
      console.log('modal is shown');
    },
    onToggle: () => {
      console.log('modal has been toggled');
    },
  };
  delete_success_modal.value = new Modal($delete_success_popup, delete_success_popup_options);
})
const { deleteAddress } = useAddress()
async function delete_address(address_id) {
  await deleteAddress(address_id)
  delete_success_modal.value.show()
  all_addresses.value = await useAddress().getAllAddresses()
}

const items_key = ref(256)
async function refresh_items() {
  all_addresses.value = await useAddress().getAllAddresses()
  items_key.value +=21
}
</script>