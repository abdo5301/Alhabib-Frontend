<template>
  <ClientOnly>
    <!-- Loader -->
    <template #fallback>
      <div class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
        <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
      </div>
    </template>
    <form @submit.prevent="submitAddress" class="w-full flex flex-col justify-start gap-10 lg:gap-5">
      <!-- Country -->
      <div class="flex flex-col lg:flex-row justify-start lg:items-center">
        <label for="input-region-select" class="lg:w-[164px] text-gray-700 text-sm lg:text-lg font-semibold leading-5">{{
          $t('label_country') }}</label>
        <InputSelect :label_show="false" input_style="h-[38px] lg:w-[320px]"
          error_text_style="lg:max-w-[320px] text-xs font-semibold" input_id="input-country-select"
          :select_data="country_array" :select_value="country" v-model="country" option_index_name="name"
          option_index_value="id">
        </InputSelect>
      </div>
      <!-- Divider -->
      <div class="hidden lg:flex items-center justify-center w-full">
        <div class="border-b border-b-[#E5E7EB] w-full"></div>
      </div>
      <!-- Region -->
      <div class="flex flex-col lg:flex-row justify-start lg:items-center">
        <label for="input-region-select" class="lg:w-[164px] text-gray-700 text-sm lg:text-lg font-semibold leading-5">{{
          $t('label_region') }}</label>
        <InputSelect :label_show="false" @select-call-back="changeRegion" input_style="h-[38px] lg:w-[320px]"
          error_text_style="lg:max-w-[320px] text-xs font-semibold" input_id="input-region-select"
          :select_data="region_array" :select_value="region" v-model="region" option_index_name="name"
          option_index_value="name">
        </InputSelect>
      </div>
      <!-- Divider -->
      <div class="hidden lg:flex items-center justify-center w-full">
        <div class="border-b border-b-[#E5E7EB] w-full"></div>
      </div>
      <!-- City -->
      <div class="flex flex-col lg:flex-row justify-start lg:items-center">
        <label for="input-city-select" class="lg:w-[164px] text-gray-700 text-sm lg:text-lg font-semibold leading-5">{{
          $t('label_city') }}</label>
        <InputSelect :label_show="false" input_id="input-city-select" :select_data="city_array" :select_value="city"
          v-model="city" input_style="h-[38px] lg:w-[320px]" error_text_style="lg:max-w-[320px] text-xs font-semibold"
          option_index_name="name" option_index_value="name">
        </InputSelect>
      </div>
      <!-- Divider -->
      <div class="hidden lg:flex items-center justify-center w-full">
        <div class="border-b border-b-[#E5E7EB] w-full"></div>
      </div>
      <!-- Neighborhood -->
      <div class="flex flex-col lg:flex-row justify-start lg:items-center">
        <label for="input-neighborhood" class="lg:w-[164px] text-gray-700 text-sm lg:text-lg font-semibold leading-5">
          {{ $t('label_neighborhood') }}</label>
        <Input input_style="h-[38px] lg:w-[320px]" error_text_style="lg:max-w-[320px] text-xs font-semibold"
          v-model="neighborhood" input_id="input-neighborhood" input_name="neighborhood" input_type="text">
        </Input>
      </div>
      <!-- Divider -->
      <div class="hidden lg:flex items-center justify-center w-full">
        <div class="border-b border-b-[#E5E7EB] w-full"></div>
      </div>
      <!-- Address Description -->
      <div class="flex flex-col lg:flex-row justify-start lg:items-center">
        <label for="input-street" class="lg:w-[164px] text-gray-700 text-sm lg:text-lg font-semibold leading-5">
          {{ $t('label_address') }}</label>
        <Input input_style="h-[38px] lg:w-[320px]" error_text_style="lg:max-w-[320px] text-xs font-semibold"
          v-model="street" input_id="input-street" input_name="street" input_type="text" :input_notes="true">
        <div class="flex justify-start items-center text-xs font-semibold text-gray-500">
          {{ $t('input_notes_address') }}
        </div>
        </Input>
      </div>
      <!-- Divider -->
      <div class="hidden lg:flex items-center justify-center w-full">
        <div class="border-b border-b-[#E5E7EB] w-full"></div>
      </div>
      <!-- Default Address -->
      <div class="flex flex-col lg:flex-row justify-start lg:items-center">
        <!-- Radio Main Address -->
        <div class="flex items-center">
          <input id="input-main-address" type="radio" value="1" name="main_address" v-model="main_address"
            :checked="main_address == 1 ? true : false"
            class="w-4 h-4 lg:w-[18px] lg:h-[18px] cursor-pointer text-gray-600 bg-white border-gray-300 focus:ring-gray-600 focus:ring-2">
          <label for="input-main-address"
            class="ms-2 cursor-pointer text-sm lg:text-base font-semibold leading-5 text-gray-700">{{
              $t('label_main_address_select') }}</label>
        </div>
      </div>
      <!-- Submit -->
      <div class="flex justify-start lg:ps-[164px] lg:mt-[30px] lg:mb-[17px]">
        <button type="submit" :disabled="!unDisabled"
          class="w-full lg:w-[320px] h-[50px] lg:h-[38px] bg-black rounded-md shadow-sm flex items-center justify-center text-white text-base font-semibold lg:font-bold leading-6 disabled:opacity-40 disabled:cursor-not-allowed">
          {{ $t('save_edits_btn') }}
        </button>
      </div>
    </form>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  form_type: {
    type: String,
    default: 'add'
  },
  edit_address_id: {
    type: Number,
    default: 0
  }
})
const emits = defineEmits(['formSuccess'])
const localePath = useLocalePath()
const { getCountries, getRegions, getCities, getAddress, getAreaId, addAddress, editAddress } = useAddress();
const country_array = ref(await getCountries())
const country = ref('1')
const region_array = ref(await getRegions(country.value))
const address_data = ref(props.edit_address_id ? await getAddress(props.edit_address_id) : [])
const city_array = ref([])
const region = ref('')
const city = ref('')
const neighborhood = ref('')
const street = ref('')
const main_address = ref('0')
if (address_data.value && address_data.value.region) {
  region.value = address_data.value.region
} else if (region_array.value && region_array.value.length > 0) {
  region.value = region_array.value[0].name
} else {
  region.value = ''
}
await changeRegion(region.value)
onMounted(() => {
  initFlowbite();
  if (!address_data.value || !address_data.value.id && props.form_type == 'edit') {
    return navigateTo(localePath('/account/address'))
  } else {
    neighborhood.value = address_data.value.neighborhood ? address_data.value.neighborhood : ''
    street.value = address_data.value.street ? address_data.value.street : ''
    main_address.value = address_data.value.default ? '1' : '0'
  }
})

