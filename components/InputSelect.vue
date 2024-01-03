<template>
  <div class="w-full flex flex-col gap-2.5 lg:gap-3">
    <label :for="input_id"
      :class="['block text-sm lg:text-lg font-semibold text-gray-700 leading-5', label_style ? label_style : '']">
      <slot />
    </label>
    <select :id="input_id" @change="$emit('update:modelValue', $event.target.value),$emit('selectCallBack',$event.target.value)"
      :class="['bg-white cursor-pointer min-w-[120px] border flex items-center justify-between border-gray-300 text-gray-900 text-sm font-semibold rounded-md focus:ring-gray-300 focus:border-gray-300 w-full px-3 py-2', input_style ? input_style : '']">
      <option v-for="option, index in select_data"
        :value="option_index_value ? option[option_index_value] : JSON.stringify(option)"
        :selected="(default_selected == option[option_index_value] || default_selected == JSON.stringify(option)) ? default_selected : false"
        :key="index">{{ option[option_index_name] }}</option>
    </select>
    <p v-if="select_notes"
      :class="['w-full pt-[10px] flex items-center justify-start text-[#6C6C6C] text-sm lg:text-base font-normal tracking-tight', select_notes_style ? select_notes_style : '']">
      <slot name="select_notes" />
    </p>
    <p v-if="error_text" class="text-sm text-red-600 px-1">
      {{ error_text }}
    </p>
  </div>
</template>

<script setup>
const emits = defineEmits(['update:modelValue','selectCallBack'])
const props = defineProps({
  select_data: {
    type: Object
  },
  select_value: {
    type: String
  },
  option_index_name: {
    type: String,
    default: 'name'
  },
  option_index_value: {
    type: String,
  },
  input_id: {
    type: String
  },
  input_style: {
    type: String
  },
  label_style: {
    type: String
  },
  select_notes: {
    type: Boolean,
    default: false
  },
  select_notes_style: {
    type: String
  },
  error_text: {
    type: String
  },
})

const default_selected = ref('')
if (!props.select_value && !props.option_index_value) { // no value and no index
  default_selected.value = JSON.stringify(props.select_data[0])
} else if (!props.select_value && props.option_index_value && props.select_data[0]) { //only index
  default_selected.value = props.select_data[0][props.option_index_value]
} else { //value exist
  default_selected.value = props.select_value
}

</script>