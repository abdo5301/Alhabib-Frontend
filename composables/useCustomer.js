export function useCustomer() {
  async function getCustomer() {
    if (process.client) {
      try {
        const customer = await useNuxtApp().$apiFetch('/customer/get')
        if (customer.data && customer.status) {
          return customer.data
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
        return {}
      }
    }
  }

  return { getCustomer }
}
