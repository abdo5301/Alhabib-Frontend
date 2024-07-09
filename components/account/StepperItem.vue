<template>
  <!-- Step Header -->
  <div 
    :class="['relative w-full flex flex-col lg:items-start items-center gap-[10px] z-20 animate-flip-down animate-once', step == currentStep ? 'lg:pb-[10px]' : 'lg:pb-[40px]']">
    <!-- Step Heder Border -->
    <span v-if="step != totalSteps"
      :class="['absolute lg:h-full lg:w-[2px] h-[2px] w-full bg-gray-300 lg:start-4 start-1/2 top-[14px] lg:top-0 z-10', currentStep != 1 && currentStep != step ? 'bg-gray-900' : 'bg-gray-300']"></span>
    <div
      class="w-full z-20 flex lg:flex-row flex-col justify-between items-center lg:items-start gap-[10px] lg:max-w-full max-w-20 min-w-22">
      <div class="w-full lg:flex-1 flex lg:flex-row flex-col lg:items-start items-center lg:gap-4 gap-[10px]">
        <!-- Step Number -->
        <span
          :class="['rounded-full lg:w-[35px] lg:h-[32px] w-[32px] h-[32px] border-2 flex items-center justify-center font-semibold text-sm leading-4',
            step <= currentStep ? 'border-gray-900 text-gray-900' : 'border-gray-300 text-gray-300', step >= currentStep ? 'bg-white' : 'bg-black']">
          <span v-if="step >= currentStep">{{ step }}</span>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"
              fill="white" />
          </svg>
        </span>
        <!-- Step Title -->
        <div tabindex='-1' :id="'step-title-container-' + step"  class="w-full flex flex-col justify-center items-center gap-2">
          <h2
            :class="['w-full text-center flex lg:justify-start justify-center items-center font-bold lg:leading-7 text-xs',
              step <= currentStep ? ' text-gray-900' : 'text-gray-300', step == currentStep ? 'lg:text-base' : 'lg:text-sm text-xs']">
            <slot name="title" />
          </h2>
          <h3 v-if="step < currentStep"
            class="w-full lg:flex hidden lg:justify-start items-center text-gray-500 text-xs font-semibold leading-4">
            <slot name="subtitle" />
          </h3>
        </div>
      </div>
      <!-- Step Edit -->
      <div v-if="currentStep > step" class="min-w-[100px] flex lg:justify-end justify-center items-center">
        <button @click="$emit('setCurrentStep', step)"
          class="lg:w-[75px] w-[70%] lg:h-[32px] h-[27px] flex items-center justify-center gap-2 text-gray-700 lg:text-sm text-xs font-semibold ring-1 ring-gray-300 bg-white shadow-sm rounded-md">
          <svg class="lg:block hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
            fill="none">
            <path
              d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
              fill="#6B7280" />
            <path d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z" fill="#6B7280" />
          </svg>
          <span>{{ edit_step_btn ? edit_step_btn : $t('edit_btn') }}</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Step Content Height Dev -->
  <div v-if="step == currentStep" :id="'step-content-height-dev-' + step" class="lg:!h-auto w-[1px] z-10">
  </div>
  <!-- Step Content -->
  <div v-show="step == currentStep" :id="'step-content-' + step"
    class="w-full end-1/2 start-0 z-30 lg:end-0 absolute lg:top-0 top-[140px] lg:ps-12 lg:relative lg:pb-5 animate-flip-down animate-once animate-duration-500 animate-delay-100">
    <!-- Step Content Border -->
    <span v-if="step != totalSteps"
      :class="['absolute hidden lg:block lg:h-full lg:w-[2px] h-[2px] w-full bg-gray-300 lg:start-4 start-1/2 top-[14px] lg:top-0 z-10', currentStep != 1 && currentStep != step ? 'bg-gray-900' : 'bg-gray-300']"></span>
    <slot name="content" />

    <!-- Next Step Button -->
    <div class="h-[65px] w-full flex justify-end items-end">
      <button type="button" :title="$t('next_btn')"
        class="lg:w-[144px] h-[50px] lg:h-auto w-full py-[9px] px-[17px] items-center justify-center rounded-md bg-black shadow-sm text-sm font-semibold leading-5 text-white disabled:bg-gray-50 disabled:text-gray-500"
        :disabled="!validStep" @click="$emit('setCurrentStep', step + 1)">
        {{ $t('next_btn') }}
      </button>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const props = defineProps({
  step: {
    type: Number,
    default: 1
  },
  totalSteps: {
    type: Number,
    default: 3
  },
  currentStep: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
    default: ''
  },
  edit_step_btn: {
    type: String,
    default: ''
  },
  validStep: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['setCurrentStep'])
const contentBoxContainer = ref(0)
const contentBox = ref(0)
onMounted(() => {
  setTimeout(() => {
    contentBox.value = document.getElementById('step-content-' + props.step)
    contentBoxContainer.value = document.getElementById('step-content-height-dev-' + props.step)
    if (contentBoxContainer.value && contentBox.value &&
      typeof contentBox.value.offsetHeight !== "undefined") {
      //console.log(contentBox.value.offsetHeight);
      contentBoxContainer.value.style.height = contentBox.value.offsetHeight + 150 + 'px'
    }
  }, 100)
})
</script>