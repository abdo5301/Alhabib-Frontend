<template>
  <div class="flex flex-col gap-5 pt-[50px] lg:pt-[90px]">
    <div class="flex items-center justify-between h-[38px]">
      <!-- Cart Title -->
      <h3 class="text-gray-900 font-bold text-xl leading-5">
        {{ $t('cart_title') }} ({{ cartCount }})
      </h3>
      <NuxtLink :to="localePath('/cart')"
        class="h-full w-[75px] lg:mx-[30px] flex items-center justify-center shadow-sm ring-1 ring-gray-300 rounded-md bg-white text-gray-700 text-sm font-semibold leading-5">
        {{ $t('edit_btn') }}
      </NuxtLink>
    </div>
    <div v-if="cartItems && cartItems.length > 0"
      class="w-full no-scrollbar flex flex-col justify-start items-start gap-5 lg:max-h-[370px] overflow-hidden hover:overflow-y-auto">
      <!-- Looping here -->
      <CheckoutCartProductItem v-for="(item, index) in cartItems" :key="index" :cart_item="item" />
    </div>
    <!-- Support -->
    <div class="w-full flex flex-col gap-.5 justify-start">
      <div class="h-10 flex justify-start items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
          <path
            d="M10.8333 13.6107H10V10.2773H9.16667M10 6.94401H10.0083M17.5 10.2773C17.5 14.4195 14.1421 17.7773 10 17.7773C5.85786 17.7773 2.5 14.4195 2.5 10.2773C2.5 6.13521 5.85786 2.77734 10 2.77734C14.1421 2.77734 17.5 6.13521 17.5 10.2773Z"
            stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="text-gray-500 text-xs font-semibold leading-4">
          {{ $t('cart_notes_support_title') }}
        </span>
      </div>
      <div class="text-gray-500 text-xs leading-4 font-medium flex justify-start items-center gap-1">
        <span>{{ $t('cart_notes_support_content') }}</span>
        <NuxtLink :to="localePath('/')" class="font-extrabold">{{ $t('cart_notes_support_link') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
const { cartCount, cartItems } = useCart()
</script>