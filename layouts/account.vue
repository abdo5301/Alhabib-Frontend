<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700&display=swap');

input[type='password'] {
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
}
</style>

<template>
  <div class="bg-gray-50 flex flex-col h-screen text-gray-900">
    <Title>{{ title }}</Title>
    <NuxtLoadingIndicator color="#cccccc" :height="4" />
    <DefaultHeader></DefaultHeader>
    <div class="flex-grow">
      <div class="lg:h-[165px] h-[65px]"></div>
      <div class="w-full flex justify-center">
        <div
          class="lg:my-[55px] my-5 flex flex-col lg:flex-row lg:gap-[100px] justify-start h-auto w-full max-w-[1260px]">
          <AccountSidebar :customer="customerData" :key="'AccountSideKey-' + sideBarKey" />
          <!-- Page Content -->
          <slot />
        </div>
      </div>

    </div>
    <DefaultFooter></DefaultFooter>
  </div>
</template>


<script setup>
const { $lang } = useNuxtApp()
const route = useRoute()
const { t } = useI18n()
const title = useState('website_name', () => t('company_name'));
const { activeSection, setActiveSection, sideBarKey } = useAccount()
const { customerData, setCustomerData, getCustomer } = useCustomer()
const customer_data = ref([])
onMounted(async () => {
  customer_data.value = await getCustomer()
  if (customer_data.value && customer_data.value.id) {
    setCustomerData(customer_data.value)
  }
})
useHead({
  htmlAttrs: {
    lang: $lang.code,
    dir: $lang.dir,
    class: 'h-full bg-gray-50'
  },
  bodyAttrs: {
    class: 'h-full',
  }
})


</script>

