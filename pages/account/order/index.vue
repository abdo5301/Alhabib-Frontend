<template>
  <Title>{{ website_name }}</Title>
  <div class="h-96 text-3xl font-bold text-gray-800 flex flex-col gap-10 items-center justify-center">
    <span>
      Orders Here
    </span>
    <NuxtLink :to="localePath('/account')"
      class="flex items-center  justify-center w-[200px] h-14 text-2xl ring-1 ring-gray-300 rounded-md bg-white focus:bg-gray-100 hover:bg-gray-100">
      Account
    </NuxtLink>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const { setActiveSection } = useAccount()
onMounted(() => {
  initFlowbite();
  setActiveSection('orders')
})
const route = useRoute()
const localePath = useLocalePath()
const website_name = useState('website_name')


</script>