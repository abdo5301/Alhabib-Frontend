<style>
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;700&display=swap');
</style>

<template>
  <div class="text-center py-20">
    <Title>{{ title }}</Title>
    <nav>
      <ul class="flex flex-row justify-center gap-3 py-3">
        <li><NuxtLink to="/auth/register">إنشاء حساب</NuxtLink></li>
        <li>/</li>
        <li><NuxtLink to="/auth/login">تسجيل الدخول</NuxtLink></li>
      </ul>
    </nav>
    <slot />
  </div>
</template>


<script setup>
const title = useState('title',()=>'Alhabib Shop');
</script>

