<template>
  <li>
    <input @change="selected = !selected"  type="checkbox" :id="'checkbox-item-'+filter_id" value="" class="hidden peer" required="">
    <label :for="'checkbox-item-'+filter_id"
      class="relative flex justify-center items-stretch flex-col gap-1 cursor-pointer py-1 w-[40px]">
      <span v-if="selected"  class="absolute top-[19px] rtl:right-[11px] ltr:left-[11px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M15.3461 0.470863C15.677 0.765568 15.8629 1.16522 15.8629 1.58193C15.8629 1.99864 15.677 2.39829 15.3461 2.693L6.52115 10.5506C6.19017 10.8452 5.74131 11.0107 5.2733 11.0107C4.80529 11.0107 4.35643 10.8452 4.02545 10.5506L0.495455 7.40757C0.173947 7.11118 -0.00395468 6.71421 6.67215e-05 6.30216C0.00408812 5.89011 0.189711 5.49595 0.516956 5.20458C0.8442 4.91321 1.28688 4.74793 1.74966 4.74435C2.21244 4.74077 2.65828 4.89917 2.99116 5.18544L5.2733 7.21742L12.8504 0.470863C13.1814 0.176248 13.6303 0.0107422 14.0983 0.0107422C14.5663 0.0107422 15.0151 0.176248 15.3461 0.470863Z"
            fill="white" />
        </svg>
      </span>
      <img :src="image" :alt="name">
      <span class="flex items-stretch justify-center w-full text-center"> {{ name }} </span>
    </label>
  </li>
</template>

<script setup>

const selected = ref(false);

defineProps({
  filter_id:{
    type: Number
  },
  name:{
    type: String
  },
  image:{
    type: String
  },
  
})
</script>