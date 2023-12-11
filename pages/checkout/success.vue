<template>
  <Title>{{ $t('checkout_success_page_title') }} | {{ website_name }}</Title>
  <div class="flex items-center justify-center text-4xl text-extrabold text-gray-700 h-96">
    تم انشاء الطلب بنجاح
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
onMounted(() => {
  initFlowbite();
})

const website_name = useState('website_name');

</script>