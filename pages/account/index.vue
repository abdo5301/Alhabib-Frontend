<template>
  <Title>{{ $t('account_title') }} | {{ website_name }}</Title>
  <div class="w-full hidden lg:flex flex-col gap-5 lg:gap-[30px]">
    <AccountPageTitle>{{ $t('account_title') }}</AccountPageTitle>
    <div class="w-full flex flex-col gap-[35px] bg-white py-5 px-5 lg:py-[40px] lg:px-[30px] rounded-lg shadow">
      <!-- Info -->
      <ClientOnly>
        <template #fallback>
          <div class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
            <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
          </div>
        </template>
        <AccountDashboardBlock :block_type="'info'" :block_title="$t('text_personal_info')"
          :block_edit_link="localePath('/account/info')">
          <div class="w-full flex flex-1 flex-col justify-start gap-y-5">
            <AccountDashboardBlockItem v-if="customerName" :item_title="$t('label_full_name')"
              :item_content="customerName" />
            <AccountDashboardBlockItem v-if="customerEmail" :item_title="$t('label_email')"
              :item_content="customerEmail" />
          </div>
          <div class="flex flex-col justify-start gap-y-5">
            <AccountDashboardBlockItem v-if="customerMobile" :is_phone="true" :item_title="$t('label_phone')"
              :item_content="customerMobile" />
          </div>
        </AccountDashboardBlock>
        <!-- Address -->
        <AccountDashboardBlock :block_type="'address'" :block_title="$t('account_default_address_title')"
          :block_edit_link="localePath('/account')">
          <div class="w-full flex flex-1 flex-col justify-start gap-y-5">
            <AccountDashboardBlockItem :item_title="$t('label_country')" :item_content="address_data.country" />
            <AccountDashboardBlockItem :item_title="$t('label_city')" :item_content="address_data.city" />
          </div>
          <div class="flex flex-col justify-start gap-y-5">
            <AccountDashboardBlockItem :item_title="$t('label_region')" :item_content="address_data.region" />
            <AccountDashboardBlockItem :item_title="$t('label_address')" :item_content="address_data.street" />
          </div>
        </AccountDashboardBlock>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const { setActiveSection } = useAccount()
const { customerName, customerEmail, customerMobile } = useCustomer()
const address_data = ref([])
onMounted(async () => {
  initFlowbite()
  setActiveSection('account')
  try {
    address_data.value = await useAddress().defaultAddress()
  } catch (error) {
    console.log(error.data)
  }
})
</script>