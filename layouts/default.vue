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
    {
      hid: 'gtmHead',
      innerHTML: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${config.GTM_ID}');`,
      tagPosition: 'head'
    }
  ],
  noscript: [
    {
      innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${config.GTM_ID}"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      tagPosition: 'bodyOpen',
    }
  ]
})

useSeoMeta({
  title: title.value,
  ogTitle: title.value,
  description: title.value,
  ogDescription: title.value,
  ogImage: config.public.BASE_URL + '/images/placeholder-log.png',
  ogImageAlt: 'Alhabib-Bedding main page'
})
</script>
