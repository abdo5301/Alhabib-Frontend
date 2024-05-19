<style>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700&display=swap');

input[type='password'] {
  font-family: 'Verdana';
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0;
}
</style>

<template>
  <div>
    <Title>{{ title }}</Title>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <NuxtLink :to="localePath('/')"><img class="mx-auto h-10 w-auto" src="/images/logo.svg" alt="Alhabib Shop" />
        </NuxtLink>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
const { $lang } = useNuxtApp()
const config = useRuntimeConfig()
const route = useRoute()
const { t } = useI18n()
const title = useState('website_name', () => t('company_name'));
const localePath = useLocalePath()
useHead({
  htmlAttrs: {
    dir: $lang.dir,
    lang: $lang.code,
    class: 'h-full bg-gray-50'
  },
  bodyAttrs: {
    class: 'h-full',

  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    {
      rel: 'canonical',
      href: config.public.BASE_URL + route.path,
    },
  ],
  script: [
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
  title: 'مفارش الحبيب - صديق ثلث العمر | AlHabib Bedding',
  ogTitle: 'مفارش الحبيب - صديق ثلث العمر | AlHabib Bedding',
  description: 'أفضل متجر إلكتروني في السعودية مختص بـ المفارش الفندقية، الصيفية، الشتوية، العرائس، مفارش الأطفال والمواليد، مخدات طبية، لباد، بطانيات، مناشف وأرواب الحمام.',
  ogDescription: 'أفضل متجر إلكتروني في السعودية مختص بـ المفارش الفندقية، الصيفية، الشتوية، العرائس، مفارش الأطفال والمواليد، مخدات طبية، لباد، بطانيات، مناشف وأرواب الحمام.',
  keywords: 'مفارش,مفارش الحبيب,مفارش النوم,مفرش,ارواب,منشفة,بطانية شتوية,مفارش اطفال,موقع مفارش تركية,مفارش صيفي,مفرش سرير,مفرش مضغوط,مفرش مزدوج,مفارش صيفية,مفرش صيفي,مفرش فندقي,مفرش اطفال,وسادة,وسادة طبية,وسادة نوم,موقع وسادة,خداديات,لباد,لباد فندقي,لباد مفارش,لباد سرير,لباد نفر,مفارش فندقية,الحبيب مفارش,الحبيب للمفروشات,تطبيق مفارش الحبيب,مفارش الحبيب اون لاين,فروع مفارش الحبيب،مفارش الحبيب الرياض,متجر مفارش الحبيب,مفارش الحبيب لباد,كود خصم مفارش الحبيب',
  ogImage: config.public.BASE_URL + '/images/placeholder-logo.png',
  ogImageAlt: 'Alhabib Bedding',
  ogUrl: config.public.BASE_URL,
  ogType: "website"
})
</script>
