<template>
  <div class="flex flex-col lg:gap-4 lg:rtl:pr-[30px] lg:ltr:pl-[30px]">
    <!-- Shipping Time -->
    <div class="flex flex-col lg:gap-[6px] gap-[3px] justify-start">
      <!-- Title -->
      <h5 class="flex gap-[10px] h-10 justify-start items-center text-gray-500 font-semibold text-xs lg:text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
          <path
            d="M11.3333 13.3327V4.99935C11.3333 4.53911 10.9602 4.16602 10.5 4.16602H3.83333C3.3731 4.16602 3 4.53911 3 4.99935V13.3327C3 13.7929 3.3731 14.166 3.83333 14.166H4.66667M11.3333 13.3327C11.3333 13.7929 10.9602 14.166 10.5 14.166H8M11.3333 13.3327L11.3333 6.66602C11.3333 6.20578 11.7064 5.83268 12.1667 5.83268H14.3215C14.5425 5.83268 14.7545 5.92048 14.9107 6.07676L17.7559 8.92194C17.9122 9.07822 18 9.29018 18 9.51119V13.3327C18 13.7929 17.6269 14.166 17.1667 14.166H16.3333M11.3333 13.3327C11.3333 13.7929 11.7064 14.166 12.1667 14.166H13M4.66667 14.166C4.66667 15.0865 5.41286 15.8327 6.33333 15.8327C7.25381 15.8327 8 15.0865 8 14.166M4.66667 14.166C4.66667 13.2455 5.41286 12.4993 6.33333 12.4993C7.25381 12.4993 8 13.2455 8 14.166M13 14.166C13 15.0865 13.7462 15.8327 14.6667 15.8327C15.5871 15.8327 16.3333 15.0865 16.3333 14.166M13 14.166C13 13.2455 13.7462 12.4993 14.6667 12.4993C15.5871 12.4993 16.3333 13.2455 16.3333 14.166"
            stroke="#9CA3AF" stroke-width="2" />
        </svg>
        <span>{{ $t('cart_notes_shipping_title') }}</span>
      </h5>
      <!-- Content -->
      <p class="text-gray-500 font-medium text-xs lg:text-sm leading-4">{{ $t('cart_notes_shipping_content') }}</p>
    </div>

    <!-- Divider -->
    <div class="lg:hidden flex items-center justify-center h-[40px] w-full">
      <div class="border-b border-b-gray-100 w-full"></div>
    </div>

    <!-- Return notes -->
    <div class="flex flex-col lg:gap-[6px] gap-[3px] justify-start">
      <!-- Title -->
      <h5 class="flex gap-[10px] h-10 justify-start items-center text-gray-500 font-semibold text-xs lg:text-sm">
        <img src="/images/refresh-icon.png" class="w-5 h-5" alt="Return Order">
        <span>{{ $t('cart_notes_return_title') }}</span>
      </h5>
      <!-- Content -->
      <p class="text-gray-500 font-medium text-xs lg:text-sm lg:leading-4 leading-5">{{ $t('cart_notes_return_content') }}
      </p>
    </div>

    <!-- Divider -->
    <div class="lg:hidden flex items-center justify-center h-[40px] w-full">
      <div class="border-b border-b-gray-100 w-full"></div>
    </div>

    <!-- Support team -->
    <div class="flex flex-col lg:gap-[6px] gap-[3px] justify-start">
      <!-- Title -->
      <h5 class="flex gap-[10px] h-10 justify-start items-center text-gray-500 font-semibold text-xs lg:text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
          <path
            d="M11.3333 13.3333H10.5V10H9.66667M10.5 6.66667H10.5083M18 10C18 14.1421 14.6421 17.5 10.5 17.5C6.35786 17.5 3 14.1421 3 10C3 5.85786 6.35786 2.5 10.5 2.5C14.6421 2.5 18 5.85786 18 10Z"
            stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>{{ $t('cart_notes_support_title') }}</span>
      </h5>
      <!-- Content -->
      <p class="text-gray-500 font-medium text-xs lg:text-sm leading-4">
        {{ $t('cart_notes_support_content') }}
        <NuxtLink :to="localePath('/')" class="font-extrabold">{{ $t('cart_notes_support_link') }}</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
</script>