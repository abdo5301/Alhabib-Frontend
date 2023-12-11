<template>
  <form @submit.prevent="submit_discount_code(modelValue)">
    <div>
      <div class="relative flex mt-1 rounded-md shadow-sm">
        <input type="text" name="discount_code" input_id="input-discount-code" :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value),reset_discount_alerts()"
          :class="[(discount_input_error.length > 0 ? 'text-red-600 placeholder:text-red-300' : 'text-gray-900 placeholder:text-gray-400'),
          ('rtl:pl-[100px] ltr:pr-[120px] block w-full rounded-md border-0 py-[15px] px-[13px] shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-gray-300 text-sm font-normal lg:font-medium leading-5')]"
          :placeholder="$t('input_placeholder_discount_code')" />
        <div>
          <button :disabled="!unDisabled" @click="submit_discount_code(modelValue)" type="button"
            :class="[('w-[90px] absolute rtl:left-0 ltr:-right-[0.5px] rounded-md shadow-sm px-4 py-[15px] text-sm font-semibold text-gray-400 leading-5 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed')]">
            {{ $t('btn_add') }}
          </button>
        </div>
      </div>
      <p v-if="discount_input_error" class="mt-3 lg:mt-2 px-[2px] text-sm lg:text-base font-semibold lg:font-medium leading-5 text-red-600">
        {{ discount_input_error }}
      </p>
      <p v-if="discount_input_success" class="mt-3 px-[2px] text-base  font-medium leading-5 text-green-700">
        {{ discount_input_success }}
      </p>
    </div>
  </form>
</template>

<script setup>
const emits = defineEmits(['update:modelValue', 'checkDiscountCode', 'submitDiscountCode']);

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const { t } = useI18n()
const input = ref(props.modelValue)
const discount_input_error = ref('')
const discount_input_success = ref('')

const unDisabled = computed(() => {
  if(!props.modelValue.length > 0 || discount_input_error.value.length > 0){
    return false
  }
  return true
})


function reset_discount_alerts(code_value) {
  discount_input_success.value = ''
  discount_input_error.value = ''
}

function submit_discount_code(code_value) {
  if (code_value == 'code') {
    discount_input_success.value = t('alert_discount_code_success')
  }
  if (code_value.length && code_value !== 'code') {
    discount_input_error.value = t('alert_discount_code_error')
  }
}

</script>