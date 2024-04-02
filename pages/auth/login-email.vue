<template>
  <div>
    <Title>{{ $t('login_title') }} | {{ website_name }}</Title>
    <Card :card_title="$t('login_title')">

      <div class="mb-6">
        <div class="mb-2 font-sans-serif text-base font-bold leading-6 text-center text-gray-500">{{
          $t('login_card_title') }}</div>
        <div class="font-sans-serif text-base font-normal leading-6 text-center text-gray-500">{{
          $t('login_card_description') }}</div>
      </div>

      <form class="space-y-6 pt-14" action="#" @submit.prevent="login">
        <div class="relative border rounded-md box-border border-gray-300 space-y-6 pt-2 pb-7 pr-4 pl-6">

          <NuxtLink :to="localePath('/auth/login-phone')"
            class="absolute bg-white flex px-4 py-[7px] top-0 rtl:right-0 ltr:left-0 transform -translate-x-0 -translate-y-10">
            <span class="text-gray-500 text-base leading-5 font-semibold">{{ $t('label_phone') }}</span>
          </NuxtLink>
          <div
            class="absolute bg-white flex px-4 ltr:px-9 py-[9px] top-0 left-1/2 transform rtl:sm:-translate-x-[58px] ltr:-translate-x-[75px] -translate-y-[63px] -translate-x-[60%] border rounded-t-md border-gray-300 border-b-white ">
            <span class="text-gray-700 text-base leading-5 font-semibold">{{ $t('label_email') }}</span>
          </div>

          <Alert class="h-[29px] flex items-center" color="red" v-if="login_error" :alert_icon="true">
            <span v-if="login_error == 'validation_login'">
              {{ $t('validation_login_email_1') }}
              <NuxtLink :to="localePath('/auth/register')" class="font-bold inline-flex items-center gap-1">
                {{ $t('validation_login_email_2') }}
                <svg class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13"
                  fill="none">
                  <g clip-path="url(#clip0_1_3236)">
                    <path d="M5.814 11.2913L1.74414 7.49967M1.74414 7.49967L5.814 3.70801M1.74414 7.49967L12.2095 7.49967"
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
          <Input v-model="email" :label_name="$t('label_email')" label_for="email" input_id="input-email"
            input_name="email" input_type="email" input_dir="ltr" input_placeholder="e.g.you@gmail.com"
            :error_text="email_error" />
          <Input v-model="password" :label_name="$t('label_password')" label_for="password" input_id="input-password"
            input_name="password" input_type="password" :input_password="true" :error_text="password_error" />

          <div class="flex items-center justify-between mt-1">
            <div class="flex items-center ">
              <input v-model="remember" id="remember-me" name="remember-me" type="checkbox" checked="checked"
                class="h-4 w-4 rounded border-gray-900 text-gray-900 focus:ring-transparent" />
              <label for="remember-me"
                class="ltr:ml-3 rtl:mr-2 block font-semibold text-sm leading-6 text-gray-900 cursor-pointer">{{
                  $t('label_remember') }}</label>
            </div>
            <div class="text-sm">
              <NuxtLink :to="localePath('/auth/forgot-password')"
                class="font-bold text-xs text-gray-900 hover:text-gray-600">{{ $t('forget_password_link') }}</NuxtLink>
            </div>
          </div>
        </div>
        <Button type="submit" color="black" class="flex w-full justify-center" :outline="false" :disabled="!unDisabled">{{
          $t('login_title') }}</Button>

        <div class="flex items-center mt-1">
          <div class="text-xs text-gray-900">
            <span>{{ $t('register_link_1') }}</span>&nbsp;
            <NuxtLink :to="localePath('/auth/register')" class="font-bold  hover:text-gray-600 inline-block">
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
const email = ref('');
const password = ref('');
const remember = ref(true);
const redirect_page = ref('')
onMounted(() => {
  redirect_page.value = !!localStorage.getItem('login_redirect') ? localStorage.getItem('login_redirect') : localePath('/account')
})

const isLoading = ref(false);
const login_error = ref('')
const email_error = ref('')
const password_error = ref('')

const unDisabled = computed(() => {
  return email.value.length > 0 && password.value.length > 0;
})

async function login() {
  login_error.value = ''
  email_error.value = ''
  password_error.value = ''
  try {
    const auth_token = await useNuxtApp().$apiFetch('/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })
    if (auth_token.data && auth_token.data.access_token) {
      useAuth().setUser(auth_token.data.access_token)
      window.location.pathname = redirect_page.value
    } else {
      login_error.value = 'Token not found..Please try again'
    }
  } catch (error) {
    console.log(error.data)
    if (error.data && error.data.message) {
      if (error.data.message === "Server Error") {
        login_error.value = 'validation_login'
        email_error.value = ' '
      } else if (error.data.message === "Too Many Attempts.") {
        login_error.value = t('validation_login_to_many')
      } else if (error.data.message === "Email or password are wrong") {
        login_error.value = t('validation_error_email')
        email_error.value = ' '
        password_error.value = ' '
      } else {
        login_error.value = error.data.message
      }
    }

  }
}

</script>