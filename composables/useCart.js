export function useCart() {
  const cartData = useState('cart', () => {})
  const cartPopUpKey = useState('cart_popup_key', () => 1234)
  const setCartData = data => {
    cartData.value = data
    cartPopUpKey.value += 3
  }

  async function getAll() {
    if (process.client) {
      try {
        const cart = await useNuxtApp().$apiFetch('/customer/cart')
        if (cart.data && cart.data.id) {
          return cart.data
        }
      } catch (error) {
        console.log(error.data)
        if (
          error.data &&
          error.data.message &&
          error.data.message == 'Unauthenticated.'
        ) {
          localStorage.removeItem('user_token')
        }
        return []
      }
    }
  }

  async function addItem(data) {
    try {
      const add_cart = await useNuxtApp().$apiFetch('/customer/cart/item/add', {
        method: 'POST',
        body: {
          buyable_type: data.item_type,
          buyable_id: data.item_id,
          quantity: data.item_qty,
        },
      })
      if (add_cart.data && add_cart.status) {
        return add_cart.data
      }
    } catch (error) {
      console.log(error.data)
      if (
        error.data &&
        error.data.message &&
        error.data.message == 'Unauthenticated.'
      ) {
        unAuthenticated()
      }
      return []
    }
  }

  async function editItem(data) {
    try {
      await useNuxtApp().$apiFetch('/customer/cart/item/update', {
        method: 'PATCH',
        body: {
          cart_item_id: data.cart_item_id,
          buyable_type: data.item_type,
          buyable_id: data.item_id,
          quantity: data.item_qty,
        },
      })
    } catch (error) {
      console.log(error.data)
      if (
        error.data &&
        error.data.message &&
        error.data.message == 'Unauthenticated.'
      ) {
        unAuthenticated()
      }
    }
  }

  async function deleteItem(id) {
    try {
      await useNuxtApp().$apiFetch('/customer/cart/item/remove', {
        method: 'DELETE',
        body: {
          cart_item_id: id,
        },
      })
    } catch (error) {
      console.log(error.data)
      if (
        error.data &&
        error.data.message &&
        error.data.message == 'Unauthenticated.'
      ) {
        unAuthenticated()
      }
    }
  }

  async function addCoupon(discount_coupon) {
    try {
      await useNuxtApp().$apiFetch('/customer/cart/coupon/add', {
        method: 'POST',
        body: {
          code: discount_coupon,
        },
      })
    } catch (error) {
      console.log(error.data)
      if (error.data && error.data.message) {
        if (error.data.message == 'Unauthenticated.') {
          unAuthenticated()
        } else if (error.data.errors && error.data.errors.code) {
          return 'invalid_code'
        } else {
          return error.data.message
        }
      }
    }
  }

  const cartItems = computed(() => {
    return cartData.value && cartData.value.cart_items
      ? cartData.value.cart_items
      : []
  })

  const cartCount = computed(() => {
    return cartData.value && cartData.value.cart_items
      ? cartData.value.cart_items.length
      : 0
  })

  const cartTotal = computed(() => {
    return cartData.value && cartData.value.total ? cartData.value.total : 0
  })

  const cartSubtotal = computed(() => {
    return cartData.value && cartData.value.subtotal
      ? cartData.value.subtotal
      : 0
  })

  const cartShipping = computed(() => {
    return cartData.value && cartData.value.shipping
      ? cartData.value.shipping
      : 0
  })

  const cartTax = computed(() => {
    return cartData.value && cartData.value.tax ? cartData.value.tax : 0
  })

  return {
    getAll,
    addItem,
    editItem,
    deleteItem,
    addCoupon,
    setCartData,
    cartData,
    cartPopUpKey,
    cartItems,
    cartCount,
    cartTotal,
    cartSubtotal,
    cartShipping,
    cartTax,
  }
}
