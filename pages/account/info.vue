<template>
  <Title>{{ $t('text_personal_info') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :current="$t('text_personal_info')" />
    <AccountPageTitle>{{ $t('text_personal_info') }}</AccountPageTitle>
    <AccountFormAlert v-if="form_success" color="green" :alert_icon="true">{{ form_success }}</AccountFormAlert>
    <AccountFormAlert v-if="form_error" color="red" :alert_icon="true">{{ form_error }}</AccountFormAlert>
    <div class="w-full flex flex-col gap-[25px] bg-white py-5 px-5 lg:py-[20px] lg:px-[30px] rounded-lg shadow">
      <!-- Form -->
      <ClientOnly>
        <template #fallback>
          <div class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
            <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
          </div>
        </template>
        <form @submit.prevent="save_edit_data" class="w-full flex flex-col justify-start gap-10 lg:gap-5">
          <!-- Input Name -->
          <div class="flex flex-col lg:flex-row justify-start lg:items-center">
            <label for="input-full-name" class="lg:w-[164px] text-gray-700 text-sm lg:text-lg font-semibold leading-5">{{
              $t('label_full_name') }}</label>
            <Input input_style="h-[38px] lg:w-[320px]" error_text_style="lg:max-w-[320px] text-xs font-semibold" :model-value="customerName" v-model="full_name"
              input_id="input-full-name" input_name="full_name" :error_text="name_error"
              input_aria_describedby="input-full-name-error" />
          </div>
          <!-- Divider -->
          <div class="hidden lg:flex items-center justify-center w-full">
            <div class="border-b border-b-[#E5E7EB] w-full"></div>
          </div>
          <!-- Input Email -->
          <div class="flex flex-col lg:flex-row justify-start lg:items-center">
            <label for="input-email" class="lg:w-[164px] text-gray-700 text-sm lg:text-lg font-semibold leading-5">{{
              $t('label_email') }}</label>
            <Input input_style="h-[38px] lg:w-[320px]" error_text_style="lg:max-w-[320px] text-xs font-semibold" v-model="email" input_id="input-email" input_name="email"
              input_type="email" input_dir="ltr" input_placeholder="e.g.you@gmail.com" :error_text="email_error"
              input_aria_describedby="input-email-error" />
          </div>
          <!-- Divider -->
          <div class="hidden lg:flex items-center justify-center w-full">
            <div class="border-b border-b-[#E5E7EB] w-full"></div>
          </div>
          <!-- Input Mobile -->
          <div class="flex flex-col lg:flex-row justify-start lg:items-center">
            <label for="input-phone" class="lg:w-[164px] text-gray-700 text-sm lg:text-lg font-semibold leading-5">{{
              $t('label_phone') }}</label>
            <Input input_style="h-[38px] lg:w-[320px]" error_text_style="lg:max-w-[320px] text-xs font-semibold" v-model="phone" input_id="input-phone" input_name="phone"
              input_type="text" input_dir="ltr" :input_phone_country="true" input_placeholder="534398859"
              @phone-country="getPhoneCountry" :error_text="phone_error" input_aria_describedby="input-phone-error" />
          </div>
          <!-- Submit -->
          <div class="flex justify-start lg:ps-[164px] lg:mt-[30px] lg:mb-[17px]">
            <button type="submit" id="account-info-form-submit" :disabled="!unDisabled"
              class="w-full lg:w-[320px] h-[50px] lg:h-[38px] bg-black rounded-md shadow-sm flex items-center justify-center text-white text-base font-semibold lg:font-bold leading-6 disabled:opacity-40 disabled:cursor-not-allowed">
              {{ $t('save_edits_btn') }}
            </button>
          </div>
        </form>
      </ClientOnly>

    </div>
  </div>
  <!-- OTP Modal -->
  <div id="account-otp-modal" tabindex="-1" aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div
      class="relative p-6 w-full max-w-[384px] max-h-full flex flex-col gap-[19px] items-center justify-center bg-white rounded-lg shadow-xl">
      <!-- title -->
      <h3 class="text-gray-500 font-semibold text-sm leading-5">
        {{ $t('account_phone_otp_title') }}
      </h3>
      <span dir="ltr" class="text-gray-900 text-lg font-bold leading-9">
        {{ phone_country + phone }}
      </span>
      <!-- Details -->
      <div class="text-gray-900 text-sm font-normal leading-6 flex justify-center items-center gap-1">
        <span>{{ $t('phone_confirm_edit_phone') }}</span>
        <span @click="edit_otp_phone()" class="underline underline-offset-2 cursor-pointer">
          {{ $t('phone_confirm_edit_phone_link') }}
        </span>
      </div>
      <form class="flex flex-col gap-[19px] items-center justify-center" @submit.prevent="otp_check">
        <Alert color="red" v-if="otp_error" :alert_icon="true">{{ otp_error }}</Alert>
        <Input :error_text="otp_error" :input_phone_otp="true" v-model="code" :label_name="$t('label_otp')"
          @resend-otp="new_otp" label_for="code" input_id="input-code" input_name="code" input_dir="ltr"
          label_style="text-sm font-semibold leading-5 text-gray-700" />
        <Button type="submit" color="black" class="flex w-full justify-center" :outline="false" :disabled="!unDisabled">
          {{ $t('account_phone_otp_confirm_btn') }}
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite, Modal } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const { setActiveSection } = useAccount()
const { t } = useI18n()
const { customerName, customerEmail, customerMobile, setCustomerData, getCustomer } = useCustomer()

const full_name = ref('');
const email = ref('');
const phone = ref('')
const code = ref('')
const phone_country = ref('+966')

const name_error = ref('')
const email_error = ref('')
const phone_error = ref('')
const otp_error = ref('')
const form_error = ref('')
const form_success = ref('')

const otp_modal = ref('')
const customer_data = ref([])
onMounted(async () => {
  initFlowbite()
  setActiveSection('edit_personal_info')
  //get customer data
  customer_data.value = await getCustomer()
  if (customer_data.value && customer_data.value.id) {
    setCustomerData(customer_data.value)
  }
  //set default values
  full_name.value = customerName.value
  email.value = customerEmail.value
  if (customerMobile.value && customerMobile.value !== null) {
    phone.value = customerMobile.value.replace(/\D/g, '').slice(-9)
  }

  // otp modal
  const $otp_modal = document.getElementById('account-otp-modal');
  const otp_modal_options = {
    placement: 'center',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900/50 fixed inset-0 z-40',
    closable: true,

  };
  otp_modal.value = new Modal($otp_modal, otp_modal_options);
})


const unDisabled = computed(() => {
  return full_name.value.length > 0 && email.value.length > 0 && phone.value.length > 0
})

function getPhoneCountry(country_key) {
  phone_country.value = country_key
}

function edit_otp_phone() {
  otp_modal.value.hide()
  document.getElementById('input-phone').focus()
}

function new_otp() {
  document.getElementById('account-info-form-submit').click()
  alert('You have received new otp')
}

async function otp_check() {
  otp_error.value = ''
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
      otp_error.value = 'Token not found..Please try again!'
    }

  } catch (error) {
    console.log(error.data)
    error.data.errors ??= {} 
    if (error.data.errors.code) {
      otp_error.value = t('phone_confirm_error')
    } else if (error.data.errors.mobile) {
      otp_error.value = t('validation_error_phone')
    } else {
      otp_error.value = error.data.message
    }
  }
}

