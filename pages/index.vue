<template>
  <LazyHomeTopBanner v-if="home_data.top_banners" :banner_data="home_data.top_banners" />
  <LazyHomeSecondBanner v-if="home_data.ads_banners && home_data.ads_banners.length > 0"
    :banners="home_data.ads_banners" />
  <LazyHomeCategorySection v-if="home_data.categories && home_data.categories.length > 0"
    v-for="category, index in home_data.categories" :key="index" :categories="category.data"
    class="mb-[93px] empty:hidden">{{ category.title }}</LazyHomeCategorySection>
  <LazyHomeMiddleBanner
    v-if="home_data.middle_banners && (home_data.middle_banners[0].data.length > 0 || home_data.middle_banners[1].data.length > 0)"
    :banner_data="home_data.middle_banners" class="pb-20 lg:pt-6" />
  <LazyHomeProductSection v-if="home_data.master_products && home_data.master_products.length > 0"
    v-for="products, index in home_data.master_products" :key="index" :products="products.data"
    class="pb-20 lg:pt-6 empty:hidden">{{ products.title }}</LazyHomeProductSection>
  <LazyHomeBlogBanner v-if="home_data.blog && home_data.blog.topics && home_data.blog.topics.length > 0"
    :blog_data="home_data.blog">{{ $t('home_blog_banner_title') }}</LazyHomeBlogBanner>
  <LazyHomeCustomerImageSlider v-if="home_data.customer_images" />
  <LazyHomeBottomBanner v-if="home_data.bottom_banners && (home_data.bottom_banners[0].data.length > 0 || home_data.bottom_banners[1].data.length > 0)" :banner_data="home_data.bottom_banners" />
  <HomeFeatureSection />
</template>

<script setup>
import { initFlowbite } from 'flowbite'
const home_fetch_data = ref({})
onMounted(() => {
  initFlowbite()
})
try {
  home_fetch_data.value = await useNuxtApp().$apiFetch('/home')
} catch (error) {
  console.log(error.data)
}
const home_data = home_fetch_data.value.status && home_fetch_data.value.status == true ? home_fetch_data.value.data : []
// console.log(home_fetch_data.value)
</script>