import registerVue from '~/pages/auth/register.vue'

export function useOrder() {
  const successOrderId = useState('success_order_id', () => 0)
  const setSuccessOrderId = order_id => {
    successOrderId.value = order_id
  }
  async function addOrder(data) {
    try {
      const add_order = await useNuxtApp().$apiFetch('/customer/order/create', {
        method: 'POST',
        body: {
          address_id: data.address_id,
          payment_gateway_id: data.payment_gateway_id,
          gifted: data.gifted,
          gift_phrase: data.gift_phrase,
        },
      })
      if (add_order.data && add_order.status) {
        return add_order.data
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

  async function getOrder(order_id) {
    if (process.client) {
      try {
        const order_data = await useNuxtApp().$apiFetch(
          '/customer/order/get?order_id=' + order_id
        )
        if (order_data.data && order_data.status) {
          return order_data.data
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
  }

  async function getAllOrders(type = 'all') {
    if (process.client) {
      var url = '/customer/order/get-all'
      if (type == 'current') {
        url =
          '/customer/order/get-all?state[]=payment_verification&state[]=pending&state[]=processing&state[]=ready_to_ship&state[]=review&state[]=branch_review&state[]=shipped'
      } else if (type == 'previous') {
        url =
          '/customer/order/get-all?state[]=branch_order&state[]=completed&state[]=canceled&state[]=refunded'
      } else {
        url = '/customer/order/get-all'
      }
      try {
        const orders = await useNuxtApp().$apiFetch(url)
        if (orders.data) {
          return orders.data
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

  async function cancelOrder(order_id) {
    try {
      const response = await useNuxtApp().$apiFetch(
        '/customer/order/cancel?order_id=' + order_id
      )
      if (response.status == true) {
        return true
      } else {
        return false
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
      return false
    }
  }

  async function saveOrderPayment(payment_id) {
    try {
      const save_data = await useNuxtApp().$apiFetch(
        '/customer/cart/payment-gateway/add',
        {
          method: 'POST',
          body: {
            payment_gateway_id: payment_id,
          },
        }
      )
      return save_data
    } catch (error) {
      console.log(error.data)
      if (
        error.data &&
        error.data.message &&
        error.data.message == 'Unauthenticated.'
      ) {
        unAuthenticated()
      }
      return error.data
    }
  }

  async function saveOrderAddress(address_id) {
    try {
      const save_data = await useNuxtApp().$apiFetch(
        '/customer/cart/address/add',
        {
          method: 'POST',
          body: {
            address_id: address_id,
          },
        }
      )
      return save_data
    } catch (error) {   
      console.log(error.data)
      if (
        error.data &&
        error.data.message &&
        error.data.message == 'Unauthenticated.'
      ) {
        unAuthenticated()
      }
      return error.data
    }
  }

  return {
    successOrderId,
    setSuccessOrderId,
    addOrder,
    getOrder,
    getAllOrders,
    cancelOrder,
    saveOrderPayment,
    saveOrderAddress,
  }
}
