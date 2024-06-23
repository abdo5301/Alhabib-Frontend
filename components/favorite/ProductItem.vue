<template>
  <div v-if="favorite"
    :class="['w-[175px] flex flex-shrink-0 flex-col lg:gap-3 gap-[10px] justify-start lg:w-[318px]']">
    <NuxtLink :to="link" class="relative w-full">
      <NuxtImg :class="['h-[175px] w-full lg:h-[304px] rounded-lg object-cover']"
      :src="image ??= '/images/placeholder-logo.png'" :alt="name" loading="lazy" format="webp" quality="80" />
      <span v-if="available == false"
        class="absolute top-0 rounded-lg bg-opacity-60 h-full w-full bg-[#F0EBEB] flex justify-center items-center">
        <span class="!opacity-100 text-gray-900 text-sm lg:text-base font-semibold">{{ $t('product_size_stock_alert')
          }}</span>
      </span>
      <button @click.prevent="removeFavorite(id)"
        :class="['bottom-[15px] right-3 absolute bg-[#f9fafb9e] p-1 rounded-full lg:bottom-[20px] lg:right-[15px]']">
        <svg xmlns="http://www.w3.org/2000/svg" :class="['w-5 h-5 lg:w-8 lg:h-8']" viewBox="0 0 26 26"
          :fill="favorite ? '#A30000' : 'none'">
          <path
            d="M4.67785 6.84448C2.77405 8.74829 2.77405 11.835 4.67785 13.7388L13.0001 22.061L21.3221 13.7388C23.226 11.835 23.226 8.74829 21.3221 6.84448C19.4183 4.94067 16.3317 4.94067 14.4279 6.84448L13.0001 8.27239L11.5721 6.84448C9.66834 4.94067 6.58166 4.94067 4.67785 6.84448Z"
            :stroke="favorite ? '#A30000' : '#1F2937'" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
    </NuxtLink>
    <div :dir="$lang.dir" :class="['h-[145px] lg:h-[170px] w-full flex flex-col lg:gap-3 gap-[10px]  px-1']">
      <!-- Colors -->
      <div v-if="related_products && related_products.length && color && color.hex"
        class="flex justify-start lg:gap-[11px] gap-[5px] flex-wrap">
        <span
          class="ring-1 ring-gray-900 relative  flex items-center justify-center rounded-full lg:w-[27px] lg:h-[27px] w-[23px] h-[23px] z-20">
          <span class="rounded-full lg:w-6 lg:h-6 w-5 h-5 z-40" :style="['background-color:' + color.hex]">
          </span>
        </span>
        <NuxtLink :to="localePath('/' + related.slug)" v-for="(related, index) in related_products"
          :key="'related-color-' + index" class="empty:hidden">
          <span v-if="related.color && index < 5 && related.color.hex != color.hex"
            :class="[('relative  flex items-center justify-center rounded-full lg:w-7 lg:h-7 w-6 h-6 z-20')]">
            <span class="rounded-full lg:w-6 lg:h-6 w-5 h-5 z-40" :style="['background-color:' + related.color.hex]">
            </span>
            <span v-if="related.stock" class="absolute border-b-black border-b w-8 -rotate-45 z-50"></span>
          </span>
        </NuxtLink>
      </div>
      <!-- Name -->
      <NuxtLink :to="link"
        class="line-clamp-2 lg:text-base text-sm lg:min-h-[48px] min-h-[42px] text-gray-900 font-normal leading-[22px]">
        {{ name }}
      </NuxtLink>
      <!-- Tags -->
      <div v-if="tags && tags.length > 0" class="flex flex-wrap justify-start gap-[7px] h-7">
        <span v-for="tag, index in tags" :key="index">
          <span class="text-center px-5 font-normal text-xs text-gray-900 bg-[#D9D9D9] rounded-md" v-if="index < 2">
            {{ tag.name }}</span>
        </span>
      </div>
      <!-- price -->
      <div v-if="special && special !== null && price && price !== null" class="flex lg:gap-2 gap-1 justify-start">
        <span :class="['text-xs text-red-600 font-bold lg:text-base leading-5']">
          {{ special + ' ' + currency }}
        </span>
        <del :class="['text-xs text-gray-900 font-normal lg:text-base leading-5']">
          {{ price + ' ' + currency }}
        </del>
      </div>
      <div v-else-if="price && price !== null" class="flex gap-2 justify-start">
        <span :class="['text-xs text-gray-900 font-bold lg:text-base leading-5']">
          {{ price + ' ' + currency }}
        </span>
      </div>
      <div v-else class="flex gap-2 justify-start empty:hidden">
      </div>
      <!-- Card -->
      <div v-if="cart_btn" class="w-full flex flex-col justify-end flex-1">
        <Button v-if="available" type="button" color="black" @click="navigateTo(localePath('/' + slug))"
          class="items-center justify-center font-extrabold lg:text-sm text-xs shadow-sm text-white">
          {{ $t('home_products_cart_btn') }}
        </Button>
        <div v-else class="flex flex-col lg:flex-row justify-between items-center gap-4">
          <button
            class="flex justify-center items-center gap-2  w-[185px] lg:w-[151px] h-[38px] bg-black shadow rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 31" fill="none">
              <path
                d="M5 21.8965H11.25H18.75H25L23.2438 20.1403C22.7676 19.6641 22.5 19.0181 22.5 18.3445V14.3965C22.5 11.1309 20.413 8.35284 17.5 7.32325V6.89648C17.5 5.51577 16.3807 4.39648 15 4.39648C13.6193 4.39648 12.5 5.51577 12.5 6.89648V7.32325C9.58702 8.35284 7.5 11.1309 7.5 14.3965V18.3445C7.5 19.0181 7.23243 19.6641 6.75617 20.1403L5 21.8965Z"
                fill="white" />
              <path
                d="M18.75 21.8965H25L23.2438 20.1403C22.7676 19.6641 22.5 19.0181 22.5 18.3445V14.3965C22.5 11.1309 20.413 8.35284 17.5 7.32325V6.89648C17.5 5.51577 16.3807 4.39648 15 4.39648C13.6193 4.39648 12.5 5.51577 12.5 6.89648V7.32325C9.58702 8.35284 7.5 11.1309 7.5 14.3965V18.3445C7.5 19.0181 7.23243 19.6641 6.75617 20.1403L5 21.8965H11.25M18.75 21.8965V23.1465C18.75 25.2176 17.0711 26.8965 15 26.8965C12.9289 26.8965 11.25 25.2176 11.25 23.1465V21.8965M18.75 21.8965H11.25"
                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-white text-[10px] lg:text-sm font-medium lg:font-semibold leading-5">
              {{ $t('product_stock_notify_button') }}
            </span>
          </button>
          <NuxtLink :to="localePath('/favorite/similar/' + slug)"
            class="flex justify-center items-center gap-2 w-[185px] lg:w-[151px] h-[38px] bg-white shadow rounded-md ring-1 ring-gray-300">
            <span class="text-gray-700 text-[10px] lg:text-sm font-medium lg:font-semibold leading-5">
              {{ $t('similar_products_title') }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
const localePath = useLocalePath()
const emits = defineEmits(['favoriteClick'])
const { $lang } = useNuxtApp()
const { t } = useI18n()
const currency = t('sar')
const props = defineProps({
  name: {
    type: String,
  },
  tags: {
    type: Object,
  },
  related_products: {
    type: Object,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  special: {
    type: Number,
  },
  color: {
    type: Object,
  },
  link: {
    type: String,
  },
  slug: {
    type: String,
  },
  favorite: {
    type: Boolean,
  },
  id: {
    type: Number,
  },
  cart_btn: {
    type: Boolean,
    default: false
  },
  available: {
    type: Boolean,
    default: true
  }
});
const favorite = ref(props.favorite)
const { toggleFavorite } = useFavorite()
async function removeFavorite() {
  const toggle = await toggleFavorite(props.id)
  if (toggle.status) {
    favorite.value = !favorite.value
    emits('favoriteClick')
  }
}
</script>