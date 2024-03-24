<template>
  <NuxtLayout name="default">
    <div class="flex justify-center items-center flex-col gap-[35px] lg:gap-[63px] h-[258px] lg:h-[558px] bg-gray-50">
      <img src="/images/error-for-page.png" alt="Error" class="w-[276px] lg:w-[335px] ">
      <div
        class=" max-w-[290px] lg:max-w-[780px] flex justify-center items-center text-center text-gray-500 lg:text-[34px] text-[20px] font-medium leading-8">
        <h2 v-if="error.statusCode == '404' || error.statusMessage == 'page_not_found'" class="">
          {{ $t('error_page_not_found') }}
        </h2>
        <h2 v-else>{{ error.statusMessage }}</h2>
      </div>
    </div>
  </NuxtLayout>

</template>
<script setup>
import { initFlowbite } from 'flowbite'
onMounted(() => {
  initFlowbite();
})

const props = defineProps({
  error: {
    type: Object,
  },
})
</script>