<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700&display=swap');
</style>

<template>
  <div class="bg-gray-50 flex flex-col h-screen text-gray-900">
    <Title>{{ title }}</Title>
    <DefaultHeader></DefaultHeader>
    <div class="flex-grow">
      <div v-if="route.path !='/' && route.path !='/en'" class="lg:h-[165px] h-[65px]"></div>
      <slot />
    </div>
    <DefaultFooter></DefaultFooter>
  </div>
</template>


<script setup>
import { initFlowbite } from 'flowbite'

const { $lang } = useNuxtApp()
const route = useRoute()

onMounted(() => {
  initFlowbite();
})

const title = useState('title', () => 'Alhabib Shop');
useHead({
  htmlAttrs: {
    lang: $lang.code,
    dir:  $lang.dir,
    class: 'h-full bg-gray-50'
  },
  bodyAttrs: {
    class: 'h-full',

  }
})
</script>

