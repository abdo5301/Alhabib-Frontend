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

  async function toggleWalletCart(wallet_status = true) {
    const wallet_action = ref('add')
    if (wallet_status != true) {
      wallet_action.value = 'remove'
    }
    try {
      const save_data = await useNuxtApp().$apiFetch(
        '/customer/cart/wallet-credit/' + wallet_action.value,
        {
          method: 'POST',
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
  return { getWalletData, getWalletTransactions, toggleWalletCart }
}
