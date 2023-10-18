<script setup>
import { XMarkIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/vue/20/solid'

let shown = ref(true);

const props = defineProps({
  color: {
    type: String,
    default: 'emerald',
  },
  alert_icon: {
    type: Boolean,
    default: false,
  },
  dismiss: {
    type: Boolean,
    default: false,
  }
});


const colors = {
  'green': {
    'text': 'text-green-800',
    'button': 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600'
  },
  'blue': {
    'text': 'text-blue-800',
    'button': 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-offset-blue-50 focus:ring-blue-600'
  },
  'emerald': {
    'text': 'text-emerald-800',
    'button': 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100 focus:ring-offset-emerald-50 focus:ring-emerald-600'
  },
  'red': {
    'text': 'text-red-700',
    'button': 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600'
  },
  'orange': {
    'text': 'text-orange-700',
    'button': 'bg-orange-50 text-orange-500 hover:bg-orange-100 focus:ring-offset-orange-50 focus:ring-orange-600'
  },

}
</script>
<template>
  <div :class="['rounded-md bg-' + props.color + '-50 p-4 shadow']" v-if="shown">
    <div class="flex">
      <div v-if="alert_icon" class="flex-shrink-0 rtl:pl-2 ltr:pr-2">
        <XCircleIcon v-if="props.color == 'red'" class="h-5 w-5 text-red-400" aria-hidden="true" />
        <svg v-else-if="props.color == 'green'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
          viewBox="0 0 35 35" fill="none">
          <rect x="0.5" y="0.5" width="34" height="34" rx="17" fill="#047857" />
          <path
            d="M26.0197 11.1405C26.4298 11.5507 26.6601 12.107 26.6601 12.687C26.6601 13.2671 26.4298 13.8234 26.0197 14.2336L15.0822 25.1711C14.672 25.5812 14.1157 25.8116 13.5356 25.8116C12.9556 25.8116 12.3993 25.5812 11.9891 25.1711L7.61406 20.7961C7.21559 20.3835 6.9951 19.831 7.00008 19.2574C7.00507 18.6839 7.23512 18.1352 7.6407 17.7296C8.04628 17.324 8.59494 17.094 9.16849 17.089C9.74205 17.084 10.2946 17.3045 10.7072 17.703L13.5356 20.5314L22.9265 11.1405C23.3368 10.7304 23.8931 10.5 24.4731 10.5C25.0532 10.5 25.6095 10.7304 26.0197 11.1405Z"
            fill="white" />
          <rect x="0.5" y="0.5" width="34" height="34" rx="17" stroke="#047857" />
        </svg>
        <InformationCircleIcon v-else-if="props.color == 'blue'" class="h-5 w-5 text-blue-400" aria-hidden="true" />
        <ExclamationTriangleIcon v-else="props.color == 'orange'" class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p class="text-sm font-normal" :class="colors[props.color].text">
          <slot />
        </p>
      </div>
      <div class="mr-auto pl-3" v-if="props.dismiss">
        <div class="-mx-1.5 -my-1.5">
          <button @click="shown = false" type="button" :class="colors[props.color].button"
            class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2">
            <span class="sr-only">Dismiss</span>
            <XMarkIcon class="h-5 w-5 " aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
