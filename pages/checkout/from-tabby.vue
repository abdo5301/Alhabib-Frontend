<template>
  <Title>Tabby | {{ website_name }}</Title>
  <CheckoutLogo class="absolute top-10 left-0 right-0" />
  <div class="w-full flex justify-center items-center flex-col h-full">
    <div v-if="data_loader" class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
      <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[120px]" />
    </div>
    <div v-else class="p-5 flex justify-center items-center flex-col gap-8 bg-white w-[95%] lg:w-1/2 rounded-md">
      <div class="w-full flex justify-start items-center flex-col">
        <img src="/images/tabby-icon.svg" alt="Tabby">
      </div>
      <div class="flex flex-row gap-3 items-center">
        <img v-if="image" width="35" :src="image" alt="Tabby">
        <span class="font-medium text-lg lg:text-xl" v-if="notes">
          {{ notes }}
        </span>
      </div>
      <div v-if="redirect" class="flex items-center justify-center gap-3 h-[30px] max-h-screen w-full mx-auto">
        <span>جاري إعادة توجيهك</span>
        <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[70px]" />
      </div>
    </div>
  </div>

</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'empty', middleware: ['auth'] })
const website_name = useState('website_name')
const config = useRuntimeConfig()
const localePath = useLocalePath()
const tabby_payment = ref('')
const { successOrderId } = useOrder()
const tabby_payment_id = ref(null)
const notes = ref('')
const image = ref('')
const redirect = ref(null)
const data_loader = ref(true)
onMounted(async () => {
  initFlowbite();
  tabby_payment_id.value = localStorage.getItem('tabby_payment_id')
  if (tabby_payment_id.value) {
    try {
      tabby_payment.value = await $fetch('/tabby/api/v2/payments/' + tabby_payment_id.value, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + config.public.TAPPY_SECRET_KEY
        }
      })
      console.log(tabby_payment.value)
    } catch (error) {
      console.log(error)
    }

    if (tabby_payment.value && tabby_payment.value.status) {
      switch (tabby_payment.value.status) {
        case 'CREATED':
          redirect.value = localePath('/checkout')
          break;
        case 'AUTHORIZED': //Success Payment
          notes.value = 'تمت عملية الدفع بنجاح ..شكرا لك!'
          image.value = '/images/icons/true-green.png'
          redirect.value = localePath('/checkout/success')
          break;
        case 'EXPIRED':
          notes.value = 'انتهت صلاحية العملية من فضللك اعد المحاولة مرة أخرى.'
          image.value = '/images/icons/x-red.png'
          redirect.value = localePath('/checkout')
          localStorage.removeItem('tabby_payment_id')
          break;
        case 'REJECTED':
        case 'CLOSED':
          notes.value = 'فشلت عملية الدفع..من فضللك اعد المحاولة مرة أخرى.'
          image.value = '/images/icons/x-red.png'
          redirect.value = localePath('/checkout')
          localStorage.removeItem('tabby_payment_id')
          break;
        default:
          break;
      }
      //set time out here if needed
      if (redirect.value) {
        setTimeout(function () {
          navigateTo(redirect.value)
        }, 3000)
      }
    }
  } else {
    //Empty saved tabby payment id
    localStorage.removeItem('tabby_payment_id')
    navigateTo(localePath('/cart'))
  }
  data_loader.value = false
})
</script>