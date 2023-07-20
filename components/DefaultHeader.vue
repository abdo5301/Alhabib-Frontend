<template>
  <div>
    <header class="relative bg-transparent lg:hover:bg-white">
      <nav aria-label="Top" class="lg:h-[165px] h-[4rem] px-3 lg:px-[20px] pt-[22px] lg:pt-[40px]">
        <div class="flex gap-12 flex-col">

          <div class="flex w-full content-center">

            <!-- Right Section -->
            <div class="flex items-center w-1/3">
              <MobileNavbarMenu :menu_data="navigation" :language_data="language_select" :currency_data="currency_select">
              </MobileNavbarMenu>

              <div class="hidden lg:flex lg:items-center">
                <!-- Currency -->
                <SelectMenu :select_data="currency_select" :label_selected="true" :with_name="true"
                  :label_selected_name="true" />
                <span class="h-6 w-[0.5px] bg-[#4B5563] mx-[10px]" aria-hidden="true" />
                <!-- Language -->
                <SelectMenu :select_data="language_select" :label_selected="true" :with_image="true" :with_name="true" />
              </div>

              <!-- Search -->
              <div id="mobileDropdownSearchButton" data-dropdown-toggle="mobileDropdownSearch"
                data-dropdown-placement="bottom"
                class="flex items-end mt-[6.5px] lg:hidden rtl:pr-[9px] ltr:pl-[9px] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 23" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M9.6 4.59999C6.94904 4.59999 4.80002 6.65948 4.80002 9.19999C4.80002 11.7405 6.94904 13.8 9.6 13.8C12.251 13.8 14.4 11.7405 14.4 9.19999C14.4 6.65948 12.251 4.59999 9.6 4.59999ZM2.40002 9.19999C2.40002 5.38922 5.62356 2.29999 9.6 2.29999C13.5764 2.29999 16.8 5.38922 16.8 9.19999C16.8 10.6902 16.307 12.0701 15.4689 13.198L21.2485 18.7368C21.7171 19.1859 21.7171 19.9141 21.2485 20.3632C20.7799 20.8123 20.0201 20.8123 19.5514 20.3632L13.7718 14.8243C12.5949 15.6276 11.155 16.1 9.6 16.1C5.62356 16.1 2.40002 13.0108 2.40002 9.19999Z"
                    fill="#1F2937" />
                </svg>
              </div>

              <div class="hidden lg:flex w-full items-center px-6">
                <div class="w-full">
                  <label for="search" class="sr-only">Search</label>
                  <div class="relative">
                    <div
                      class="pointer-events-none absolute inset-y-0 rtl:right-0 ltr:left-0 flex items-center rtl:pr-3 ltr:pl-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M9.6 4.59999C6.94904 4.59999 4.80002 6.65948 4.80002 9.19999C4.80002 11.7405 6.94904 13.8 9.6 13.8C12.251 13.8 14.4 11.7405 14.4 9.19999C14.4 6.65948 12.251 4.59999 9.6 4.59999ZM2.40002 9.19999C2.40002 5.38922 5.62356 2.29999 9.6 2.29999C13.5764 2.29999 16.8 5.38922 16.8 9.19999C16.8 10.6902 16.307 12.0701 15.4689 13.198L21.2485 18.7368C21.7171 19.1859 21.7171 19.9141 21.2485 20.3632C20.7799 20.8123 20.0201 20.8123 19.5514 20.3632L13.7718 14.8243C12.5949 15.6276 11.155 16.1 9.6 16.1C5.62356 16.1 2.40002 13.0108 2.40002 9.19999Z"
                          fill="#1F2937" />
                      </svg>
                    </div>
                    <input v-model="search" id="search" name="search"
                      class="block w-full rounded-md border-0 bg-white py-2 ltr:pl-11 ltr:pr-3 rtl:pr-11 rtl:pl-3 text-gray-900 ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                      placeholder="ابحث باسم المنتج , خامته , موسمه..." type="search" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Center Logo -->
            <div class="flex items-center justify-center flex-1 w-1/3">
              <div class="flex items-center justify-center w-[110px] lg:w-[186px]">
                <NuxtLink to="/">
                  <span class="sr-only">Your Company</span>
                  <img class="w-full" src="/images/logo.svg" alt="" />
                </NuxtLink>
              </div>
            </div>

            <!-- Left Section -->
            <div class="flex  items-center justify-end gap-1 flex-1 flex-row w-1/3">
              <!-- User -->
              <div class="flex">
                <NuxtLink to="/auth/login-phone" class="p-1 lg:p-2 text-gray-900 hover:text-gray-500">
                  <span class="sr-only">User</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path
                      d="M16.0957 6.90468C16.0957 9.03678 14.2941 10.7652 12.0718 10.7652C9.84943 10.7652 8.04786 9.03678 8.04786 6.90468C8.04786 4.77259 9.84943 3.04419 12.0718 3.04419C14.2941 3.04419 16.0957 4.77259 16.0957 6.90468Z"
                      stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M12.0718 13.6606C8.18266 13.6606 5.02991 16.6853 5.02991 20.4164H19.1137C19.1137 16.6853 15.9609 13.6606 12.0718 13.6606Z"
                      stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </NuxtLink>
              </div>
              <!-- Cart -->
              <div class="flex">
                <NuxtLink to="#" class="group -m-2 flex items-center p-1 lg:p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                    <path
                      d="M14.6324 10.7652V6.90468C14.6324 4.77259 12.9946 3.04419 10.9743 3.04419C8.954 3.04419 7.3162 4.77259 7.3162 6.90468V10.7652M4.57261 8.83493H17.376L18.2906 20.4164H3.65808L4.57261 8.83493Z"
                      stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="sr-only">items in cart, view bag</span>
                </NuxtLink>
              </div>
              <!-- Favorite -->
              <div class="flex">
                <NuxtLink to="#" class="p-1 lg:p-2 text-gray-900 hover:text-gray-500">
                  <span class="sr-only">Favorite Products</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                    <path
                      d="M3.99504 6.24666C2.38788 7.94273 2.38788 10.6926 3.99504 12.3887L11.0205 19.8028L18.0458 12.3887C19.653 10.6926 19.653 7.94273 18.0458 6.24666C16.4387 4.55059 13.833 4.55059 12.2258 6.24666L11.0205 7.51876L9.81507 6.24666C8.20792 4.55059 5.6022 4.55059 3.99504 6.24666Z"
                      stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </NuxtLink>
              </div>
            </div>

          </div>

          <DesktopNavbarMenu :menu_data="navigation"></DesktopNavbarMenu>

          <!-- Mobile DropDown Menu Search -->
          <div id="mobileDropdownSearch"
            class="transition-transform translate-y-1/2 duration-500 z-10 hidden bg-white rounded-lg shadow w-full dark:bg-gray-700">
            <div class="p-3">
              <label for="input-group-search" class="sr-only">Search</label>
              <div class="relative">
                <div
                  class="pointer-events-none absolute inset-y-0 rtl:right-0 ltr:left-0 flex items-center rtl:pr-3 ltr:pl-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M9.6 4.59999C6.94904 4.59999 4.80002 6.65948 4.80002 9.19999C4.80002 11.7405 6.94904 13.8 9.6 13.8C12.251 13.8 14.4 11.7405 14.4 9.19999C14.4 6.65948 12.251 4.59999 9.6 4.59999ZM2.40002 9.19999C2.40002 5.38922 5.62356 2.29999 9.6 2.29999C13.5764 2.29999 16.8 5.38922 16.8 9.19999C16.8 10.6902 16.307 12.0701 15.4689 13.198L21.2485 18.7368C21.7171 19.1859 21.7171 19.9141 21.2485 20.3632C20.7799 20.8123 20.0201 20.8123 19.5514 20.3632L13.7718 14.8243C12.5949 15.6276 11.155 16.1 9.6 16.1C5.62356 16.1 2.40002 13.0108 2.40002 9.19999Z"
                      fill="#1F2937" />
                  </svg>
                </div>
                <input v-model="search" id="mobile-search" name="search"
                  class="block w-full rounded-md border-0 bg-white py-2 ltr:pl-11 ltr:pr-3 rtl:pr-11 rtl:pl-3 text-gray-900 ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                  placeholder="ابحث باسم المنتج , خامته , موسمه..." type="search" />
              </div>
            </div>
          </div>

        </div>
      </nav>
    </header>

  </div>
</template>

<script setup>
const currency_select = [
  {
    id: 1,
    name: 'EGP',
  },
  {
    id: 2,
    name: 'SAR',
  }
]
const language_select = [
  {
    id: 1,
    name: 'EN',
    image:
      '/images/en-flag.svg',
  },
  {
    id: 2,
    name: 'AR',
    image:
      '/images/ar-flag.svg',
  }
]
const search = ref('');
const navigation = {
  categories: [
    {
      id: '1',
      name: ' مفارش وبطانيات',
      href: '#',
      featured: [
        {
          id: '101',
          name: 'مفارش',
          href: '#',
        },
        {
          id: '102',
          name: 'بطانيات',
          href: '#',
        },
      ],
    },
    {
      id: '2',
      name: 'مجموعة الفنادق الفاخرة',
      href: '#',
      featured: [
        {
          id: '103',
          name: 'لحاف',
          href: '#',
        },
        {
          id: '104',
          name: 'لباد',
          href: '#',
        },
      ],
    },
  ],
  pages: [
    { name: 'تخفيضات', href: '#' },
  ],
}
</script>