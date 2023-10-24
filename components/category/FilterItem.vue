<template>
  <li v-if="filter_type == 'pieces'">
    <!-- Input -->
    <input type="checkbox" :id="'checkbox-item-' + filter_id" :value="filter_name"
      @change="$emit('filterValue', filter_object_value)" class="hidden peer"
      :checked="selected_filter_array.includes(filter_object_value)">
    <!-- Label -->
    <label :for="'checkbox-item-' + filter_id"
      class="inline-flex items-center cursor-pointer peer-checked:ring-gray-800 ring-1 ring-gray-300 ring-inset h-[25px] py-4 px-4 bg-white rounded-md">
      {{ filter_name }}
    </label>
  </li>
  <li v-else-if="filter_type == 'color'">
    <!-- Input -->
    <input @change="(selected = !selected), $emit('filterValue', filter_object_value)" type="checkbox"
      :id="'checkbox-item-' + filter_id" :value="filter_name" class="hidden peer"
      :checked="selected = selected_filter_array.includes(filter_object_value)">
    <!-- Label -->
    <label :for="'checkbox-item-' + filter_id"
      class="relative flex justify-center items-stretch flex-col gap-1 cursor-pointer py-1 w-[40px]">
      <span :class="[('relative  flex items-center justify-center rounded-full w-10 h-10')]">
        <span class="flex items-center justify-center rounded-full w-10 h-10"
          :style="['background-color:' + filter_item_data.hex]">
          <span v-if="selected" class="pt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path
                d="M15.3461 0.470863C15.677 0.765568 15.8629 1.16522 15.8629 1.58193C15.8629 1.99864 15.677 2.39829 15.3461 2.693L6.52115 10.5506C6.19017 10.8452 5.74131 11.0107 5.2733 11.0107C4.80529 11.0107 4.35643 10.8452 4.02545 10.5506L0.495455 7.40757C0.173947 7.11118 -0.00395468 6.71421 6.67215e-05 6.30216C0.00408812 5.89011 0.189711 5.49595 0.516956 5.20458C0.8442 4.91321 1.28688 4.74793 1.74966 4.74435C2.21244 4.74077 2.65828 4.89917 2.99116 5.18544L5.2733 7.21742L12.8504 0.470863C13.1814 0.176248 13.6303 0.0107422 14.0983 0.0107422C14.5663 0.0107422 15.0151 0.176248 15.3461 0.470863Z"
                fill="white" />
            </svg>
          </span>
        </span>
      </span>
      <span class="flex items-stretch justify-center w-full text-center"> {{ filter_name }} </span>
    </label>
  </li>
  <li v-else>
    <div class="flex items-center rounded">
      <!-- Input -->
      <input :id="'checkbox-item-' + filter_id" type="checkbox" :value="filter_name"
        @change="$emit('filterValue', filter_object_value)" :checked="selected_filter_array.includes(filter_object_value)"
        class="w-4 text-gray-900 bg-white border-gray-300 rounded cursor-pointer focus:ring-transparent">
      <!-- Label -->
      <label :for="'checkbox-item-' + filter_id"
        class="w-fit rtl:mr-2 ltr:ml-2 text-base font-medium text-gray-900 rounded cursor-pointer">{{ filter_name
        }}</label>
    </div>
  </li>
</template>

<script setup>

defineEmits(["filterValue"]);

const selected = ref(false);
const props = defineProps({
  filter_type: {
    type: String
  },
  selected_filter_array: {
    type: Object
  },
  filter_item_data: {
    type: Object
  },
  mobile_filter: {
    type: Boolean,
    default: false
  }
})

const filter_id = (props.mobile_filter ? 'mobile-' : '') + props.filter_type + '-' + (props.filter_item_data.id ?? props.filter_item_data.key)
const filter_name = props.filter_item_data.name ?? props.filter_item_data.value
const filter_value = props.filter_type == 'price' ? { 'min': props.filter_item_data.min, 'max': props.filter_item_data.max } : props.filter_item_data.id ?? props.filter_item_data.key
const filter_object_value = {'type': props.filter_type, 'value': filter_value, 'name': filter_name }
</script>