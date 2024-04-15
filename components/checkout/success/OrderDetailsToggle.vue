<template>
  <div :class="['order-1 lg:hidden w-full py-5 px-1 flex justify-between items-center']">
    <div class="flex gap-2 justify-start">
      <div class="flex flex-col flex-1 gap-1 text-gray-900 text-xs">
        <span class="font-semibold leading-4 uppercase">
          {{ $t('text_order_number') }}
        </span>
        <div class="flex gap-[1px] justify-center items-center font-bold leading-4 uppercase">
          <span>
            #{{ order_id }}
          </span>
          <span class="cursor-pointer" @click="copyText(order_id)" :title="$t('text_copy')">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M5 10H3.75C3.05964 10 2.5 9.44036 2.5 8.75V3.75C2.5 3.05964 3.05964 2.5 3.75 2.5H8.75C9.44036 2.5 10 3.05964 10 3.75V5M6.25 12.5H11.25C11.9404 12.5 12.5 11.9404 12.5 11.25V6.25C12.5 5.55964 11.9404 5 11.25 5H6.25C5.55965 5 5 5.55964 5 6.25V11.25C5 11.9404 5.55965 12.5 6.25 12.5Z"
                stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-1 text-xs">
        <span class="font-semibold leading-4 text-gray-900 uppercase">
          {{ $t('text_order_date') }}
        </span>
        <span dir="ltr" class="text-gray-500 font-semibold leading-4 uppercase max-w-[95px]">
          {{ format(new Date(order_date), "dd MMM, yyyy") }}
        </span>
      </div>
    </div>
    <NuxtLink @click="order_details = !order_details, $emit('toggleShow', order_details)" to="javascript:void(0)"
      :class="[order_details ? 'bg-gray-500 rounded-md  ' : '', 'px-1 h-[28px] flex gap-[5px] items-center justify-start']">
      <svg v-if="!order_details" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
        fill="none">
        <path
          d="M8.3335 14.1667H13.3335H15.0002C15.9206 14.1667 16.6668 13.4205 16.6668 12.5V7.01184C16.6668 6.79083 16.579 6.57887 16.4228 6.42259L12.7442 2.74408C12.588 2.5878 12.376 2.5 12.155 2.5H8.3335C7.41302 2.5 6.66683 3.24619 6.66683 4.16667V5.83333V12.5C6.66683 13.4205 7.41302 14.1667 8.3335 14.1667Z"
          fill="#F9FAFB" />
        <path
          d="M6.66683 5.83333V12.5C6.66683 13.4205 7.41302 14.1667 8.3335 14.1667H13.3335M6.66683 5.83333V4.16667C6.66683 3.24619 7.41302 2.5 8.3335 2.5H12.155C12.376 2.5 12.588 2.5878 12.7442 2.74408L16.4228 6.42259C16.579 6.57887 16.6668 6.79083 16.6668 7.01184V12.5C16.6668 13.4205 15.9206 14.1667 15.0002 14.1667H13.3335M6.66683 5.83333H5.3335C4.22893 5.83333 3.3335 6.72876 3.3335 7.83333V15.8333C3.3335 16.7538 4.07969 17.5 5.00016 17.5H11.3335C12.4381 17.5 13.3335 16.6046 13.3335 15.5V14.1667"
          stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M9 2C7.89543 2 7 2.89543 7 4V12C7 13.1046 7.89543 14 9 14H15C16.1046 14 17 13.1046 17 12V6.41421C17 5.88378 16.7893 5.37507 16.4142 5L14 2.58579C13.6249 2.21071 13.1162 2 12.5858 2H9Z"
          fill="white" />
        <path d="M3 8C3 6.89543 3.89543 6 5 6V16H13C13 17.1046 12.1046 18 11 18H5C3.89543 18 3 17.1046 3 16V8Z"
          fill="white" />
      </svg>
      <span :class="[order_details ? 'text-white font-normal' : 'text-gray-700 font-normal', 'text-[10px]']">{{
        order_details ?
        $t('checkout_success_order_details_hide') : $t('checkout_success_order_details_show') }}</span>
      <svg v-if="order_details" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M14.7071 12.7071C14.3166 13.0976 13.6834 13.0976 13.2929 12.7071L10 9.41421L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929L9.29289 7.29289C9.68342 6.90237 10.3166 6.90237 10.7071 7.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071Z"
          fill="white" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
          fill="#6B7280" />
      </svg>
    </NuxtLink>
  </div>
</template>

<script setup>
import { format } from "date-fns";
const props = defineProps({
  order_details: {
    type: Boolean,
    default: false
  },
  order_id: {
    type: Number,
    default: 0
  },
  order_date: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['toggleShow'])
</script>
