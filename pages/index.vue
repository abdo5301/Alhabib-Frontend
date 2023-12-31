<template>
  <LazyHomeFirstBanner />
  <LazyHomeSecondBanner v-if="home_data.ads_banners && home_data.ads_banners.length > 0" :banners="home_data.ads_banners" />
  <LazyHomeCategorySection v-if="home_data.categories && home_data.categories.length > 0" v-for="category, index in home_data.categories" :key="index" :categories="category.data" class="mb-[93px] empty:hidden">{{ category.title }}</LazyHomeCategorySection>
  <LazyHomeSliderBanner v-if="home_data.banners && home_data.banners.length" :banners="home_data.banners" class="pb-20 lg:pt-6" /> 
  <LazyHomeProductSection v-if="home_data.master_products && home_data.master_products.length > 0" v-for="products,index in home_data.master_products" :key="index" :products="products.data" class="pb-20 lg:pt-6 empty:hidden" >{{ products.title }}</LazyHomeProductSection>
  <HomeBlogBanner v-if="home_data.blog && home_data.blog.topics && home_data.blog.topics.length > 0" :blog_data="home_data.blog">{{ $t('home_blog_banner_title') }}</HomeBlogBanner>
  <LazyHomeCustomerImageSlider/>
  <HomeSingleBanner />
  <HomeFeatureSection />
</template>

<script setup>
import { initFlowbite } from 'flowbite'
onMounted(() => {
    initFlowbite();
})
const home_fetch_data = await useNuxtApp().$apiFetch('/home')
const home_data = home_fetch_data.status == true ? home_fetch_data.data : []
// console.log(home_data)
</script>