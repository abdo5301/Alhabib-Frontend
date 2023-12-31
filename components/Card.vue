<template>
  <div class="mt-12 mx-auto w-full max-w-[480px] lg:max-w-[530px]">
      <div class="bg-white px-6  py-8 shadow sm:rounded-lg sm:px-10">
        <h2 v-if="card_title" class="mb-6 font-sans-serif text-center text-xl font-bold leading-5 tracking-tight text-gray-900">{{ card_title }}</h2>
       <slot />   
      </div>
    </div>
</template>


<script setup>
const props = defineProps({
card_title: {
  type : String,
}
});
</script>