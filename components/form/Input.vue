<template>
  <div>
    <label :for="label_for" class="block text-sm font-semibold font-sans-serif leading-5 text-gray-700">{{ label_name }}</label>
    <div class="relative mt-1 rounded-md shadow-sm">
      <div v-if="input_phone_country" class="absolute inset-y-0 left-0 flex items-center">
        <label for="country" class="sr-only">Country</label>
        <select dir="ltr" id="country" name="country" autocomplete="country" class="h-full rounded-md border-0 ring-1 ring-inset ring-gray-300 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm">
          <option>+966</option>
          <option>+02</option>
          <option>+965</option>
        </select>
      </div>
      <input  :dir="input_dir" :type="input_password ? passwordFieldType : input_type" :name="input_name" :id="input_id" 
      :class="[ (error_text ? 'block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6'
      :'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300  sm:text-sm sm:leading-6') , 
      (input_phone_country ? 'pl-[5rem]':'') ]" 
      
      :placeholder="input_placeholder" :value="modelValue" @input="$emit('update:modelValue',$event.target.value)" :aria-invalid="input_aria_invalid" :aria-describedby="input_aria_describedby" ref="input"/>
      
      <div v-if="error_text" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>

      <div v-if="input_password" id="show-password" @click="switchVisibility($event)" class="absolute cursor-pointer inset-y-0 ltr:right-0 rtl:left-0 flex items-center ltr:pr-3 rtl:pl-3">
        <EyeSlashIcon v-if="passwordFieldType == 'password'" class="h-5 w-5 text-gray-400" aria-hidden="true" />
        <EyeIcon v-else class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>

    </div>
    <p v-if="error_text" class="mt-2 text-sm text-red-600" :id="input_aria_describedby">{{ error_text }}</p>
  </div>
</template>

<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import { EyeIcon,EyeSlashIcon } from '@heroicons/vue/24/outline'

const input = ref(props.modelValue);

defineEmits(['update:modelValue']);

const passwordFieldType  = ref('password');

const switchVisibility = ($event) => {
  passwordFieldType.value = passwordFieldType.value === "password" ? "text" : "password";
}

const props = defineProps({
label_name:{
  type: String,
},
label_for:{
  type: String,
},
input_type: {
  type: String,
  default:'text'
},
input_name: {
  type: String,
},
input_id:{
  type: String,
},
input_id:{
  type: String,
},
input_placeholder:{
  type: String,
},
modelValue: {
  type: String
},
input_aria_invalid:{
  type: Boolean,
  default: true
},
input_aria_describedby:{
  type: String,
},
input_placeholder:{
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
error_text:{
  type: String,
  default:null
}

});



</script>