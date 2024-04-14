<template>
  <button type="button" data-drawer-target="mobile-product-filter" data-drawer-show="mobile-product-filter"
    data-drawer-placement="left" aria-controls="mobile-product-filter"
    class="focus:ring-2 bg-white focus:bg-gray-100 transition ease-in-out duration-150 flex items-center justify-center gap-[18px] text-center py-[9px] px-3 w-[180px] h-[48px] text-gray-600 leading-6 font-medium text-lg rounded-md ring-1 ring-gray-300 ">
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd"
        d="M3.5 3C3.5 2.44772 3.94772 2 4.5 2H16.5C17.0523 2 17.5 2.44772 17.5 3V6C17.5 6.26522 17.3946 6.51957 17.2071 6.70711L12.5 11.4142V15C12.5 15.2652 12.3946 15.5196 12.2071 15.7071L10.2071 17.7071C9.92111 17.9931 9.49099 18.0787 9.11732 17.9239C8.74364 17.7691 8.5 17.4045 8.5 17V11.4142L3.79289 6.70711C3.60536 6.51957 3.5 6.26522 3.5 6V3Z"
        fill="#6B7280" />
    </svg>
    {{ $t("category_filter_title_mobile") }}
  </button>

  <!-- content -->
  <div id="mobile-product-filter"
    class="w-[295px] fixed flex top-0 left-0 z-40 h-screen overflow-y-auto transition-transform -translate-x-full duration-500 bg-white"
    tabindex="-1" aria-labelledby="drawer-label">

    <div class="w-full flex basis-full flex-col">
      <div class="flex items-center justify-start rtl:pl-[17px] ltr:pr-[17px] rtl:pr-8 ltr:pl-8 pt-9 pb-4">
        <h5 class="flex flex-1 items-center justify-start text-gray-900 text-lg leading-5 font-bold">
          {{ $t('category_filter_title_mobile') }}
        </h5>
        <!--Reset Filter  -->
        <button @click.prevent="$emit('FilterReset')" class="text-gray-500 text-xs font-semibold leading-5">{{
          $t('category_filter_reset_mobile')
        }}</button>
      </div>
      <span class="flex items-center justify-center px-[17px]">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-[2px]" viewBox="0 0 295 2" fill="none">
          <path d="M294.9 1.02539L-0.000318527 1.02539" stroke="#E5E7EB" />
        </svg>
      </span>
      <div class="w-full flex flex-col justify-start flex-wrap rtl:pl-[14px] ltr:pr-[14px] rtl:pr-5 ltr:pl-5 pb-12">
        <CategoryFilterSection v-for="filter_section, index in filter_data" :filter_array="filter_section.data"
          :title="filter_section.name" :key="filter_section.key" :filter_key="filter_section.key" :mobile_filter="true"
          :first_item="index == 0 ? true : false" @filter-value="getFilterValue"
          :selected_filter_array="selected_filter_array" />
      </div>
      <div class="flex items-center justify-center">
        <Button color="black" data-drawer-hide="mobile-product-filter" aria-controls="mobile-product-filter"
          class="fixed flex items-center justify-center w-[264px] bottom-3 text-sm font-semibold leading-5"> {{
            $t('category_filter_submit_mobile') }} </Button>
      </div>

    </div>

  </div>
</template>

<script setup>
onMounted( () => {
  initFlowbite();

})  
const props = defineProps({
  filter_data: {
    type: Object
  },
  selected_filter_array: {
    type: Object
  },
})

const emits = defineEmits(['FilterValue', 'FilterReset'])

function getFilterValue(value) {
  emits('FilterValue', value)
}

</script>