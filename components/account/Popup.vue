<template>
  <div :id="popup_id" tabindex="-1" aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div
      class="relative p-6 w-full max-w-[384px] max-h-full flex flex-col gap-5 items-center justify-center bg-white rounded-lg shadow-xl">
      <!-- icon -->
      <img v-if="popup_data_type == 'delete'" class="w-12 h-12px" src="/images/icons/trash.png" alt="delete">
      <img v-else-if="popup_data_type == 'cancel-warning'" class="w-12 h-12px" src="/images/icons/x-orange.png"
        alt="warning">
      <img v-else-if="popup_data_type == 'cancel'" class="w-12 h-12px" src="/images/icons/x-red.png" alt="cancel">
      <img v-else class="w-12 h-12px" src="/images/icons/true-green.png" alt="success">
      <!-- title -->
      <h3 class="text-gray-900 font-medium text-lg leading-9">
        <slot />
      </h3>
      <!-- Details -->
      <p v-if="popup_details" class="text-gray-500 text-[15px] font-normal leading-8 -mt-2">
        {{ popup_details }}
      </p>
      <!-- Confirm Buttons -->
      <div v-if="popup_type == 'confirm'" class="pt-1 flex items-center justify-center gap-[18px]">
        <!-- Cancel -->
        <button type="button" @click="$emit('RejectConfirm')" :data-modal-hide="popup_id"
          class="w-[150px] h-[38px] text-white bg-gray-900 ring-1 ring-gray-300 rounded-md text-sm font-semibold leading-5 flex items-center justify-center shadow-sm hover:text-gray-700 hover:bg-gray-300">
          {{ popup_confirm_reject ? popup_confirm_reject : $t('popup_back_title') }}
        </button>
        <!-- Accept Confirm -->
        <button v-if="popup_confirm_accept && success_popup_confirm_title" type="button" @click="$emit('AcceptConfirm')" :data-modal-hide="popup_id"
          :data-modal-show="popup_id + '-success'" :data-modal-target="popup_id + '-success'"
          class="w-[150px] h-[38px] text-gray-700 bg-white ring-1 ring-gray-300 rounded-md text-sm font-semibold leading-5 flex items-center justify-center shadow-sm hover:text-white hover:bg-gray-500">
          {{ popup_confirm_accept }}
        </button>
        <button v-if="popup_confirm_accept && !success_popup_confirm_title" type="button" @click="$emit('AcceptConfirm')" :data-modal-hide="popup_id"
          class="w-[150px] h-[38px] text-gray-700 bg-white ring-1 ring-gray-300 rounded-md text-sm font-semibold leading-5 flex items-center justify-center shadow-sm hover:text-white hover:bg-gray-500">
          {{ popup_confirm_accept }}
        </button>
      </div>
    </div>
  </div>
  <!-- Success Popup -->
  <div v-if="success_popup_confirm_title" :id="popup_id + '-success'" tabindex="-1" aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div
      class="relative p-6 w-full max-w-[384px] max-h-full flex flex-col gap-5 items-center justify-center bg-white rounded-lg shadow-xl">
      <!-- icon -->
      <img class="w-12 h-12px" src="/images/icons/true-green.png" alt="success">
      <!-- title -->
      <h3 v-if="success_popup_confirm_title" class="text-gray-900 font-medium text-lg leading-9">
        {{ success_popup_confirm_title }}
      </h3>
      <!-- Details -->
      <p v-if="success_popup_confirm_details" class="text-gray-500 text-[15px] font-normal leading-8 -mt-2">
        {{ success_popup_confirm_details }}
      </p>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['AcceptConfirm', 'RejectConfirm'])
const props = defineProps({
  popup_id: {
    type: String,
  },
  popup_type: {
    type: String,
    default: 'alert'
  },
  popup_data_type: {
    type: String,
    default: 'success'
  },
  popup_details: {
    type: String
  },
  popup_confirm_accept: {
    type: String
  },
  popup_confirm_reject: {
    type: String
  },
  success_popup_confirm_title: {
    type: String
  },
  success_popup_confirm_details: {
    type: String
  },
})
</script>