async function save_edit_data() {
  form_success.value = ''
  form_error.value = ''
  name_error.value = ''
  email_error.value = ''
  phone_error.value = ''

  var edit_data = {
    name: full_name.value,
    mobile: phone_country.value + phone.value,
    email: email.value,
  }
  const edit = await useCustomer().editCustomer(edit_data)
  //success
  if (edit.status == true && edit.data && edit.data.id) {
    form_success.value = t('account_info_edit_success')
    setCustomerData(edit.data)
  }
  //errors
  if (!edit.status && edit.message) {
    if (edit.errors) {//Inputs validations
      var errors_array = edit.errors
      for (const error_key in errors_array) {
        const error_value = errors_array[error_key]
        switch (error_key) {
          case 'name':
            if (error_value == "The name field is required.") {
              name_error.value = t('validation_required_name')
            } else {
              name_error.value = error_value
            }
            break;
          case 'mobile':
            if (error_value == "The mobile has already been taken.") {
              phone_error.value = t('register_error_phone_exist')
            } else if (error_value == "validation.phone") {
              phone_error.value = t('validation_error_phone')
            } else {
              phone_error.value = error_value
            }
            break;
          case 'email':
            if (error_value == "The email has already been taken.") {
              email_error.value = t('register_error_email_exist')
            } else if (error_value == "The email field must be a valid email address.") {
              email_error.value = t('validation_error_email_not_valid')
            } else {
              email_error.value = error_value
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