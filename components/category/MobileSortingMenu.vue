<template>
  <!-- Sorting button -->
  <button type="button" id="mobileSortingDropdownButton" data-dropdown-toggle="mobileSortingDropdown"
    data-dropdown-offset-distance="1" data-dropdown-offset-skidding="0"
    class="focus:ring-2 focus:bg-gray-100 transition ease-in-out duration-150 flex items-center justify-center gap-[18px] text-center py-[9px] px-3 w-[180px] h-[48px] text-gray-600 leading-6 font-medium text-lg rounded-md ring-1 ring-gray-300 ">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5.00001 12C5.00001 12.5523 5.44772 13 6.00001 13C6.55229 13 7.00001 12.5523 7.00001 12L7.00001 6.41421L8.29291 7.70711C8.68343 8.09763 9.3166 8.09763 9.70713 7.70711C10.0977 7.31658 10.0977 6.68342 9.70713 6.29289L6.70712 3.29289C6.51958 3.10536 6.26523 3 6.00001 3C5.73479 3 5.48044 3.10536 5.2929 3.29289L2.29289 6.29289C1.90237 6.68342 1.90237 7.31658 2.29289 7.70711C2.68342 8.09763 3.31659 8.09763 3.70711 7.70711L5.00001 6.41421L5.00001 12Z"
        fill="#6B7280" />
      <path
        d="M15 8C15 7.44772 14.5523 7 14 7C13.4477 7 13 7.44772 13 8L13 13.5858L11.7071 12.2929C11.3166 11.9024 10.6834 11.9024 10.2929 12.2929C9.90239 12.6834 9.90239 13.3166 10.2929 13.7071L13.2929 16.7071C13.4805 16.8946 13.7348 17 14 17C14.2652 17 14.5196 16.8946 14.7071 16.7071L17.7071 13.7071C18.0977 13.3166 18.0977 12.6834 17.7071 12.2929C17.3166 11.9024 16.6835 11.9024 16.2929 12.2929L15 13.5858L15 8Z"
        fill="#6B7280" />
    </svg>
    <slot />
  </button>

  <!-- Dropdown menu -->
  <div id="mobileSortingDropdown" class="z-30 hidden bg-gray-50 shadow w-[180px] border border-gray-300 rounded-md">
    <ul class="py-1 text-xs leading-6 text-center font-medium text-gray-600 divide-y divide-gray-300"
      aria-labelledby="mobileSortingDropdownButton">
      <li>
        <NuxtLink to="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t("category_sorting_price_asc") }}</NuxtLink>
      </li>
      <li>
        <NuxtLink to="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t("category_sorting_price_desc") }}</NuxtLink>
      </li>
      <li>
        <NuxtLink to="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t("category_sorting_new_arrival") }}</NuxtLink>
      </li>
      <li>
        <NuxtLink to="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t("category_sorting_best_sellers") }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t("category_sorting_sales") }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>