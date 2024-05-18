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
  <div class="bg-gray-50 flex min-h-full flex-1 flex-col h-screen">
    <Title>{{ title }}</Title>
    <div class="flex-grow">
      <slot />
    </div>
  </div>
</template>

<script setup>
const { $lang } = useNuxtApp()
const config = useRuntimeConfig()
const { t } = useI18n()
const title = useState('website_name', () => t('company_name'));
const localePath = useLocalePath()
const { cartData, setCartData } = useCart()
const cart_data = ref([])
onMounted(async () => {
  cart_data.value = await useCart().getAll()
  if (cart_data.value && cart_data.value.id) {
    setCartData(cart_data.value)
  }
})
useHead({
  htmlAttrs: {
    dir: $lang.dir,
    lang: $lang.code,
    class: 'h-full bg-gray-50'
  },
  bodyAttrs: {
    class: 'h-full',

  },
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
</script>
