<template>
  <!-- Sorting Menu -->
  <button id="sortingDropdownButton" data-dropdown-toggle="sortingDropdown" data-dropdown-offset-distance="1"
    data-dropdown-offset-skidding="0"
    :class="['w-[223px] mt-[6px] mx-1 text-gray-700 bg-white focus:outline-none ring-1 ring-gray-300 focus:ring-gray-300 font-bold rounded-md text-base leading-5 px-[13px] py-[9px] inline-flex items-end justify-start']"
    type="button">
    <span class="w-full flex-1 flex">
      {{ $t('category_sorting_title') }}
    </span>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
        fill="#374151" />
    </svg>
  </button>

  <!-- Dropdown menu -->
  <div id="sortingDropdown"
    class="z-30 hidden bg-white shadow w-[222px] border border-gray-300 border-t-0 rounded-br-md rounded-bl-md">
    <ul class="py-2 text-base leading-5 font-medium text-gray-700 divide-y divide-gray-300"
      aria-labelledby="sortingDropdownButton">
      <li class="flex items-center pb-2">
        <NuxtLink to="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t("category_sorting_price_asc") }}</NuxtLink>
      </li>
      <li class="flex items-center py-3">
        <NuxtLink to="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t("category_sorting_price_desc") }}</NuxtLink>
      </li>
      <li class="flex items-center py-3">
        <NuxtLink to="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t("category_sorting_new_arrival") }}</NuxtLink>
      </li>
      <li class="flex items-center py-3">
        <NuxtLink to="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t("category_sorting_best_sellers") }}
        </NuxtLink>
      </li>
      <li class="flex items-center pt-2">
        <NuxtLink to="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t("category_sorting_sales") }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>