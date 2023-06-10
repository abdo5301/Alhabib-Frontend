<template>
  <div>
    <Title>{{ title }}</Title>
    <nav>
      <ul>
        <li><NuxtLink to="/auth/register">Register</NuxtLink></li>
        <li><NuxtLink to="/auth/login">Login</NuxtLink></li>
      </ul>
    </nav>
    <slot />
  </div>
</template>


<script setup>
const title = useState('title',()=>'Alhabib Shop');
</script>

