<template>
  <div class="flex items-center">
    <label :for="input_id"
      :class="['cursor-pointer text-sm lg:text-base font-semibold leading-5 text-gray-900', label_style ? label_style : '']">
      <input :id="input_id" type="radio" :value="input_value" :name="input_name"
        @change="$emit('update:modelValue', $event.target.value), $emit('callBack', $event.target.value)"
        :checked="input_checked"
        :class="['w-4 h-4 cursor-pointer text-gray-600 bg-white border-gray-300 focus:ring-white', input_style ? input_style : '']">
      <span class="ms-2">
        <slot />
      </span>
    </label>
  </div>
</template>

<script setup>
defineEmits(['update:modelValue', 'callBack'])
const props = defineProps({
  input_id: {
    type: String
  },
  input_name: {
    type: String
  },
  input_value: {
    type: String
  },
  input_checked: {
    type: Boolean,
    default: false
  },
  label_style: {
    type: String
  },
  input_style: {
    type: String
  }
})
</script>