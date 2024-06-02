<template>
  <div>
    <Title>{{ $t('login_title') }} | {{ website_name }}</Title>
    <Card :card_title="$t('login_title')">

      <div class="mb-6">
        <div class="mb-2 font-sans-serif text-base font-bold leading-6 text-center text-gray-500">{{
          $t('login_card_title') }}</div>
        <div class="font-sans-serif lg:text-base text-sm font-normal leading-6 text-center text-gray-500">{{
          $t('login_card_description') }}</div>
      </div>

      <form class="space-y-6 pt-14" action="#" @submit.prevent="login">
        <div
          class="relative border rounded-b-md rtl:rounded-l-md ltr:rounded-r-md border-gray-300 space-y-6 pt-2 pb-7 rtl:pr-4 rtl:pl-6 ltr:pl-4 ltr:pr-6">

          <div
            class="absolute bg-white flex px-7 py-[9px] top-0 rtl:right-[-1px] ltr:left-[-0.5px]  transform -translate-x-0 -translate-y-10  border rounded-t-md border-gray-300 border-b-white">
            <span class="text-gray-700 lg:text-base text-sm leading-5 lg:leading-5 font-semibold">{{ $t('label_phone')
              }}</span>
          </div>
          <NuxtLink :to="localePath('/login-email')"
            class="absolute bg-white flex px-4 py-[7px] top-0 left-[45%] transform sm:-translate-x-[58px] ltr:lg:-translate-x-[30px] ltr:-translate-x-[15px] -translate-y-[63px] -translate-x-[60%]">
            <span class="text-gray-500 lg:text-base text-sm leading-5 lg:leading-5 font-semibold">{{ $t('label_email')
              }}</span>
          </NuxtLink>

          <Alert class="h-[29px] flex items-center" color="red" v-if="login_error" :alert_icon="true">
            <span v-if="login_error == 'validation_login'">
              {{ $t('validation_login_phone_1') }}
              <NuxtLink :to="localePath('/register')" class="font-bold inline-flex items-center gap-1">
                {{ $t('validation_login_phone_2') }}
                <svg class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" width="14" height="13"
                  viewBox="0 0 14 13" fill="none">
                  <g clip-path="url(#clip0_1_3236)">
                    <path
                      d="M5.814 11.2913L1.74414 7.49967M1.74414 7.49967L5.814 3.70801M1.74414 7.49967L12.2095 7.49967"
                      stroke="#B91C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_3236">
                      <rect width="13.9538" height="13" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </NuxtLink>
            </span>
            <span v-else>{{ login_error }}</span>
          </Alert>

          <Input v-model="phone" :label_name="$t('label_phone')" label_for="phone" input_id="input-phone"
            input_name="phone" input_type="text" input_dir="ltr" :input_phone_country="true"
            input_placeholder="534398859" @phone-country="getPhoneCountry" :error_text="phone_error"
            input_aria_describedby="input-phone-error" />

          <div class="flex items-center justify-between mt-1">
            <div class="flex items-center ">
              <input v-model="remember" id="remember-me" name="remember-me" type="checkbox" checked="checked"
                class="h-4 w-4 rounded border-gray-900 text-gray-900 focus:ring-transparent" />
              <label for="remember-me"
                class="ltr:ml-3 rtl:mr-2 block font-semibold text-sm leading-6 text-gray-900 cursor-pointer">{{
                  $t('label_remember') }}</label>
            </div>
          </div>
        </div>
        <Button type="submit" color="black" class="flex w-full justify-center" :outline="false"
          :disabled="!unDisabled">{{
            $t('login_title') }}</Button>

        <div class="flex items-center mt-1">
          <div class="text-xs text-gray-900">
            <span>{{ $t('register_link_1') }}</span>&nbsp;
            <NuxtLink :to="localePath('/register')" class="font-bold  hover:text-gray-600 inline-block">
              {{ $t('register_link_2') }}
              <ArrowRightIcon v-if="$lang.dir == 'ltr'" class="h-4 w-4 text-gray-900 inline-block" />
              <ArrowLeftIcon v-else class="h-4 w-4 text-gray-900 inline-block" />
            </NuxtLink>
          </div>
        </div>

      </form>

    </Card>
  </div>
</template>

<script setup>
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/20/solid'
definePageMeta({ layout: 'blank', middleware: ['guest'] })

const website_name = useState('website_name')
const { $lang } = useNuxtApp()
const localePath = useLocalePath()
const { t } = useI18n()
const phone = ref('');
const remember = ref(true);
const phone_country = ref('+966')
onMounted(() => {
  if (!!localStorage.getItem('otp_phone') && localStorage.getItem('otp_phone') !== null) {
    phone.value = localStorage.getItem('otp_phone')
    phone.value = phone.value.replace(/\D/g, '').slice(-9)
  }
})
const isLoading = ref(false);
const login_error = ref('')
const phone_error = ref('')

const unDisabled = computed(() => {
  return phone.value.length > 0;
})

function getPhoneCountry(country_key) {
  phone_country.value = country_key
}

async function login() {
  login_error.value = ''
  phone_error.value = ''
  try {
    await useNuxtApp().$apiFetch('/login', {
      method: 'POST',
      body: {
        mobile: phone_country.value + phone.value
      }
    })
    useAuth().setUserOTP(phone_country.value + phone.value, localePath('/login'))
    window.location.pathname = localePath('/phone-confirm');
  } catch (error) {
    console.log(error.data.message)
    if (error.data.message === "validation.phone") {
      phone_error.value = t('validation_error_phone')
      triggerPhoneLoginDataLayer('فشل تسجيل الدخول: رقم الهاتف غير صحيح')
    } else if (error.data.message === "The customer was not found") {
      login_error.value = 'validation_login'
      triggerPhoneLoginDataLayer('فشل تسجيل الدخول: رقم الهاتف غير مسجل')
    } else {
      login_error.value = error.data.message
    }

  }
}

function triggerPhoneLoginDataLayer(message) {//google analytics
  if (typeof dataLayer !== 'undefined') {
    dataLayer.push({
      'event': 'login',
      'eventCat': 'User Properties',
      'method ': 'Mobile Number',
      'status': message ??= '',
    })
  }
}

</script>
