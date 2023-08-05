<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700&display=swap');
</style>

<template>
  <div class="bg-gray-50 flex flex-col h-screen text-gray-900">
    <Title>{{ title }}</Title>
    <DefaultHeader></DefaultHeader>
    <div class="flex-grow">
      <slot />
    </div>
    <DefaultFooter></DefaultFooter>
  </div>
</template>


<script setup>
import { initFlowbite } from 'flowbite'

const { $lang } = useNuxtApp()

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

