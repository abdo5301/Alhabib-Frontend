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

  return { successOrderId, setSuccessOrderId, addOrder, getOrder }
}
