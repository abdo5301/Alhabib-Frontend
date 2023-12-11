<template>
  <div class="flex items-center justify-center">
    <div class="flex items-center justify-center w-[92px] h-[25px] lg:w-[138px] lg:h-[38px]">
      <NuxtLink :to="localePath('/')">
        <img class="w-full h-full" src="/images/logo.svg" alt="" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
</script>