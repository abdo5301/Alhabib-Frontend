<template>
  <Title>{{ $t('address_directory_title') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :pages="breadcrumbs_pages" :current="$t('add_address')" />
    <AccountPageTitle>{{ $t('address_directory_title') }}</AccountPageTitle>
    <div class="w-full flex flex-col lg:gap-[25px] gap-10 bg-white py-5 px-5 lg:py-[35px] lg:px-7 rounded-lg shadow">
      <!-- Address Form -->
      <AccountAddressForm form_type="add"/>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const { setActiveSection } = useAccount()
const { t } = useI18n()
onMounted(async () => {
  initFlowbite()
  setActiveSection('address')
})

const breadcrumbs_pages = [
  {
    name: t('address_directory_title'),
    link: localePath('/account/address')
  }
]

</script>