<template>
  <div class="flex relative container flex-col gap-12 justify-center items-center z-30 lg:px-5">
    <!-- Slider -->
    <div id="product-carousel" class="block relative w-full ">
      <div class="relative overflow-hidden h-[377px] lg:h-[888px]">
        <!-- Slider items -->
        <div :id="'product-carousel-' + index" ref="sliderRefs" v-for="item, index in images" :key="index"
          class="hidden duration-700 ease-in-out cursor-pointer" @click="zoomModal.show(), zoomModalImage = item.url">
          <img loading="lazy" :src="item.url"
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Alhabib-Shop">
        </div>
      </div>

      <!-- Slider indicators -->
      <div class="relative z-30 flex justify-start lg:gap-6 gap-[9px] lg:mt-5 mt-3">
        <div class="lg:w-[123px] w-[77px] lg:h-[118px] h-[72px] cursor-pointer flex items-center" ref="indicatorRefs"
          :id="'product-carousel-indicator-' + index" v-for="item, index in images" :key="index">
          <img loading="lazy" class="w-full h-full" :src="item.url" alt="">
        </div>
      </div>
    </div>
    <!-- Slider controls -->
    <button id="product-slider-previous" type="button"
      class="absolute lg:top-0 -top-[60px] lg:-left-7 -left-5 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none">
      <span class="inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] lg:w-[44px] h-[55px] lg:h-[69px]" viewBox="0 0 44 69" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M27.9555 18.2605C28.8147 19.6078 28.8147 21.7922 27.9555 23.1395L20.7112 34.5L27.9555 45.8605C28.8147 47.2078 28.8147 49.3922 27.9555 50.7395C27.0964 52.0868 25.7034 52.0868 24.8443 50.7395L16.0443 36.9395C15.1851 35.5922 15.1851 33.4078 16.0443 32.0605L24.8443 18.2605C25.7034 16.9132 27.0964 16.9132 27.9555 18.2605Z"
            fill="#6B7280" />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button id="product-slider-next" type="button"
      class="absolute lg:top-0 -top-[60px] lg:-right-7 -right-5 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none">
      <span class="inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] lg:w-[44px] h-[55px] lg:h-[69px]" viewBox="0 0 44 69" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M16.0445 18.2605C15.1853 19.6078 15.1853 21.7922 16.0445 23.1395L23.2888 34.5L16.0445 45.8605C15.1853 47.2078 15.1853 49.3922 16.0445 50.7395C16.9036 52.0868 18.2966 52.0868 19.1557 50.7395L27.9557 36.9395C28.8149 35.5922 28.8149 33.4078 27.9557 32.0605L19.1557 18.2605C18.2966 16.9132 16.9036 16.9132 16.0445 18.2605Z"
            fill="#6B7280" />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>

  </div>
  <!-- Modal content -->
  <div id="image-zoom-modal" tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden p-4 w-full overflow-x-hidden overflow-y-auto h-screen justify-center">
    <button id="image-zoom-next" type="button"
      class="fixed right-5 flex items-center justify-center h-full cursor-pointer group focus:outline-none">
      <span class="inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="69" viewBox="0 0 44 69" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M16.0445 18.2605C15.1853 19.6078 15.1853 21.7922 16.0445 23.1395L23.2888 34.5L16.0445 45.8605C15.1853 47.2078 15.1853 49.3922 16.0445 50.7395C16.9036 52.0868 18.2966 52.0868 19.1557 50.7395L27.9557 36.9395C28.8149 35.5922 28.8149 33.4078 27.9557 32.0605L19.1557 18.2605C18.2966 16.9132 16.9036 16.9132 16.0445 18.2605Z"
            fill="#000" />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>

    <img :src="zoomModalImage" class="object-cover lg:max-w-5xl max-w-md flex-shrink-0 my-auto" alt="product-image">

    <button id="image-zoom-previous" type="button"
      class="fixed left-5 flex items-center justify-center h-full cursor-pointer group focus:outline-none">
      <span class="inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="69" viewBox="0 0 44 69" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M27.9555 18.2605C28.8147 19.6078 28.8147 21.7922 27.9555 23.1395L20.7112 34.5L27.9555 45.8605C28.8147 47.2078 28.8147 49.3922 27.9555 50.7395C27.0964 52.0868 25.7034 52.0868 24.8443 50.7395L16.0443 36.9395C15.1851 35.5922 15.1851 33.4078 16.0443 32.0605L24.8443 18.2605C25.7034 16.9132 27.0964 16.9132 27.9555 18.2605Z"
            fill="#000" />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
  </div>
</template>

<script setup>
import { Carousel } from 'flowbite';

const localePath = useLocalePath()
const props = defineProps({
  images: {
    type: Object
  }
})

const sliderRefs = ref([])
const indicatorRefs = ref([])
const zoomModal = ref({})
const zoomModalImage = ref('')
onMounted(
  () => {
    const sliders = []
    const indicators = []
    for (let index = 0; index < sliderRefs.value.length; index++) {
      sliders.push(
        {
          position: index,
          el: document.getElementById('product-carousel-' + index)
        }
      );
    }

    for (let index = 0; index < indicatorRefs.value.length; index++) {
      indicators.push(
        {
          position: index,
          el: document.getElementById('product-carousel-indicator-' + index)
        }
      );
    }
    const options = {
      defaultPosition: 1,
      interval: 3000,
      indicators: {
        activeClasses: 'opacity-1',
        inactiveClasses: 'opacity-[0.4]',
        items: indicators
      }
    };
    const carousel = new Carousel(sliders, options);
    const $prevButton = document.getElementById('product-slider-previous');
    const $nextButton = document.getElementById('product-slider-next');

    $prevButton.addEventListener('click', () => {
      carousel.prev();
    });

    $nextButton.addEventListener('click', () => {
      carousel.next();
    });

    carousel.slideTo(0)

    // Zoom Modal
    const zoomModalTarget = document.getElementById('image-zoom-modal');
    const $prevZoomModal = document.getElementById('image-zoom-previous');
    const $nextZoomModal = document.getElementById('image-zoom-next');
    
    $prevZoomModal.addEventListener('click', () => {
      carousel.prev();
      zoomModalImage.value = carousel._getActiveItem().el.getElementsByTagName("img")[0].src
    });

    $nextZoomModal.addEventListener('click', () => {
      carousel.next();
      zoomModalImage.value = carousel._getActiveItem().el.getElementsByTagName("img")[0].src
    });
    const zoomModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
    }
    zoomModal.value = new Modal(zoomModalTarget, zoomModalOptions);
  }

)






</script>