<template>
  <Title>Tabby | {{ website_name }}</Title>
  <CheckoutLogo class="absolute top-10 left-0 right-0" />
  <div  class="w-full flex justify-center items-center flex-col h-full">
    <div v-if="data_loader" class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
      <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[120px]" />
    </div>
    <div v-else v-show="payment_id" class="p-5 flex justify-center items-center flex-col gap-8 bg-white w-[95%] lg:w-1/2 rounded-md">
      <div v-if="payment_icon" class="w-full flex justify-start items-center flex-col">
        <img :src="payment_icon" :alt="payment_method">
      </div>
      <div class="flex flex-row gap-3 items-center">
        <img v-if="image" width="35" :src="image" :alt="payment_method">
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
const { setSuccessOrderId, successOrderId, cancelOrder } = useOrder()
const payment_data = ref('')
const payment_id = ref(null)
const payment_icon = ref(null)
const notes = ref('')
const image = ref('')
const redirect = ref(null)
const data_loader = ref(true)
const route = useRoute()
const accepted_methods = ['tabby', 'tamara']
if (!route.params.payment || !accepted_methods.includes(route.params.payment)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'page_not_found',
    fatal: true
  })
}

const payment_method = route.params.payment

onMounted(async () => {
  initFlowbite();
  switch (payment_method) {
    case 'tabby':
      payment_icon.value = '/images/tabby-icon.svg'
      payment_id.value = localStorage.getItem('tabby_payment_id')
      if (payment_id.value) {
        try {
          payment_data.value = await $fetch('/tabby/api/v2/payments/' + payment_id.value, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + config.public.TAPPY_SECRET_KEY
            }
          })
          console.log(payment_data.value)
        } catch (error) {
          console.log(error)
        }

        if (payment_data.value && payment_data.value.status) {
          const tabby_order_id = payment_data.value.order.reference_id
          setSuccessOrderId(tabby_order_id)
          switch (payment_data.value.status) {
            case 'CREATED':
              redirect.value = localePath('/checkout')
              break;
            case 'AUTHORIZED': //Success Payment
            case 'REJECTED':
            case 'CLOSED':
              notes.value = 'تمت عملية الدفع بنجاح ..شكرا لك!'
              image.value = '/images/icons/true-green.png'
              redirect.value = localePath('/checkout/success')
              break;
            case 'EXPIRED':
              notes.value = 'انتهت صلاحية العملية من فضللك اعد المحاولة مرة أخرى.'
              image.value = '/images/icons/x-red.png'
              redirect.value = localePath('/checkout')
              localStorage.removeItem('tabby_payment_id')
              if (successOrderId.value) {
                await cancelOrder(successOrderId.value)
              }
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
      break;

    case 'tamara':
      payment_icon.value = '/images/tamara-icon.svg'
      payment_id.value = localStorage.getItem('tamara_payment_id')
      if (payment_id.value) {
        const tamara_api_url = config.public.TAMARA_ENV == 'test' ? `https://api-sandbox.tamara.co/orders/${payment_id.value}` : `https://api.tamara.co/orders/${payment_id.value}`
        try {
          payment_data.value = await $fetch(tamara_api_url, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'authorization': 'Bearer ' + config.public.TAMARA_API_TOKEN
            }
          })
          console.log(payment_data.value)
        } catch (error) {
          console.log(error)
        }

        if (payment_data.value && payment_data.value.status) {
          const tamara_order_id = payment_data.value.order_reference_id
          setSuccessOrderId(tamara_order_id)
          switch (payment_data.value.status) {
            case 'new':
              redirect.value = localePath('/checkout')
              break;
            case 'approved': //Success Payment
            case 'authorised':
            case 'fully_captured':
            case 'partially_captured':
              notes.value = 'تمت عملية الدفع بنجاح ..شكرا لك!'
              image.value = '/images/icons/true-green.png'
              redirect.value = localePath('/checkout/success')
              break;
            case 'expired':
              notes.value = 'انتهت صلاحية العملية من فضللك اعد المحاولة مرة أخرى.'
              image.value = '/images/icons/x-red.png'
              redirect.value = localePath('/checkout')
              localStorage.removeItem('tamara_payment_id')
              if (successOrderId.value) {
                await cancelOrder(successOrderId.value)
              }
              break;
            case 'declined':
            case 'canceled':
              notes.value = 'عذرا. لايمكن اتمام عملية الدفع. من فضلك تواصل مع خدمة العملاء.'
              image.value = '/images/icons/x-red.png'
              redirect.value = localePath('/checkout')
              localStorage.removeItem('tamara_payment_id')
              if (successOrderId.value) {
                await cancelOrder(successOrderId.value)
              }
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
        localStorage.removeItem('tamara_payment_id')
        navigateTo(localePath('/cart'))
      }
      break;

    default:
      break;
  }

  data_loader.value = false
})
</script>