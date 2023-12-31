<template>
  <div>
    <Title>{{ $t('login_title') }} | {{ website_name }}</Title>
    <Card :card_title="$t('login_title')">

      <div class="mb-5 text-center leading-6 font-sans-serif">
        <div class="text-base font-normal  text-gray-500">{{ $t('phone_confirm_title') }}</div>
        <div class="font-bold text-lg pt-5 pb-5 text-gray-900" dir="ltr">{{ phone }}</div>
        <div class="font-normal text-base text-gray-900">
          <span class="px-1">{{ $t('phone_confirm_edit_phone') }}</span>
          <NuxtLink :to="phone_page" class="underline decoration-1">{{ $t('phone_confirm_edit_phone_link') }}</NuxtLink>
        </div>
      </div>

      <form class="space-y-6 pt-2" action="#" @submit.prevent="login">

        <Alert color="red" v-if="validation_error" :alert_icon="true">{{ validation_error }}</Alert>

        <Input :error_text="validation_error" :input_phone_otp="true" v-model="code" :label_name="$t('label_otp')"
          @resend-otp="new_otp" label_for="code" input_id="input-code" input_name="code" input_dir="ltr" />

        <Button type="submit" color="black" class="flex w-full justify-center" :outline="false" :disabled="!unDisabled">{{
          $t('login_title') }}</Button>

      </form>

    </Card>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blank', middleware: ['guest'] })
const website_name = useState('website_name')
const localPath = useLocalePath()
const { t } = useI18n()
const phone = ref('')
const phone_page = ref('')
const redirect_page = ref('')
const code = ref('')
const validation_error = ref('')
onMounted(() => {
  initFlowbite();
  phone_page.value = !!localStorage.getItem('otp_redirect_back') ? localStorage.getItem('otp_redirect_back') : localPath('/')
  redirect_page.value = !!localStorage.getItem('login_redirect') ? localStorage.getItem('login_redirect') : localPath('/account')
  if (!!localStorage.getItem('otp_phone')) {
    phone.value = localStorage.getItem('otp_phone')
  } else {
    window.location.pathname = phone_page.value
  }
})

const unDisabled = computed(() => {
  return code.value.length > 0;
})

async function new_otp() {
  code.value = ''
  validation_error.value = ''
  try {
    await useNuxtApp().$apiFetch('/login', {
      method: 'POST',
      body: {
        mobile: phone.value
      }
    })
  } catch (error) {
    console.log(error.data)
    if (error.data.errors && error.data.errors.mobile) {
      validation_error.value = t('validation_error_phone')
    } else {
      validation_error.value = error.data.message
    }
  }
}

async function login() {
  validation_error.value = ''
  try {
    const auth_token = await useNuxtApp().$apiFetch('/validate-otp', {
      method: 'POST',
      body: {
        mobile: phone.value,
        code: code.value
      }
    })
    if (auth_token.data && auth_token.data.access_token) {
      useAuth().setUser(auth_token.data.access_token)
      window.location.pathname = redirect_page.value
    } else {
      validation_error.value = 'Token not found..Please try again!'
    }

  } catch (error) {
    console.log(error.data)
    if (error.data.errors && error.data.errors.code) {
      validation_error.value = t('phone_confirm_error')
    } else if (error.data.errors && error.data.errors.mobile) {
      validation_error.value = t('validation_error_phone')
    } else {
      validation_error.value = error.data.message
    }
  }
}

</script>