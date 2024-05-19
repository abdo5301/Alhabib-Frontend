<template>
  <div :class="[out_stock ? ' gap-2' : ' gap-5', 'flex flex-col w-full']">

    <div class="flex w-full text-gray-900">
      <h2 class="flex-1 lg:font-bold font-semibold lg:text-lg text-base leading-5">
        {{ $t('product_size_title') }}
      </h2>
      <!-- Size modal trigger -->
      <NuxtLink
        v-if="options && options.length && options[0].variation_option.variation.description && options[0].variation_option.variation.description.title"
        class="text-sm font-semibold leading-5 underline underline-offset-4" to="javascript:void(0)"
        @click="size_modal.show()">
        {{ options[0].variation_option.variation.description.title }}
      </NuxtLink>
      <!-- Size modal content -->
      <div id="size-modal" tabindex="-1"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex-shrink-0">
        <div
          class="relative w-full max-w-[869px] h-[607px] my-auto bg-gray-50 flex items-center justify-center text-gray-900 font-bold text-[27px] shadow">
          <img
            v-if="options && options.length && options[0].variation_option.variation.description && options[0].variation_option.variation.description.image"
            :src="options[0].variation_option.variation.description.image.url" alt="Product option helper">
          <span v-else> محتوى صوري عن كيفية تحديد الخيار المناسب</span>
          <button type="button" @click="size_modal.hide()"
            class="absolute top-9 rtl:left-10 ltr:right-10 text-gray-400 bg-transparent">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 27 27" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0.65901 0.65901C1.53769 -0.21967 2.96231 -0.21967 3.84099 0.65901L13.5 10.318L23.159 0.65901C24.0377 -0.21967 25.4623 -0.21967 26.341 0.65901C27.2197 1.53769 27.2197 2.96231 26.341 3.84099L16.682 13.5L26.341 23.159C27.2197 24.0377 27.2197 25.4623 26.341 26.341C25.4623 27.2197 24.0377 27.2197 23.159 26.341L13.5 16.682L3.84099 26.341C2.96231 27.2197 1.53769 27.2197 0.65901 26.341C-0.21967 25.4623 -0.21967 24.0377 0.65901 23.159L10.318 13.5L0.65901 3.84099C-0.21967 2.96231 -0.21967 1.53769 0.65901 0.65901Z"
                fill="#4B5563" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="out_stock" class="flex gap-3 items-center justify-start">
      <!-- Stock Alert -->
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M27 15.6465C27 22.2739 21.6274 27.6465 15 27.6465C8.37258 27.6465 3 22.2739 3 15.6465C3 9.01907 8.37258 3.64648 15 3.64648C21.6274 3.64648 27 9.01907 27 15.6465ZM16.5 21.6465C16.5 22.4749 15.8284 23.1465 15 23.1465C14.1716 23.1465 13.5 22.4749 13.5 21.6465C13.5 20.8181 14.1716 20.1465 15 20.1465C15.8284 20.1465 16.5 20.8181 16.5 21.6465ZM15 8.14648C14.1716 8.14648 13.5 8.81806 13.5 9.64648V15.6465C13.5 16.4749 14.1716 17.1465 15 17.1465C15.8284 17.1465 16.5 16.4749 16.5 15.6465V9.64648C16.5 8.81806 15.8284 8.14648 15 8.14648Z"
          fill="#EF4444" />
      </svg>
      <span class="text-red-600 lg:font-bold font-semibold lg:text-lg text-base leading-5">
        {{ $t('product_size_stock_alert') }}
      </span>
    </div>

    <!-- Size -->
    <ProductOptionsMenu :options="options" @update-option-value="optionUpdated">
      {{ menu_title }}
    </ProductOptionsMenu>
  </div>
</template>

<script setup>
import { Modal } from 'flowbite';

const emits = defineEmits(['updateOptionValue'])
const props = defineProps({
  options: {
    type: Object
  }
})
const out_stock = ref(false)
function optionUpdated(option_data) {
  if (option_data.quantity == 0) {
    out_stock.value = true
  } else {
    out_stock.value = false
  }
  emits('updateOptionValue', option_data)
}

const size_modal = ref({})
onMounted(
  () => {
    const sizeModalTarget = document.getElementById('size-modal');
    const sizeModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
    }
    size_modal.value = new Modal(sizeModalTarget, sizeModalOptions);
  }
)

</script>