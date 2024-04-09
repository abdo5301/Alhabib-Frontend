<template>
  <div
    :class="[list_type == 'solo' ? 'w-full' : 'w-[175px]', 'flex flex-shrink-0 flex-col lg:gap-3 gap-[10px] justify-start lg:w-[318px]']">
    <NuxtLink :to="link" class="relative w-full">
      <img :class="[list_type == 'solo' ? 'h-[377px]' : 'h-[175px]', 'w-full lg:h-[304px] rounded-lg object-cover']"
        :src="image ? image : '/images/placeholder-logo.png'">
      <span v-if="available == false"
        class="absolute top-0 rounded-lg bg-opacity-60 h-full w-full bg-[#F0EBEB] flex justify-center items-center">
        <span class="!opacity-100 text-gray-900 text-sm lg:text-base font-semibold">{{ $t('product_size_stock_alert')
          }}</span>
      </span>
      <button @click.prevent="toggleFavoriteCall()"
        :class="[list_type == 'solo' ? 'bottom-[25px] right-[18px]' : 'bottom-[15px] right-3', 'absolute bg-[#f9fafb9e] p-1 rounded-full lg:bottom-[20px] lg:right-[15px]']">
        <svg xmlns="http://www.w3.org/2000/svg" :class="[list_type == 'solo' ? 'w-8 h-8' : 'w-5 h-5', 'lg:w-8 lg:h-8']"
          viewBox="0 0 26 26" :fill="favorite ? '#A30000' : 'none'">
          <path
            d="M4.67785 6.84448C2.77405 8.74829 2.77405 11.835 4.67785 13.7388L13.0001 22.061L21.3221 13.7388C23.226 11.835 23.226 8.74829 21.3221 6.84448C19.4183 4.94067 16.3317 4.94067 14.4279 6.84448L13.0001 8.27239L11.5721 6.84448C9.66834 4.94067 6.58166 4.94067 4.67785 6.84448Z"
            :stroke="favorite ? '#A30000' : '#1F2937'" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
    </NuxtLink>
    <div :dir="$lang.dir"
      :class="[list_type == 'solo' ? 'h-[170px]' : 'h-[145px]', 'w-full flex flex-col lg:gap-3 gap-[10px] lg:h-[170px] px-1']">
      <!-- Colors -->
      <div v-if="related_products && related_products.length && color && color.hex"
        class="flex justify-start lg:gap-[11px] gap-[5px] flex-wrap">
        <span
          class="ring-1 ring-gray-900 relative  flex items-center justify-center rounded-full lg:w-[27px] lg:h-[27px] w-[23px] h-[23px] z-20">
          <span class="rounded-full lg:w-6 lg:h-6 w-5 h-5 z-40" :style="['background-color:' + color.hex]">
          </span>
        </span>
        <NuxtLink :to="localePath('/' + related.slug)" v-for="related, index in related_products"
          :key="'related-color-' + index" class="empty:hidden">
          <span v-if="related.color && index < 5 && related.color.hex != color.hex"
            :class="[('relative  flex items-center justify-center rounded-full lg:w-7 lg:h-7 w-6 h-6 z-20')]">
            <span class="rounded-full lg:w-6 lg:h-6 w-5 h-5 z-40" :style="['background-color:' + related.color.hex]">
            </span>
            <span v-if="related.stock" class="absolute border-b-black border-b w-8 -rotate-45 z-50"></span>
          </span>
        </NuxtLink>
      </div>
      <NuxtLink :to="link"
        class="line-clamp-2 lg:text-base text-sm lg:min-h-[48px] min-h-[42px] text-gray-900 font-normal leading-[22px]">
        {{ name }}
      </NuxtLink>
      <!-- Tags -->
      <div v-if="tags && tags.length > 0" class="flex flex-wrap justify-start gap-[7px] h-7">
        <span v-for="tag, index in tags" :key="index">
          <span class="text-center px-5 font-normal text-xs text-gray-900 bg-[#D9D9D9] rounded-md" v-if="index < 2">{{
      tag.name }}</span>
        </span>
      </div>
      <!-- price -->
      <div v-if="special && special !== null && price && price !== null" class="flex lg:gap-2 gap-1 justify-start">
        <span :class="[list_type == 'solo' ? 'text-sm' : 'text-xs', 'text-red-600 font-bold lg:text-base leading-5']">
          {{ special + ' ' + currency }}
        </span>
        <del :class="[list_type == 'solo' ? 'text-sm' : 'text-xs', 'text-gray-900 font-normal lg:text-base leading-5']">
          {{ price + ' ' + currency }}
        </del>
      </div>
      <div v-else-if="price && price !== null" class="flex gap-2 justify-start">
        <span :class="[list_type == 'solo' ? 'text-sm' : 'text-xs', 'text-gray-900 font-bold lg:text-base leading-5']">
          {{ price + ' ' + currency }}
        </span>
      </div>
      <div v-else class="flex gap-2 justify-start empty:hidden">
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
  favorite: {
    type: Boolean,
  },
  id: {
    type: Number,
  },
  list_type: {
    type: String,
    default: 'list'
  },
  available: {
    type: Boolean,
    default: true
  }
});
const favorite = ref(props.favorite)
const { toggleFavorite } = useFavorite()
async function toggleFavoriteCall() {
  const toggle = await toggleFavorite(props.id)
  if (toggle.status) {
    favorite.value = !favorite.value
    emits('favoriteClick')
  }
}
</script>