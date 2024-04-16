<template>
  <div v-if="data_loader" class="flex items-center justify-center h-[600px] max-h-screen w-full mx-auto">
    <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
  </div>
  <div>
    <ClientOnly>
      <LazyPageProduct v-if="page_type == 'product'" :url_data="slug_data" />
      <LazyPageCategory v-if="page_type == 'category'" :url_data="slug_data" />
      <LazyPageStatic v-if="page_type == 'static'" :url_data="slug_data" />
    </ClientOnly>
  </div>
</template>

<script setup>
const route = useRoute()
const localePath = useLocalePath()
const slug_data = ref(null)
const page_type = ref(null)
const data_loader = ref(true)
onMounted(async () => {
  const url_slug = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug
  try {
    slug_data.value = await useNuxtApp().$apiFetch('/slug/get?slug=' + url_slug)
    //console.log(slug_data.value)
  } catch (error) {
    console.log(error.data)
    if (error.data) {
      throw createError({
        statusCode: 404,
        statusMessage: 'page_not_found',
        fatal: true
      })
    }
  }
  if (slug_data && slug_data.value && slug_data.value.status == true) {
    slug_data.value = slug_data.value.data
    const slug_name = slug_data.value.slug
    const slug_type = slug_data.value.slugable_type
    const slug_id = slug_data.value.slugable_id

    switch (slug_type) {
      case "App\\Models\\Category":
        page_type.value = 'category'
        break;
      case "App\\Models\\MasterProduct":
        page_type.value = 'product'
        break;
      case "App\\Models\\Page":
        page_type.value = 'static'
        break;
      default:
        throw createError({
          statusCode: 404,
          statusMessage: 'page_not_found',
          fatal: true
        })
        break;
    }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'page_not_found',
      fatal: true
    })
  }

  data_loader.value = false
})
</script>