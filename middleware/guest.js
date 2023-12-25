export default defineNuxtRouteMiddleware((to, from) => {
  const nuxt = useNuxtApp()
  const isLoggedIn = useAuth().isLoggedIn
  if (process.client && isLoggedIn.value == true) {
    window.location.pathname = nuxt.$localePath('/account')
    return navigateTo(nuxt.$localePath('/account'))
  }
})
