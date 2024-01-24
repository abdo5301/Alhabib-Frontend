<template>
  <div class="flex flex-col lg:p-[30px] pb-0">
    <h5 class="pb-5 lg:pb-[20px] text-gray-900 text-base lg:text-lg font-semibold leading-5">
      {{ $t('text_personal_info') }}
    </h5>
    <ul class="flex flex-col justify-start items-start gap-2 text-gray-500 text-sm font-normal leading-5">
      <li>{{ customer_name }}</li>
      <li>{{ customer_email }}</li>
      <li dir="ltr">{{ customer_phone }}</li>
    </ul>
    <!-- Divider -->
    <div class="flex items-center justify-start w-full lg:pe-8 pt-[20px] lg:pt-[30px]">
      <div class="border-b border-b-gray-200 w-full"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  customer_name: {
    type: String,
    default:' '
  },
  customer_email: {
    type: String,
    default:' '
  },
  customer_phone: {
    type: String,
    default:' '
  },
})
</script>