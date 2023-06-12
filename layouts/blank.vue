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
         <NuxtLink to="/"><img class="mx-auto h-10 w-auto" src="/images/logo.svg" alt="Alhabib Shop" /></NuxtLink>       
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
const title = useState('title',()=>'Alhabib Shop');
useHead({
      htmlAttrs:{
        dir:'rtl',
        class: 'h-full bg-gray-50'
      },
      bodyAttrs: {
        class: 'h-full',
        
      }
    })
</script>

