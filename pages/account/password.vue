<template>
  <Title>{{ $t('edit_password_title') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :current="$t('edit_password_title')" />
    <AccountPageTitle>{{ $t('edit_password_title') }}</AccountPageTitle>
    <AccountFormAlert v-if="form_success" color="green" :alert_icon="true">{{ form_success }}</AccountFormAlert>
    <AccountFormAlert v-if="form_error" color="red" :alert_icon="true">{{ form_error }}</AccountFormAlert>
    <div class="w-full flex flex-col gap-[25px] bg-white py-5 px-5 lg:py-[20px] lg:px-[30px] rounded-lg shadow">
      <form @submit.prevent="save_edit_data" class="w-full flex flex-col justify-start gap-10 lg:gap-5">
        <!-- Input Password -->
        <div class="flex flex-col lg:flex-row justify-start lg:items-center">
          <label for="input-full-name" class="lg:w-[164px] text-gray-700 text-sm lg:text-lg font-semibold leading-5">{{
            $t('label_password') }}</label>
          <Input input_style="h-[38px] lg:w-[320px]"  error_text_style="lg:max-w-[320px] text-xs font-semibold" v-model="password" input_id="input-password" input_name="password"
            input_type="password" :input_password="true" :error_text="password_error"
            input_aria_describedby="input-password-error" />
        </div>
        <!-- Divider -->
        <div class="hidden lg:flex items-center justify-center w-full">
          <div class="border-b border-b-[#E5E7EB] w-full"></div>
        </div>
        <!-- Input Confirm -->
        <div class="flex flex-col lg:flex-row justify-start lg:items-center">
          <label for="input-email" class="lg:w-[164px] text-gray-700 text-sm lg:text-lg font-semibold leading-5">{{
            $t('label_password_confirm') }}</label>
          <Input input_style="h-[38px] lg:w-[320px]" error_text_style="lg:max-w-[320px] text-xs font-semibold" v-model="confirm" input_id="input-account-password-confirm"
            input_name="password_confirm" input_type="password" :input_password="true" :error_text="confirm_error"
            input_aria_describedby="input-password-confirm-error" />
        </div>
        <!-- Submit -->
        <div class="flex justify-start lg:ps-[164px] lg:mt-[30px] lg:mb-[17px]">
          <button type="submit" :disabled="!unDisabled"
            class="w-full lg:w-[320px] h-[50px] lg:h-[38px] bg-black rounded-md shadow-sm flex items-center justify-center text-white text-base font-semibold lg:font-bold leading-6 disabled:opacity-40 disabled:cursor-not-allowed">
            {{ $t('save_edits_btn') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const { setActiveSection } = useAccount()
const { t } = useI18n()

const password = ref('');
const confirm = ref('');

const password_error = ref('')
const confirm_error = ref('')

const form_success = ref('')
const form_error = ref('')

onMounted(() => {
  initFlowbite()
  setActiveSection('edit_password')
})

const unDisabled = computed(() => {
  return password.value.length > 0 && confirm.value.length > 0  
})

async function save_edit_data() {
  form_success.value = ''
  form_error.value = ''
  password_error.value = ''
  confirm_error.value = ''

  var edit_data = {
    password: password.value,
    confirm_password: confirm.value,
  }
  const edit = await useCustomer().editPassword(edit_data)
  //success
  if (edit.status == true && edit.data && edit.data.id) {
    form_success.value = t('account_password_edit_success')
  }
  //errors
  if (!edit.status && edit.message) {
    if (edit.errors) {//Inputs validations
      var errors_array = edit.errors
      for (const error_key in errors_array) {
        const error_value = errors_array[error_key]
        switch (error_key) {
          case 'password':
            if (error_value == "The password field is required.") {
              password_error.value = t('validation_required_password')
            } else if (error_value == "The password field must be at least 6 characters.") {
              password_error.value = t('validation_error_password')
            } else if (error_value == "The password field confirmation does not match.") {
              confirm_error.value = t('validation_error_password_confirmation')
            } else {
              password_error.value = error_value
            }
            break;
          default:
            break;
        }
      }
    } else {//Server errors
      if (edit.message === "Server Error") {
        form_error.value = "Server Error"
      } else if (edit.message === "Too Many Attempts.") {
        form_error.value = t('validation_login_to_many')
      } else if (edit.message === "Unauthenticated.") {
        unAuthenticated()
      } else {
        form_error.value = edit.message
      }
    }
  }
}
</script>