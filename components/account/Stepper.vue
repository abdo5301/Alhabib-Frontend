<template>
  <div class="flex items-center justify-center space-x-4">
    <div
      v-for="(step, index) in totalSteps"
      :key="index"
      class="relative flex items-center justify-center"
    >
      <transition name="step-fade">
        <div
          v-if="index === currentStep"
          :class="{
            'w-8 h-8 bg-indigo-600': index < currentStep,
            'w-4 h-4 bg-gray-300': index >= currentStep
          }"
          key="step-indicator"
        >
          <div
            v-if="index < currentStep"
            class="absolute w-4 h-4 bg-white rounded-full animate-pulse"
          ></div>
        </div>
      </transition>
      <div v-if="index < totalSteps - 1" class="flex-1 h-0.5 bg-gray-300"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  totalSteps: {
    type: Number,
    default: 3
  },
  currentStep: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
/* Add transition animation */
.step-slide-enter-active, .step-slide-leave-active {
  transition: transform 0.5s ease-in-out;
}
.step-slide-enter, .step-slide-leave-to {
  transform: translateX(100%);
}

/* Add styles */
</style>