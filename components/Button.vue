<script setup>
defineProps({
  type: {
    type: String,
    default: "submit",
  },
  color: {
    type: String,
    default: "emerald",
  },
  outline: {
    type: Boolean,
    default: false,
  }
});

const colors = {
  default: {
    emerald: "text-white bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-500 focus:ring-emerald-200 border-transparent",
    blue: "text-white bg-blue-400 hover:bg-blue-500 active:bg-blue-500 focus:ring-blue-200 border-transparent",
    red: "text-white bg-red-500 hover:bg-red-600 active:bg-red-600 focus:ring-red-200 border-transparent",
    darkBlue: "text-white bg-blue-900 hover:bg-blue-800 active:bg-blue-800 focus:ring-blue-500 border-transparent",
    dark: "text-white bg-darkSlateGray hover:bg-gray-800 active:bg-gray-900 focus:ring-gray-500 border-transparent",
    black: "text-white bg-black hover:bg-gray-700 active:bg-gray-900 focus:border-gray-900 focus:shadow-outline-gray focus:ring-transparent border-transparent disabled:bg-gray-100 disabled:text-gray-500 disabled:hover:bg-gray-200 disabled:shadow disabled:cursor-not-allowed",
    white: "text-black bg-white hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-300 border-transparent"

  },
  outline: {
    emerald: "text-emerald-400 bg-white hover:bg-emerald-400 hover:text-white border-emerald-400 active:bg-emerald-500 focus:ring-emerald-200",
    blue: "text-blue-400 bg-white hover:bg-blue-400 hover:text-white border-blue-400 active:bg-blue-500 focus:ring-blue-200",
    red: "text-red-500 bg-white hover:bg-red-500 hover:text-white border-red-500 active:bg-red-500 focus:ring-red-200",
    darkBlue: "text-blue-800 bg-white hover:bg-blue-800 hover:text-white border-blue-800 active:bg-blue-800 focus:ring-blue-500",
    dark: "text-darkSlateGray bg-white hover:bg-gray-800 hover:text-white border-darkSlateGray active:bg-gray-900 focus:ring-gray-500",
    black: "text-gray-800 bg-white hover:bg-gray-700 hover:text-white border-gray-800 active:bg-gray-900 focus:border-gray-900 focus:shadow-outline-gray focus:ring-gray-200",
    white: "text-black bg-white hover:bg-gray-200 border-black active:bg-gray-300 focus:ring-gray-300"
  }
}
</script>

<template>
  <button
    :type="type"
    :class="colors[outline? 'outline' : 'default'][color]"
    class="
      inline-flex
      items-center
      px-4
      py-2
      border
      rounded-md
      font-semibold
      text-sm
      uppercase
      transition
      ease-in-out
      duration-150
      disabled:opacity-75
      focus:outline-none
      focus:ring-2
      ring-offset-2
    "
  >
    <slot />
  </button>
</template>
