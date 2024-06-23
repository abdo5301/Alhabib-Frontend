<template>
  <div v-if="pending" class="flex items-center justify-center h-[600px] max-h-screen w-full mx-auto">
    <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
  </div>
  <div v-if="!pending && slug_type != null">
    <LazyPageProduct v-if="slug_type == 'App\\Models\\MasterProduct'" :url_data="slug_data.data" />
    <LazyPageCategory v-if="slug_type == 'App\\Models\\Category'" :url_data="slug_data.data" />
    <LazyPageStatic v-if="slug_type == 'App\\Models\\Page'" :url_data="slug_data.data" />
  </div>
</template>

<script setup>
const route = useRoute()
const nuxtApp = useNuxtApp()
const config = useRuntimeConfig()
const slug_type = ref(null)
const url_slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
const { data: slug_data, pending, error } = await useFetch(config.public.API_URL + '/slug/get', {
  query: { slug: url_slug },
  key: url_slug,
  pick: ['data'],
  transform(input) {
    return {
      ...input,
      fetchedAt: new Date()
    }
  },
  getCachedData(key) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    // If data is not fetched yet
    if (!data) {
      // Fetch the first time
      return
    }
    // Is the data too old?
    const expirationDate = new Date(data.fetchedAt)
    expirationDate.setTime(expirationDate.getTime() + 2629800 * 1000)//One month
    const isExpired = expirationDate.getTime() < Date.now()
    if (isExpired) {
      // Refetch the data
      return
    }

    return data
  }
})
if (error.value) { //error
  console.log(error.value.data)
  // throw createError({
  //   statusCode: 404,
  //   statusMessage: 'Slug - Server Error',
  //   fatal: true
  // })
} else { //success
  if (!slug_data.value.data || !slug_data.value.data.slugable_type) {
    //throw createError({ statusCode: 404, statusMessage: 'Slug not found', fatal: true })
  } else {
    slug_type.value = slug_data.value.data.slugable_type
  }
}

</script>