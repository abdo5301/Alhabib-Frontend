<template>
  <div v-show="images && images.length > 1"
    class="flex relative container flex-col gap-12 justify-center items-center z-30 lg:px-5 w-full">
    <!-- Slider -->
    <div id="product-carousel" class="block relative w-full ">
      <div class="relative overflow-hidden h-[350px] lg:h-[700px]">
        <!-- Slider items -->
        <div :id="'product-carousel-' + index" ref="sliderImagesRefs" v-for="item, index in images" :key="index"
          class="hidden duration-700 ease-in-out cursor-pointer"
          @click="zoomModal.show(), zoomModalImage = item.url, zoomModalType = 'image'">
          <NuxtImg loading="lazy" :src="item.url" width="50vh" quality="90" placeholder="/images/image-loader.svg"
            placeholder-class="object-none"
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="product-image" />
        </div>
        <div :id="'video-product-carousel-' + Number(index + images.length)" ref="sliderVideosRefs"
          v-for="item, index in videos" :key="index" class="hidden duration-700 ease-in-out cursor-pointer"
          @click="zoomModal.show(), zoomModalImage = item.url, zoomModalType = 'video'">
          <NuxtImg loading="lazy" :src="item.url" width="50vh" quality="90" placeholder="/images/image-loader.svg"
            placeholder-class="object-none"
            class="absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="product-video" />
        </div>
      </div>

      <!-- Slider indicators -->
      <div
        class="relative z-30 flex flex-shrink-0 justify-start lg:gap-4 gap-[9px] lg:mt-5 mt-3 overflow-x-auto w-full">
        <div class="flex-shrink-0 lg:w-[123px] w-[77px] lg:h-[118px] h-[72px] cursor-pointer flex items-center"
          ref="indicatorImagesRefs" :id="'product-carousel-indicator-' + index" v-for="item, index in images"
          :key="index">
          <NuxtImg loading="lazy" class="lg:w-[123px] w-[77px] lg:h-[118px] h-[72px]" :src="item.url"
            alt="product-image" width="50px" placeholder="/images/image-loader.svg" placeholder-class="object-none width-5"/>
        </div>
        <div class="flex-shrink-0 lg:w-[123px] w-[77px] lg:h-[118px] h-[72px] cursor-pointer flex items-center relative"
          ref="indicatorVideosRefs" :id="'video-product-carousel-indicator-' + Number(index + images.length)"
          v-for="item, index in videos" :key="index">
          <NuxtImg loading="lazy" class="lg:w-[123px] w-[77px] lg:h-[118px] h-[72px]" :src="item.url"
            alt="product-video" width="70px" placeholder="/images/image-loader.svg" placeholder-class="object-none width-5"/>
          <span class="absolute w-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
              <path d="M52.0578 26.5772L0.984641 52.7799L1.11791 0.116332L52.0578 26.5772Z" fill="#E5E7EB" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <!-- Slider controls -->
    <button id="product-slider-previous" type="button"
      class="absolute lg:top-0 -top-[60px] lg:-left-7 -left-5 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none">
      <span class="inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] lg:w-[44px] h-[55px] lg:h-[69px]" viewBox="0 0 44 69"
          fill="none">
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
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[20px] lg:w-[44px] h-[55px] lg:h-[69px]" viewBox="0 0 44 69"
          fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M16.0445 18.2605C15.1853 19.6078 15.1853 21.7922 16.0445 23.1395L23.2888 34.5L16.0445 45.8605C15.1853 47.2078 15.1853 49.3922 16.0445 50.7395C16.9036 52.0868 18.2966 52.0868 19.1557 50.7395L27.9557 36.9395C28.8149 35.5922 28.8149 33.4078 27.9557 32.0605L19.1557 18.2605C18.2966 16.9132 16.9036 16.9132 16.0445 18.2605Z"
            fill="#6B7280" />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>

  </div>

  <!-- Single Image -->
  <div v-if="images && images.length == 1"
    class="h-[377px] lg:h-[888px] flex relative container flex-col gap-12 justify-center items-center z-30 lg:px-5">
    <NuxtImg :src="images[0].url" @click="zoomModal.show(), zoomModalImage = images[0].url"
      class="lg:max-w-5xl max-w-md flex-shrink-0 my-auto h-full w-full cursor-pointer" alt="product-image" width="50vh"
      quality="90" placeholder="/images/image-loader.svg" placeholder-class="object-none" />
  </div>
  <!-- Modal content -->
  <div id="image-zoom-modal" tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 hidden p-4 w-full overflow-x-hidden overflow-y-auto h-screen justify-center">
    <button v-show="images && images.length > 1" id="image-zoom-next" type="button"
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

    <img v-if="zoomModalType == 'image'" :src="zoomModalImage"
      class="object-cover lg:max-w-5xl max-w-md flex-shrink-0 my-auto" alt="product-image">
    <!-- <iframe v-else class="lg:w-[800px] lg:h-[600px] w-[81%] h-[300px]" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"></iframe> -->
    <iframe v-else width="420" height="315" :src="zoomModalImage"></iframe>
    <button v-show="images && images.length > 1" id="image-zoom-previous" type="button"
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
  },
  videos: {
    type: Object
  }
})