const unDisabled = computed(() => {
  return region.value.length > 0 && city.value.length > 0 && street.value.length > 0 && neighborhood.value.length > 0
})

async function changeRegion(region_name) {
  const region_id = getAreaId(region_name, region_array.value)
  if (region_id) {
    city_array.value = await getCities(region_id)
    if (city_array.value && city_array.value.length > 0) {
      if (address_data.value && address_data.value.city) {
        city.value = address_data.value.city
      } else {
        city.value = city_array.value[0].name
      }
    } else {
      city.value = ''
    }
  } else {
    city.value = ''
  }
}

async function submitAddress() {
  const city_id = getAreaId(city.value, city_array.value)
  const new_address = ref({})
  if (props.form_type == 'add') {//add
    var add_address_data = {
      city_id: city_id,
      neighborhood: neighborhood.value,
      street: street.value,
      default: main_address.value,
    }
    new_address.value = await addAddress(add_address_data)
  } else {//edit
    var edit_address_data = {
      address_id: address_data.value.id,
      city_id: city_id,
      neighborhood: neighborhood.value,
      street: street.value,
      default: main_address.value,
    }
    new_address.value = await editAddress(edit_address_data)
  }
  if (new_address.value && new_address.value.id) {//success
    useState('account_address_success', () => props.form_type)
    navigateTo(localePath('/account/address'))
    //emits('formSuccess', props.form_type)
  }
}

</script>