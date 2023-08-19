<template>
  <HomeFirstBanner />
  <HomeSecondBanner />
  <HomeCategorySection :categories="bed_categories" class="mb-[93px]">{{ $t('home_category_bed_title') }}</HomeCategorySection>
  <HomeSliderBanner class="pb-20 lg:pt-6" /> 
  <HomeBlogBanner>{{ $t('home_blog_banner_title') }}</HomeBlogBanner>
  <HomeCustomerImageSlider/>
  <HomeSingleBanner />
  <HomeFeatureSection />
</template>

<script setup>
const bed_categories = [
  {
    id: 1,
    name: 'لباد وواقي مرتبة',
    image: '/images/category/lbad.png',
    href: '#'
  },
  {
    id: 2,
    name: 'مفارش وبطانيات',
    image: '/images/category/bedding.png',
    href: '#'

  },
  {
    id: 3,
    name: 'وسائد وخداديات',
    image: '/images/category/cushions.png',
    href: '#'
  },
  {
    id: 4,
    name: 'الأطفال والمواليد',
    image: '/images/category/baby.png',
    href: '#'
  },

]


</script>