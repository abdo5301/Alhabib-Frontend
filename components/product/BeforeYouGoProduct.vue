<template>
  <div class="flex flex-col justify-start lg:gap-4 gap-3 lg:w-[168px] w-[130px] flex-shrink-0">
    <!-- image -->
    <NuxtLink :to="link" class="relative w-full">
      <img class="w-full lg:h-[168px] h-[119px]"
        :src="image != null ? image : 'https://via.placeholder.com/640x480.png/D9D9D9?text=Alhabib-Shop'">
      <button @click.prevent="$emit('favoriteClick', favorite = !favorite)"
        class="absolute bg-[#f9fafb9e] p-1 rounded-full lg:bottom-[11px] bottom-[7px] lg:right-[5px] right-[5px] text-gray-700 text-base lg:text-xl font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-[26px] w-5 h-5 lg:h-[26px] " viewBox="0 0 26 26"
          :fill="favorite ? '#A30000' : 'none'">
          <path
            d="M4.67785 6.84448C2.77405 8.74829 2.77405 11.835 4.67785 13.7388L13.0001 22.061L21.3221 13.7388C23.226 11.835 23.226 8.74829 21.3221 6.84448C19.4183 4.94067 16.3317 4.94067 14.4279 6.84448L13.0001 8.27239L11.5721 6.84448C9.66834 4.94067 6.58166 4.94067 4.67785 6.84448Z"
            :stroke="favorite ? '#A30000' : '#1F2937'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </NuxtLink>
    <!-- name -->
    <NuxtLink :to="link" class="line-clamp-2 text-xs text-gray-900 font-normal leading-[22px]">
      {{ name }}
    </NuxtLink>
    <!-- price -->
    <div v-if="special" class="flex gap-2 justify-start">
      <span class="text-red-600 font-bold text-xs">
        {{ special }}
      </span>
      <del class="text-gray-900 font-normal text-xs">
        {{ price }}
      </del>
    </div>
    <div v-else class="flex gap-2 justify-start">
      <span class="text-gray-900 font-bold text-xs leading-5">
        {{ price }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineEmits(['favoriteClick'])
const { $lang } = useNuxtApp()
const props = defineProps({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
  },
  special: {
    type: String,
  },
  link: {
    type: String,
  },
  favorite: {
    type: Boolean,
  },
  id: {
    type: Number,
  }
});

</script>