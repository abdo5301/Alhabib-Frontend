<template>
  <div class="flex items-center justify-center">
    <svg :class="['w-[100px] h-[100px] flex items-center justify-center', loader_style ? loader_style : '']" version="1.1"
      id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 55 90" enable-background="new 0 0 0 0" xml:space="preserve">
      <circle fill="#cccccc" stroke="none" cx="6" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
      </circle>
      <circle fill="#cccccc" stroke="none" cx="26" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
      </circle>
      <circle fill="#cccccc" stroke="none" cx="46" cy="50" r="6">
        <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
      </circle>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  loader_style: {
    type: String,
    default: ''
  }
})
</script>