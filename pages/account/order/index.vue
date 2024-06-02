<template>
  <Title>{{ $t('orders_title') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :current="$t('orders_title')" />
    <AccountPageTitle>{{ $t('orders_title') }}</AccountPageTitle>
    <div class="flex justify-start gap-[5px] lg:gap-[10px]">
      <AccountOrdersTab :active_tab="active_tab" item_type="all" @click-tab="tab_navigation">{{
        $t('all_btn') }}</AccountOrdersTab>
      <AccountOrdersTab :active_tab="active_tab" item_type="current" @click-tab="tab_navigation">{{
        $t('current_orders_btn') }}</AccountOrdersTab>
      <AccountOrdersTab :active_tab="active_tab" item_type="previous" @click-tab="tab_navigation">{{
        $t('previous_orders_btn') }}</AccountOrdersTab>
    </div>
    <!-- Orders -->
    <div class="w-full flex flex-col gap-5 lg:gap-[25px]">
      <ClientOnly>
        <!-- Loader -->
        <template #fallback>
          <div class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
            <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
          </div>
        </template>
        <div v-if="items_loader" class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
          <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
        </div>
        <!-- Orders -->
        <div :key="orders_div_key" class="w-full flex flex-col gap-5 lg:gap-[25px]">
          <!-- Item -->
          <AccountOrderItem v-for="(item, index) in orders" :key="index" :item_products="item.order_items"
            :item_id="item.id" :item_status="item.state.id" :item_create_date="item.created_at"
            :item_update_date="item.updated_at" :item_tracking_link="item.tracking_url"
            @trigger-cancel-order="setCancelId(item.id)" />
        </div>
        <!-- Cancel Confirm Popup -->
        <div id="cancel-order-confirm-popup" tabindex="-1" aria-hidden="true"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div
            class="relative p-6 w-full max-w-[384px] max-h-full flex flex-col gap-5 items-center justify-center bg-white rounded-lg shadow-xl">
            <!-- icon -->
            <img class="w-12 h-12px" src="/images/icons/true-green.png" alt="success">
            <!-- title -->
            <h3 class="text-gray-900 font-medium text-lg leading-9">
              {{ $t('popup_cancel_order_confirm') }}
            </h3>
            <!-- Confirm Buttons -->
            <div class="pt-1 flex items-center justify-center gap-[18px]">
              <!-- Accept Confirm -->
              <button type="button" @click="cancelAction"
                class="w-[150px] h-[38px] text-white bg-gray-900 ring-1 ring-gray-300 rounded-md text-sm font-semibold leading-5 flex items-center justify-center shadow-sm hover:text-gray-700 hover:bg-gray-300">
                {{ $t('cancel_order_btn') }}
              </button>
              <!-- Cancel -->
              <button type="button" @click="cancel_confirm_modal.hide()"
                class="w-[150px] h-[38px] text-gray-700 bg-white ring-1 ring-gray-300 rounded-md text-sm font-semibold leading-5 flex items-center justify-center shadow-sm hover:text-white hover:bg-gray-500">
                {{ $t('popup_back_title') }}
              </button>
            </div>
          </div>
        </div>
        <!-- Cancel Success Popup -->
        <div id="cancel-order-success-popup" tabindex="-1" aria-hidden="true"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div
            class="relative p-6 w-full max-w-[384px] max-h-full flex flex-col gap-5 items-center justify-center bg-white rounded-lg shadow-xl">
            <!-- icon -->
            <img class="w-12 h-12px" src="/images/icons/true-green.png" alt="success">
            <!-- title -->
            <h3 class="text-gray-900 font-medium text-lg leading-9">
              {{ $t('popup_cancel_order_success') }}
            </h3>
            <!-- Notes -->
            <div
              class="flex justify-center items-center text-center text-gray-500 text-[15px] font-normal leading-8 -mt-2 -mx-1">
              {{ $t('popup_cancel_order_success_notes') }}
            </div>
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
const active_tab = ref('all')
const orders = ref([])
const items_loader = ref(true)
const cancel_confirm_modal = ref('')
const cancel_success_modal = ref('')
const cancel_order_id = ref(0)
const orders_div_key = ref(888)
onMounted(async () => {
  initFlowbite()
  setActiveSection('orders')
  orders.value = await useOrder().getAllOrders()
  items_loader.value = false
  // set cancel order confirm popup
  const cancel_confirm_popup = document.getElementById('cancel-order-confirm-popup');

  // options 
  const cancel_confirm_popup_options = {
    placement: 'center',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
  };
  cancel_confirm_modal.value = new Modal(cancel_confirm_popup, cancel_confirm_popup_options);

  // set cancel order success popup
  const cancel_success_popup = document.getElementById('cancel-order-success-popup');

  // options
  const cancel_success_popup_options = {
    placement: 'center',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
  };
  cancel_success_modal.value = new Modal(cancel_success_popup, cancel_success_popup_options);
})

async function tab_navigation(tab) {
  orders.value = []
  items_loader.value = true
  active_tab.value = tab
  orders.value = await useOrder().getAllOrders(tab)
  items_loader.value = false
}

function setCancelId(cancel_id) {
  cancel_order_id.value = cancel_id
  cancel_confirm_modal.value.show()
}

async function cancelAction() {
  cancel_confirm_modal.value.hide()
  //Action here
  const cancel_response = await useOrder().cancelOrder(cancel_order_id.value)
  if (cancel_response == true) {//success
    cancel_success_modal.value.show()
    items_loader.value = true
    orders.value = await useOrder().getAllOrders(active_tab.value)
    orders_div_key.value += 3
    const cancel_order_data = await useOrder().getOrder(cancel_order_id.value) 
    if (typeof dataLayer !== "undefined") {//for google analytics
      dataLayer.push({
        'event': 'refund',
        'eventCat': 'eCommerce',
        'eventLbl': cancel_order_id.value, // Transaction ID.
        'eventVal': Number(cancel_order_data.total), // Total value.
        'ecommerce': {
          'currencyCode': 'SAR',
          'refund': {
            'actionField': { 'id': cancel_order_id.value }, // Transaction ID.
          }
        }
      });
    }
    items_loader.value = false
  } else {
    alert("Server Error!..Please Try Again Later.")
  }
}

</script>