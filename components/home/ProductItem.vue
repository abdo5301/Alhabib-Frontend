<template>

  <div class="flex flex-shrink-0 flex-col justify-start lg:w-[268px] w-[175px]">
    <NuxtLink :to="link" @click="triggerClickProduct(null)" class="relative w-full">
      <NuxtImg class="w-full lg:h-[267px] h-[170px]" :src="image != null ? image : '/images/placeholder-logo.png'"
        :alt="name" loading="lazy" />
      <button @click.prevent="toggleFavoriteCall()" type="button" :title="$t('product_add_favorite_btn')"
        class="absolute bg-[#f9fafb9e] lg:p-2 p-1 rounded-full lg:bottom-[12px] bottom-[7px] lg:right-[12px] right-[10px] text-gray-700 text-base lg:text-xl font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-[26px] w-5 h-5 lg:h-[26px] " viewBox="0 0 26 26"
          :fill="favorite ? '#A30000' : 'none'">
          <path
            d="M4.67785 6.84448C2.77405 8.74829 2.77405 11.835 4.67785 13.7388L13.0001 22.061L21.3221 13.7388C23.226 11.835 23.226 8.74829 21.3221 6.84448C19.4183 4.94067 16.3317 4.94067 14.4279 6.84448L13.0001 8.27239L11.5721 6.84448C9.66834 4.94067 6.58166 4.94067 4.67785 6.84448Z"
            :stroke="favorite ? '#A30000' : '#1F2937'" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
    </NuxtLink>
    <div :dir="$lang.dir"
      :class="[cart_btn ? 'lg:h-[255px] h-[230px]' : 'lg:h-[200px] h-[180px]', 'w-full gap-4 flex flex-col pt-[11px] pb-[15px] px-2 bg-[#FFF]']">
      <NuxtLink :to="link" class="line-clamp-2 lg:text-base text-xs text-gray-900 font-normal">
        {{ name }}
      </NuxtLink>
      <!-- Tags -->
      <div v-if="tags && tags.length" class="flex flex-wrap justify-start gap-[10px]">
        <span v-for="tag, index in tags" :key="index">
          <span class="text-center px-3 font-normal text-xs text-gray-900 bg-[#D9D9D9] rounded-md" v-if="index < 2">{{
            tag.name }}</span>
        </span>
      </div>
      <!-- price -->
      <div v-if="special" class="flex gap-2 justify-start">
        <span class="text-red-600 font-bold lg:text-base text-xs">
          {{ special }}
        </span>
        <del class="text-gray-900 font-normal lg:text-base text-xs">
          {{ price }}
        </del>
      </div>
      <div v-else class="flex gap-2 justify-start">
        <span class="text-gray-900 font-bold lg:text-base text-xs">
          {{ price }}
        </span>
      </div>
      <!-- Colors -->
      <div v-if="related_products && related_products.length && color && color.hex"
        class="flex justify-start lg:gap-[11px] gap-[6px] flex-wrap">
        <span
          class="ring-1 ring-gray-900 relative  flex items-center justify-center rounded-full lg:w-[28px] lg:h-[28px] w-[24px] h-[24px] z-20">
          <span class="rounded-full lg:w-6 lg:h-6 w-5 h-5 z-40" :style="['background-color:' + color.hex]">
          </span>
        </span>
        <span v-for="related, index in related_products" :key="index" class="empty:hidden">
          <NuxtLink v-if="index < 5 && related.color && related.color.hex != color.hex"
            :to="localPath('/' + related.slug)" @click="triggerClickProduct(related)" class="empty:hidden">
            <span :class="[('relative  flex items-center justify-center rounded-full lg:w-7 lg:h-7 w-6 h-6 z-20')]">
              <span :class="['rounded-full lg:w-6 lg:h-6 w-5 h-5 z-40 border']"
                :style="['background-color:' + related.color.hex]">
              </span>
              <span v-if="related.stock" class="absolute border-b-black border-b w-8 -rotate-45 z-50"></span>
            </span>
          </NuxtLink>
        </span>
      </div>
      <!-- Card -->
      <div v-if="cart_btn" class="w-full flex flex-col justify-end flex-1">
        <Button type="button" color="black" @click="navigateTo(link),triggerClickProduct(null)"
          class="items-center justify-center font-extrabold lg:text-sm text-xs shadow-sm text-white">{{
            $t('home_products_cart_btn') }}</Button>
      </div>
    </div>
  </div>

</template>


<script setup>
const emits = defineEmits(['favoriteClick'])
const { $lang } = useNuxtApp()
const localPath = useLocalePath()
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
    type: String,
  },
  special: {
    type: String,
  },
  color: {
    type: Object,
  },
  link: {
    type: String,
  },
  category_name: {
    type: String,
  },
  favorite: {
    type: Boolean,
  },
  id: {
    type: Number,
  },
  available: {
    type: Boolean,
    default: true
  },
  cart_btn: {
    type: Boolean,
    default: true
  },
  product_sort: {
    type: Number,
  },
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

function triggerClickProduct(related_product = null) {
  if (typeof dataLayer !== 'undefined') {
    var event_price = props.special ? props.special : props.price ? props.price : 0
    event_price = Number(priceFormate(event_price, false))
    var event_name = props.name
    var event_id = props.id
    var event_category = props.category_name
    var event_stock = props.available == true ? 'In Stock' : 'Out Of Stock'
    var event_position = Math.abs(props.product_sort)

    if (related_product != null) {
      event_price = related_product.started_discounted_price ? related_product.started_discounted_price : related_product.started_price ? related_product.started_price : 0
      event_price = Number(priceFormate(event_price, false))
      event_name = related_product.name
      event_id = related_product.id
      event_category = related_product.category?.name
      event_stock = related_product.availability == true ? 'In Stock' : 'Out Of Stock'
    }

    dataLayer.push({
      'event': 'select_item',
      'eventCat': 'eCommerce',
      'eventLbl': event_name,
      'ecommerce': {
        'currencyCode': 'SAR',
        'click': {
          'actionField': { 'list': event_category }, // The list Name.
          'products': [{
            'name': event_name,
            'id': event_id,
            'price': event_price,
            'brand': '',
            'category': event_category,
            'variant': '',
            'list': event_category,
            'dimension3': event_stock,
            'position': event_position
          }]
        }
      }
    });
  }
  console.log(dataLayer);
}
</script>