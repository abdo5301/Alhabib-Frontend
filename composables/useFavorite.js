export function useFavorite() {
  async function getFavorites(data_url) {
    if (process.client) {
      try {
        const favorites = await useNuxtApp().$apiFetch(data_url)
        if (favorites.data) {
          return favorites
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

  async function toggleFavorite(product_id) {
    try {
      return await useNuxtApp().$apiFetch('/customer/favorites/toggle', {
        method: 'POST',
        body: {
          master_product_id: product_id,
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
      return []
    }
  }
  return { getFavorites, toggleFavorite }
}
