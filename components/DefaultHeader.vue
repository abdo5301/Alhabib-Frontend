<template>
  <div>
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div class="flex px-4 pb-2 pt-5">
                <button type="button" class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  @click="open = false">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab as="template" v-for="category in navigation.categories" :key="category.name"
                      v-slot="{ selected }">
                      <button
                        :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900', 'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium']">{{
                          category.name }}</button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel v-for="category in navigation.categories" :key="category.name"
                    class="space-y-10 px-4 pb-8 pt-10">
                    <div class="grid grid-cols-2 gap-x-4">
                      <div v-for="item in category.featured" :key="item.name" class="group relative text-sm">
                        <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                          <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center" />
                        </div>
                        <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                          <span class="absolute inset-0 z-10" aria-hidden="true" />
                          {{ item.name }}
                        </a>
                        <p aria-hidden="true" class="mt-1">Shop now</p>
                      </div>
                    </div>
                    <div v-for="section in category.sections" :key="section.name">
                      <p :id="`${category.id}-${section.id}-heading-mobile`" class="font-medium text-gray-900">{{
                        section.name }}</p>
                      <ul role="list" :aria-labelledby="`${category.id}-${section.id}-heading-mobile`"
                        class="mt-6 flex flex-col space-y-6">
                        <li v-for="item in section.items" :key="item.name" class="flow-root">
                          <a :href="item.href" class="-m-2 block p-2 text-gray-500">{{ item.name }}</a>
                        </li>
                      </ul>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div v-for="page in navigation.pages" :key="page.name" class="flow-root">
                  <a :href="page.href" class="-m-2 block p-2 font-medium text-gray-900">{{ page.name }}</a>
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Sign in</a>
                </div>
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Create account</a>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6">
                <a href="#" class="-m-2 flex items-center p-2">
                  <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt=""
                    class="block h-auto w-5 flex-shrink-0" />
                  <span class="ml-3 block text-base font-medium text-gray-900">CAD</span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-transparent hover:bg-white">
      <nav aria-label="Top" class="h-[162px] px-4 sm:px-[16px] lg:px-[20px] pt-[40px]">
        <div class="flex gap-12 flex-col">

          <div class="flex w-full content-center">
            <!-- Right Section -->
            <div class="flex items-center w-1/3">
              <button type="button" class="rounded-md bg-white p-2 text-gray-400 lg:hidden" @click="open = true">
                <span class="sr-only">Open menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
              </button>
              <div class="hidden lg:flex lg:items-center">
                <!-- Currency -->
                <SelectMenu :select_data="currency_select" :label_selected="true" :with_name="true" :label_selected_name="true" />
                <span class="h-6 w-[0.5px] bg-[#4B5563] mx-[10px]" aria-hidden="true" />
                <!-- Language -->
                <SelectMenu :select_data="language_select" :label_selected="true" :with_image="true" :with_name="true" />
              </div>

              <!-- Search -->
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

            <!-- Logo Center-->
            <div class="flex items-center justify-center flex-1 w-1/3">
              <div class="flex items-center justify-center">
                <NuxtLink to="/">
                  <span class="sr-only">Your Company</span>
                  <img class="w-full" src="/images/logo.svg" alt="" />
                </NuxtLink>
              </div>
            </div>

            <!-- Left Section -->
            <div class="flex items-center  gap-1 flex-1 flex-row-reverse w-1/3">
              <!-- User -->
              <div class="flex">
                <NuxtLink to="/auth/login-phone" class="p-2 text-gray-900 hover:text-gray-500">
                  <span class="sr-only">User</span>
                  <UserIcon class="h-5 w-5" aria-hidden="true" />
                </NuxtLink>
              </div>
              <!-- Cart -->
              <div class="flex">
                <NuxtLink to="#" class="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon class="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500"
                    aria-hidden="true" />
                  <span class="sr-only">items in cart, view bag</span>
                </NuxtLink>
              </div>
              <!-- Favorite -->
              <div class="flex">
                <NuxtLink to="#" class="p-2 text-gray-900 hover:text-gray-500">
                  <span class="sr-only">Favorite Products</span>
                  <HeartIcon class="h-5 w-5" aria-hidden="true" />
                </NuxtLink>
              </div>
            </div>


          </div>

          <!-- Flyout menus -->
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div class="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1">
              <ul class="flex gap-6">
                <li v-for="category in navigation.categories" :key="category.id">
                  <NuxtLink to="#" :data-popover-target="category.id" data-popover-offset="0" :id="category.id + '-link'"
                    data-popover-placement="bottom"
                    class="text-gray-900 pb-1 focus:border-b-2 focus:border-b-gray-700 text-sm text-center hover:border-b-2 hover:border-b-gray-700">
                    {{ category.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <div v-for="category in navigation.categories" :key="category.id" :id="category.id" data-popover role="tooltip"
            class="bg-white max-h-[400px] h-[400px] rounded-lg border-gray-200 shadow-sm border-y w-full px-8 pb-4 invisible">

            <h2 class="pt-8 pb-2 px-[100px]">{{ category.name }}</h2>
            <div class="w-full h-full flex max-w-screen-xl px-4 mb-8 py-5 mx-auto text-sm text-gray-500">
              <div class="w-1/2 h-full flex justify-between">
                <ul class="h-3/4 grid grid-cols-1 content-between">
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                    مفارش صيفية
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                      مفارش صيفية
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                      مفارش صيفية
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                      مفارش صيفية
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                      مفارش صيفية
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                      مفارش صيفية
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                      مفارش صيفية
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                      مفارش صيفية
                    </a>
                  </li>
                </ul>
                <ul class="h-3/4 grid grid-cols-1 content-between">
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                      وسائد
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                      حشوة لحاف
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                      وسائد كراسي
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline hover:text-gray-500 text-gray-900">
                      أطقم غطاء
                    </a>
                  </li>
                </ul>
              </div>

              <div class="flex h-full">
                <span class="h-3/4 w-[0.5px] bg-[#9CA3AF] mx-[60px]" aria-hidden="true" />
                <NuxtLink to="/"
                  class="p-8 h-3/4 text-left bg-local bg-gray-500 bg-center bg-no-repeat bg-cover rounded-lg bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken"
                  style="background-image: url(images/bedding-202.png)">
                  <p class="max-w-xl mb-5 font-extrabold leading-tight tracking-tight text-white">
                    مفارش الحبيب طريقك الى الراحة والسعادة
                  </p>
                  <button type="button"
                    class="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-center text-white border border-white rounded-lg hover:bg-white hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700">
                    <img class="w-full text-center" src="/images/logo.svg" alt="" />
                  </button>
                </NuxtLink>
              </div>

            </div>
          </div>

        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon, UserIcon, HeartIcon } from '@heroicons/vue/24/outline'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
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
      id: 'women',
      name: ' مفارش وبطانيات',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
    },
    {
      id: 'men',
      name: 'مجموعة الفنادق الفاخرة',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
    },
  ],
  pages: [
    { name: 'تخفيضات', href: '#' },
  ],
}

const open = ref(false)
</script>