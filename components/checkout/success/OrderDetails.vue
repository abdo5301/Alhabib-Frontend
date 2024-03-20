<template>
  <div class="hidden lg:flex flex-col p-[30px] pb-0">
    <h5 class=" pb-[30px] text-gray-900 text-xl font-bold leading-5">{{ $t('text_order_details') }}</h5>
    <div class="flex justify-start items-start gap-5 lg:gap-[30px]">
      <div class="flex flex-col gap-3 text-gray-900 text-base">
        <span class="font-semibold leading-[15px] uppercase">
          {{ $t('text_order_number') }}
        </span>
        <div class="flex gap-[5px] justify-center items-center">
          <span class="text-gray-900 text-xs lg:text-sm font-bold leading-[15px] lg:leading-[15px] uppercase">
            #{{ order_id }}
          </span>
          <span class="cursor-pointer"  @click="copyText(order_id)" :title="$t('text_copy')">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M5 10H3.75C3.05964 10 2.5 9.44036 2.5 8.75V3.75C2.5 3.05964 3.05964 2.5 3.75 2.5H8.75C9.44036 2.5 10 3.05964 10 3.75V5M6.25 12.5H11.25C11.9404 12.5 12.5 11.9404 12.5 11.25V6.25C12.5 5.55964 11.9404 5 11.25 5H6.25C5.55965 5 5 5.55964 5 6.25V11.25C5 11.9404 5.55965 12.5 6.25 12.5Z"
                stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-3 leading-[15px]">
        <span class="font-semibold text-gray-900 uppercase">
          {{ $t('text_order_date') }}
        </span>
        <span dir="ltr" class="flex justify-center items-center text-sm text-gray-500 font-semibold uppercase">
           {{ format(new Date(order_date), "dd MMM, yyyy") }}
          <!-- 22 feb, 2020 -->
        </span>
      </div>
      <NuxtLink :to="localePath('/')" target="_blank"
        class="w-[165px] h-[42px] flex items-center justify-center gap-2 ring-1 ring-gray-300 shadow-sm rounded-md bg-white">
        <span class="text-gray-700 text-sm font-semibold leading-5">{{ $t('text_tax_invoice') }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M4.5 4V7H3.5C2.39543 7 1.5 7.89543 1.5 9V12C1.5 13.1046 2.39543 14 3.5 14H4.5V16C4.5 17.1046 5.39543 18 6.5 18H12.5C13.6046 18 14.5 17.1046 14.5 16V14H15.5C16.6046 14 17.5 13.1046 17.5 12V9C17.5 7.89543 16.6046 7 15.5 7H14.5V4C14.5 2.89543 13.6046 2 12.5 2H6.5C5.39543 2 4.5 2.89543 4.5 4ZM12.5 4H6.5V7H12.5V4ZM12.5 12H6.5V16H12.5V12Z"
            fill="#6B7280" />
        </svg>
      </NuxtLink>
    </div>
    <!-- Divider -->
    <div class="hidden lg:flex items-center justify-start w-full pe-8 pt-[30px]">
      <div class="border-b border-b-gray-200 w-full"></div>
    </div>
  </div>
</template>

<script setup>
import { format } from "date-fns";
const localePath = useLocalePath()
const props = defineProps({
  order_id: {
    type: Number,
    default: 0
  },
  order_date: {
    type: String,
    default: ''
  }
})

</script>