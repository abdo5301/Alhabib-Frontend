<template>
  <Title>{{ $t('subscriptions_title') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :current="$t('subscriptions_title')"/>
    <AccountPageTitle>{{ $t('subscriptions_title') }}</AccountPageTitle>
    <div class="w-full flex flex-col gap-[25px] bg-white py-5 px-5 lg:py-[40px] lg:px-[30px] rounded-lg shadow">
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
          input_name="account_newsletter_subscribe" input_value="yes" @call-back="console.log(newsletter_sub)">
          {{ $t('text_subscription') }}
        </InputRadio>
        <InputRadio v-model="newsletter_sub" input_id="input-account-newsletter-unsubscribe"
          @call-back="console.log(newsletter_sub)" input_name="account_newsletter_subscribe" input_value="no"
          :input_checked="true">
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
          input_name="account_whatsapp_subscribe" input_value="yes" :input_checked="true"
          @call-back="console.log(whatsapp_sub)">
          {{ $t('text_subscription') }}
        </InputRadio>
        <InputRadio v-model="whatsapp_sub" input_id="input-account-whatsapp-unsubscribe"
          @call-back="console.log(whatsapp_sub)" input_name="account_whatsapp_subscribe" input_value="no"
          :input_checked="true">
          {{ $t('text_unsubscribe') }}
        </InputRadio>
      </div>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const { setActiveSection } = useAccount()
onMounted(() => {
  initFlowbite()
  setActiveSection('subscribe')
})
const website_name = useState('website_name')
const route = useRoute()
const localePath = useLocalePath()
const newsletter_sub = ref("no")
const whatsapp_sub = ref("no")

</script>