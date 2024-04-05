<template>
  <Title>{{ $t('subscriptions_title') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :current="$t('subscriptions_title')" />
    <AccountPageTitle>{{ $t('subscriptions_title') }}</AccountPageTitle>
    <div class="w-full flex flex-col gap-[25px] bg-white py-5 px-5 lg:py-[40px] lg:px-[30px] rounded-lg shadow">
      <AccountFormAlert v-if="sub_success" :dismiss="true" color="green" :alert_icon="true" class="-mt-4 mb-3">
        {{ sub_success }}
      </AccountFormAlert>
      <AccountFormAlert v-if="sub_error" :dismiss="true" color="red" :alert_icon="true" class="-mt-4 mb-3">
        {{ sub_error }}
      </AccountFormAlert>
      <ClientOnly>
        <!-- Loader -->
        <template #fallback>
          <div class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
            <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
          </div>
        </template>
        <!-- Newsletter -->
        <div class="w-full flex flex-col justify-start gap-5">
          <div class="flex justify-start gap-[15px] items-center">
            <img src="/images/icons/newsletter.png" class="w-9 h-9" alt="newsletter">
            <h4 class="text-gray-600 text-base lg:text-lg font-extrabold leading-5">{{ $t('newsletter_title') }}</h4>
          </div>
          <span class="text-gray-600 font-semibold lg:text-base text-sm leading-8 -mt-3 lg:-mt-1">
            {{ $t('account_newsletter_notes') }}
          </span>
          <InputRadio v-model="newsletter_sub" input_id="input-account-newsletter-subscribe"
            :input_checked="newsletter_sub == 'yes' ? true : false" input_name="account_newsletter_subscribe"
            input_value="yes" @call-back="toggleSub('email', true)">
            {{ $t('text_subscription') }}
          </InputRadio>
          <InputRadio v-model="newsletter_sub" input_id="input-account-newsletter-unsubscribe"
            @call-back="toggleSub('email', false)" input_name="account_newsletter_subscribe" input_value="no"
            :input_checked="newsletter_sub == 'no' ? true : false">
            {{ $t('text_unsubscribe') }}
          </InputRadio>
        </div>
        <!-- Divider -->
        <div class="flex items-center justify-center w-full">
          <div class="border-b border-b-[#E5E7EB] w-full"></div>
        </div>
        <!-- Whatsapp -->
        <div class="w-full flex flex-col justify-start gap-5">
          <div class="flex justify-start gap-[15px] items-center">
            <img src="/images/icons/whatsapp.png" class="w-9 h-9" alt="whatsapp">
            <h4 class="text-gray-600 text-base lg:text-lg font-extrabold leading-5">{{ $t('whatsapp_title') }}</h4>
          </div>
          <span class="text-gray-600 font-semibold lg:text-base text-sm leading-8 -mt-3 lg:-mt-1">
            {{ $t('account_whatsapp_notes') }}
          </span>
          <InputRadio v-model="whatsapp_sub" input_id="input-account-whatsapp-subscribe"
            input_name="account_whatsapp_subscribe" input_value="yes"
            :input_checked="whatsapp_sub == 'yes' ? true : false" @call-back="toggleSub('whatsapp', true)">
            {{ $t('text_subscription') }}
          </InputRadio>
          <InputRadio v-model="whatsapp_sub" input_id="input-account-whatsapp-unsubscribe"
            @call-back="toggleSub('whatsapp', false)" input_name="account_whatsapp_subscribe" input_value="no"
            :input_checked="whatsapp_sub == 'no' ? true : false">
            {{ $t('text_unsubscribe') }}
          </InputRadio>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const { t } = useI18n()
const { setActiveSection } = useAccount()
const { getCustomer, subscribeToggle } = useCustomer()
const newsletter_sub = ref("no")
const whatsapp_sub = ref("no")
const sub_success = ref('')
const sub_error = ref('')
onMounted(async () => {
  initFlowbite()
  setActiveSection('subscribe')
  const customer_data = await getCustomer()
  if (customer_data.email_subscription == true) {
    newsletter_sub.value = 'yes'
  } else {
    newsletter_sub.value = 'no'
  }
  if (customer_data.whatsapp_subscription == true) {
    whatsapp_sub.value = 'yes'
  } else {
    whatsapp_sub.value = 'no'
  }
})

async function toggleSub(sub_type, sub_action) {
  sub_success.value = ''
  sub_error.value = ''
  console.log(sub_type, sub_action)
  var sub_data = {
    type: sub_type,
    subscribe: sub_action,
  }
  const subscribe_response = await subscribeToggle(sub_data)
  if (subscribe_response.status && subscribe_response.status == true) {
    if (sub_action == true) {
      sub_success.value = t('text_subscribe_success')
    } else {
      sub_success.value = t('text_unsubscribe_success')
    }
  } else {
    sub_error.value = 'Server Error..Please Try Again Later'
  }
}

</script>