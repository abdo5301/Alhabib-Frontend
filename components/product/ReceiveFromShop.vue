<template>
  <!-- Modal trigger -->
  <div @click="modal.show()"
    class="w-full flex items-center justify-between lg:px-1 rtl:pr-4 rtl:pl-[11px] ltr:pl-4 ltr:pr-[11px] py-[18px] flex-shrink-0 bg-white rounded-md ring-1 ring-gray-400 cursor-pointer">
    <div class="flex gap-[17px] items-center justify-start">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-[45px] w-[35px] lg:h-[46px] h-[35px]" viewBox="0 0 45 46" fill="none">
          <path
            d="M30.0002 7.72168H22.5H14.9998H7.49965H0V11.0821C0 13.6802 1.67824 15.7864 3.74956 15.7864C5.82087 15.7864 7.49912 13.6802 7.49912 11.0821C7.49912 13.6802 9.17842 15.7864 11.2497 15.7864C13.32 15.7864 14.9993 13.6802 14.9993 11.0821C14.9993 13.6802 16.6781 15.7864 18.7489 15.7864C20.8202 15.7864 22.4995 13.6802 22.4995 11.0821C22.4995 13.6802 24.1788 15.7864 26.249 15.7864C28.3203 15.7864 29.9996 13.6802 29.9996 11.0821C29.9996 13.6802 31.6779 15.7864 33.7492 15.7864C35.8205 15.7864 37.4988 13.6802 37.4988 11.0821C37.4988 13.6802 39.1781 15.7864 41.2494 15.7864C43.3196 15.7864 44.9989 13.6802 44.9989 11.0821V7.72168H37.4993H30.0002Z"
            fill="black" />
          <path
            d="M41.0115 1.7101C40.4934 1.04402 39.4392 0.5 38.6663 0.5H6.33314C5.56024 0.5 4.50604 1.04402 3.98795 1.7101C3.98795 1.7101 3.98636 1.71133 3.9853 1.71255L0 6.85533H44.9995L41.0142 1.71255C41.0131 1.71194 41.0121 1.71133 41.0115 1.7101Z"
            fill="black" />
          <path
            d="M44.048 43.2949H0.951958C0.426447 43.2949 0 43.7887 0 44.3977C0 45.0067 0.426447 45.5005 0.951958 45.5005H44.048C44.5736 45.5005 45 45.0067 45 44.3977C45 43.7887 44.5736 43.2949 44.048 43.2949Z"
            fill="black" />
          <path
            d="M17.8013 31.4946C18.2428 31.4946 18.6007 31.0802 18.6007 30.5691C18.6007 30.0579 18.2428 29.6436 17.8013 29.6436C17.3599 29.6436 17.002 30.0579 17.002 30.5691C17.002 31.0802 17.3599 31.4946 17.8013 31.4946Z"
            fill="black" />
          <path
            d="M41.7639 42.1024V16.6424C41.5949 16.6663 41.4238 16.6811 41.25 16.6811C39.691 16.6811 38.3136 15.6991 37.4994 14.21C36.6857 15.6997 35.3079 16.6811 33.7499 16.6811C32.1908 16.6811 30.8135 15.6997 30.0003 14.21C29.1861 15.7004 27.8082 16.6811 26.2497 16.6811C24.6912 16.6811 23.3138 15.6991 22.5001 14.21C21.6859 15.6997 20.308 16.6811 18.7495 16.6811C17.191 16.6811 15.8142 15.6997 15 14.21C14.1863 15.7004 12.8089 16.6811 11.2504 16.6811C9.69135 16.6811 8.31401 15.6991 7.49978 14.21C6.68609 15.6997 5.30821 16.6811 3.75023 16.6811C3.57594 16.6811 3.40483 16.6663 3.23584 16.6424V42.1024H7.63434V20.8523C7.63434 19.9563 8.26739 19.2227 9.04135 19.2227H18.3072C19.0806 19.2227 19.7147 19.9563 19.7147 20.8523V42.103L41.7639 42.1024ZM22.347 22.0397H39.4976V35.073H22.347V22.0397Z"
            fill="black" />
          <path
            d="M29.7418 26.0148C29.5347 25.775 29.1999 25.775 28.9927 26.0148L25.0196 30.6148C24.8125 30.8546 24.8125 31.2422 25.0196 31.482C25.1229 31.6016 25.2585 31.6618 25.3941 31.6618C25.5298 31.6618 25.6654 31.6016 25.7687 31.482L29.7418 26.8821C29.9489 26.6423 29.9489 26.254 29.7418 26.0148Z"
            fill="black" />
          <path
            d="M34.7408 24.2131C34.5336 23.9733 34.1988 23.9733 33.9917 24.2131L26.9063 32.4164C26.6992 32.6562 26.6992 33.0438 26.9063 33.2836C27.0096 33.4032 27.1452 33.4633 27.2809 33.4633C27.4165 33.4633 27.5521 33.4032 27.6554 33.2836L34.7408 25.0803C34.9479 24.8405 34.9479 24.4529 34.7408 24.2131Z"
            fill="black" />
          <path
            d="M35.8794 26.0148L31.9063 30.6148C31.6992 30.8546 31.6992 31.2422 31.9063 31.482C32.0096 31.6016 32.1452 31.6618 32.2809 31.6618C32.4165 31.6618 32.5521 31.6016 32.6554 31.482L36.6285 26.8821C36.8356 26.6423 36.8356 26.2546 36.6285 26.0148C36.4214 25.775 36.086 25.775 35.8794 26.0148Z"
            fill="black" />
        </svg>
      </span>
      <div class="flex flex-col gap-3 text-black lg:text-lg text-sm leading-5">
        <h4 class="lg:font-bold font-semibold">{{ $t('product_receive_from_shop_title') }}</h4>
        <span class="font-medium">{{ $t('product_receive_from_shop_content') }}</span>
      </div>
    </div>
    <span class="lg:rtl:ml-[11px] lg:ltr:mr-[11px]">
      <svg v-if="lang.dir == 'rtl'" xmlns="http://www.w3.org/2000/svg" class="lg:w-[12px] w-[9px] lg:h-[22px] h-[14px]" viewBox="0 0 12 23"
        fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M11.4142 0.711748C12.1953 1.5709 12.1953 2.96386 11.4142 3.82302L4.82843 11.0674L11.4142 18.3117C12.1953 19.1709 12.1953 20.5639 11.4142 21.423C10.6332 22.2822 9.36683 22.2822 8.58579 21.423L0.585787 12.623C-0.195262 11.7639 -0.195262 10.3709 0.585787 9.51175L8.58579 0.711748C9.36683 -0.147406 10.6332 -0.147406 11.4142 0.711748Z"
          fill="#6B7280" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="lg:w-[12px] w-[9px] lg:h-[22px] h-[14px]" viewBox="0 0 12 22" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M0.585787 0.644365C-0.195262 1.50352 -0.195262 2.89648 0.585787 3.75564L7.17157 11L0.585787 18.2444C-0.195262 19.1035 -0.195262 20.4965 0.585787 21.3556C1.36683 22.2148 2.63317 22.2148 3.41421 21.3556L11.4142 12.5556C12.1953 11.6965 12.1953 10.3035 11.4142 9.44437L3.41421 0.644365C2.63317 -0.214788 1.36683 -0.214788 0.585787 0.644365Z"
          fill="#6B7280" />
      </svg>
    </span>
  </div>

  <!-- Modal content -->
  <div id="receive-from-shop-modal" tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full flex-shrink-0 ">
    <div class="relative w-full max-w-7xl py-6 my-auto bg-gray-50 flex items-center justify-center flex-shrink-0">
      <img src="/images/product/receive-from-shop.png" class="w-full" alt="Receive-from-shop">
    </div>
  </div>
</template>

<script setup>
import { Modal } from 'flowbite';

const lang = useNuxtApp().$lang
const modal = ref({})
onMounted(
  () => {
    const modalTarget = document.getElementById('receive-from-shop-modal');
    const modalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40',
      closable: true,
    }
    modal.value = new Modal(modalTarget, modalOptions);
  }
)
</script>