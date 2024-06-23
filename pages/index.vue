<template>
  <div v-if="pending" class="flex items-center justify-center h-[900px] max-h-screen w-full mx-auto">
    <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
  </div>
  <div v-else>
    <HomeTopBanner />
    <HomeSecondBanner v-if="home_data.ads_banners && home_data.ads_banners.length > 0"
      :banners="home_data.ads_banners" />
    <HomeCategorySection :data-aos="index != 0 ? 'fade-down' : ''"
      v-if="home_data.categories && home_data.categories.length > 0" v-for="category, index in home_data.categories"
      :key="index" :categories="category.data" :first_item="index == 0" class="mb-[93px] empty:hidden">{{ category.title
      }}</HomeCategorySection>
    <HomeProductSection data-aos="zoom-in" v-if="home_data.master_products && home_data.master_products.length > 0"
      v-for="products, index in home_data.master_products" :key="index" :products="products.data"
      class="pb-20 lg:pt-6 empty:hidden">{{ products.title }}</HomeProductSection>
    <HomeBlogBanner data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000"
      v-if="home_data.blog && home_data.blog.topics && home_data.blog.topics.length > 0" :blog_data="home_data.blog">
      {{ $t('home_blog_banner_title') }}</HomeBlogBanner>
    <HomeBottomBanner
      v-if="home_data.bottom_banners && (home_data.bottom_banners[0].data.length > 0 || home_data.bottom_banners[1].data.length > 0)"
      :banner_data="home_data.bottom_banners" />
    <HomeFeatureSection data-aos="zoom-in" />
  </div>
</template>
<script setup>
import { initFlowbite } from 'flowbite'
const nuxtApp = useNuxtApp()
onMounted(async () => {
  initFlowbite()
})
const config = useRuntimeConfig()
const home_data = ref({})
const { data: home_fetch_data, error, pending } = await useFetch(config.public.API_URL + '/home', {
  key: config.public.API_URL + '/home',
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
    expirationDate.setTime(expirationDate.getTime() + 43200 * 1000)//12 hours
    const isExpired = expirationDate.getTime() < Date.now()
    if (isExpired) {
      // Refetch the data
      return
    }

    return data
  },
})
if (error.value) {
  console.log(error.value.data)
} else {
  home_data.value = home_fetch_data.value.data ??= {}
}
// console.log(home_fetch_data.value)
</script>