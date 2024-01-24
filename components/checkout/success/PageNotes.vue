<template>
  <div class="flex flex-col gap-[35px] lg:px-[30px] lg:py-[15px] px-5 py-[30px]">
    <!-- Delivery Time -->
    <div class="flex flex-col gap-[10px] justify-start">
      <!-- Title -->
      <h5 class="flex gap-3 h-9 justify-start items-center text-black font-extrabold lg:font-bold text-sm lg:text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 lg:w-[30px] lg:h-[30px]" viewBox="0 0 30 30" fill="none">
          <path
            d="M15 10V15L18.75 18.75M26.25 15C26.25 21.2132 21.2132 26.25 15 26.25C8.7868 26.25 3.75 21.2132 3.75 15C3.75 8.7868 8.7868 3.75 15 3.75C21.2132 3.75 26.25 8.7868 26.25 15Z"
            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>{{ $t('checkout_success_shipping_title') }}</span>
      </h5>
      <!-- Content -->
      <p class="text-black font-normal text-sm lg:text-base leading-[30px]">{{ $t('checkout_success_shipping_details') }}
      </p>
    </div>


    <!-- Shipment Tracking notes -->
    <div class="flex flex-col gap-[10px] justify-start">
      <!-- Title -->
      <h5 class="flex gap-3 h-9 justify-start items-center text-black font-extrabold lg:font-bold text-sm lg:text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 lg:w-[30px] lg:h-[30px]" viewBox="0 0 30 30" fill="none">
          <path
            d="M16.25 20V7.5C16.25 6.80964 15.6904 6.25 15 6.25H5C4.30964 6.25 3.75 6.80964 3.75 7.5V20C3.75 20.6904 4.30964 21.25 5 21.25H6.25M16.25 20C16.25 20.6904 15.6904 21.25 15 21.25H11.25M16.25 20L16.25 10C16.25 9.30964 16.8096 8.75 17.5 8.75H20.7322C21.0638 8.75 21.3817 8.8817 21.6161 9.11612L25.8839 13.3839C26.1183 13.6183 26.25 13.9362 26.25 14.2678V20C26.25 20.6904 25.6904 21.25 25 21.25H23.75M16.25 20C16.25 20.6904 16.8096 21.25 17.5 21.25H18.75M6.25 21.25C6.25 22.6307 7.36929 23.75 8.75 23.75C10.1307 23.75 11.25 22.6307 11.25 21.25M6.25 21.25C6.25 19.8693 7.36929 18.75 8.75 18.75C10.1307 18.75 11.25 19.8693 11.25 21.25M18.75 21.25C18.75 22.6307 19.8693 23.75 21.25 23.75C22.6307 23.75 23.75 22.6307 23.75 21.25M18.75 21.25C18.75 19.8693 19.8693 18.75 21.25 18.75C22.6307 18.75 23.75 19.8693 23.75 21.25"
            stroke="black" stroke-width="2" />
        </svg>
        <span>{{ $t('checkout_success_shipping_tracking_title') }}</span>
      </h5>
      <!-- Content -->
      <div class="flex flex-col justify-start gap-[15px] text-black font-normal text-sm lg:text-base leading-[30px]">
        <h6 class="hidden lg:block">
          {{ $t('checkout_success_shipping_tracking_subtitle') }}
        </h6>
        <div class="flex justify-start items-center gap-[5px]">
          <span>1. {{ $t('checkout_success_shipping_tracking_step1_title') }}</span>
          <NuxtLink :to="tracking_url ? tracking_url :''" target="_blank"
            class="flex justify-center items-center gap-[8px] w-[123px] h-[34px] rounded-md bg-white shadow-sm ring-1 ring-gray-300">
            <span>{{ $t('text_track') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8.7999 2.40039C8.35808 2.40039 7.9999 2.75856 7.9999 3.20039C7.9999 3.64222 8.35808 4.00039 8.7999 4.00039H10.8685L5.83422 9.03471C5.5218 9.34713 5.5218 9.85366 5.83422 10.1661C6.14664 10.4785 6.65317 10.4785 6.96559 10.1661L11.9999 5.13176V7.20039C11.9999 7.64222 12.3581 8.00039 12.7999 8.00039C13.2417 8.00039 13.5999 7.64222 13.5999 7.20039V3.20039C13.5999 2.75856 13.2417 2.40039 12.7999 2.40039H8.7999Z"
                fill="#6B7280" />
              <path
                d="M3.9999 4.00039C3.11625 4.00039 2.3999 4.71673 2.3999 5.60039V12.0004C2.3999 12.884 3.11625 13.6004 3.9999 13.6004H10.3999C11.2836 13.6004 11.9999 12.884 11.9999 12.0004V9.60039C11.9999 9.15856 11.6417 8.80039 11.1999 8.80039C10.7581 8.80039 10.3999 9.15856 10.3999 9.60039V12.0004H3.9999V5.60039L6.3999 5.60039C6.84173 5.60039 7.1999 5.24222 7.1999 4.80039C7.1999 4.35856 6.84173 4.00039 6.3999 4.00039H3.9999Z"
                fill="#6B7280" />
            </svg>
          </NuxtLink>
        </div>
        <span class="text-gray-500 text-sm -mt-1.5">{{ $t('checkout_success_shipping_tracking_step1_notes') }}</span>

        <div class="flex justify-start items-center gap-[5px] mt-1.5">
          <span>2. {{ $t('checkout_success_shipping_tracking_step2_title1') }}</span>
          <span class="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full bg-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1.6001 2.39961C1.6001 1.95778 1.95827 1.59961 2.4001 1.59961H4.1224C4.51347 1.59961 4.84722 1.88234 4.91151 2.26809L5.50296 5.81679C5.5607 6.16321 5.38574 6.50679 5.07162 6.66385L3.83311 7.2831C4.72614 9.50227 6.49744 11.2736 8.7166 12.1666L9.33586 10.9281C9.49292 10.614 9.83649 10.439 10.1829 10.4967L13.7316 11.0882C14.1174 11.1525 14.4001 11.4862 14.4001 11.8773V13.5996C14.4001 14.0414 14.0419 14.3996 13.6001 14.3996H12.0001C6.25634 14.3996 1.6001 9.74337 1.6001 3.99961V2.39961Z"
                fill="white" />
            </svg>
          </span>
          <span>{{ $t('checkout_success_shipping_tracking_step2_title2') }}</span>
        </div>
        <div class="flex justify-start items-center gap-2 -mt-1.5">
          <input v-model="subscribe_whatsapp" id="whatsapp-sub" name="whatsapp-sub" type="checkbox" checked="checked"
            class="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-transparent cursor-pointer" />
          <label for="whatsapp-sub" class="block font-normal text-sm leading-5 text-gray-900 cursor-pointer">{{
            $t('text_subscription') }}</label>
        </div>

      </div>

    </div>

    <!-- Support team -->
    <div class="flex flex-col gap-[10px] justify-start">
      <!-- Title -->
      <h5 class="flex gap-3 h-9 justify-start items-center text-black font-extrabold lg:font-bold text-sm lg:text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 lg:w-[30px] lg:h-[30px]" viewBox="0 0 30 30" fill="none">
          <path
            d="M16.25 20H15V15H13.75M15 10H15.0125M26.25 15C26.25 21.2132 21.2132 26.25 15 26.25C8.7868 26.25 3.75 21.2132 3.75 15C3.75 8.7868 8.7868 3.75 15 3.75C21.2132 3.75 26.25 8.7868 26.25 15Z"
            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>{{ $t('checkout_success_support_title') }}</span>
      </h5>
      <!-- Content -->
      <p class="text-black font-normal text-sm leading-[30px]">
        {{ $t('cart_notes_support_content') }}
        <NuxtLink :to="localePath('/')" class="font-bold">{{ $t('cart_notes_support_link') }}</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
const props = defineProps({
  tracking_url: {
    type: String,
  }
})

const subscribe_whatsapp = ref(false)
</script>