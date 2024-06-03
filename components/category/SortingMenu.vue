<template>
  <!-- Sorting Menu -->
  <button id="sortingDropdownButton"
    :class="['w-[223px] mt-[6px] mx-1 text-gray-700 bg-white focus:outline-none ring-1 ring-gray-300 focus:ring-gray-300 font-bold rounded-md text-sm leading-5 px-[13px] py-[9px] inline-flex items-end justify-start']"
    type="button">
    <span class="w-full flex-1 flex">
      {{ menu_title ??= $t('category_sorting_title') }}
    </span>
    <svg v-if="!show_menu" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
        fill="#374151" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M5.29289 12.7071C5.68342 13.0976 6.31658 13.0976 6.7071 12.7071L9.99999 9.41421L13.2929 12.7071C13.6834 13.0976 14.3166 13.0976 14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L10.7071 7.29289C10.3166 6.90237 9.68341 6.90237 9.29289 7.29289L5.29289 11.2929C4.90237 11.6834 4.90237 12.3166 5.29289 12.7071Z"
        fill="#374151" />
    </svg>
  </button>

  <!-- Dropdown menu -->
  <div id="sortingDropdown"
    class="z-30 hidden bg-white shadow w-[222px] border border-gray-300 border-t-0 rounded-br-md rounded-bl-md">
    <ul class="text-sm leading-5 font-medium text-gray-700 divide-y divide-gray-300">
      <li @click="dropdown.hide()" v-for="option, index in sorting_options"
        :key="option.key">
        <NuxtLink to="javascript:void(0)" class="block px-4 py-4 hover:bg-gray-100 rounded-md"
          @click="$emit('updateSortingValue', option.key), menu_title = option.name">
          {{ option.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Dropdown } from 'flowbite';
const dropdown = ref({})
const props = defineProps({
  sorting_options: {
    type: Object
  }
})
defineEmits(['updateSortingValue'])

const { t } = useI18n()
const menu_title = ref()
const show_menu = ref(false)
onMounted(
  () => {
    const $menu = document.getElementById('sortingDropdown');
    const $button = document.getElementById('sortingDropdownButton');
    const options = {
      placement: 'bottom',
      triggerType: 'click',
      offsetSkidding: 0,
      offsetDistance: 1,
      delay: 300,
      ignoreClickOutsideClass: false,
      onHide: () => {
        show_menu.value = false
      },
      onShow: () => {
        show_menu.value = true
      },
    };
    dropdown.value = new Dropdown($menu, $button, options);
  }
)
</script>