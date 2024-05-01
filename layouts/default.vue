<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700&display=swap');
</style>

<template>
  <div class="bg-gray-50 flex flex-col h-screen text-gray-900 max-w-full">
    <Title>{{ title }}</Title>
    <NuxtLoadingIndicator color="#cccccc" :height="3" />
    <DefaultHeader></DefaultHeader>
    <div class="flex-grow">
      <div v-if="route.path != '/' && route.path != '/en'" class="lg:h-[165px] h-[65px]"></div>
      <suspense>
        <slot />
      </suspense>
    </div>
    <DefaultFooter></DefaultFooter>
  </div>
</template>


<script setup>
const { $lang } = useNuxtApp()
const route = useRoute()
const { t } = useI18n()
const config = useRuntimeConfig()
const title = useState('website_name', () => t('company_name'));
useHead({
  htmlAttrs: {
    lang: $lang.code,
    dir: $lang.dir,
    class: 'h-full bg-gray-50'
  },
  bodyAttrs: {
    class: 'h-full',
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  script: [
    { src: "https://checkout.tabby.ai/tabby-promo.js", defer: true },
    { src: "https://www.googletagmanager.com/gtag/js?id=G-X65QTT0G8K", async: true }],
})

useSeoMeta({
  title: title.value,
  ogTitle: title.value,
  description: title.value,
  ogDescription: title.value,
  ogImage: config.public.BASE_URL + '/images/placeholder-log.png',
  ogImageAlt: 'Alhabib-Bedding main page'
})

onMounted(() => {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());

  gtag('config', 'G-X65QTT0G8K');
})
</script>
