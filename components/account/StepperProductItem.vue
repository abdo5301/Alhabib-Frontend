<template>
  <div
    :class="['w-full lg:py-[18px] p-[15px] relative border border-gray-300 rounded-lg animate-flip-down animate-once', select_product ? 'bg-gray-50 shadow-md' : 'shadow-sm']">
    <!-- Input Overlay -->
    <div v-show="data_saved" tabindex="-1" :id="'overlay-dev-' + product_data.id"
      class="bg-gray-50 hover:bg-gray-100 rounded-lg opacity-90 lg:-my-[18px] -m-[15px] w-full h-full absolute z-30 flex items-center justify-center">
      <button type="button" @click.prevent="data_saved = false, $emit('fixMobileHeight'), $emit('closedForm', false)"
        class="flex items-center justify-center w-[85px] h-[40px] bg-gray-700 hover:bg-black rounded-lg text-white text-sm">
        {{ $t('edit_btn') }}
      </button>
    </div>
    <!-- Checkbox Input -->
    <input v-model="select_product" @change="$emit('toggleProductSelect', product_data.id)"
      :id="'return-prod-check-' + product_data.id" name="return_product" type="checkbox" :value="product_data.id"
      class="h-6 w-6 z-20 peer absolute lg:top-[18px] top-[15px] end-[15px] lg:end-0 lg:start-[11px] rounded text-xl shadow-none border-gray-300 text-gray-900 focus:ring-transparent cursor-pointer" />
    <!-- Checkbox Label -->
    <label :for="'return-prod-check-' + product_data.id"
      class="w-full lg:pe-[11px] lg:ps-[35px] flex flex-col lg:gap-[25px] cursor-pointer">
      <!-- Product Data -->
      <div class="w-full flex lg:gap-[25px] gap-3">
        <!-- Image -->
        <NuxtImg :src="product_data.image ??= '/images/placeholder-logo.png'" width="110px" height="110px"
          loading="lazy" :alt="product_data.name" class="lg:w-[110px] lg:h-[110px] w-[100px] h-[100px] rounded-md" />
        <!-- Data -->
        <div
          class="flex flex-col w-full lg:max-w-[321px] lg:gap-[5px] gap-[3px] text-gray-600 lg:text-sm text-xs font-semibold leading-5">
          <!-- Total Price -->
          <span class="font-bold text-gray-900 text-sm lg:py-2 pb-2">{{ priceFormate(product_data.total) }}</span>
          <!-- Quantity -->
          <span>{{ $t('label_quantity') }}: {{ product_data.quantity }}</span>
          <!-- Name -->
          <span>{{ product_data.name }}</span>
        </div>
      </div>
    </label>
    <!-- Product Return Inputs Start-->
    <div v-show="select_product && !data_saved"
      class="flex flex-col lg:gap-[25px] gap-10 lg:pe-[11px] lg:ps-[35px] mt-[10px] lg:mt-[18px] animate-flip-down animate-once">
      <!-- Quantity -->
      <div class="flex flex-col lg:flex-row justify-start lg:gap-[25px] gap-1 lg:items-center">
        <label :for="'return-input-qty-' + product_data.id"
          class="lg:w-[109px] text-gray-500 text-sm font-semibold leading-5">{{
            $t('label_quantity') }}</label>
        <select v-model="input_quantity" :id="'return-input-qty-' + product_data.id"
          class="bg-white cursor-pointer min-w-[125px] lg:min-w-[190px] lg:max-w-[321px] w-full shadow-sm border flex items-center justify-between border-gray-300 text-gray-500 text-sm font-semibold rounded-md focus:ring-gray-300 focus:border-gray-300 px-3 py-2">
          <option v-for="(qty, index) in product_data.quantity" :value="qty" :selected="qty == product_data.quantity">
            {{ qty }}
          </option>
        </select>
      </div>

      <!-- Reason Select -->
      <div class="flex flex-col lg:flex-row justify-start lg:gap-[25px] gap-1 lg:items-center">
        <label :for="'return-select-reason-' + product_data.id"
          class="lg:w-[109px] text-gray-500 text-sm font-semibold leading-5">{{
            $t('label_return_reason') }}</label>
        <select v-model="input_reason_select" :id="'return-select-reason-' + product_data.id"
          class="bg-white cursor-pointer min-w-[125px] lg:min-w-[190px] lg:max-w-[321px] w-full shadow-sm border flex items-center justify-between border-gray-300 text-gray-500 text-sm font-semibold rounded-md focus:ring-gray-300 focus:border-gray-300 px-3 py-2">
          <option value="select" selected disabled hidden>
            {{ $t('select_placeholder') }}
          </option>
          <option value="product_defect" :selected="input_reason_select == 'product_defect'">
            {{ $t('return_reason_option1') }}
          </option>
          <option value="size_not_fit" :selected="input_reason_select == 'size_not_fit'">
            {{ $t('return_reason_option2') }}
          </option>
        </select>
      </div>

      <!-- Reason Description -->
      <div class="w-full flex flex-col lg:flex-row justify-start lg:gap-[25px] gap-1 lg:items-center">
        <label :for="'return-write-reason-' + product_data.id"
          class="lg:w-[109px] text-gray-500 text-sm font-semibold leading-5">
          {{ $t('label_write_return_reason') }}</label>
        <Input input_style="flex-1 h-[42px] w-full lg:w-[321px] placeholder:text-xs"
          error_text_style="lg:max-w-[320px] text-xs font-semibold" v-model="input_reason_description"
          :input_placeholder="$t('return_reason_write_placeholder')"
          :input_id="'return-write-reason-' + product_data.id" input_type="text">
        </Input>
      </div>

      <!-- Is Product Opened -->
      <div class="w-full flex flex-col lg:flex-row justify-start lg:gap-[25px] gap-1 lg:items-center">
        <span class="lg:w-[109px] text-gray-500 text-sm font-semibold leading-5">
          {{ $t('label_is_return_product_opened') }}
        </span>
        <div class="flex justify-between w-full lg:w-[321px]">
          <InputRadio v-model="input_product_opened" :input_id="'input-product-opened-no-' + product_data.id"
            :input_name="'input_product_opened_' + product_data.id" input_value="no"
            label_style="flex items-center lg:text-gray-600 text-gray-700 lg:text-sm leading-6 min-w-[80px]"
            :input_checked="input_product_opened == 'no' ? true : false">
            {{ $t('text_no') }}
          </InputRadio>
          <InputRadio v-model="input_product_opened" :input_id="'input-product-opened-yes-' + product_data.id"
            :input_name="'input_product_opened_' + product_data.id" input_value="yes"
            label_style="flex items-center lg:text-gray-600 text-gray-700 lg:text-sm focus:lg:text-base leading-6 min-w-[80px]"
            :input_checked="input_product_opened == 'yes' ? true : false">
            {{ $t('text_yes') }}
          </InputRadio>
        </div>
      </div>

      <!-- Upload Images -->
      <div class="w-full flex flex-col lg:flex-row justify-start lg:gap-[25px] gap-[10px] lg:items-start py-2">
        <span class="lg:w-[109px] text-gray-500 text-sm font-semibold leading-5">
          {{ $t('label_upload_Product_image') }}
        </span>
        <!-- Upload Container -->
        <div class="flex flex-col lg:gap-2 gap-[10px] w-full lg:w-[321px]">
          <!-- Drag & Drop -->
          <div ref="imagesDropContainer" @click="openImageBrowse()"
            class="w-full pt-[22px] pb-[26px] lg:px-4 px-1 flex flex-col justify-center items-center gap-3 border-2 border-dashed rounded-md cursor-pointer">
            <!-- Image Preview -->
            <div v-if="selectedImages.length" class="flex flex-row gap-2 w-full max-w-full flex-wrap">
              <NuxtImg v-for="(img, index) in selectedImages" :key="'img-preview-' + index" :src="img" width="96px"
                height="96px" class="rounded-md lg:w-24 lg:h-24 w-20 h-20 object-cover" />
            </div>
            <!-- Placeholder -->
            <div v-else class="flex items-center justify-center flex-col gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M28 8H12C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12V32M8 32V36C8 37.0609 8.42143 38.0783 9.17157 38.8284C9.92172 39.5786 10.9391 40 12 40H36C37.0609 40 38.0783 39.5786 38.8284 38.8284C39.5786 38.0783 40 37.0609 40 36V28M8 32L17.172 22.828C17.9221 22.0781 18.9393 21.6569 20 21.6569C21.0607 21.6569 22.0779 22.0781 22.828 22.828L28 28M40 20V28M40 28L36.828 24.828C36.0779 24.0781 35.0607 23.6569 34 23.6569C32.9393 23.6569 31.9221 24.0781 31.172 24.828L28 28M28 28L32 32M36 8H44M40 4V12M28 16H28.02"
                  stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div class="flex gap-2 items-center">
                <span
                  class="h-6 w-[72px] flex justify-center items-center rounded-md bg-gray-500 shadow text-white text-xs font-semibold">
                  {{ $t('text_upload_image') }}
                </span>
                <span class="text-gray-600 text-xs leading-3 font-normal">
                  {{ $t('text_or') + ' ' + $t('text_drag_drop') }}
                </span>
              </div>
              <span class="text-gray-500 text-[10px] font-normal leading-3">
                {{ $t('text_image_input_notes') }}
              </span>
            </div>
          </div>

          <!-- End Drag & Drop  -->
          <!-- Upload Warnings -->
          <div class="flex flex-col gap-2 justify-center">
            <div v-if="selectedImages.length == 0 && !imageTypeValidate && !imageSizeValidate"
              class="flex justify-start items-center gap-1 text-red-600 text-xs font-semibold leading-5">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 lg:w-4 lg:h-4" width="16" height="16"
                viewBox="0 0 16 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.60565 2.47964C7.21733 1.3922 8.783 1.3922 9.39469 2.47964L13.8589 10.4161C14.4589 11.4826 13.6881 12.8005 12.4644 12.8005H3.53592C2.3122 12.8005 1.54146 11.4826 2.1414 10.4161L6.60565 2.47964ZM8.8001 10.4006C8.8001 10.8424 8.44193 11.2006 8.0001 11.2006C7.55827 11.2006 7.2001 10.8424 7.2001 10.4006C7.2001 9.95876 7.55827 9.60059 8.0001 9.60059C8.44193 9.60059 8.8001 9.95876 8.8001 10.4006ZM8.0001 4.00059C7.55827 4.00059 7.2001 4.35876 7.2001 4.80059V7.20059C7.2001 7.64241 7.55827 8.00059 8.0001 8.00059C8.44192 8.00059 8.8001 7.64241 8.8001 7.20059V4.80059C8.8001 4.35876 8.44192 4.00059 8.0001 4.00059Z"
                  fill="#F87171" />
              </svg>
              <span>{{ $t('text_return_image_warning1') }}</span>
            </div>
            <div v-if="imageTypeValidate || imageSizeValidate"
              class="flex justify-start items-center gap-1 text-red-600 text-xs font-semibold leading-5">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 lg:w-4 lg:h-4" width="16" height="16"
                viewBox="0 0 16 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.60565 2.47964C7.21733 1.3922 8.783 1.3922 9.39469 2.47964L13.8589 10.4161C14.4589 11.4826 13.6881 12.8005 12.4644 12.8005H3.53592C2.3122 12.8005 1.54146 11.4826 2.1414 10.4161L6.60565 2.47964ZM8.8001 10.4006C8.8001 10.8424 8.44193 11.2006 8.0001 11.2006C7.55827 11.2006 7.2001 10.8424 7.2001 10.4006C7.2001 9.95876 7.55827 9.60059 8.0001 9.60059C8.44193 9.60059 8.8001 9.95876 8.8001 10.4006ZM8.0001 4.00059C7.55827 4.00059 7.2001 4.35876 7.2001 4.80059V7.20059C7.2001 7.64241 7.55827 8.00059 8.0001 8.00059C8.44192 8.00059 8.8001 7.64241 8.8001 7.20059V4.80059C8.8001 4.35876 8.44192 4.00059 8.0001 4.00059Z"
                  fill="#F87171" />
              </svg>
              <span v-if="imageTypeValidate">{{ imageTypeValidate }}</span>
              <span v-if="imageSizeValidate">{{ imageSizeValidate }}</span>
            </div>
            <div class="p-2 bg-yellow-50 rounded-md w-full text-yellow-500 text-xs font-semibold leading-5">
              {{ $t('text_return_image_warning2') }}
            </div>
          </div>
          <!-- End Upload Warnings -->
        </div>
        <!-- End Upload Container -->
      </div>

      <!-- Save Btn -->
      <div class="w-full flex justify-center items-center">
        <button type="button" :disabled="!validForm" @click="saveProductData()"
          class="lg:w-[144px] w-full lg:h-auto h-[50px] lg:py-[9px] py-[13px] lg:px-[17px] px-[33px] flex justify-center items-center rounded-md bg-black shadow-sm text-white lg:text-sm text-base font-semibold leading-5 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed">
          {{ $t('save_btn') }}
        </button>
      </div>
    </div>
    <!-- Product Return Inputs End -->
  </div>
