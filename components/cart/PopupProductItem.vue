<template>
  <div v-if="shown" class="w-full flex gap-3 border-b border-b-gray-200 pb-3">
    <!-- image -->
    <div class="lg:w-[188px] w-[138px] h-[138px] lg:h-[188px] flex-shrink-0">
      <img v-if="product.buyable_image && product.buyable_image != null" class="w-full h-full rounded-md"
        :src="product.buyable_image" alt="Alhabib-Shop">
      <img v-else class="w-full h-full rounded-md"
        src="/images/placeholder-logo.png" alt="Alhabib-Shop">
    </div>
    <!-- details -->
    <div class="flex flex-col justify-start lg:gap-4 gap-2 lg:min-w-[330px] lg:max-w-[315px] min-w-full w-full">
      <!-- name -->
      <div class="lg:text-gray-600 text-gray-900 text-xs font-semibold leading-5 lg:min-h-[30px] lg:max-w-[298px]">
        {{ product.buyable_name }}
      </div>
      <!-- price -->
      <div class="text-[#000] text-xs font-bold leading-5">
        {{ priceFormate(product.discounted_price ? product.discounted_price : product.price ? product.price : 0) }}
      </div>
      <!-- Options -->
      <div class="flex lg:gap-12 gap-2" v-if="product.variation_option">
        <div class="lg:min-w-[148px]">
          <label class="block pb-1 text-xs font-normal text-gray-900 leading-5">{{ $t('label_size') }}</label>
          <select
            class="bg-white cursor-pointer lg:min-w-[190px] min-w-[140px] border flex items-center justify-between border-gray-300 text-gray-900 text-xs font-semibold rounded-md focus:ring-gray-300 focus:border-gray-300 w-full px-3">
            <option :value="product.variation_option.id" selected>
              {{ product.variation_option.value }}
            </option>
          </select>
        </div>
        <div v-if="cart_item.quantity > 0">
          <label class="block pb-1 text-xs font-normal text-gray-900 leading-5">{{ $t('label_quantity') }}</label>
          <select v-model="quantity" @change="updateCartItem()"
            class="bg-white cursor-pointer border min-w-[60px] flex items-center justify-between border-gray-300 text-gray-900 text-xs font-semibold rounded-md focus:ring-gray-300 focus:border-gray-300 w-max px-3">
            <option v-for="(qty, index) in product.quantity" :value="qty" :selected="qty == cart_item.quantity"> {{ qty
              }}
            </option>
          </select>
        </div>
      </div>
      <!-- Favorite -->
      <button v-if="!favorite" @click.prevent="toggleFavoriteCall()"
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
    <div class="hidden lg:flex items items-start justify-end rtl:pl-1">
      <button type="button" @click.prevent="deleteCartItem">
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
const emits = defineEmits('RemoveItem')
const props = defineProps({
  cart_item: {
    type: Object
  }
})
const product = props.cart_item && props.cart_item.product ? props.cart_item.product : {}
const quantity = ref(props.cart_item && props.cart_item.quantity ? props.cart_item.quantity : 1)
const { setCartData } = useCart()

async function updateCartItem() {

  if (props.cart_item && props.cart_item.id && product && quantity.value <= product.quantity) {
    const update_cart_data = {
      cart_item_id: props.cart_item.id,
      item_type: product.buyable_type,
      item_id: product.id,
      item_qty: quantity.value,
    }
    await useCart().editItem(update_cart_data)
    const refresh_cart = await useCart().getAll()
    if (refresh_cart.id) {
      setCartData(refresh_cart)
    }
  }
}

async function deleteCartItem() {
  if (props.cart_item && props.cart_item.id) {
    await useCart().deleteItem(props.cart_item.id)
    const refresh_cart = await useCart().getAll()
    if (refresh_cart.id) {
      setCartData(refresh_cart)
      emits('RemoveItem')
      shown.value = false
    }
  }
}

const favorite = ref(props.cart_item.favorite)
const { toggleFavorite } = useFavorite()
async function toggleFavoriteCall() {
  const toggle = await toggleFavorite(props.cart_item.product.id)
  if (toggle.status) {
    favorite.value = !favorite.value
  }
}
</script>