const sliderImagesRefs = ref([])
const sliderVideosRefs = ref([])
const indicatorImagesRefs = ref([])
const indicatorVideosRefs = ref([])
const zoomModal = ref({})
const zoomModalImage = ref('')
const zoomModalType = ref('image')
onMounted(
  () => {
    const carouselElement = document.getElementById('product-carousel');
    const sliders = []
    const indicators = []
    for (let index = 0; index < sliderImagesRefs.value.length; index++) {
      sliders.push(
        {
          position: index,
          el: document.getElementById('product-carousel-' + index)
        }
      );
    }
    for (let index = 0; index < sliderVideosRefs.value.length; index++) {
      sliders.push(
        {
          position: Number(index + props.images.length),
          el: document.getElementById('video-product-carousel-' + Number(index + props.images.length))
        }
      );
    }

    for (let index = 0; index < indicatorImagesRefs.value.length; index++) {
      indicators.push(
        {
          position: index,
          el: document.getElementById('product-carousel-indicator-' + index)
        }
      );
    }
    for (let index = 0; index < indicatorVideosRefs.value.length; index++) {
      indicators.push(
        {
          position: Number(index + props.images.length),
          el: document.getElementById('video-product-carousel-indicator-' + Number(index + props.images.length))
        }
      );
    }


    const options = {
      defaultPosition: 0,
      interval: 3000,
      indicators: {
        activeClasses: 'opacity-1',
        inactiveClasses: 'opacity-[0.4]',
        items: indicators
      }
    };
    const carousel = new Carousel(carouselElement, sliders, options);
    const $prevButton = document.getElementById('product-slider-previous');
    const $nextButton = document.getElementById('product-slider-next');

    $prevButton.addEventListener('click', () => {
      carousel.prev();
    });

    $nextButton.addEventListener('click', () => {
      carousel.next();
    });

    // Zoom Modal
    const zoomModalTarget = document.getElementById('image-zoom-modal');
    const $prevZoomModal = document.getElementById('image-zoom-previous');
    const $nextZoomModal = document.getElementById('image-zoom-next');

    $prevZoomModal.addEventListener('click', () => {
      carousel.prev();
      zoomModalImage.value = carousel._getActiveItem().el.getElementsByTagName("img")[0].src
      zoomModalType.value = carousel._getActiveItem().el.getElementsByTagName("img")[0].alt
    });

    $nextZoomModal.addEventListener('click', () => {
      carousel.next();
      zoomModalImage.value = carousel._getActiveItem().el.getElementsByTagName("img")[0].src
      zoomModalType.value = carousel._getActiveItem().el.getElementsByTagName("img")[0].alt
    });
    const zoomModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40',
      closable: true,
    }
    zoomModal.value = new Modal(zoomModalTarget, zoomModalOptions);
    carousel.slideTo(0)
  }

)



</script>