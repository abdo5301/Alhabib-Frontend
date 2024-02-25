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
    <div class="w-full flex flex-col gap-[25px]">
      <!-- Item -->
      <AccountOrderItem item_id="12345" item_status="pending" />
      <AccountOrderItem item_id="12345" item_status="cancel" />
      <AccountOrderItem item_id="12345" item_status="complete" />
      <AccountOrderItem item_id="12345" item_status="shipping" />
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const { setActiveSection } = useAccount()
const active_tab = ref('all')
onMounted(() => {
  initFlowbite()
  setActiveSection('orders')
})
function tab_navigation(tab) {
  active_tab.value = tab
  console.log(tab)
}

</script>