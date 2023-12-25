export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')
  const user_token = useAuth().getUserToken()
  if (user_token != null) {
    headers.append('Authorization', 'Bearer ' + user_token)
  }

  nuxtApp.provide(
    'apiFetch',
    $fetch.create({
      baseURL: config.public.API_URL,
      headers: { headers },
    })
  )
})
