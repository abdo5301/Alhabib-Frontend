<style>
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700&display=swap');
</style>

<template> 
<div class="bg-gray-50 min-h-screen text-gray-900">
  <Title>{{ title }}</Title>
  <DefaultHeader></DefaultHeader>
    <slot /> 
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

