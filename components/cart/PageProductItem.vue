<template>
  <div v-if="shown" class="w-full flex flex-col gap-3">
    <!-- Mobile Low Quantity Alert -->
    <div v-if="product.quantity < 10 && cart_item.availability == true"
      class="lg:hidden flex justify-start items-center gap-[6px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M8.29578 14.3996C11.8416 14.3996 14.7161 11.5342 14.7161 7.99961C14.7161 4.46499 11.8416 1.59961 8.29578 1.59961C4.74995 1.59961 1.87549 4.46499 1.87549 7.99961C1.87549 11.5342 4.74995 14.3996 8.29578 14.3996ZM9.09832 4.79961C9.09832 4.35778 8.73901 3.99961 8.29578 3.99961C7.85255 3.99961 7.49325 4.35778 7.49325 4.79961V7.99961C7.49325 8.21178 7.5778 8.41526 7.7283 8.56529L9.99822 10.828C10.3116 11.1405 10.8198 11.1405 11.1332 10.828C11.4466 10.5156 11.4466 10.0091 11.1332 9.69666L9.09832 7.66824V4.79961Z"
          fill="#E11D48" />
      </svg>
      <span class="text-rose-600 text-xs font-normal leading-5">
        {{ $t('cart_remaining_stock_1') }} {{ product.quantity }} {{ $t('cart_remaining_stock_2') }}
      </span>
    </div>
    <!-- Mobile Product Unavailable Alert -->
    <div v-if="cart_item.availability == false && cart_item.availability_message"
      class="lg:hidden flex justify-start items-center gap-[6px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 30 30" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M27 15C27 21.6274 21.6274 27 15 27C8.37258 27 3 21.6274 3 15C3 8.37258 8.37258 3 15 3C21.6274 3 27 8.37258 27 15ZM16.5 21C16.5 21.8284 15.8284 22.5 15 22.5C14.1716 22.5 13.5 21.8284 13.5 21C13.5 20.1716 14.1716 19.5 15 19.5C15.8284 19.5 16.5 20.1716 16.5 21ZM15 7.5C14.1716 7.5 13.5 8.17157 13.5 9V15C13.5 15.8284 14.1716 16.5 15 16.5C15.8284 16.5 16.5 15.8284 16.5 15V9C16.5 8.17157 15.8284 7.5 15 7.5Z"
          fill="#EF4444" />
      </svg>
      <span class="text-rose-600 text-xs font-normal leading-5">
        {{ cart_item.availability_message }}
      </span>
    </div>

    <!-- Product Data -->
    <div class="flex gap-3 lg:border-t lg:border-t-gray-200 lg:pt-6 w-full">
      <!-- image -->
      <div class="lg:w-[267px] w-[130px] h-[143px] lg:h-[267px] flex-shrink-0">
        <img v-if="product.buyable_image && product.buyable_image != null" class="w-full h-full rounded-lg"
          :src="product.buyable_image" alt="Alhabib-Shop">
        <img v-else class="w-full h-full rounded-lg" src="/images/placeholder-logo.png" alt="Alhabib-Shop">
      </div>
      <!-- details -->
      <div class="flex flex-col justify-start gap-3 flex-1">
        <!-- Desktop remove item -->
        <div class="lg:flex hidden items-start justify-end lg:pe-[17px]">
          <button type="button" @click="deleteCartItem()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 18L18 6M6 6L18 18" stroke="#6B7280" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <div class="flex flex-col lg:flex-row gap-3 lg:gap-[31px]">
          <!-- name -->
          <div
            class="order-2 lg:order-1 text-gray-600 text-sm lg:text-base font-medium lg:font-semibold leading-6 lg:leading-7 lg:min-h-[60px] 2xl:max-w-[450px] xl:max-w-[300px] max-w-[190px]">
            {{ product.buyable_name }}
          </div>
          <div class="order-1 lg:order-2 flex">
            <!-- price -->
            <div class="flex-1 leading-5">
              <div class="inline-flex gap-1" v-if="product.discounted_price">
                <span class="text-red-600 font-bold lg:text-base text-sm">{{ priceFormate(product.discounted_price)
                  }}</span>
                <span class="text-gray-900 font-normal line-through lg:text-base text-sm">{{ priceFormate(product.price)
                  }}</span>
              </div>
              <div class="text-[#000] font-bold text-base" v-else>
                {{ priceFormate(product.price) }}
              </div>
            </div>
            <!-- Mobile remove item -->
            <div class="lg:hidden flex items-start justify-end lg:pe-[1px]">
              <button type="button" @click="deleteCartItem()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 18L18 6M6 6L18 18" stroke="#6B7280" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Options -->
        <div class="flex flex-col lg:flex-row lg:gap-[100px] gap-4" v-if="product.variation_option">
          <div
            class="flex lg:flex-col flex-row gap-2 lg:gap-1 items-center lg:items-start lg:min-w-[148px] max-w-[170px] lg:max-w-full">
            <label class="block pb-1 text-sm font-normal text-gray-900 leading-5">{{ $t('label_size') }}</label>
            <select
              class="bg-white cursor-pointer min-w-[125px] lg:min-w-[190px] shadow-sm border flex items-center justify-between border-gray-300 text-gray-900 text-sm font-semibold rounded-md focus:ring-gray-300 focus:border-gray-300 px-3 lg:py-2 py-[6px]">
              <option :value="product.variation_option.id" selected>
                {{ product.variation_option.value }}
              </option>
            </select>
          </div>
          <!-- Quantity -->
          <div
            class="flex lg:flex-col flex-row gap-4 lg:gap-1 items-center lg:items-start lg:min-w-[148px] max-w-[170px] lg:max-w-full"
            v-if="cart_item.quantity > 0">
            <label class="block pb-1 text-sm font-normal text-gray-900 leading-5">{{ $t('label_quantity') }}</label>
            <select v-model="quantity" @change="updateCartItem()"
              class="bg-white cursor-pointer min-w-[125px] lg:min-w-[190px] shadow-sm border flex items-center justify-between border-gray-300 text-gray-900 text-sm font-semibold rounded-md focus:ring-gray-300 focus:border-gray-300 w-max px-3 lg:py-2 py-[6px]">
              <option v-for="(qty, index) in product.quantity" :value="qty" :selected="qty == cart_item.quantity">
                {{ qty }}
              </option>
            </select>
          </div>
        </div>

        <!-- Desktop Low Quantity Alert -->
        <div v-if="product.quantity < 10 && cart_item.availability == true"
          class="hidden lg:flex justify-start items-center gap-2 pt-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M8.29578 14.3996C11.8416 14.3996 14.7161 11.5342 14.7161 7.99961C14.7161 4.46499 11.8416 1.59961 8.29578 1.59961C4.74995 1.59961 1.87549 4.46499 1.87549 7.99961C1.87549 11.5342 4.74995 14.3996 8.29578 14.3996ZM9.09832 4.79961C9.09832 4.35778 8.73901 3.99961 8.29578 3.99961C7.85255 3.99961 7.49325 4.35778 7.49325 4.79961V7.99961C7.49325 8.21178 7.5778 8.41526 7.7283 8.56529L9.99822 10.828C10.3116 11.1405 10.8198 11.1405 11.1332 10.828C11.4466 10.5156 11.4466 10.0091 11.1332 9.69666L9.09832 7.66824V4.79961Z"
              fill="#E11D48" />
          </svg>
          <span class="text-rose-600 text-sm font-normal leading-5">{{ $t('cart_remaining_stock_1') }}
            {{ product.quantity }} {{ $t('cart_remaining_stock_2') }}</span>
        </div>
        <!-- Desktop Product Unavailable Alert -->
        <div v-if="cart_item.availability == false && cart_item.availability_message"
          class="hidden lg:flex justify-start items-center gap-2 pt-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 30 30" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M27 15C27 21.6274 21.6274 27 15 27C8.37258 27 3 21.6274 3 15C3 8.37258 8.37258 3 15 3C21.6274 3 27 8.37258 27 15ZM16.5 21C16.5 21.8284 15.8284 22.5 15 22.5C14.1716 22.5 13.5 21.8284 13.5 21C13.5 20.1716 14.1716 19.5 15 19.5C15.8284 19.5 16.5 20.1716 16.5 21ZM15 7.5C14.1716 7.5 13.5 8.17157 13.5 9V15C13.5 15.8284 14.1716 16.5 15 16.5C15.8284 16.5 16.5 15.8284 16.5 15V9C16.5 8.17157 15.8284 7.5 15 7.5Z"
              fill="#EF4444" />
          </svg>
          <span class="text-rose-600 text-sm font-normal leading-5">
            {{ cart_item.availability_message }}
          </span>
        </div>
        <!-- Desktop Favorite -->
        <div v-if="!favorite" class="hidden lg:flex flex-col flex-1 justify-end lg:pb-1">
          <button @click.prevent="toggleFavoriteCall()"
            class="max-w-[148px] py-2 px-3 flex items-center justify-center rtl:gap-2 ltr:gap-[6px] bg-white rounded-md shadow-sm ring-1 ring-gray-300 text-gray-900 text-sm font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M3.59835 5.26437C2.13388 6.72883 2.13388 9.1032 3.59835 10.5677L10 16.9694L16.4017 10.5677C17.8661 9.1032 17.8661 6.72883 16.4016 5.26436C14.9372 3.7999 12.5628 3.7999 11.0983 5.26437L10 6.36276L8.90165 5.26437C7.43718 3.7999 5.06282 3.7999 3.59835 5.26437Z"
                stroke="#1F2937" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ $t('cart_popup_add_favorite_btn') }}
          </button>
        </div>
      </div>

    </div>

    <!-- Mobile Favorite -->
    <button v-if="!favorite" @click.prevent="toggleFavoriteCall()"
      class="lg:hidden flex max-w-[141px] py-2 px-3 shadow-sm  items-center justify-center rtl:gap-2 ltr:gap-[6px] bg-white rounded-md ring-1 ring-gray-300 text-gray-900 text-sm font-semibold">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3.59835 5.26534C2.13388 6.72981 2.13388 9.10418 3.59835 10.5686L10 16.9703L16.4017 10.5686C17.8661 9.10418 17.8661 6.72981 16.4016 5.26534C14.9372 3.80088 12.5628 3.80088 11.0983 5.26534L10 6.36374L8.90165 5.26534C7.43718 3.80088 5.06282 3.80088 3.59835 5.26534Z"
          stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      {{ $t('cart_popup_add_favorite_btn') }}
    </button>
  </div>
  <!-- Divider -->
  <div v-if="!last_item" class="lg:hidden flex items-center justify-center h-[40px] w-full px-[14px]">
    <div class="border-b border-b-gray-200 w-full"></div>
  </div>
</template>

<script setup>
const emits = defineEmits(['productHasError', 'refreshCart', 'emptyCart'])
const shown = ref(true);
const props = defineProps({
  cart_item: {
    type: Object
  },
  last_item: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Boolean,
    default: false
  }

})

const product = props.cart_item && props.cart_item.product ? props.cart_item.product : {}
const quantity = ref(props.cart_item && props.cart_item.quantity ? props.cart_item.quantity : 1)
const { setCartData } = useCart()
if (props.cart_item.availability == false) {
  emits('productHasError')
}
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
      emits('refreshCart')
    }
  }
}

async function deleteCartItem() {
  if (props.cart_item && props.cart_item.id) {
    await useCart().deleteItem(props.cart_item.id)
    const refresh_cart = await useCart().getAll()
    if (refresh_cart.id) {
      setCartData(refresh_cart)
      shown.value = false
      emits('refreshCart')
      if (refresh_cart.cart_items.length == 0) {
        emits('emptyCart')
      }
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