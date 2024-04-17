<template>
  <div class="">
    <!-- <PrimeRating v-model="rating"  :cancel="false" /> -->
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  product_data: {
    type: Object
  }
})
const rating = ref(1)

function setRating(new_rating) {
  rating.value = new_rating
}
</script>