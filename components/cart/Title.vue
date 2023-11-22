<template>
  <!-- Desktop Title -->
  <h3 class="hidden lg:block text-gray-900 font-bold text-[28px] leading-5 lg:pt-[83px]">
    {{ $t('cart_title') }} ({{ count }})
  </h3>
  <!-- Mobile Title -->
  <div class="h-[60px] mt-[26px] justify-start items-center lg:hidden flex gap-[5px] px-5 bg-white rounded-lg shadow">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="black"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <h3 class="text-black font-bold leading-6 text-base">
      {{ $t('cart_title') }} ({{ count }})
    </h3>
  </div>

</template>

<script setup>
const props = defineProps({
  count: {
    type: Number
  }
})
</script>