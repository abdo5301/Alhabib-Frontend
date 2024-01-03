export function useAddress() {
  async function getCountries() {
    if (process.client) {
      try {
        const countries = await useNuxtApp().$apiFetch('/countries/get')
        if (countries.data && countries.status) {
          return countries.data
        }
      } catch (error) {
        console.log(error.data)
        return []
      }
    }
  }

  async function getRegions(country_id = 1) {
    if (process.client) {
      try {
        const regions = await useNuxtApp().$apiFetch(
          '/regions/of-country?country_id=' + country_id
        )
        if (regions.data && regions.status) {
          return regions.data
        }
      } catch (error) {
        console.log(error.data)
        return []
      }
    }
  }

  async function getCities(region_id) {
    if (process.client) {
      try {
        const cities = await useNuxtApp().$apiFetch(
          '/cities/of-region?region_id=' + region_id
        )
        if (cities.data && cities.status) {
          return cities.data
        }
      } catch (error) {
        console.log(error.data)
        return []
      }
    }
  }

  async function getAllAddresses() {
    if (process.client) {
      try {
        const addresses = await useNuxtApp().$apiFetch(
          '/customer/address/get-all'
        )
        if (addresses.data) {
          return addresses.data
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

  async function getAddress(address_id) {
    try {
      const address = await useNuxtApp().$apiFetch(
        '/customer/address/get?address_id=' + address_id
      )
      if (address.data && address.status) {
        return address.data
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

  async function editAddress(data) {
    try {
      const edit_address = await useNuxtApp().$apiFetch(
        '/customer/address/edit',
        {
          method: 'PATCH',
          body: {
            address_id: data.address_id,
            city_id: data.city_id,
            street: data.street,
            neighborhood: data.neighborhood,
            default: data.default,
          },
        }
      )
      if (edit_address.data && edit_address.status) {
        return edit_address.data
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

  async function addAddress(data) {
    try {
      const add_address = await useNuxtApp().$apiFetch(
        '/customer/address/create',
        {
          method: 'POST',
          body: {
            city_id: data.city_id,
            street: data.street,
            neighborhood: data.neighborhood,
            default: data.default,
          },
        }
      )
      if (add_address.data && add_address.status) {
        return add_address.data
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

  async function defaultAddress() {
    const allAddresses = await getAllAddresses()
    if (allAddresses && allAddresses.length > 0) {
      const address = arrayFilter(allAddresses, 'default', 1)
      if (address == false) {
        address = allAddresses[0]
      }
      return address
    } else {
      return {}
    }
  }

  function getAreaId(area_name = '', areas = []) {
    if (areas && areas.length > 0 && area_name.length > 0) {
      const area_data = arrayFilter(areas, 'name', area_name)
      if (area_data != false && area_data.id) {
        return area_data.id
      } else {
        return false
      }
    }
    return false
  }

  return {
    getCountries,
    getRegions,
    getCities,
    getAllAddresses,
    getAddress,
    addAddress,
    editAddress,
    defaultAddress,
    getAreaId,
  }
}
