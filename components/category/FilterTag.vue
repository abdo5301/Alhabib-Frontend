<template>
  <span :id="'badge-dismiss-'+name"
    class="inline-flex items-center ring-1 ring-gray-200 ring-inset h-8 rtl:pr-1 rtl:pl-4 ltr:pr-4 ltr:pl-1  py-[2px] rtl:mr-2 ltr:ml-2  bg-white rounded-md">
    <button type="button"
      class="inline-flex items-center p-1 rtl:ml-[6px] ltr:mr-[6px] text-normal text-gray-400 bg-transparent rounded-sm hover:bg-gray-100 hover:text-gray-900"
      :data-dismiss-target="'#badge-dismiss-'+name" aria-label="Remove">
      <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
      </svg>
      <span class="sr-only">Remove badge</span>
    </button>
    <span class="text-base leading-5 font-semibold text-gray-800">
      {{ name }}
    </span>
  </span>
</template>

<script setup>
  defineProps({
    name:{
      type: String
    }
  })
</script>

