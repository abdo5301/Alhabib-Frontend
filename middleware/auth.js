export default defineNuxtRouteMiddleware((to, from) => {
  const nuxt = useNuxtApp()
  const isLoggedIn = useAuth().isLoggedIn
  if (process.client && isLoggedIn.value == false) {
    //save current path and redirect to login page
    useAuth().removeUser()
    localStorage.setItem('login_redirect', to.fullPath)
    window.location.pathname = nuxt.$localePath('/login')
    return navigateTo(nuxt.$localePath('/login')) 
  }
})
