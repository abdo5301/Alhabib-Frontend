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
const { t } = useI18n()
const title = useState('website_name', () => t('company_name'));
const localePath = useLocalePath()
useHead({
      htmlAttrs:{
        dir: $lang.dir,
        lang: $lang.code,
        class: 'h-full bg-gray-50'
      },
      bodyAttrs: {
        class: 'h-full',
        
      }
    })
</script>

