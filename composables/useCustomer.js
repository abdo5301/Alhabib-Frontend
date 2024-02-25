export function useCustomer() {
  const customerData = useState('customer', () => {})
  const setCustomerData = data => {
    customerData.value = data
  }

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

  async function editCustomer(data) {
    try {
      return await useNuxtApp().$apiFetch('/customer/edit', {
        method: 'PATCH',
        body: {
          name: data.name,
          mobile: data.mobile,
          email: data.email,
        },
      })
    } catch (error) {
      console.log(error.data)
      if (error.data) {
        return error.data
      }
    }
  }

  async function editPassword(data) {
    try {
      return await useNuxtApp().$apiFetch('/customer/edit', {
        method: 'PATCH',
        body: {
          password: data.password,
          password_confirmation: data.confirm_password,
        },
      })
    } catch (error) {
      console.log(error.data)
      if (error.data) {
        return error.data
      }
    }
  }

  async function deleteCustomer() {
    if (process.client) {
      try {
        await useNuxtApp().$apiFetch('/customer/delete', {
          method: 'DELETE',
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
        return {}
      }
    }
  }

  const customerName = computed(() => {
    return customerData.value && customerData.value.name
      ? customerData.value.name
      : ''
  })
  const customerEmail = computed(() => {
    return customerData.value && customerData.value.email
      ? customerData.value.email
      : ''
  })
  const customerMobile = computed(() => {
    return customerData.value && customerData.value.mobile
      ? customerData.value.mobile
      : ''
  })
  const customerGender = computed(() => {
    return customerData.value && customerData.value.gender
      ? customerData.value.gender
      : ''
  })
  const customerBirthDate = computed(() => {
    return customerData.value && customerData.value.birth_date
      ? customerData.value.birth_date
      : ''
  })

  return {
    customerData,
    setCustomerData,
    getCustomer,
    editCustomer,
    deleteCustomer,
    editPassword,
    customerName,
    customerEmail,
    customerMobile,
    customerGender,
    customerBirthDate,
  }
}
