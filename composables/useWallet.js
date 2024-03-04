export function useWallet() {
  async function getWalletData() {
    if (process.client) {
      try {
        const wallet = await useNuxtApp().$apiFetch('/customer/wallet/get')
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
  async function getWalletTransactions(
    data_url = '/customer/wallet/transactions'
  ) {
    if (process.client) {
      try {
        const wallet_transactions = await useNuxtApp().$apiFetch(data_url)
        if (wallet_transactions.data) {
          return wallet_transactions
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
  return { getWalletData, getWalletTransactions }
}
