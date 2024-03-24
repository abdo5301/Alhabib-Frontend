<template>
  <Title>{{ $t('favorite_title') }} | {{ website_name }}</Title>
  <div class="w-full pb-[100px] px-5 lg:px-[35px]">
    <Breadcrumb class="pb-[40px]" :current="$t('favorite_title')" list_style="!mx-0"></Breadcrumb>

    <div class="flex lg:gap-[46px] flex-col">
      <div v-if="data_loader" class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
        <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
      </div>
      <!-- Product listing -->
      <ClientOnly>
        <div v-if="!data_loader && empty_data"
          class="flex text-center items-center flex-col gap-10 lg:gap-16 justify-center mx-auto mt-[50px] lg:mt-[83px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="209" height="185" viewBox="0 0 209 185" fill="none">
            <path
              d="M99.4798 108.118C135.226 108.326 176.104 106.254 192.346 133.57C197.958 135.578 201.051 140.551 199.612 145.376C198.29 149.491 193.603 151.599 188.609 151.31C171.773 166.883 157.15 171.947 130.758 177.858C122.824 188.2 110.854 184.217 102.594 178.368C59.9536 178.165 26.928 168.348 11.8729 148.821C5.92935 148.329 0.270482 144.655 0.662566 139.121C1.135 134.142 5.62598 130.522 11.5961 128.911C31.0692 104.829 70.8089 108.118 99.4798 108.118ZM99.4798 108.118C71.7311 108.118 33.6938 113.72 17.7549 134.718C17.1227 135.556 16.138 136.162 15.0561 136.377C10.9656 137.161 9.54997 139.509 9.52014 139.823C10.3461 140.432 13.0278 140.899 14.1564 140.909C15.6308 140.909 17.0869 141.621 17.8932 142.759C29.6178 159.61 60.896 170.264 103.909 170.264C104.936 170.264 105.959 170.612 106.746 171.221C112.618 175.863 120.668 178.751 123.976 172.561C124.556 171.481 125.679 170.662 126.952 170.392C155.275 164.129 166.903 160.516 183.903 144.227C184.993 143.206 186.692 142.776 188.194 143.142C191.036 143.823 191.146 142.937 191.1 143.079C190.471 141.988 188.587 140.816 187.433 140.335C186.497 139.933 185.723 139.22 185.287 138.357C168.067 113.625 128.708 108.414 99.4798 108.118ZM32.4945 125.528C68.0149 129.623 78.777 132.325 109.998 154.947C112.845 155.984 115.574 154.713 117.887 152.842C135.744 140.491 147.916 133.864 170.617 129.677C172.97 129.032 175.741 130.572 176.222 132.791C176.704 135.01 174.788 137.415 172.347 137.654C150.76 141.635 140.789 147.26 123.215 159.415C116.936 163.628 109.746 165.071 104.116 161.074C73.7698 139.127 66.5298 137.684 31.3874 133.634C29.0685 133.534 27.0575 131.496 27.1662 129.358C27.4947 127.101 29.8463 125.439 32.4945 125.528ZM180.685 143.642C180.786 145.619 179.101 147.541 176.984 147.864C168.55 149.809 168.565 150.097 164.043 156.352C163.249 157.472 161.827 158.19 160.376 158.203C147.581 158.203 145.17 159.545 136.502 165.541C134.636 166.828 131.668 166.433 130.273 164.712C128.878 162.991 129.307 160.255 131.173 158.968C139.702 153.07 146.076 150.459 158.3 150.162C162.471 144.928 166.567 141.858 174.838 139.951C178.062 139.226 180.499 141.458 180.685 143.642Z"
              fill="#6B7280" />
            <path
              d="M103.908 44.2114C139.654 44.4199 180.531 51.4839 196.774 78.7996C202.386 80.8075 205.479 85.7809 204.04 90.6056C202.718 94.7212 198.031 96.829 193.037 96.5403C176.201 112.113 161.577 117.177 135.186 123.088C127.252 133.43 115.282 129.447 107.022 123.598C64.3814 123.395 31.3559 113.578 16.3008 94.0514C10.3572 93.5595 4.69834 89.8848 5.09042 84.3513C5.56285 79.3722 10.0538 75.7519 16.024 74.1409C35.497 50.0588 75.2368 44.2114 103.908 44.2114ZM103.908 52.3799C76.159 52.3799 38.1217 58.95 22.1828 79.9483C21.5505 80.786 20.5659 81.3916 19.484 81.6074C15.3935 82.3913 13.9778 84.7392 13.948 85.0535C14.774 85.6621 17.4556 86.1291 18.5843 86.1386C20.0586 86.1386 21.5148 86.8511 22.3211 87.9894C34.0457 104.84 65.3239 115.494 108.336 115.494C109.364 115.494 110.387 115.842 111.174 116.451C117.046 121.093 125.096 123.981 128.404 117.791C128.984 116.711 130.107 115.892 131.38 115.622C159.703 109.359 171.331 105.746 188.331 89.4571C189.421 88.4357 191.12 88.0059 192.622 88.3724C195.464 89.0531 195.573 88.1667 195.528 88.3094C194.899 87.2183 193.015 86.0456 191.86 85.5652C190.925 85.1632 190.151 84.4496 189.715 83.5868C172.495 58.8551 133.136 52.6765 103.908 52.3799ZM36.9223 70.7583C72.4427 74.8529 83.2048 77.5552 114.426 100.177C117.273 101.214 120.001 99.9433 122.315 98.072C140.172 85.7213 152.344 79.0937 175.045 74.9067C177.398 74.2617 180.169 75.8015 180.65 78.021C181.132 80.2403 179.216 82.6445 176.775 82.8836C155.188 86.8652 145.217 92.49 127.643 104.645C121.363 108.858 114.174 110.301 108.544 106.304C78.1977 84.3571 70.9577 82.9141 35.8152 78.8635C33.4963 78.764 31.4853 76.7262 31.594 74.588C31.9225 72.3313 34.2741 70.6685 36.9223 70.7583ZM185.112 88.8717C185.214 90.8492 183.529 92.771 181.411 93.0944C172.978 95.0386 172.993 95.3268 168.471 101.582C167.677 102.702 166.255 103.42 164.803 103.432C152.009 103.432 149.598 104.775 140.93 110.771C139.064 112.058 136.096 111.663 134.701 109.942C133.306 108.221 133.735 105.485 135.601 104.198C144.13 98.2996 150.503 95.6888 162.727 95.3916C166.899 90.1581 170.995 87.088 179.266 85.1812C182.49 84.456 184.927 86.6884 185.112 88.8717Z"
              fill="#6B7280" />
            <path
              d="M169.26 3.64182C163.963 6.15218 161.889 12.1236 164.628 16.9793L176.598 38.2055L199.752 27.2318C205.048 24.7215 207.122 18.75 204.384 13.8943C201.646 9.03853 195.132 7.13721 189.835 9.64758L185.863 11.5305L183.809 7.88853C181.071 3.03277 174.557 1.13146 169.26 3.64182Z"
              fill="#B91C1C" stroke="#B91C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="flex flex-col justify-center items-center gap-8 text-gray-500 leading-[30px]">
            <span class="font-bold lg:text-[34px] text-2xl">
              {{ $t('text_empty_favorites_title') }}
            </span>
            <span class="font-semibold lg:text-[28px] text-xl">
              {{ $t('text_empty_favorites_sub_title') }}
            </span>
          </div>
        </div>
        <div v-if="!data_loader && !empty_data"
          class="flex justify-start flex-col lg:gap-[52px] gap-[38px] lg:mt-2 mt-5 w-full">
          <!-- Navigation -->
          <div class="w-full flex justify-between items-center">
            <div class="flex justify-start gap-[6px] lg:gap-[18px]">
              <FavoriteTabItem :active_tab="active_tab" item_type="get-all" @click-tab="tab_navigation">
                {{ $t('text_view_all') }}
              </FavoriteTabItem>
              <FavoriteTabItem :active_tab="active_tab" item_type="get-available" @click-tab="tab_navigation">
                {{ $t('text_available') }}
              </FavoriteTabItem>
              <FavoriteTabItem :active_tab="active_tab" item_type="get-out-of-stock" @click-tab="tab_navigation">
                {{ $t('text_out_stock') }}
              </FavoriteTabItem>
            </div>
            <!-- favorite_paginate Count -->
            <span v-if="favorite_paginate.length"
              class="flex justify-center items-center text-xs lg:text-xl font-semibold leading-6 lg:leading-6 text-gray-500">
              {{ favorite_paginate.length }} {{ $t('text_count_of_products') }}
            </span>
          </div>
          <div v-if="items_loader" class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
            <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
          </div>
          <div v-else
            :class="['flex flex-wrap gap-y-[45px] gap-x-[27px] items-stretch justify-start gap-[42px] lg:gap-y-[55px]']">
            <FavoriteProductItem v-for="product in favorite_paginate" :key="product.id" :id="product.id"
              :name="product.name"
              :image="product.media.images && product.media.images.length ? product.media.images[0] : null"
              :color="product.color" :price="product.started_price" :special="product.started_discounted_price"
              :link="localePath('/product/' + product.id)" :favorite="product.favorite" :tags="product.tags"
              :related_products="product.related_class_products" @favorite-click="refreshProducts()" :cart_btn="true"
              :available="product.availability" />
          </div>
          <!-- Infinite  scroll -->
          <div v-if="!items_loader" class="flex items-center justify-center flex-col gap-5 w-full pt-14">
            <button v-if="favorite_paginate.length != favorite_data.meta.total" type="button" @click="loadMore()"
              :disabled="infinite_scroll_loading"
              class="flex justify-center items-center gap-[11px] py-[9px] w-[194px] ring-1 ring-gray-300 rounded-2xl bg-white shadow-sm text-gray-700 text-base leading-5 font-bold hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed">
              {{ $t('category_load_more_btn') }}
              <svg v-if="!infinite_scroll_loading" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                viewBox="0 0 16 16" fill="none">
                <path d="M8 4V8M8 8V12M8 8H12M8 8L4 8" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              <svg v-else aria-hidden="true"
                class="inline w-5 h-5  text-gray-300 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
              </svg>
            </button>
            <span v-if="favorite_paginate.length > 0" class="text-gray-900 text-base font-normal leading-5">
              لقد شاهدت {{ favorite_paginate.length }} من أصل {{ favorite_data.meta.total }} من المنتجات
            </span>
            <span v-else class="text-gray-900 text-lg font-semibold leading-5">
              {{ $t('text_empty_products') }}
            </span>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from 'flowbite'
