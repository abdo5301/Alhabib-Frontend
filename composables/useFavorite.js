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
      const toggle_response = await useNuxtApp().$apiFetch(
        '/customer/favorites/toggle',
        {
          method: 'POST',
          body: {
            master_product_id: product_id,
          },
        }
      )
      //for google analytics
      //if add to favorite case and google dataLayer is defined
      if (typeof dataLayer !== 'undefined') {
        const product_data = await useNuxtApp().$apiFetch(
          '/master-products/get?master_product_q=' + product_id
        )
        if (product_data.data && product_data.data.favorite == true) {
          var event_price = product_data.data.started_discounted_price
            ? product_data.data.started_discounted_price
            : product_data.data.started_price
          event_price = +Number(priceFormate(event_price, false))
          dataLayer.push({
            event: 'add_to_wishlist',
            eventCat: 'eCommerce',
            eventLbl: product_data.data.name,
            eventVal: event_price,
            ecommerce: {
              currencyCode: 'SAR',
              add: {
                products: [
                  {
                    name: product_data.data.name,
                    id: product_data.data.id,
                    price: event_price,
                    category: product_data.data.category.name,
                    variant: '',
                    brand: product_data.data.brand,
                    quantity: product_data.data.quantity,
                    dimension3:
                      product_data.data.availability == true
                        ? 'In Stock'
                        : 'Out Of Stock',
                  },
                ],
              },
            },
          })
          //console.log(dataLayer);
        }
      }
      return toggle_response
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
