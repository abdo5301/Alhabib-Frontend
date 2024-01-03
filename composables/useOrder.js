export function useOrder() {
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

  return { addOrder }
}
