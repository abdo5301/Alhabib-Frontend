export function unAuthenticated() {
  useAuth().removeUser()
  const login_redirect_back = useRoute().fullPath
  localStorage.setItem('login_redirect', login_redirect_back)
  window.location.pathname = useNuxtApp().$localePath('/auth/login-phone')
  return navigateTo(useNuxtApp().$localePath('/auth/login-phone'))
}
