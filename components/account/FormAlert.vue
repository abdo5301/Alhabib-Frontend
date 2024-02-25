<template>
  <div :class="['rounded-lg lg:rounded-md bg-' + props.color + '-50 p-4 shadow']" v-if="shown">
    <div class="flex justify-start items-center gap-3">
      <div v-if="alert_icon" class="flex-shrink-0">
        <XCircleIcon v-if="props.color == 'red'" class="h-[25px] lg:h-[35px] w-[25px] lg:w-[35px] text-red-400"
          aria-hidden="true" />
        <svg v-else-if="props.color == 'green'" class="h-[25px] lg:h-[35px] w-[25px] lg:w-[35px]"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" fill="">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M17.5 31.5C25.232 31.5 31.5 25.232 31.5 17.5C31.5 9.76801 25.232 3.5 17.5 3.5C9.76801 3.5 3.5 9.76801 3.5 17.5C3.5 25.232 9.76801 31.5 17.5 31.5ZM23.9874 15.2374C24.6708 14.554 24.6708 13.446 23.9874 12.7626C23.304 12.0791 22.196 12.0791 21.5126 12.7626L15.75 18.5251L13.4874 16.2626C12.804 15.5791 11.696 15.5791 11.0126 16.2626C10.3291 16.946 10.3291 18.054 11.0126 18.7374L14.5126 22.2374C15.196 22.9209 16.304 22.9209 16.9874 22.2374L23.9874 15.2374Z"
            fill="#34D399" />
        </svg>
        <InformationCircleIcon v-else-if="props.color == 'blue'"
          class="h-[25px] lg:h-[35px] w-[25px] lg:w-[35px] text-blue-400" aria-hidden="true" />
        <ExclamationTriangleIcon v-else="props.color == 'orange'"
          class="h-[25px] lg:h-[35px] w-[25px] lg:w-[35px] text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <p class="text-[15px] lg:text-xl font-semibold leading-5" :class="colors[props.color].text">
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
    'text': 'text-green-700',
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