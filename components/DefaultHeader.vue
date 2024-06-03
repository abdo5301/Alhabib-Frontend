<style scoped>
.default_header {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.76) 50%, rgba(255, 255, 255, 0.00) 100%);
}

.fixed_header {
  background: white;
}

@media (min-width: 1024px) {
  .default_header:hover {
    background: white;
  }
}
</style>
<template>
  <div>
    <header
      :class="[page_scrolled || (route.path != '/' && route.path != '/en') ? 'fixed_header' : 'default_header', route.path != '/' && route.path != '/en' ? 'border-b border-b-gray-300' : 'border-b-0', 'fixed w-full max-w-full lg:hover:bg-white z-40']">
      <nav aria-label="Top" class="lg:h-[165px] h-[4rem] px-2 lg:px-[20px] pt-[22px] lg:pt-[40px]">
        <div class="flex gap-12 flex-col">

          <div class="flex w-full content-center">

            <!-- Right Section -->
            <div class="flex lg:gap-6 items-center w-1/3">
              <ClientOnly>
                <MobileNavbarMenu v-if="navigation.data && navigation.data.length" :menu_data="navigation">
                </MobileNavbarMenu>
              </ClientOnly>

              <div class="hidden lg:flex lg:items-center">
                <!-- Language -->
                <a v-for="locale in availableLocales" :key="locale.code" :href="switchLocalePath(locale.code)"
                  :title="locale.name">
                  <NuxtImg width="300px" class="w-10" preload loading="lazy" :src="locale.icon" :alt="locale.name" />
                </a>
                <span class="h-6 w-[0.5px] bg-[#4B5563] mx-[10px]" aria-hidden="true" />
                <a v-for="locale in availableLocales" :key="locale.code" :href="switchLocalePath(locale.code)"
                  :title="locale.name">{{ locale.list_name }}</a>
              </div>

              <!-- Mobile Search Trigger -->
              <div @click="search_popup.show(), search_input.focus()"
                class="flex items-end rtl:mt-[6.5px] ltr:mt-[4px] lg:hidden ps-1 cursor-pointer">
                <svg v-if="lang.code == 'ar'" xmlns="http://www.w3.org/2000/svg" width="24" height="20"
                  viewBox="0 0 24 23" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M9.6 4.59999C6.94904 4.59999 4.80002 6.65948 4.80002 9.19999C4.80002 11.7405 6.94904 13.8 9.6 13.8C12.251 13.8 14.4 11.7405 14.4 9.19999C14.4 6.65948 12.251 4.59999 9.6 4.59999ZM2.40002 9.19999C2.40002 5.38922 5.62356 2.29999 9.6 2.29999C13.5764 2.29999 16.8 5.38922 16.8 9.19999C16.8 10.6902 16.307 12.0701 15.4689 13.198L21.2485 18.7368C21.7171 19.1859 21.7171 19.9141 21.2485 20.3632C20.7799 20.8123 20.0201 20.8123 19.5514 20.3632L13.7718 14.8243C12.5949 15.6276 11.155 16.1 9.6 16.1C5.62356 16.1 2.40002 13.0108 2.40002 9.19999Z"
                    fill="#1F2937" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M14.7787 4.02816C17.3186 4.02816 19.3776 5.83156 19.3776 8.05616C19.3776 10.2808 17.3186 12.0842 14.7787 12.0842C12.2387 12.0842 10.1797 10.2808 10.1797 8.05616C10.1797 5.83156 12.2387 4.02816 14.7787 4.02816ZM21.6771 8.05616C21.6771 4.71926 18.5885 2.01416 14.7787 2.01416C10.9688 2.01416 7.88024 4.71926 7.88024 8.05616C7.88024 9.36106 8.35254 10.5693 9.15559 11.557L3.61805 16.4071C3.16905 16.8004 3.16905 17.438 3.61805 17.8312C4.06705 18.2245 4.79502 18.2245 5.24402 17.8312L10.7816 12.9811C11.9092 13.6845 13.2888 14.0982 14.7787 14.0982C18.5885 14.0982 21.6771 11.3931 21.6771 8.05616Z"
                    fill="#1F2937" />
                </svg>
              </div>

              <!-- Desktop Search Trigger -->
              <div class="hidden lg:flex relative w-full justify-start items-center flex-col">
                <button @click="search_popup.show(), search_input.focus()"
                  class="w-full flex lg:gap-3 rounded-md border-0 bg-white py-2 ps-3 pe-1 text-gray-900 ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-gray-500 hover:bg-gray-100 focus:bg-gray-100 text-sm leading-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M9.6 4.59999C6.94904 4.59999 4.80002 6.65948 4.80002 9.19999C4.80002 11.7405 6.94904 13.8 9.6 13.8C12.251 13.8 14.4 11.7405 14.4 9.19999C14.4 6.65948 12.251 4.59999 9.6 4.59999ZM2.40002 9.19999C2.40002 5.38922 5.62356 2.29999 9.6 2.29999C13.5764 2.29999 16.8 5.38922 16.8 9.19999C16.8 10.6902 16.307 12.0701 15.4689 13.198L21.2485 18.7368C21.7171 19.1859 21.7171 19.9141 21.2485 20.3632C20.7799 20.8123 20.0201 20.8123 19.5514 20.3632L13.7718 14.8243C12.5949 15.6276 11.155 16.1 9.6 16.1C5.62356 16.1 2.40002 13.0108 2.40002 9.19999Z"
                      fill="#1F2937" />
                  </svg>
                  <span class="line-clamp-1">
                    {{ $t('header_search_placeholder') }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Center Logo -->
            <div class="flex items-center justify-center flex-1 w-1/3">
              <div class="flex items-center justify-center w-[110px] lg:w-[186px]">
                <NuxtLink :to="localePath('/')">
                  <span class="sr-only">Your Company</span>
                  <img class="w-full" src="/images/logo.svg" alt="" />
                </NuxtLink>
              </div>
            </div>

            <!-- Left Section -->
            <div class="flex  items-center justify-end gap-1 flex-1 flex-row w-1/3">
              <!-- User -->
              <div class="flex">
                <NuxtLink :to="localePath('/login')" class="p-1 lg:p-2 text-gray-900 hover:text-gray-500">
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
                <button type="button" :title="$t('show_cart_title')" @click="cartDrawer.show()"
                  class="group -m-2 hidden lg:flex items-center p-1 lg:p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                    <path
                      d="M14.6324 10.7652V6.90468C14.6324 4.77259 12.9946 3.04419 10.9743 3.04419C8.954 3.04419 7.3162 4.77259 7.3162 6.90468V10.7652M4.57261 8.83493H17.376L18.2906 20.4164H3.65808L4.57261 8.83493Z"
                      stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="sr-only">items in cart, view bag</span>
                </button>
                <NuxtLink :to="localePath('/cart')" class="group -m-2 lg:hidden flex items-center p-1 lg:p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                    <path
                      d="M14.6324 10.7652V6.90468C14.6324 4.77259 12.9946 3.04419 10.9743 3.04419C8.954 3.04419 7.3162 4.77259 7.3162 6.90468V10.7652M4.57261 8.83493H17.376L18.2906 20.4164H3.65808L4.57261 8.83493Z"
                      stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="sr-only">link to Cart Page</span>
                </NuxtLink>
              </div>
              <!-- Favorite -->
              <div class="flex">
                <NuxtLink :to="localePath('/favorite')" class="p-1 lg:p-2 text-gray-900 hover:text-gray-500">
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

          <DesktopNavbarMenu v-if="navigation.data && navigation.data.length" :menu_data="navigation">
          </DesktopNavbarMenu>

        </div>
      </nav>
    </header>

  </div>
  <!-- Cart Popup Content -->
  <div id="cart-popup-menu" aria-labelledby="cart-popup-label"
    class="fixed top-0 rtl:left-0 ltr:right-0 z-[100] w-[600px] min-h-[700px] max-h-screen overflow-hidden hover:overflow-y-auto duration-700 transition-transform translate-x-1 -translate-y-full bg-white"
    tabindex="-1">
    <CartPopupContainer :key="cartPopUpKey" v-if="cartData && cartData.cart_items && cartData.cart_items.length"
      :cart_data="cartData" @hide-popup="cartDrawer.hide()" />
    <CartPopupEmpty v-else>{{ $t('empty_cart_text') }}</CartPopupEmpty>
  </div>

  <!-- Search Popup Content -->
  <div id="search-popup-menu" tabindex="-1" aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed z-50 top-0 right-0 left-0 justify-center items-start w-full h-[calc(100%-3rem)] lg:h-[calc(100%-1rem)] max-h-full">
    <div
      class="relative lg:w-[700px] w-full lg:max-w-[700px] mt-10 mb-1 max-w-[90%] max-h-full flex flex-col items-center justify-center bg-white rounded-lg shadow-xl">
      <!-- Search Form -->
      <form @submit.prevent="" class="w-full px-5">
        <label for="search" class="sr-only">Search</label>
        <div class="relative">
          <!-- Search Icon -->
          <span class="pointer-events-none absolute inset-y-0 start-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 23" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M9.6 4.59999C6.94904 4.59999 4.80002 6.65948 4.80002 9.19999C4.80002 11.7405 6.94904 13.8 9.6 13.8C12.251 13.8 14.4 11.7405 14.4 9.19999C14.4 6.65948 12.251 4.59999 9.6 4.59999ZM2.40002 9.19999C2.40002 5.38922 5.62356 2.29999 9.6 2.29999C13.5764 2.29999 16.8 5.38922 16.8 9.19999C16.8 10.6902 16.307 12.0701 15.4689 13.198L21.2485 18.7368C21.7171 19.1859 21.7171 19.9141 21.2485 20.3632C20.7799 20.8123 20.0201 20.8123 19.5514 20.3632L13.7718 14.8243C12.5949 15.6276 11.155 16.1 9.6 16.1C5.62356 16.1 2.40002 13.0108 2.40002 9.19999Z"
                fill="#1F2937" />
            </svg>
          </span>
          <!-- Search Input -->
          <input v-model="search" id="search" name="search" type="text" ref="search_input"
            @input="getSearch(), search_loader = true"
            class="block w-full max-w-full rounded-md border-0 bg-white py-4 ps-8 pe-3 text-gray-900 placeholder:text-gray-500 focus:ring-0 text-base"
            :placeholder="$t('header_search_placeholder')" />
          <!-- Search Clear -->
          <span v-if="search.length > 0" title="Clear search" @click="search = '', search_input.focus()"
            class="cursor-pointer absolute inset-y-0 end-0 flex items-center">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z"
                stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
              </path>
            </svg>
          </span>
        </div>
      </form>
      <!-- Search Result -->
      <div v-if="search.length > 0" class="w-full border-t border-gray-200 py-5 overflow-y-auto max-h-screen">
        <div v-if="search_loader" class="flex items-center justify-center h-[40px] max-h-screen w-full mx-auto pb-4">
          <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
        </div>
        <div v-if="!search_loader && search.length > 0 && search_result.length > 0"
          class="w-full flex flex-col gap-4 justify-start px-5">
          <!-- Search Item -->
          <NuxtLink v-for="(search_item, index) in search_result" :key="index" @click="search_popup.hide()"
            :to="localePath('/' + search_item.slug)"
            class="flex justify-between gap-2 items-center p-3 text-gray-900 bg-gray-100 rounded-md hover:bg-gray-600 hover:text-white shadow-md">
            <span class="text-sm lg:text-base">{{ search_item.name }}</span>
            <NuxtImg :alt="search_item.name" loading="lazy" placeholder="/images/image-loader.svg"
              placeholder-class="object-none width-4" width="80" quality="60" class="w-[60px] lg:w-[80px] rounded-sm"
              :src="search_item.media.images && search_item.media.images.length ? search_item.media.images[0].url : '/images/placeholder-logo.png'" />
          </NuxtLink>
        </div>
        <div v-if="!search_loader && search.length > 0 && search_result.length == 0"
          class="w-full flex flex-wrap justify-center items-center text-lg font-medium text-gray-700 px-5">
          <span class="flex-shrink-0"> {{ $t('header_search_popup_no_result') }} &nbsp;</span>
          <span class="flex max-w-full">
            "<span class="font-bold flex-wrap line-clamp-2">&nbsp;{{ search }}&nbsp;</span>"
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Drawer, Modal } from 'flowbite';
import { debounce } from 'lodash-es'
const page_scrolled = ref(false);
const localePath = useLocalePath()
const config = useRuntimeConfig()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = useNuxtApp().$all_lang
const lang = useNuxtApp().$lang
const route = useRoute()
const cartDrawer = ref()
const { cartData, cartPopUpKey, setCartData } = useCart()
const cart_data = ref([])
//search
const search = ref('')
const search_input = ref()
const search_popup = ref({})
const search_result = ref([])
const search_loader = ref(false)
onMounted(async () => {
  window.addEventListener("scroll", () => {
    var curr = window.scrollY;
    page_scrolled.value = true;
    if (curr === 0) {
      page_scrolled.value = false;
    }
  });
  // set cart popup js
  const $cartPopupMenu = document.getElementById('cart-popup-menu');
  const $cartPopupMenuOptions = {
    placement: lang.dir == 'rtl' ? 'left' : 'right',
    backdrop: true,
    bodyScrolling: false,
    edge: false,
    edgeOffset: '',
    backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40'
  };
  cartDrawer.value = new Drawer($cartPopupMenu, $cartPopupMenuOptions);

  // set search popup
  const search_popup_menu = document.getElementById('search-popup-menu');

  // search popup options 
  const search_popup_options = {
    placement: 'top-right',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900/50 fixed inset-0 z-40',
    closable: true,
    onShow: () => {
      search.value = ''
    }
  };
  search_popup.value = new Modal(search_popup_menu, search_popup_options);

  cart_data.value = await useCart().getAll()
  if (cart_data.value && cart_data.value.id) {
    setCartData(cart_data.value)
  }
})
//Category Menu
const { data: navigation, error: navigation_error } = await useAsyncData('navbar_categories', () => $fetch(config.public.API_URL + '/categories'))
if (navigation_error.value) {
  console.log(navigation_error.value.data)
}

const getSearch = debounce(async function (event) {
  if (search.value && search.value.length && search.value.length > 0) {
    try {
      const search_fetch_data = await useNuxtApp().$apiFetch('/search?query=' + search.value)
      search_result.value = search_fetch_data.data
      //console.log(search_result.value);
    } catch (error) {
      search_result.value = []
      console.log(error.data)
      search_loader.value = false
    }
  } else {
    search_result.value = []
  }
  search_loader.value = false
}, 500)

</script>