<template>
  <div>
    <label v-if="label_name" :for="label_for"
      :class="['block text-sm font-semibold font-sans-serif leading-5 text-gray-700', label_style ? label_style : '']">
      {{ label_name }}
      <span v-if="label_notes" class="text-gray-500 text-[13px] font-semibold leading-[17px] tracking-tight">{{
        label_notes }}</span>
    </label>
    <div class="relative flex mt-1 rounded-md shadow-sm">
      <div dir="ltr" v-if="input_phone_country" class="absolute inset-y-0 left-0 flex items-center">
        <PhoneCountrySelect @update-value="getPhoneCountry" />
      </div>
      <input :dir="input_dir" :type="input_password ? passwordFieldType : input_type" :name="input_name" :id="input_id"
        :class="[(input_phone_otp && !otpCountDown ? 'rtl:pl-[95px] ltr:pr-[120px]' : ''),
        (input_phone_otp && otpCountDown ? 'rtl:lg:pl-[202px] ltr:lg:pr-[225px] rtl:ps-[185px]' : ''),
        (error_text ? 'block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6'
          : 'block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300  sm:text-sm sm:leading-6'),
        (input_phone_country ? 'pl-[110px]' : ''), (input_style ? input_style : '')]" :placeholder="input_placeholder"
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :aria-invalid="input_aria_invalid"
        :aria-describedby="input_aria_describedby" ref="input" :autocomplete="input_phone_otp == true ? 'one-time-code' : input_autocomplete ? input_autocomplete : 'on'"/>

      <div v-if="error_text"
        :class="[(input_phone_otp && otpCountDown ? 'rtl:ml-[202px] ltr:mr-[195px]' : ''), (input_phone_otp && !otpCountDown ? 'rtl:ml-[90px] ltr:mr-[90px]' : ''), 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3']">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>

      <div v-if="input_password" id="show-password" @click="switchVisibility()"
        class="absolute cursor-pointer inset-y-0 ltr:right-0 rtl:left-0 flex items-center ltr:pr-3 rtl:pl-3">
        <EyeSlashIcon v-if="passwordFieldType == 'password'" class="h-5 w-5 text-gray-400" aria-hidden="true" />
        <EyeIcon v-else class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>

      <div v-if="input_phone_otp">
        <button ref="resendOtp" v-if="!otpCountDown" @click="CountDown(59)" type="button"
          :class="[('absolute rtl:left-0 ltr:-right-[0.5px] inline-flex items-center gap-x-[6px] rounded-md shadow-sm px-4 h-full lg:text-sm text-xs font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50')]">
          {{ $t('resend_otp') }}
          <ArrowsRightLeftIcon class="-ml-[2px] h-4 w-4 text-gray-900" aria-hidden="true" />
        </button>
        <div v-if="otpCountDown"
          :class="[('absolute rtl:left-0 ltr:right-0 inline-flex items-center gap-x-[6px] rounded-md shadow-sm px-4 h-full lg:text-sm text-xs font-semibold bg-gray-50 text-gray-500 ring-1 ring-inset ring-gray-300')]">
          {{ otpCountDown }}
          <ClockIcon class="-ml-[2px] h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>


    </div>
    <span v-if="input_notes"
      :class="['w-full pt-[10px] flex items-center justify-start text-[#6C6C6C] text-sm lg:text-base font-normal tracking-tight', input_notes_style ? input_notes_style : '']">
      <slot />
    </span>
    <p v-if="error_text && input_aria_describedby" :class="['mt-2 text-sm text-red-600',error_text_style ? error_text_style : '']" :id="input_aria_describedby">{{
      error_text }}</p>
  </div>
</template>

<script setup>
import { ExclamationCircleIcon, ArrowsRightLeftIcon, ClockIcon } from '@heroicons/vue/20/solid'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
const { t } = useI18n()

const emits = defineEmits(['update:modelValue', 'phoneCountry', 'resendOtp']);

const passwordFieldType = ref('password');

const switchVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === "password" ? "text" : "password";
}

const resendOtp = ref(null);
const otpCountDown = ref(false);

onMounted(() => {
  if (props.input_phone_otp) {
    CountDown(59, true)
    //resendOtp.value.click();
  }
})

//otp count down //

var otpInterVal;
const CountDown = (duration, first_interval = false) => {
  resendOtp.value.disabled = true;
  clearInterval(otpInterVal);
  if (!isNaN(duration)) {
    otpInterVal = setInterval(() => {
      otpCountDown.value = t('resend_otp_after') + ' ' + duration + ' ' + t('second');
      if (--duration < 0) {
        otpCountDown.value = false;
        clearInterval(otpInterVal);
      }
    }, 1000);
  }
  if (!first_interval) {
    emits('resendOtp')
  }
}



function getPhoneCountry(country_key) {
  emits('phoneCountry', country_key)
}

const props = defineProps({
  label_name: {
    type: String,
  },
  label_notes: {
    type: String,
  },
  label_for: {
    type: String,
  },
  input_type: {
    type: String,
    default: 'text'
  },
  input_name: {
    type: String,
  },
  input_id: {
    type: String,
  },
  input_id: {
    type: String,
  },
  input_placeholder: {
    type: String,
  },
  modelValue: {
    type: String
  },
  input_aria_invalid: {
    type: Boolean,
    default: true
  },
  input_aria_describedby: {
    type: String,
  },
  input_placeholder: {
    type: String,
    default: null,
  },
  input_password: {
    type: Boolean,
    default: false
  },
  input_dir: {
    type: String,
  },
  input_phone_country: {
    type: Boolean,
    default: false
  },
  input_phone_otp: {
    type: Boolean,
    default: false
  },
  input_style: {
    type: String,
  },
  input_autocomplete: {
    type: String,
  },
  label_style: {
    type: String,
  },
  input_notes: {
    type: Boolean,
    default: false
  },
  input_notes_style: {
    type: String,
  },
  error_text: {
    type: String,
    default: null
  },
  error_text_style: {
    type: String,
    default: null
  }

});

const input = ref(props.modelValue);

</script>