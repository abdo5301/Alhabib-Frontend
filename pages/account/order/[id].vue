<template>
  <Title>{{ $t('orders_title') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :current="$t('orders_title')" />
    <AccountPageTitle>{{ $t('orders_title') }}</AccountPageTitle>
    <div class="w-full flex flex-col gap-[25px] bg-white py-5 px-5 lg:px-[30px] rounded-lg shadow">
      <!-- Order Data -->
      order data here
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const { setActiveSection } = useAccount()
onMounted(() => {
  initFlowbite()
  setActiveSection('orders')
})

</script>