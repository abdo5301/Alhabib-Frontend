<template>
  <svg v-if="!first_item" xmlns="http://www.w3.org/2000/svg" width="295" height="2" viewBox="0 0 295 2" fill="none">
    <path d="M294.9 1.02539L-0.000318527 1.02539" stroke="#E5E7EB" />
  </svg>
  <h2 :id="'filter-accordion-' + filter_key">
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
  <div :id="'filter-accordion-body-' + filter_key" :aria-labelledby="'filter-accordion-' + filter_key">
    <ul v-if="filter_key == 'pieces'"
      class="flex items-center justify-start flex-wrap gap-y-[18px] w-full gap-2 pt-[18px] px-3 pb-6 text-xs text-gray-900 font-normal leading-5">
      <li v-for="item, index in filter_array" :key="item.id">
        <input type="checkbox" :id="'checkbox-item-' + item.id" :value="item.name" class="hidden peer" required="">
        <label :for="'checkbox-item-' + item.id"
          class="inline-flex items-center cursor-pointer peer-checked:ring-gray-800 ring-1 ring-gray-300 ring-inset h-[25px] py-1 px-4 bg-white rounded-md">
          {{ item.name }}
        </label>
      </li>
    </ul>
    <ul v-else-if="filter_key == 'color'"
      class="flex items-stretch justify-start flex-wrap gap-y-4 gap-8 w-full pt-[18px] pb-6 text-sm text-gray-900 font-normal leading-5 px-3">
      <CategoryFilterColor v-for="item in filter_array" :key="item.id" :filter_id="item.id" :name="item.name" :image="item.image" />
    </ul>
    <ul v-else class="space-y-3 pt-3 px-3 pb-6 text-sm text-gray-900 font-normal">
      <li v-for="item, index in filter_array" :key="item.id">
        <div class="flex items-center rounded">
          <input :id="'checkbox-item-' + item.id" type="checkbox" value=""
            class="w-4 text-gray-900 bg-white border-gray-300 rounded cursor-pointer focus:ring-transparent">
          <label :for="'checkbox-item-' + item.id"
            class="w-fit rtl:mr-2 ltr:ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer">{{ item.name
            }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>


<script setup>

const active_filter = ref(true)
defineProps({
  title: {
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
  }
});
</script>