export function useAuth() {
  function setUser(token) {
    if (process.client) {
      localStorage.removeItem('otp_phone')
      localStorage.removeItem('otp_redirect_back')
      localStorage.removeItem('login_redirect')
      localStorage.setItem('user_token', token)
    }
  }

  function setUserOTP(phone, phone_edit_page) {
    if (process.client) {
      localStorage.setItem('otp_phone', phone)
      localStorage.setItem('otp_redirect_back', phone_edit_page)
    }
  }

  async function getUserToken(check_server = false) {
    if (process.client) {
      const local_token = localStorage.getItem('user_token')
      //check if local token is active in server
      //note that >> local token is already included with apiFetch plugin
      if (local_token && local_token != null) {
        if (check_server == true) {
          const user = await useNuxtApp().$apiFetch('/customer/get')
          if (user.data && user.data.status == true) {
            return local_token
          } else {
            return null
          }
        } else {
          return local_token
        }
      } else {
        return null
      }
    }
    return null
  }

  async function getUserData() {
    if (process.client) {
      const local_token = localStorage.getItem('user_token')
      if (local_token && local_token !== null) {
        //check server token
        const user = await useNuxtApp().$apiFetch('/customer/get')
        if (user.data && user.data.status == true) {
          return user.data.data
        }
      }
    }
    return false
  }

  function removeUser() {
    if (process.client) {
      localStorage.removeItem('user_token')
      localStorage.removeItem('otp_phone')
      localStorage.removeItem('otp_redirect_back')
      localStorage.removeItem('login_redirect')
    }
  }

  const isLoggedIn = computed(() => {
    if (process.client) {
      return !!localStorage.getItem('user_token')
    }
  })

  return {
    setUser,
    getUserToken,
    removeUser,
    getUserData,
    setUserOTP,
    isLoggedIn,
  }
}
