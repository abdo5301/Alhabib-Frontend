<template>
  <div>
    <Title>{{ $t('register_title') }} | {{ website_name }}</Title>
    <Card :card_title="$t('register_title')">

      <div class="mb-10">
        <div class="mb-2 font-sans-serif text-base font-bold leading-6 text-center text-gray-500">{{
          $t('register_card_title') }}</div>
      </div>

      <form class="space-y-6" action="#" @submit.prevent="register">
        <div v-if="register_error == 'email_exist' || register_error == 'phone_exist'"
          class="flex gap-3 rounded-md bg-yellow-50 p-4">
          <div class="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M18.5 10C18.5 14.4183 14.9183 18 10.5 18C6.08172 18 2.5 14.4183 2.5 10C2.5 5.58172 6.08172 2 10.5 2C14.9183 2 18.5 5.58172 18.5 10ZM11.5 6C11.5 6.55228 11.0523 7 10.5 7C9.94772 7 9.5 6.55228 9.5 6C9.5 5.44772 9.94772 5 10.5 5C11.0523 5 11.5 5.44772 11.5 6ZM9.5 9C8.94772 9 8.5 9.44772 8.5 10C8.5 10.5523 8.94772 11 9.5 11V14C9.5 14.5523 9.94772 15 10.5 15H11.5C12.0523 15 12.5 14.5523 12.5 14C12.5 13.4477 12.0523 13 11.5 13V10C11.5 9.44772 11.0523 9 10.5 9H9.5Z"
                fill="#FBBF24" />
            </svg>
          </div>
          <p class="text-sm font-normal text-yellow-700">
            {{ register_error == "email_exist" ? $t('register_error_email_exist') : $t('register_error_phone_exist')
            }}
            <NuxtLink
              :to="register_error == 'email_exist' ? localePath('/auth/login-email') : localePath('/auth/login-phone')"
              class="font-bold inline-flex items-center">
              {{ $t('login_title') }}
            </NuxtLink>
          </p>
        </div>
        <Alert v-if="register_error && register_error != 'email_exist' && register_error != 'phone_exist'" color="red"
          :alert_icon="true">{{ register_error }}</Alert>
        <Input v-model="full_name" :label_name="$t('label_full_name')" label_for="input-full-name"
          input_id="input-full-name" input_name="full_name" :error_text="name_error"
          input_aria_describedby="input-full-name-error" />
        <Input v-model="phone" :label_name="$t('label_phone')" label_for="input-phone" input_id="input-phone"
          input_name="phone" input_type="text" input_dir="ltr" :input_phone_country="true" input_placeholder="534398859"
          @phone-country="getPhoneCountry" :error_text="phone_error" input_aria_describedby="input-phone-error" />
        <Input v-model="email" :label_name="$t('label_email')" label_for="input-email" input_id="input-email"
          input_name="email" input_type="email" input_dir="ltr" input_placeholder="e.g.you@gmail.com"
          :error_text="email_error" input_aria_describedby="input-phone-error" />
        <Input v-model="password" :label_name="$t('label_password')" :label_notes="$t('label_password_notes')"
          label_for="input-password" input_id="input-password" input_name="password" input_type="password"
          :input_password="true" :error_text="password_error" input_aria_describedby="input-password-error" />

        <div class="flex items-center justify-between mt-1">
          <div class="text-sm">
            <NuxtLink :to="localePath('/auth/register')" class="font-bold text-xs text-gray-900 hover:text-gray-600">{{
              $t('privacy_policy_notes') }}</NuxtLink>
          </div>
        </div>
        <div class="flex items-center flex-row-reverse  mt-1">
          <div class="text-xs text-gray-900">
            <span>{{ $t('login_link_1') }}</span>&nbsp;
            <NuxtLink :to="localePath('/auth/login-phone')" class="font-bold  hover:text-gray-600">
              {{ $t('login_link_2') }}
            </NuxtLink>
          </div>
        </div>
        <Button type="submit" color="black" class="flex w-full justify-center" :disabled="!unDisabled">{{
          $t('login_title') }}</Button>
      </form>

    </Card>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blank', middleware: ['guest'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const { t } = useI18n()

const full_name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const phone_country = ref('+966')

const register_error = ref('')
const name_error = ref('')
const email_error = ref('')
const phone_error = ref('')
const password_error = ref('')

const isLoading = ref(false);

const unDisabled = computed(() => {
  return full_name.value.length > 0 && email.value.length > 0 && phone.value.length > 0 && password.value.length > 0;
})

function getPhoneCountry(country_key) {
  phone_country.value = country_key
}

async function register() {
  register_error.value = ''
  name_error.value = ''
  email_error.value = ''
  phone_error.value = ''
  password_error.value = ''
  try {
    await useNuxtApp().$apiFetch('/register', {
      method: 'POST',
      body: {
        name: full_name.value,
        mobile: phone_country.value + phone.value,
        email: email.value,
        password: password.value
      }
    })
    useAuth().setUserOTP(phone_country.value + phone.value, localePath('/auth/login-phone'))
    window.location.pathname = localePath('/auth/phone-confirm');
  } catch (error) {
    console.log(error.data)
    if (error.data && error.data.message) {
      if (error.data.errors) {//Inputs validations
        var errors_array = error.data.errors
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
            case 'mobile_ie164':
              if (error_value == "The mobile ie164 has already been taken.") {
                register_error.value = "phone_exist"
              } else if (error_value == "validation.phone") {
                phone_error.value = t('validation_error_phone')
              } else {
                phone_error.value = error_value
              }
              break;
            case 'email':
              if (error_value == "The email has already been taken.") {
                register_error.value = "email_exist"
              } else if (error_value == "The email field must be a valid email address.") {
                email_error.value = t('validation_error_email_not_valid')
              } else {
                email_error.value = error_value
              }
              break;
            case 'password':
              if (error_value == "The password field is required.") {
                password_error.value = t('validation_required_password')
              } else if (error_value == "The password field must be at least 6 characters.") {
                password_error.value = t('validation_error_password')
              } else {
                password_error.value = error_value
              }
              break;
            default:
              break;
          }
        }
      } else {//Server errors
        if (error.data.message === "Server Error") {
          register_error.value = "Server Error"
        } else if (error.data.message === "Too Many Attempts.") {
          register_error.value = t('validation_login_to_many')
        } else {
          register_error.value = error.data.message
        }
      }
    }
  }
}

</script>