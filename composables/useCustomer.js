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

  async function subscribeToggle(data) {
    try {
      return await useNuxtApp().$apiFetch('/subscription/toggle', {
        method: 'POST',
        body: {
          channel: data.type,
          subscribe: data.subscribe,
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
      return error.data
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

  const customerEmailSubscribe = computed(() => {
    return customerData.value && customerData.value.email_subscription
      ? customerData.value.email_subscription
      : false
  })

  const customerWhatsappSubscribe = computed(() => {
    return customerData.value && customerData.value.whatsapp_subscription
      ? customerData.value.whatsapp_subscription
      : false
  })

  return {
    customerData,
    setCustomerData,
    getCustomer,
    editCustomer,
    deleteCustomer,
    editPassword,
    subscribeToggle,
    customerName,
    customerEmail,
    customerMobile,
    customerGender,
    customerBirthDate,
    customerEmailSubscribe,
    customerWhatsappSubscribe,
  }
}
