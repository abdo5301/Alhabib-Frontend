<template>
  <footer class="bg-gray-200 w-full max-w-full">
    <div class="mx-auto lg:w-[90%] w-full bg-gray-200 overflow-x-hidden lg:block flex flex-col justify-center items-center">
      <div
        class="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between justify-center pt-[40px] lg:px-4 lg:pt-[73px] w-full">
        <!--Start Right Section -->
        <div class="hidden lg:flex gap-5 items-start justify-between py-2 mx-20">
          <div class="flex flex-col gap-4 w-44">
            <h2 class="text-xl font-extrabold text-gray-600 uppercase">{{ $t('footer_help_menu_title') }}</h2>
            <ul class="text-gray-600 font-normal text-sm flex flex-col gap-4">
              <li>
                <NuxtLink :to="localePath('/contact-us')" class="hover:underline text-base">{{
                  $t('footer_help_menu_contact') }}</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('/Quiz')" class="hover:underline text-base">{{ $t('footer_help_menu_faq') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('/shipping')" class="hover:underline">{{ $t('footer_help_menu_shipping') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('/return')" class="hover:underline">{{ $t('footer_help_menu_return') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('account/order')" class="hover:underline">{{
                  $t('footer_help_menu_return_ticket') }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-4 w-44">
            <h2 class="text-xl font-extrabold text-gray-600 uppercase">{{ $t('footer_info_menu_title') }}</h2>
            <ul class="text-gray-600 font-normal text-sm flex flex-col gap-4">
              <li>
                <NuxtLink :to="localePath('/about-us')" class="hover:underline text-base">{{
                  $t('footer_info_menu_about') }}</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="localePath('/blog')" class="hover:underline">{{ $t('footer_info_menu_blog') }}</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/sitemap.html" target="_blank" class="hover:underline">{{ $t('footer_info_menu_site_map') }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-4 w-44">
            <h2 class="text-xl font-extrabold text-gray-600 uppercase">{{ $t('footer_branches_menu_title') }}</h2>
            <ul class="text-gray-600 font-normal text-sm flex flex-col gap-4">
              <li>
                <NuxtLink target="_blank" to="#" class="hover:underline text-sm">{{ $t('footer_branches_menu_1') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink target="_blank"
                  to="https://www.google.com/maps/place/Alhabib+Bedding/@24.7251951,46.7555043,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2f0196e7c3760b:0x95c39d5c44dafd88!8m2!3d24.7251951!4d46.7555043!16s%2Fg%2F11jyx92rgs?hl=en-SA&shorturl=1&entry=tts&shorturl=1"
                  class="hover:underline text-sm">{{ $t('footer_branches_menu_2') }}</NuxtLink>
              </li>
              <li>
                <NuxtLink target="_blank"
                  to="https://www.google.com/maps/place/%D9%85%D9%81%D8%A7%D8%B1%D8%B4+%D8%A7%D9%84%D8%AD%D8%A8%D9%8A%D8%A8+%7C+Alhabib+Bedding%E2%80%AD/@24.7253326,46.6876522,12z/data=!4m6!3m5!1s0x3e2efd776f821de9:0x2b0778664ce1a91a!8m2!3d24.8068988!4d46.7363265!16s%2Fg%2F11twz11nlv?hl=en-SA&coh=164777&shorturl=1&entry=tts&shorturl=1"
                  class="hover:underline text-sm">{{ $t('footer_branches_menu_3') }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="flex">
            <NuxtLink target="_blank" to="https://alhabibshop.com/image/catalog/footer/VATRegistrationCertificate.png">
              <img src="/images/vat.png" width="40" alt="VAT">
            </NuxtLink>
          </div>
          <div class="flex">
            <NuxtLink to="#">
              <img src="/images/nadav-logo-1.svg" alt="NADAV">
            </NuxtLink>
          </div>
        </div>
        <!--End Right Section -->

        <!--Start Left Section -->
        <div class="flex gap-5 items-start flex-col mx-auto lg:px-12 px-4 max-w-max">
          <!--Start Download App Section -->
          <div class="flex flex-col gap-5">
            <div
              class="flex  w-full items-center lg:gap-4 gap-[10px] bg-white rounded-[14px] px-[5px] lg:px-2 py-1 ring-gray-200">
              <div
                class="flex items-center min-w-max py-[2px] px-[5px] lg:px-2 text-yellow-800 bg-yellow-300 rounded-[10px] text-xs lg:text-sm font-semibold">
                {{ $t('footer_keep') }}</div>
              <div class="w-full flex items-center justify-between lg:gap-2">
                <span class="text-[13px] lg:text-sm font-normal text-black flex-1">{{ $t('footer_download_app') }}
                </span>
                <span>
                  <svg v-if="$lang.code == 'ar'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
                      fill="#6B7280" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 19 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M6.92826 5.29289C6.55726 5.68342 6.55726 6.31658 6.92826 6.70711L10.0565 10L6.92826 13.2929C6.55726 13.6834 6.55726 14.3166 6.92826 14.7071C7.29925 15.0976 7.90076 15.0976 8.27176 14.7071L12.0718 10.7071C12.4428 10.3166 12.4428 9.68342 12.0718 9.29289L8.27176 5.29289C7.90076 4.90237 7.29925 4.90237 6.92826 5.29289Z"
                      fill="#6B7280" />
                  </svg>
                </span>
                <span class="hidden lg:flex px-1"></span>
              </div>
            </div>
            <div class="flex gap-[14px] w-full">
              <NuxtLink target="_blank"
                to="https://apps.apple.com/sa/app/%D9%85%D9%81%D8%A7%D8%B1%D8%B4-%D8%A7%D9%84%D8%AD%D8%A8%D9%8A%D8%A8/id1420285929">
                <img v-if="$lang.dir == 'rtl'" src="/images/download-app/app-store-ar.svg" alt="App Store">
                <img v-else src="/images/download-app/app-store-en.svg" alt="App Store">
              </NuxtLink>
              <NuxtLink target="_blank" to="https://play.google.com/store/apps/details?id=com.alhabibshop.android">
                <img v-if="$lang.dir == 'rtl'" src="/images/download-app/google-play-ar.svg" alt="Google Play">
                <img v-else src="/images/download-app/google-play-en.svg" alt="App Store">
              </NuxtLink>
            </div>
          </div>
          <!--End Download App Section -->

          <!--Start Newsletter Section -->
          <div class="pt-2 flex flex-col gap-5 w-full max-w-full">
            <div class="flex gap-1 px-[10px] lg:px-0 order-2 lg:order-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24" viewBox="0 0 26 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.49998 2.3999C7.21795 2.3999 7.79998 2.93716 7.79998 3.5999V4.7999H9.09998C9.81795 4.7999 10.4 5.33716 10.4 5.9999C10.4 6.66264 9.81795 7.1999 9.09998 7.1999H7.79998V8.3999C7.79998 9.06264 7.21795 9.5999 6.49998 9.5999C5.78201 9.5999 5.19998 9.06264 5.19998 8.3999V7.1999H3.89998C3.18201 7.1999 2.59998 6.66264 2.59998 5.9999C2.59998 5.33716 3.18201 4.7999 3.89998 4.7999H5.19998V3.5999C5.19998 2.93716 5.78201 2.3999 6.49998 2.3999ZM6.49998 14.3999C7.21795 14.3999 7.79998 14.9372 7.79998 15.5999V16.7999H9.09998C9.81795 16.7999 10.4 17.3372 10.4 17.9999C10.4 18.6626 9.81795 19.1999 9.09998 19.1999H7.79998V20.3999C7.79998 21.0626 7.21795 21.5999 6.49998 21.5999C5.78201 21.5999 5.19998 21.0626 5.19998 20.3999V19.1999H3.89998C3.18201 19.1999 2.59998 18.6626 2.59998 17.9999C2.59998 17.3372 3.18201 16.7999 3.89998 16.7999H5.19998V15.5999C5.19998 14.9372 5.78201 14.3999 6.49998 14.3999Z"
                  fill="#111827" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15.5999 2.3999C16.1898 2.3999 16.7057 2.76648 16.8566 3.29283L18.3896 8.63862L22.7495 10.9605C23.152 11.1748 23.3999 11.571 23.3999 11.9999C23.3999 12.4288 23.152 12.825 22.7495 13.0393L18.3896 15.3612L16.8566 20.707C16.7057 21.2333 16.1898 21.5999 15.5999 21.5999C15.0101 21.5999 14.4941 21.2333 14.3432 20.707L12.8102 15.3612L8.45033 13.0393C8.04791 12.825 7.79998 12.4288 7.79998 11.9999C7.79998 11.571 8.04791 11.1748 8.45033 10.9605L12.8102 8.63862L14.3432 3.29283C14.4941 2.76648 15.0101 2.3999 15.5999 2.3999Z"
                  fill="#111827" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.49998 2.3999C7.21795 2.3999 7.79998 2.93716 7.79998 3.5999V4.7999H9.09998C9.81795 4.7999 10.4 5.33716 10.4 5.9999C10.4 6.66264 9.81795 7.1999 9.09998 7.1999H7.79998V8.3999C7.79998 9.06264 7.21795 9.5999 6.49998 9.5999C5.78201 9.5999 5.19998 9.06264 5.19998 8.3999V7.1999H3.89998C3.18201 7.1999 2.59998 6.66264 2.59998 5.9999C2.59998 5.33716 3.18201 4.7999 3.89998 4.7999H5.19998V3.5999C5.19998 2.93716 5.78201 2.3999 6.49998 2.3999ZM6.49998 14.3999C7.21795 14.3999 7.79998 14.9372 7.79998 15.5999V16.7999H9.09998C9.81795 16.7999 10.4 17.3372 10.4 17.9999C10.4 18.6626 9.81795 19.1999 9.09998 19.1999H7.79998V20.3999C7.79998 21.0626 7.21795 21.5999 6.49998 21.5999C5.78201 21.5999 5.19998 21.0626 5.19998 20.3999V19.1999H3.89998C3.18201 19.1999 2.59998 18.6626 2.59998 17.9999C2.59998 17.3372 3.18201 16.7999 3.89998 16.7999H5.19998V15.5999C5.19998 14.9372 5.78201 14.3999 6.49998 14.3999Z"
                  stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15.5999 2.3999C16.1898 2.3999 16.7057 2.76648 16.8566 3.29283L18.3896 8.63862L22.7495 10.9605C23.152 11.1748 23.3999 11.571 23.3999 11.9999C23.3999 12.4288 23.152 12.825 22.7495 13.0393L18.3896 15.3612L16.8566 20.707C16.7057 21.2333 16.1898 21.5999 15.5999 21.5999C15.0101 21.5999 14.4941 21.2333 14.3432 20.707L12.8102 15.3612L8.45033 13.0393C8.04791 12.825 7.79998 12.4288 7.79998 11.9999C7.79998 11.571 8.04791 11.1748 8.45033 10.9605L12.8102 8.63862L14.3432 3.29283C14.4941 2.76648 15.0101 2.3999 15.5999 2.3999Z"
                  stroke="white" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="text-lg text-black font-bold">{{ $t('footer_newsletter_title') }}</span>
            </div>
            <p class="flex text-gray-500 text-xs lg:text-base font-normal order-3 lg:order-2  lg:min-w-full min-w-max">
              {{ $t('footer_newsletter_description') }}</p>
            <div class="w-full order-1 lg:order-3">
              <form class="w-full flex gap-3 items-center max-w-full" action="#" @submit.prevent="subscribe_newsletter">
                <Input v-model="newsletter_email" input_id="footer-newsletter" input_type="email" class="w-3/4"
                  input_style="h-[40px] placeholder:text-sm" input_name="newsletter"
                  :input_placeholder="$t('footer_newsletter_placeholder')" :error_text="newsletter_error"
                  input_aria_describedby="footer-newsletter-error" />
                <Button type="submit" color="black"
                  class="flex mt-[4.5px] w-[110px] lg:w-[129px] h-[38px] justify-center font-extrabold text-[12px] lg:text-[14px] leading-4">
                  {{ $t('footer_newsletter_submit') }}
                </Button>
              </form>
            </div>
          </div>
          <!--End Newsletter Section -->
        </div>
        <!--End Left Section -->

        <div class="lg:hidden flex flex-col items-center justify-center gap-12 pt-9 w-full px-7">
          <div class="w-full flex flex-col items-center justify-center">
            <button type="button"
              class="flex items-center  font-semibold border-b border-gray-500 w-full max-w-sm p-2 text-lg text-gray-600 transition duration-75 group"
              aria-controls="dropdown-help" data-collapse-toggle="dropdown-help">
              <span class="inline-block whitespace-nowrap flex-1 rtl:mr-[26px] ltr:ml-[26px]">{{
                $t('footer_help_menu_title') }}</span>
              <span class="rtl:ml-4 ltr:mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="" width="20" height="24" viewBox="0 0 20 24" fill="none">
                  <path d="M16.5827 8.95001L11.155 15.47C10.514 16.24 9.46512 16.24 8.82413 15.47L3.39648 8.95001"
                    stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
            </button>
            <div id="dropdown-help" class="hidden pt-4">
              <ul class="text-gray-600 font-normal text-sm flex flex-col gap-4 items-center">
                <li>
                  <NuxtLink :to="localePath('/contact-us')" class="hover:underline text-base">{{
                    $t('footer_help_menu_contact') }}</NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/Quiz')" class="hover:underline text-base">{{ $t('footer_help_menu_faq') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/shipping')" class="hover:underline">{{ $t('footer_help_menu_shipping') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/return')" class="hover:underline">{{ $t('footer_help_menu_return') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/account/order')" class="hover:underline">{{
                    $t('footer_help_menu_return_ticket') }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="w-full flex flex-col items-center justify-center">
            <button type="button"
              class="flex items-center font-semibold border-b border-gray-500 w-full max-w-sm p-2 text-lg text-gray-600 transition duration-75 group"
              aria-controls="dropdown-information" data-collapse-toggle="dropdown-information">
              <span class="inline-block whitespace-nowrap flex-1 rtl:mr-[26px] ltr:ml-[26px]">{{
                $t('footer_info_menu_title') }}</span>
              <span class="rtl:ml-4 ltr:mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="" width="20" height="24" viewBox="0 0 20 24" fill="none">
                  <path d="M16.5827 8.95001L11.155 15.47C10.514 16.24 9.46512 16.24 8.82413 15.47L3.39648 8.95001"
                    stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
            </button>
            <div id="dropdown-information" class="hidden pt-4">
              <ul class="text-gray-600 font-normal text-sm flex flex-col gap-4 items-center">
                <li>
                  <NuxtLink :to="localePath('/about-us')" class="hover:underline text-base">{{
                    $t('footer_info_menu_about') }}</NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="localePath('/blog')" class="hover:underline">{{ $t('footer_info_menu_blog') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/sitemap.html" target="_blank" class="hover:underline">{{ $t('footer_info_menu_site_map') }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
          <div class="w-full flex flex-col items-center justify-center">
            <button type="button"
              class="flex items-center font-semibold border-b border-gray-500 w-full max-w-sm p-2 text-lg text-gray-600 transition duration-75 group"
              aria-controls="dropdown-branches" data-collapse-toggle="dropdown-branches">
              <span class="inline-block whitespace-nowrap flex-1 rtl:mr-[26px] ltr:ml-[26px]">{{
                $t('footer_branches_menu_title') }}</span>
              <span class="rtl:ml-4 ltr:mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="" width="20" height="24" viewBox="0 0 20 24" fill="none">
                  <path d="M16.5827 8.95001L11.155 15.47C10.514 16.24 9.46512 16.24 8.82413 15.47L3.39648 8.95001"
                    stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
            </button>
            <div id="dropdown-branches" class="hidden pt-4">
              <ul class="text-gray-600 font-normal text-sm flex flex-col gap-4 items-center">
                <li>
                  <NuxtLink to="#" target="_blank" class="hover:underline text-base">{{ $t('footer_branches_menu_1') }}
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="https://www.google.com/maps/place/Alhabib+Bedding/@24.7251951,46.7555043,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2f0196e7c3760b:0x95c39d5c44dafd88!8m2!3d24.7251951!4d46.7555043!16s%2Fg%2F11jyx92rgs?hl=en-SA&shorturl=1&entry=tts&shorturl=1"
                    target="_blank" class="hover:underline">{{ $t('footer_branches_menu_2') }}</NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="https://www.google.com/maps/place/%D9%85%D9%81%D8%A7%D8%B1%D8%B4+%D8%A7%D9%84%D8%AD%D8%A8%D9%8A%D8%A8+%7C+Alhabib+Bedding%E2%80%AD/@24.7253326,46.6876522,12z/data=!4m6!3m5!1s0x3e2efd776f821de9:0x2b0778664ce1a91a!8m2!3d24.8068988!4d46.7363265!16s%2Fg%2F11twz11nlv?hl=en-SA&coh=164777&shorturl=1&entry=tts&shorturl=1"
                    target="_blank" class="hover:underline">{{ $t('footer_branches_menu_3') }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <hr class="hidden lg:block mb-5 mt-8 w-full border-black sm:mx-auto" />

      <div class="flex flex-col lg:flex-row gap-8 items-center justify-between w-full max-w-full pb-3 lg:px-10 px-3 pt-7 lg:pt-0">
        <!--Copy Rights Section -->
        <span class="text-sm font-normal text-gray-700 order-2">
          {{ $t('footer_copy_right') }}
        </span>

        <!--Payments Section -->
        <div class="flex items-center content-center order-3">
          <img src="/images/payments-icons.svg" alt="Payments">
        </div>

        <!--Social media Section -->
        <div class="flex gap-6 items-center content-center order-1 lg:order-3">
          <NuxtLink title="YouTube" target="_blank" to="https://www.youtube.com/c/alhabibshop_sa"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path
                d="M17 20.5H7C4 20.5 2 18.5 2 15.5V9.5C2 6.5 4 4.5 7 4.5H17C20 4.5 22 6.5 22 9.5V15.5C22 18.5 20 20.5 17 20.5Z"
                stroke="#9CA3AF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                stroke-linejoin="round" />
              <path
                d="M11.4001 9.99981L13.9001 11.4998C14.8001 12.0998 14.8001 12.9998 13.9001 13.5998L11.4001 15.0998C10.4001 15.6998 9.6001 15.1998 9.6001 14.0998V11.0998C9.6001 9.79981 10.4001 9.39981 11.4001 9.99981Z"
                stroke="#9CA3AF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            <span class="sr-only">YouTube Page</span>
          </NuxtLink>
          <NuxtLink title="Pinterest" target="_blank" to="https://www.pinterest.com/alhabibshop/"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
              <g clip-path="url(#clip0_1_359)">
                <path
                  d="M10 0.5C8.02219 0.5 6.08879 1.08649 4.4443 2.1853C2.79981 3.28412 1.51809 4.8459 0.761209 6.67317C0.00433289 8.50043 -0.193701 10.5111 0.192152 12.4509C0.578004 14.3907 1.53041 16.1725 2.92894 17.5711C4.32746 18.9696 6.10929 19.922 8.0491 20.3079C9.98891 20.6937 11.9996 20.4957 13.8268 19.7388C15.6541 18.9819 17.2159 17.7002 18.3147 16.0557C19.4135 14.4112 20 12.4778 20 10.5C20 7.84784 18.9464 5.3043 17.0711 3.42893C15.1957 1.55357 12.6522 0.5 10 0.5ZM10.9198 13.5285C10.5899 13.5362 10.2634 13.4603 9.97073 13.3078C9.67805 13.1553 9.42874 12.9312 9.246 12.6564C9.246 12.6564 8.84944 14.2661 8.76418 14.579C8.60942 15.0959 8.3844 15.5891 8.09543 16.0448C7.73329 16.5141 7.31326 16.1668 7.26633 15.7319C7.24023 15.2075 7.28043 14.6819 7.386 14.1676C7.51819 13.6005 8.26672 10.3576 8.26672 10.3576C8.11753 10.0082 8.04294 9.63155 8.04772 9.25166C8.04772 8.21529 8.63591 7.44173 9.3688 7.44173C9.50115 7.44152 9.63203 7.46956 9.75268 7.52399C9.87334 7.57842 9.98098 7.65797 10.0684 7.75733C10.1559 7.85669 10.2211 7.97357 10.2597 8.10017C10.2984 8.22676 10.3096 8.36014 10.2925 8.4914C10.1605 9.33381 9.95824 10.1637 9.68792 10.9724C9.64559 11.1348 9.64182 11.3047 9.67691 11.4688C9.712 11.6328 9.78499 11.7864 9.89003 11.9172C9.99506 12.048 10.1292 12.1524 10.2818 12.2221C10.4344 12.2918 10.6012 12.3248 10.7689 12.3185C12.0665 12.3185 12.941 10.6165 12.941 8.6009C12.9558 8.23027 12.8908 7.86078 12.7503 7.51748C12.6099 7.17418 12.3972 6.86509 12.1269 6.61117C11.8565 6.35725 11.5346 6.16443 11.1832 6.04579C10.8318 5.92715 10.4589 5.88546 10.09 5.92354C9.64569 5.91071 9.20345 5.98837 8.79014 6.15181C8.37683 6.31525 8.00108 6.56105 7.68574 6.87426C7.37041 7.18747 7.12207 7.56155 6.95585 7.97375C6.78962 8.38595 6.70898 8.82765 6.71882 9.272C6.69718 9.76889 6.85797 10.2566 7.17091 10.6431C7.22649 10.6896 7.26595 10.7524 7.28365 10.8227C7.30135 10.8929 7.29639 10.967 7.26946 11.0342C7.23661 11.1633 7.16152 11.4722 7.13024 11.595C7.12497 11.6324 7.11079 11.6679 7.08887 11.6986C7.06695 11.7293 7.03796 11.7543 7.00434 11.7714C6.97072 11.7885 6.93348 11.7973 6.89575 11.797C6.85803 11.7966 6.82095 11.7872 6.78765 11.7695C6.31508 11.5138 5.92933 11.1232 5.67957 10.6475C5.4298 10.1718 5.32734 9.63252 5.38522 9.09836C5.38522 7.11165 7.02777 4.72996 10.28 4.72996C10.8291 4.70234 11.3782 4.78464 11.895 4.97202C12.4119 5.1594 12.8861 5.44809 13.2899 5.82116C13.6937 6.19423 14.019 6.64418 14.2466 7.14461C14.4743 7.64504 14.5997 8.18589 14.6156 8.73543C14.6156 11.4793 13.1216 13.5285 10.9198 13.5285Z"
                  fill="#9CA3AF" />
              </g>
              <defs>
                <clipPath id="clip0_1_359">
                  <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                </clipPath>
              </defs>
            </svg>
            <span class="sr-only">Pinterest Page</span>
          </NuxtLink>
          <NuxtLink to="https://www.snapchat.com/add/alhabibshop" target="_blank"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M18.5912 14.2407C18.1007 14.537 17.7737 14.537 17.4466 14.6852C17.1196 14.6852 16.9561 14.8333 16.7926 14.9815C16.4656 14.9815 16.4656 15.2778 16.4656 15.4259C16.4656 15.5741 16.4656 15.7222 16.3021 15.8704C16.1386 16.0185 15.8115 16.0185 15.4845 16.0185C14.994 16.0185 14.3399 16.0185 13.6859 16.3148C13.3589 16.463 13.0319 16.6111 12.7048 16.7593C12.0508 17.2037 11.3967 17.5 10.0887 17.5C8.78057 17.5 8.12653 17.0556 7.47249 16.7593C7.14547 16.6111 6.81844 16.3148 6.49142 16.3148C5.83738 16.1667 5.18334 16.0185 4.6928 16.0185C4.36578 16.0185 4.03876 16.0185 3.87525 15.8704C3.38472 15.7222 3.38472 15.5741 3.38472 15.4259C3.38472 15.2778 3.38472 14.9815 3.0577 14.9815C2.89418 14.8333 2.56716 14.8333 2.40365 14.6852C2.07663 14.537 1.74961 14.537 1.25908 14.2407C0.768544 13.9444 1.09557 13.7963 1.25908 13.6481C4.36578 12.3148 4.85631 10.0926 4.85631 9.94444C4.85631 9.7963 4.85631 9.64815 4.6928 9.5C4.52929 9.35185 4.03876 9.05556 3.54823 8.90741C3.38472 8.75926 3.22121 8.75926 3.0577 8.61111C2.56716 8.31482 2.40365 8.01852 2.56716 7.72222C2.73067 7.42593 2.89418 7.42593 3.22121 7.42593C3.38472 7.42593 3.38472 7.42593 3.54823 7.42593C3.87525 7.42593 4.20227 7.57407 4.36578 7.72222C4.52929 7.72222 4.6928 7.87037 4.85631 7.87037C4.85631 7.87037 4.85631 7.87037 5.01983 7.87037C5.18334 7.87037 5.18334 7.87037 5.18334 7.57407V7.42593C5.18334 6.98148 5.01983 5.94444 5.18334 5.2037C5.34685 4.01852 5.67387 3.27778 6.32791 2.83333C6.65493 2.53704 7.79951 1.5 10.0887 1.5C12.3778 1.5 13.5224 2.68519 13.8494 2.83333C14.3399 3.42593 14.8305 4.01852 14.994 5.2037C15.1575 6.09259 14.994 6.98148 14.994 7.57407C14.994 7.72222 14.994 7.87037 15.1575 7.87037C15.1575 7.87037 15.1575 7.87037 15.321 7.87037C15.4845 7.87037 15.648 7.72222 15.8115 7.72222C16.1386 7.57407 16.3021 7.57407 16.6291 7.42593C16.6291 7.42593 16.7926 7.42593 16.9561 7.42593C17.2831 7.42593 17.4466 7.57407 17.6102 7.72222C17.7737 8.01852 17.6102 8.31482 17.1196 8.61111C16.9561 8.61111 16.7926 8.75926 16.6291 8.90741C16.3021 9.2037 15.648 9.5 15.4845 9.5C15.321 9.64815 15.321 9.7963 15.321 9.94444C15.321 10.0926 15.8115 12.1667 18.9182 13.6481C18.9182 13.7963 19.2453 13.9444 18.5912 14.2407Z"
                stroke="#9CA3AF" stroke-width="1.5" stroke-miterlimit="10" stroke-linejoin="round" />
            </svg>
            <span class="sr-only">Snapchat Page</span>
          </NuxtLink>
          <NuxtLink to="https://twitter.com/alhabib_shop#" target="_blank"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path
                d="M8.29 20.7534C15.837 20.7534 19.965 14.5004 19.965 9.0784C19.965 8.9004 19.965 8.7234 19.953 8.5484C20.7562 7.96693 21.4493 7.24701 22 6.4224C21.2511 6.7544 20.4566 6.97216 19.643 7.0684C20.4996 6.55546 21.1408 5.74875 21.447 4.7984C20.6417 5.27628 19.7607 5.61313 18.842 5.7944C18.2234 5.13616 17.405 4.70023 16.5136 4.5541C15.6222 4.40797 14.7075 4.5598 13.9111 4.98607C13.1147 5.41234 12.4811 6.08927 12.1083 6.91206C11.7355 7.73485 11.6444 8.65758 11.849 9.5374C10.2176 9.45564 8.6216 9.03172 7.16465 8.29317C5.70769 7.55461 4.42233 6.51792 3.392 5.2504C2.86732 6.1536 2.70659 7.22282 2.94254 8.24036C3.17848 9.25791 3.79337 10.1473 4.662 10.7274C4.00926 10.7085 3.37063 10.5329 2.8 10.2154V10.2674C2.80039 11.2147 3.1284 12.1327 3.7284 12.8658C4.3284 13.5988 5.16347 14.1018 6.092 14.2894C5.48781 14.4541 4.85389 14.4781 4.239 14.3594C4.50116 15.1749 5.01168 15.888 5.69913 16.399C6.38658 16.91 7.21657 17.1934 8.073 17.2094C7.22212 17.878 6.24779 18.3722 5.20573 18.6639C4.16367 18.9556 3.07432 19.039 2 18.9094C3.8766 20.1137 6.06019 20.7525 8.29 20.7494"
                fill="#9CA3AF" />
            </svg>
            <span class="sr-only">Twitter</span>
          </NuxtLink>
          <NuxtLink to="https://www.instagram.com/alhabib_shop/" target="_blank"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12.315 2.5C14.745 2.5 15.099 2.513 16.123 2.56C17.187 2.609 17.914 2.778 18.55 3.025C19.2175 3.27587 19.8222 3.66936 20.322 4.178C20.8306 4.67777 21.2241 5.2825 21.475 5.95C21.722 6.586 21.891 7.313 21.94 8.377C21.988 9.444 22 9.784 22 12.5V12.58C22 15.223 21.988 15.567 21.94 16.623C21.891 17.687 21.722 18.414 21.475 19.05C21.2241 19.7175 20.8306 20.3222 20.322 20.822C19.8222 21.3306 19.2175 21.7241 18.55 21.975C17.914 22.222 17.187 22.391 16.123 22.44C15.056 22.488 14.716 22.5 12 22.5H11.92C9.277 22.5 8.933 22.488 7.877 22.44C6.813 22.391 6.086 22.222 5.45 21.975C4.7825 21.7241 4.17777 21.3306 3.678 20.822C3.16936 20.3222 2.77587 19.7175 2.525 19.05C2.278 18.414 2.109 17.687 2.06 16.623C2.013 15.599 2 15.244 2 12.815V12.185C2 9.755 2.013 9.401 2.06 8.377C2.109 7.313 2.278 6.586 2.525 5.95C2.77587 5.2825 3.16936 4.67777 3.678 4.178C4.17777 3.66936 4.7825 3.27587 5.45 3.025C6.086 2.778 6.813 2.609 7.877 2.56C8.901 2.513 9.256 2.5 11.685 2.5H12.315ZM12.234 4.302H11.766C9.31 4.302 8.982 4.313 7.959 4.36C6.984 4.405 6.455 4.567 6.102 4.704C5.635 4.886 5.302 5.102 4.952 5.452C4.602 5.802 4.386 6.135 4.204 6.602C4.067 6.955 3.904 7.484 3.86 8.459C3.813 9.482 3.802 9.81 3.802 12.266V12.734C3.802 15.19 3.813 15.518 3.86 16.541C3.905 17.516 4.067 18.045 4.204 18.398C4.386 18.864 4.603 19.198 4.952 19.548C5.302 19.898 5.635 20.114 6.102 20.296C6.455 20.433 6.984 20.596 7.959 20.64C9.013 20.688 9.329 20.698 12 20.698H12.08C14.677 20.698 14.997 20.688 16.04 20.64C17.016 20.595 17.545 20.433 17.898 20.296C18.364 20.114 18.698 19.898 19.048 19.548C19.398 19.198 19.614 18.865 19.796 18.398C19.933 18.045 20.096 17.516 20.14 16.541C20.188 15.486 20.198 15.171 20.198 12.5V12.42C20.198 9.823 20.188 9.503 20.14 8.46C20.095 7.484 19.933 6.955 19.796 6.602C19.6358 6.16757 19.3802 5.7746 19.048 5.452C18.7254 5.11986 18.3324 4.86426 17.898 4.704C17.545 4.567 17.016 4.404 16.041 4.36C15.018 4.313 14.69 4.302 12.234 4.302ZM12 7.365C12.6743 7.365 13.3421 7.49782 13.9651 7.75588C14.5881 8.01394 15.1542 8.39218 15.631 8.86901C16.1078 9.34584 16.4861 9.91191 16.7441 10.5349C17.0022 11.1579 17.135 11.8257 17.135 12.5C17.135 13.1743 17.0022 13.8421 16.7441 14.4651C16.4861 15.0881 16.1078 15.6542 15.631 16.131C15.1542 16.6078 14.5881 16.9861 13.9651 17.2441C13.3421 17.5022 12.6743 17.635 12 17.635C10.6381 17.635 9.33201 17.094 8.36901 16.131C7.40601 15.168 6.865 13.8619 6.865 12.5C6.865 11.1381 7.40601 9.83201 8.36901 8.86901C9.33201 7.90601 10.6381 7.365 12 7.365ZM12 9.167C11.116 9.167 10.2683 9.51815 9.64321 10.1432C9.01815 10.7683 8.667 11.616 8.667 12.5C8.667 13.384 9.01815 14.2317 9.64321 14.8568C10.2683 15.4818 11.116 15.833 12 15.833C12.884 15.833 13.7317 15.4818 14.3568 14.8568C14.9818 14.2317 15.333 13.384 15.333 12.5C15.333 11.616 14.9818 10.7683 14.3568 10.1432C13.7317 9.51815 12.884 9.167 12 9.167ZM17.338 5.962C17.6563 5.962 17.9615 6.08843 18.1865 6.31347C18.4116 6.53852 18.538 6.84374 18.538 7.162C18.538 7.48026 18.4116 7.78548 18.1865 8.01053C17.9615 8.23557 17.6563 8.362 17.338 8.362C17.0197 8.362 16.7145 8.23557 16.4895 8.01053C16.2644 7.78548 16.138 7.48026 16.138 7.162C16.138 6.84374 16.2644 6.53852 16.4895 6.31347C16.7145 6.08843 17.0197 5.962 17.338 5.962Z"
                fill="#9CA3AF" />
            </svg>
            <span class="sr-only">Instagram</span>
          </NuxtLink>
          <NuxtLink to="https://www.facebook.com/alhabibshop" target="_blank"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M22 12.5C22 6.977 17.523 2.5 12 2.5C6.477 2.5 2 6.977 2 12.5C2 17.491 5.657 21.628 10.438 22.378V15.391H7.898V12.5H10.438V10.297C10.438 7.791 11.93 6.407 14.215 6.407C15.309 6.407 16.453 6.602 16.453 6.602V9.062H15.193C13.95 9.062 13.563 9.833 13.563 10.624V12.5H16.336L15.893 15.39H13.563V22.378C18.343 21.628 22 17.491 22 12.5Z"
                fill="#9CA3AF" />
            </svg>
            <span class="sr-only">Facebook Page</span>
          </NuxtLink>
        </div>

      </div>

      <div class="flex lg:hidden items-center justify-center mx-auto gap-5 pt-1 pb-4">
        <NuxtLink to="#">
          <img src="/images/nadav-logo-1.svg" alt="NADAV">
        </NuxtLink>
        <NuxtLink to="https://alhabibshop.com/image/catalog/footer/VATRegistrationCertificate.png">
          <img src="/images/vat.png" width="40" alt="VAT">
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { $lang } = useNuxtApp()
const newsletter_email = ref('')
const newsletter_error = ref('')
const localePath = useLocalePath()
function subscribe_newsletter() {
  var formBody = {
    subscribe_email: newsletter_email.value
  }
  console.log(formBody);
}
</script>