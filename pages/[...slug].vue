<template>
  <div class="flex items-center justify-center h-[600px] max-h-screen w-full mx-auto">
    <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
  </div>
</template>
<script setup>
const route = useRoute()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const slug_data = ref(null)
const lang = useNuxtApp().$lang
const { locale, setLocale } = useI18n()
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
    const slug_name = slug_data.value.data.slug
    const slug_type = slug_data.value.data.slugable_type
    const slug_id = slug_data.value.data.slugable_id
    // const new_path = locale.value == 'ar' ? "/" + slug_name : "/" + locale.value + "/" + slug_name
    const new_path = "/" + slug_name
    switch (slug_type) {
      case "App\\Models\\Category":
        router.addRoute({
          name: slug_name, path: new_path, component: () => import("@/pages/category/[id].vue"),
        })
        await router.replace({ name: slug_name })
        break;
      case "App\\Models\\MasterProduct":
        router.addRoute({
          name: slug_name, path: new_path, component: () => import("@/pages/product/[id].vue"),
        })
        await router.replace({ name: slug_name })
        break;
      default:
        break;
    }
    if (locale.value && locale.value != lang.code) {
      setLocale(lang.code)
      switchLocalePath(lang.code)
    }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'page_not_found',
      fatal: true
    })
  }
})


</script>