</template>

<script setup>
const { t } = useI18n()
const props = defineProps({
  product_data: {
    type: Object,
    default: {}
  },
  return_products_ids: {
    type: Array,
    default: []
  }
})
const emits = defineEmits(["toggleProductSelect", "saveProductForm", "fixMobileHeight", "closedForm"])
const select_product = ref(false)
const data_saved = ref(false)
if (props.return_products_ids.includes(props.product_data.id)) {
  select_product.value = true
}
// Inputs References
const input_quantity = ref(1)
const input_reason_select = ref('select')
const input_reason_description = ref('')
const input_product_opened = ref('no')
const selectedImages = ref([])
//Form Validation
const validForm = computed(() => {
  return input_reason_description.value.length > 0 && selectedImages.value.length > 0 && input_reason_select.value != 'select';
})

function saveProductData() {
  const product_form_data = {
    id: props.product_data.id,
    quantity: input_quantity.value,
    reason_select: input_reason_select.value,
    reason_description: input_reason_description.value,
    is_opened: input_product_opened.value,
    images: selectedImages.value
  }
  emits("saveProductForm", product_form_data)
  emits("closedForm", true)
  data_saved.value = true
  setTimeout(() => { //focus overlay edit btn
    const overlay_dev = document.getElementById('overlay-dev-' + props.product_data.id)
    overlay_dev.focus()
  }, 10)
  // console.log(product_form_data);
}

