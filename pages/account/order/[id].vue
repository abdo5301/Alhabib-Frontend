<template>
  <Title>{{ website_name }}</Title>
  <div class="h-96 text-3xl font-bold text-gray-800 flex flex-col gap-10 items-center justify-center">
    <span>
      order id : {{ route.params.id }}
    </span>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'account', middleware: ['auth'] })
import { initFlowbite } from 'flowbite'
onMounted(() => {
  initFlowbite();
})
const { setActiveSection } = useAccount()
setActiveSection('Order-details')
const route = useRoute()
const website_name = useState('website_name')
const localePath = useLocalePath()

</script>