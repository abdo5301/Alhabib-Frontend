<template>
  <form @submit.prevent="$emit('submitDiscountCode', modelValue)">
    <div>
      <div class="relative flex mt-1 rounded-md shadow-sm">
        <input type="text" name="discount_code" input_id="input-discount-code" :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value), $emit('checkDiscountCode', $event.target.value)"
          :class="[(input_error.length > 0 ? 'text-red-600 placeholder:text-red-300' : 'text-gray-900 placeholder:text-gray-400'),
          ('rtl:pl-[95px] ltr:pr-[120px] block w-full rounded-md border-0 py-[9px] px-[13px] shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-gray-300 text-sm font-normal lg:font-medium leading-5')]"
          :placeholder="$t('input_placeholder_discount_code')" />
        <div>
          <button :disabled="!unDisabled" @click="$emit('submitDiscountCode', modelValue)" type="button"
            :class="[('w-[90px] absolute rtl:left-0 ltr:-right-[0.5px] rounded-md shadow-sm px-4 py-[9px] text-sm font-semibold text-gray-400 leading-5 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed')]">
            {{ $t('btn_add') }}
          </button>
        </div>
      </div>
      <p v-if="input_error" class="mt-3 lg:mt-2 px-[2px] text-sm lg:text-base font-semibold lg:font-medium leading-5 text-red-600">
        {{ input_error }}
      </p>
      <p v-if="input_success" class="mt-3 px-[2px] text-base  font-medium leading-5 text-green-700">
        {{ input_success }}
      </p>
    </div>
  </form>
</template>

<script setup>
const emits = defineEmits(['update:modelValue', 'checkDiscountCode', 'submitDiscountCode']);

const props = defineProps({
  input_error: {
    type: String
  },
  input_success: {
    type: String
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const input = ref(props.modelValue)

const unDisabled = computed(() => {
  return props.modelValue.length > 0 || props.input_error.length > 0;
})


</script>