//Upload Images References and Actions
const imagesDropContainer = ref()
const imageTypeValidate = ref(null)
const imageSizeValidate = ref(null)
const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
const acceptedFileSize = 10000000 // 10 Megabytes
const { files: dropFiles } = useDropZone(imagesDropContainer, { onDrop: uploadByDrop })
const { open: openImageBrowse, onChange: uploadByClick } = useFileDialog()
uploadByClick(async (files) => {
  if (files) {
    selectedImages.value = []
    let total_size = 0
    imageTypeValidate.value = null
    imageSizeValidate.value = null
    const formData = new FormData()
    for (let x = 0; x < files.length; x++) {
      const fileItem = files[x]
      if (acceptedFileTypes.includes(fileItem.type)) {
        total_size += Number(fileItem.size)
        //size should be less than 10 Megabytes 
        if (Number(total_size) >= Number(acceptedFileSize)) { //Invalid Size
          imageSizeValidate.value = t('error_return_images_size')
          selectedImages.value = []
          break
        } else {
          formData.append('file', fileItem, fileItem.name.replaceAll(' ', '-').toLocaleLowerCase())
          const reader = new FileReader
          reader.onload = e => {
            selectedImages.value.push(e.target.result)
          }
          reader.readAsDataURL(fileItem)
        }
      } else {//Invalid Type
        imageTypeValidate.value = t('error_return_images_type') + ' ' + fileItem.type
        selectedImages.value = []
        break
      }
    }
  }
})

function uploadByDrop() {
  if (dropFiles.value) {
    selectedImages.value = []
    let total_size = 0
    imageTypeValidate.value = null
    imageSizeValidate.value = null
    const formData = new FormData()
    dropFiles.value.forEach((fileItem) => {
      if (acceptedFileTypes.includes(fileItem.type)) {
        total_size += Number(fileItem.size)
        //size should be less than 10 Megabytes 
        if (Number(total_size) >= Number(acceptedFileSize)) { //Invalid Size
          imageSizeValidate.value = t('error_return_images_size')
          selectedImages.value = []
          return false
        } else {
          formData.append('file', fileItem, fileItem.name.replaceAll(' ', '-').toLocaleLowerCase())
          const reader = new FileReader
          reader.onload = e => {
            selectedImages.value.push(e.target.result)
          }
          reader.readAsDataURL(fileItem)
        }
      } else {
        imageTypeValidate.value = t('error_return_images_type') + ' ' + fileItem.type
        selectedImages.value = []
        return false
      }
    })
  }
}
</script>