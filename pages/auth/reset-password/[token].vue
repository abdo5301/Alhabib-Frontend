<template>
  <Title>{{ $t('reset_password_title') }} | {{ website_name }}</Title>
  <div v-if="form_success">
    <Card :card_title="$t('reset_password_success_title')">

      <div class="mt-10 mb-9 px-2">
        <div class="font-sans-serif text-base font-normal leading-6 text-justify text-gray-700">
          {{ $t('reset_password_welcome') }}
          <br><br>
          {{ $t('reset_password_success') }}
        </div>
      </div>
      <Button type="button" @click.prevent="navigateTo(localePath('/'))" color="black"
        class="flex w-full justify-center" :outline="false">{{ $t('reset_password_redirect') }}</Button>
    </Card>
  </div>
  <div v-else>
    <Card :card_title="$t('reset_password_title')">
      <form class="space-y-6 py-4" action="#" @submit.prevent="resetPasswordSubmit">
        <Alert v-if="form_error" color="red" :alert_icon="true" class="my-5">{{ form_error }}</Alert>
        <Input v-model="email" :label_name="$t('label_email')" label_for="email" input_id="input-email"
          input_name="email" input_type="email" input_dir="ltr" input_placeholder="e.g.you@gmail.com"
          :error_text="email_error" input_aria_describedby="input-email-error" />
        <Input v-model="password" :label_name="$t('label_new_password')" :label_notes="$t('label_reset_password_notes')"
          label_for="password" input_id="input-password" input_name="password" input_type="password"
          :input_password="true" :error_text="password_error" input_aria_describedby="input-password-error" />
        <Input v-model="password_confirm" :label_name="$t('label_password_confirm')" label_for="password_confirm"
          input_id="input-password_confirm" input_name="password_confirm" input_type="password"
          :input_password="true" />
        <Button type="submit" color="black" class="flex w-full justify-center" :outline="false"
          :disabled="!unDisabled || isLoading">{{ $t('reset_password_title') }}</Button>
      </form>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blank' })
const website_name = useState('website_name');
const route = useRoute();
const localePath = useLocalePath()
const { t } = useI18n()
const isLoading = ref(false)
const redirect_page = ref('')
const email = ref('')
const password = ref('')
const password_confirm = ref('')

const token = ref('')
const form_success = ref(false)
const form_error = ref('')
const email_error = ref('')
const password_error = ref('')

if (!route.params.token) {
  throw createError({
    statusCode: 404,
    statusMessage: 'page_not_found',
    fatal: true
  })
} else {
  token.value = route.params.token
}

onMounted(() => {
  redirect_page.value = !!localStorage.getItem('login_redirect') ? localStorage.getItem('login_redirect') : localePath('/account')
})

const unDisabled = computed(() => {
  return email.value.length > 0 && password.value.length > 0 && password_confirm.value.length > 0
})

async function resetPasswordSubmit() {
  isLoading.value = true
  form_success.value = false
  form_error.value = ''
  email_error.value = ''
  password_error.value = ''

  //Password Confirm Check
  if (password.value !== password_confirm.value) {
    password_error.value = t('validation_error_password_confirmation')
    isLoading.value = false
    return;
  }
  var formData = {
    token: token.value,
    email: email.value,
    password: password.value,
  }
  const submit_data = await useAuth().resetPassword(formData)
  if (submit_data.status && submit_data.message && submit_data.message == 'success') {//Success
    form_success.value = true
    setTimeout(() => {
      window.location.pathname = redirect_page.value
    }, 5000)
  } else if (submit_data.errors) {//Validation Errors
    for (const error_key in submit_data.errors) {
      const error_value = submit_data.errors[error_key]
      switch (error_key) {
        case 'email':
          if (error_value == "The email field must be a valid email address.") {
            email_error.value = t('validation_error_email_not_valid')
          } else {
            email_error.value = error_value
          }
          break;
        case 'password':
          if (error_value == "The password field is required.") {
            password_error.value = t('validation_required_password')
          } else if (error_value == "The password field must be at least 8 characters.") {
            password_error.value = t('validation_error_password_8')
          } else {
            password_error.value = error_value
          }
          break;
        default:
          break;
      }
    }
  } else {//Another Errors
    form_error.value = submit_data.message ? submit_data.message : 'Server Error Please Try Again Later !'
  }
  isLoading.value = false
}
</script>