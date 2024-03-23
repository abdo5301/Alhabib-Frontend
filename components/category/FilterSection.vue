<template>
  <span v-if="!first_item" class="flex items-center justify-center lg:px-0 px-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-[295px] w-full h-[2px]" viewBox="0 0 295 2" fill="none">
      <path d="M294.9 1.02539L-0.000318527 1.02539" stroke="#E5E7EB" />
    </svg>
  </span>
  <h2 :id="'filter-accordion-' + filter_key" class="hidden lg:block">
    <button type="button" @click="active_filter = !active_filter"
      class="flex items-center justify-between w-full pt-5 px-3 font-bold text-gray-700 text-base leading-5"
      :data-accordion-target="'#filter-accordion-body-' + filter_key" :aria-expanded="opened"
      :aria-controls="'filter-accordion-body-' + filter_key">
      <span>{{ title }}</span>
      <svg v-if="active_filter" xmlns="http://www.w3.org/2000/svg" width="14" height="3" viewBox="0 0 14 3" fill="none">
        <path d="M13 1.07422L7 1.07422H1" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 25 28" fill="none">
        <path d="M12.5 1.14941V13.9991M12.5 13.9991V26.8489M12.5 13.9991H24M12.5 13.9991L1 13.9991" stroke="#9CA3AF"
          stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </h2>
  <span class="flex lg:hidden items-center justify-between w-full pt-5 px-3 font-bold text-gray-700 text-lg leading-5">{{
    title }}</span>
  <div :id="'filter-accordion-body-' + filter_key" :aria-labelledby="'filter-accordion-' + filter_key">
    <ul :class="[filter_key == 'pieces' ? 'flex items-center justify-start flex-wrap gap-y-[18px] w-full gap-2 lg:pt-[18px] pt-5 px-3 pb-6 text-base text-gray-900 font-normal leading-5' :
      filter_key == 'colors' ? 'flex items-stretch justify-start flex-wrap gap-y-4 gap-8 w-full lg:pt-[18px] pt-5 pb-6 text-base text-gray-900 font-normal leading-5 px-3' :
        'space-y-3 lg:pt-3 pt-5 px-3 pb-6 text-base text-gray-900 font-normal','max-h-[300px] overflow-hidden  hover:overflow-y-auto']">
      <CategoryFilterItem v-for="item, index in filter_array" :key="filter_key + '-' + index" :filter_type="filter_key"
        :selected_filter_array="selected_filter_array" :filter_item_data="item" :mobile_filter="mobile_filter" @filter-value="updateFilterValue" />
    </ul>
  </div>
</template>


<script setup>
const emits = defineEmits(['filterValue']);

function updateFilterValue(filter_value) {
  emits('filterValue', filter_value)
}

const active_filter = ref(true)
const props = defineProps({
  title: {
    type: String
  },
  modelValue: {
    type: String
  },
  filter_key: {
    type: String
  },
  first_item: {
    type: Boolean
  },
  filter_array: {
    type: Object
  },
  opened: {
    type: Boolean,
    default: true
  },
  selected_filter_array: {
    type: Object
  },
  mobile_filter:{
    type: Boolean,
    default: false
  }
});
</script>