<template>
  <div class="flex flex-col lg:p-[30px] lg:pb-0 lg:pt-0">
    <h5 class="pb-5 lg:pb-[20px] text-gray-900 text-sm lg:text-lg font-semibold leading-5">
      {{ $t('shipping_address_title') }}
    </h5>
    <ul class="flex flex-col justify-start items-start gap-2 text-gray-500 text-sm font-normal leading-5">
      <li>{{ street }} ، {{ neighborhood }}</li>
      <li>{{ country }}</li>
      <li>{{ region }}  ،{{ city }}</li>
    </ul>
    <!-- Divider -->
    <div class="flex items-center justify-start w-full lg:pe-8 pt-[20px] lg:pt-[30px]">
      <div class="border-b border-b-gray-200 w-full"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  country: {
    type: String,
    default:''
  },
  region: {
    type: String,
    default:''
  },
  city: {
    type: String,
    default:''
  },
  neighborhood: {
    type: String,
    default:''
  },
  street: {
    type: String,
    default:''
  }
})
</script>