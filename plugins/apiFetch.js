export default defineNuxtPlugin(async nuxtApp => {
  const config = useRuntimeConfig()
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')
  const user_token = await useAuth().getUserToken()
  if (user_token && user_token != null) {
    //console.log('user token : '+user_token)
    headers.append('Authorization', 'Bearer ' + user_token)
  }

  nuxtApp.provide(
    'apiFetch',
    $fetch.create({
      baseURL: config.public.API_URL,
      headers: headers ,
    })
  )
})
