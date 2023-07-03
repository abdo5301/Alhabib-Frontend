<script setup>
import { XMarkIcon,XCircleIcon,InformationCircleIcon,ExclamationTriangleIcon,CheckCircleIcon } from '@heroicons/vue/20/solid'

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
    },
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
  <div :class="'rounded-md bg-'+props.color+'-50 p-4'" v-if="shown">
    <div class="flex">
      <div v-if="alert_icon" class="flex-shrink-0 rtl:pl-2 ltr:pr-2">
        <XCircleIcon v-if="props.color == 'red'" class="h-5 w-5 text-red-400" aria-hidden="true" />
        <CheckCircleIcon v-else-if="props.color == 'green'" class="h-5 w-5 text-green-400" aria-hidden="true" />
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
          <button @click="shown = false" type="button" :class="colors[props.color].button" class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2">
            <span class="sr-only">Dismiss</span>
            <XMarkIcon class="h-5 w-5 " aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
