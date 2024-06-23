<template>
  <div class="w-full mx-auto lg:h-auto lg:max-h-[600px] h-[255px] overflow-hidden">
    <UCarousel dir="ltr" ref="carouselRef" v-slot="{ item }" :items="sliders" :ui="{ item: 'basis-full' }"
      class="overflow-hidden w-full">
      <NuxtLink :to="item.link" class="w-full h-full">
        <NuxtImg :src="item.src" class="w-full h-[250px] lg:h-[700px] object-cover" loading="lazy" width="100vh"
          quality="80" format="webp" draggable="false" :alt="item.title" preload />
      </NuxtLink>
    </UCarousel>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
const carouselRef = ref()
const sliderImagesRefs = ref([])
const sliders = [
  {
    src: '/images/banner/main-banner-1.jpg',
    link: localePath('/Eid-Collection'),
    title:'Offers-Discounts'
  },
  {
    src: '/images/banner/main-banner-2.jpg',
    link: localePath('/quilts'),
    title:'Quilts'
  }
]

onMounted(async () => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 6000)
})
</script>