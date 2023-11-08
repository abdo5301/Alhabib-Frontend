<template>
  <div v-if="shown" class="flex gap-3 border-b border-b-gray-200 pb-3">
    <!-- image -->
    <div class="w-[188px] h-[188px] flex-shrink-0">
      <img class="w-full h-full rounded-md" src="https://via.placeholder.com/640x480.png/cccccc?text=Alhabib-Shop"
        alt="Alhabib-Shop">
    </div>
    <!-- details -->
    <div class="flex flex-col justify-start gap-4 min-w-[330px] max-w-[315px]">
      <!-- name -->
      <div class="text-gray-600 text-xs font-semibold leading-5 min-h-[30px] max-w-[298px]">
        مفرش سياتل شتوي مفرد و نص مخمل لحمي عدد القطع 4
      </div>
      <!-- price -->
      <div class="text-[#000] text-xs font-bold leading-5">
        370 ريال
      </div>
      <!-- Options -->
      <div class="flex gap-12">
        <div class="min-w-[148px]">
          <label class="block pb-1 text-xs font-normal text-gray-900 leading-5">{{ $t('label_size') }}</label>
          <select
            class="bg-white cursor-pointer min-w-[120px] border flex items-center justify-between border-gray-300 text-gray-900 text-xs font-semibold rounded-md focus:ring-gray-300 focus:border-gray-300 w-full px-3">
            <option value="1">مفرد ونص</option>
            <option value="2">مزدوج</option>
            <option value="3">كوين</option>
          </select>
        </div>
        <div>
          <label class="block pb-1 text-xs font-normal text-gray-900 leading-5">{{ $t('label_quantity') }}</label>
          <select
            class="bg-white cursor-pointer border flex items-center justify-between border-gray-300 text-gray-900 text-xs font-semibold rounded-md focus:ring-gray-300 focus:border-gray-300 w-max px-3">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
      <!-- Favorite -->
      <button
        class="max-w-[110px] py-2 px-2 flex items-center justify-center rtl:gap-2 ltr:gap-[6px] bg-white rounded-md shadow ring-1 ring-gray-300 text-gray-900 text-[10px] font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
          <path
            d="M3.19876 3.94876C2.10041 5.04711 2.10041 6.82789 3.19876 7.92624L8.00003 12.7275L12.8012 7.92624C13.8996 6.82789 13.8996 5.04711 12.8012 3.94876C11.7029 2.85041 9.92211 2.85041 8.82376 3.94876L8.00003 4.77256L7.17624 3.94876C6.07789 2.85041 4.29711 2.85041 3.19876 3.94876Z"
            stroke="#1F2937" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        {{ $t('cart_popup_add_favorite_btn') }}
      </button>
    </div>
    <!-- remove item -->
    <div class="flex items items-start justify-end rtl:pl-1">
      <button type="button" @click="shown = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 15L15 5M5 5L15 15" stroke="#6B7280" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
let shown = ref(true);

</script>