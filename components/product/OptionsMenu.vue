<template>
  <!--Select button -->
  <button type="button" id="productOptionsDropdownButton"
    :class="[menu_title ? 'text-gray-700' : 'text-red-500', 'transition ease-in-out duration-150 shadow flex items-center justify-between gap-[18px] px-3 w-full h-[52px] leading-5 font-medium text-lg rounded-md ring-1 ring-gray-300 bg-white']">
    {{ menu_title ?? $t('product_size_menu_title') }}
    <svg v-if="!show_menu" xmlns="http://www.w3.org/2000/svg" class="mx-4" width="20" height="20" viewBox="0 0 20 20"
      fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
        fill="#374151" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="mx-4" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M5.29289 12.7071C5.68342 13.0976 6.31658 13.0976 6.7071 12.7071L9.99999 9.41421L13.2929 12.7071C13.6834 13.0976 14.3166 13.0976 14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L10.7071 7.29289C10.3166 6.90237 9.68341 6.90237 9.29289 7.29289L5.29289 11.2929C4.90237 11.6834 4.90237 12.3166 5.29289 12.7071Z"
        fill="#374151" />
    </svg>
  </button>

  <!-- Select menu -->
  <div id="productOptionsDropdown"
    :class="['z-30 hidden bg-white shadow w-full max-w-xl border border-gray-300 rounded-md productOptionsDropdown']">
    <ul class="text-lg leading-5 justify-start font-medium text-gray-700 divide-y divide-gray-300">
      <li @click="dropdown.hide()" v-for="option, index in options" :key="option.id">
        <NuxtLink @click="$emit('updateOptionValue', option), menu_title = option.variation_option.value"
          to="javascript:void(0)" class="block px-5 py-5 hover:bg-gray-100">{{ option.variation_option.value }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Dropdown } from 'flowbite';
const dropdown = ref({})
const props = defineProps({
  options: {
    type: Object
  }
})
defineEmits(['updateOptionValue'])

const { t } = useI18n()
const menu_title = ref()
const show_menu = ref(false)
onMounted(
  () => {
    const $menu = document.getElementById('productOptionsDropdown');
    const $button = document.getElementById('productOptionsDropdownButton');
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