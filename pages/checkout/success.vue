<template>
  <Title>{{ $t('checkout_success_page_title') }} | {{ website_name }}</Title>
  <div class="flex items-center justify-center text-4xl text-extrabold text-gray-700 h-96">
    تم انشاء الطلب بنجاح
  </div>
  <div class="flex items-center justify-center text-4xl text-extrabold text-gray-700">
    رقم الطلب ( {{ successOrderId }} )
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'empty', middleware: ['auth'] })
const localePath = useLocalePath()
const { successOrderId, setSuccessOrderId, getOrder } = useOrder()
const order_data = ref([])
if (!successOrderId.value) {
  navigateTo(localePath('/cart'))
}
onMounted(async () => {
  initFlowbite();
  //console.log(successOrderId.value)
  if (successOrderId.value) {
    order_data.value = await getOrder(successOrderId.value)
    console.log(order_data.value)
  }
})

const website_name = useState('website_name');

</script>