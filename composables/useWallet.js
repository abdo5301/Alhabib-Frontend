export function useWallet() {
  async function getWalletData(){
    if (process.client) {
      try {
        const wallet = await useNuxtApp().$apiFetch(
          '/customer/wallet/get'
        )
        if (wallet.data) {
          return wallet.data
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
  return { getWalletData }
}
