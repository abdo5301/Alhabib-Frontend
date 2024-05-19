<template>
  <div v-if="data_loader" class="flex items-center justify-center h-[900px] max-h-screen w-full mx-auto">
    <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
  </div>
  <LazyHomeTopBanner v-show="!data_loader" data-aos="fade-up" :banner_data="home_data?.top_banners" />
  <div v-show="!data_loader">
    <LazyHomeSecondBanner data-aos="fade-up" v-if="home_data.ads_banners && home_data.ads_banners.length > 0"
      :banners="home_data.ads_banners" />

    <LazyHomeCategorySection data-aos="fade-down" v-if="home_data.categories && home_data.categories.length > 0"
      v-for="category, index in home_data.categories" :key="index" :categories="category.data" :first_item="index == 0"
      class="mb-[93px] empty:hidden">{{ category.title }}</LazyHomeCategorySection>

    <LazyHomeMiddleBanner
      v-if="home_data.middle_banners && (home_data.middle_banners[0].data.length > 0 || home_data.middle_banners[1].data.length > 0)"
      :banner_data="home_data.middle_banners" class="pb-20 lg:pt-6" />

    <LazyHomeProductSection data-aos="zoom-in" v-if="home_data.master_products && home_data.master_products.length > 0"
      v-for="products, index in home_data.master_products" :key="index" :products="products.data"
      class="pb-20 lg:pt-6 empty:hidden">{{ products.title }}</LazyHomeProductSection>

    <LazyHomeCustomerImageSlider v-if="home_data.customer_images" />
    <LazyHomeBlogBanner data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000"
      v-if="home_data.blog && home_data.blog.topics && home_data.blog.topics.length > 0" :blog_data="home_data.blog">
      {{ $t('home_blog_banner_title') }}</LazyHomeBlogBanner>

    <LazyHomeBottomBanner
      v-if="home_data.bottom_banners && (home_data.bottom_banners[0].data.length > 0 || home_data.bottom_banners[1].data.length > 0)"
      :banner_data="home_data.bottom_banners" />
    <LazyHomeFeatureSection data-aos="zoom-in" />
  </div>

</template>

<script setup>
import { initFlowbite } from 'flowbite'
const home_fetch_data = ref({})
const data_loader = ref(true)
const home_data = ref([])

onMounted(async () => {
  initFlowbite()
  try {
    home_fetch_data.value = await useNuxtApp().$apiFetch('/home')
  } catch (error) {
    console.log(error.data)
  }
  home_data.value = home_fetch_data.value.status && home_fetch_data.value.status == true ? home_fetch_data.value.data : []
  data_loader.value = false
})
// console.log(home_fetch_data.value)
</script>