<template>
  <NuxtLink :to="item_link" class="flex justify-start items-center gap-1 h-9">
    <span class="mx-1">
      <svg v-if="item_type == 'contact'" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25"
        fill="none">
        <path
          d="M3 5.5C3 4.39543 3.89543 3.5 5 3.5H8.27924C8.70967 3.5 9.09181 3.77543 9.22792 4.18377L10.7257 8.67721C10.8831 9.14932 10.6694 9.66531 10.2243 9.88787L7.96701 11.0165C9.06925 13.4612 11.0388 15.4308 13.4835 16.533L14.6121 14.2757C14.8347 13.8306 15.3507 13.6169 15.8228 13.7743L20.3162 15.2721C20.7246 15.4082 21 15.7903 21 16.2208V19.5C21 20.6046 20.1046 21.5 19 21.5H18C9.71573 21.5 3 14.7843 3 6.5V5.5Z"
          stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg v-else-if="item_type == 'return'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none">
        <path
          d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
          stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
    <span class="text-gray-700 font-semibold text-base leading-5">
      <slot />
    </span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  item_type: {
    type: String,
    default: 'contact'
  },
  item_link: {
    type: String,
    default: ' '
  }
})
</script>