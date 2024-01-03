export function usePaymentMethod() {
  async function allPaymentMethods() {
    if (process.client) {
      try {
        const methods = await useNuxtApp().$apiFetch(
          '/payment-gate-way/get-all'
        )
        if (methods.data && methods.status) {
          return methods.data
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

  return { allPaymentMethods }
}
