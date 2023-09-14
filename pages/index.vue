<template>
  <HomeFirstBanner />
  <HomeSecondBanner />
  <HomeCategorySection v-if="home_data.categories && home_data.categories.length" :categories="home_data.categories ?? []" class="mb-[93px]">{{ $t('home_category_bed_title') }}</HomeCategorySection>
  <HomeSliderBanner v-if="home_data.banners && home_data.banners.length" :banners="home_data.banners ?? []" class="pb-20 lg:pt-6" /> 
  <HomeProductSection v-if="home_data.master_products && home_data.master_products.length" :products="home_data.master_products ?? []" class="pb-20 lg:pt-6" /> 
  <HomeBlogBanner v-if="home_data.blog" :blog_data="home_data.blog ?? []">{{ $t('home_blog_banner_title') }}</HomeBlogBanner>
  <HomeCustomerImageSlider/>
  <HomeSingleBanner />
  <HomeFeatureSection />
</template>

<script setup>
const home_data = await useNuxtApp().$apiFetch('/home')

</script>