definePageMeta({ middleware: ['auth'] })
const localePath = useLocalePath()
const website_name = useState('website_name');
const { getFavorites } = useFavorite()
const favorite_data = ref({})
const favorite_paginate = ref([])
const data_url = ref('/customer/favorites/get-all')
const current_page = ref(1)
const data_loader = ref(true)
const items_loader = ref(false)
const infinite_scroll_loading = ref(false)
const active_tab = ref('get-all')
const empty_data = ref(false)
onMounted(async () => {
  initFlowbite()
  favorite_data.value = await getFavorites(data_url.value)
  if (favorite_data.value.data) {
    favorite_paginate.value = favorite_paginate.value.concat(favorite_data.value.data)
  } else {
    empty_data.value = true
  }
  data_loader.value = false
})

async function tab_navigation(tab) {
  favorite_paginate.value = []
  items_loader.value = true
  active_tab.value = tab
  data_url.value = '/customer/favorites/' + tab
  favorite_data.value = await getFavorites(data_url.value)
  if (favorite_data.value.data) {
    favorite_paginate.value = favorite_paginate.value.concat(favorite_data.value.data)
  }
  items_loader.value = false
}

async function loadMore() {
  infinite_scroll_loading.value = true
  if (current_page.value > 1 && data_url.value.includes('&page=')) {
    data_url.value = data_url.value.replace('&page=' + current_page.value, '&page=' + (current_page.value + 1))
  } else {
    data_url.value += '&page=' + (current_page.value + 1)
  }

  favorite_data.value = await getFavorites(data_url.value)
  favorite_paginate.value = favorite_paginate.value.concat(favorite_data.value.data)
  if (favorite_data.value.meta.total != favorite_paginate.value.length) {
    current_page.value = current_page.value + 1
  }
  infinite_scroll_loading.value = false
}
 
</script>