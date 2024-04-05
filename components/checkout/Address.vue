<template>
  <div>
    <ClientOnly>
      <!-- Shipping Address Title -->
      <h4 v-if="step != 'select_payment'"
        :class="[step == 'select_address' ? 'hidden lg:flex' : 'flex', 'items-center justify-start lg:py-[9px] text-gray-500 lg:text-gray-900 font-bold leading-6 lg:leading-5 text-base lg:text-xl']">
        {{ $t('shipping_address_title') }}
      </h4>
      <!-- Shipping Address Container -->
      <div class="flex flex-col lg:gap-[30px] lg:py-[30px] pt-[10px]">
        <!-- Selected Item -->
        <div v-if="(step == 'select_address' || step == 'select_payment')"
          class="p-[15px] flex justify-start flex-col ring-1 ring-gray-300 rounded-lg">
          <div class="lg:p-[17px] flex justify-start">
            <!-- Address Content -->
            <div class="flex lg:flex-row flex-col justify-start items-start flex-1 gap-4 text-gray-500 leading-5">
              <h5 class="flex items-center justify-start font-semibold text-base lg:ml-2">
                {{ $t('shipping_address_title') }}
              </h5>
              <div class="flex flex-col gap-2 font-normal text-sm">
                <span v-if="customer_data && customer_data.name">{{ customer_data.name }}</span>
                <span v-if="customer_data && customer_data.mobile" dir="ltr" class="flex justify-end">
                  {{ customer_data.mobile }}
                </span>
                <span v-if="address_data && address_data.region && address_data.city">
                  {{ address_data.region }} ، {{ address_data.city }}
                </span>
                <span v-if="address_data && address_data.neighborhood">
                  {{ address_data.neighborhood }} ، <span v-if="address_data && address_data.street">
                    {{ address_data.street }}
                  </span>
                </span>

              </div>
            </div>
            <!-- Edit Link -->
            <div class="flex justify-end lg:items-start items-center">
              <button type="button" @click="$emit('nextStep', 'edit_address')"
                class="h-[38px] flex items-center justify-center w-[75px]  ring-1 ring-gray-300 bg-white rounded-md shadow-sm text-gray-700 text-sm font-semibold leading-5">
                {{ $t('edit_btn') }}
              </button>
            </div>
          </div>

          <!-- Divider -->
          <div v-if="step == 'select_payment'" class="h-[24px] lg:h-[30px] flex justify-center items-center w-full">
            <span class="border-t border-gray-200 w-full"></span>
          </div>

          <!-- Shipping Time -->
          <div v-if="step == 'select_payment'"
            class="lg:p-[17px] flex justify-start flex-col lg:flex-row gap-2 lg:gap-5">
            <h6
              class="flex items-center justify-start lg:text-gray-500 text-gray-400 font-normal lg:font-semibold leading-5 lg:text-base text-sm">
              {{ $t('shipping_time_title') }}
            </h6>
            <span class="flex items-center justify-start text-gray-500 text-sm font-normal leading-5">
              {{ $t('shipping_time_content') }}
            </span>
          </div>
        </div>

        <!-- Address Form -->
        <form v-if="step == 'add_address' || step == 'edit_address'"
          class="w-full flex flex-col gap-[30px] lg:gap-[40px] lg:pt-0 pt-[10px]" action="#"
          @submit.prevent="submitAddress(step)">
          <!-- Full Name -->
          <div v-if="full_name && full_name.length > 0" class="w-full flex flex-col lg:gap-3 gap-[10px]">
            <span class="block text-sm lg:text-lg font-semibold font-sans-serif leading-5 text-gray-700">
              {{ $t('label_full_name') }}
            </span>
            <div
              class="h-[50px] px-[13px] bg-gray-100 flex justify-start items-center w-full rounded-md border-0 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-200 text-sm font-normal sm:leading-6">
              {{ full_name }}
            </div>
          </div>
          <Input v-else disabled input_style="h-[50px]" label_style="lg:text-lg pb-2" v-model="full_name"
            :label_name="$t('label_full_name')" label_for="input-full-name" input_id="input-full-name"
            input_name="full_name" />
          <!-- Phone -->
          <div v-if="phone && phone.length > 0" class="w-full flex flex-col lg:gap-3 gap-[10px]">
            <span class="block text-sm lg:text-lg font-semibold font-sans-serif leading-5 text-gray-700">
              {{ $t('label_phone') }}
            </span>
            <div dir="ltr"
              class="h-[50px] pe-[13px] tracking-wider bg-gray-100 flex justify-start items-center gap-[13px] w-full rounded-md border-0 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-200 text-sm font-normal sm:leading-6">
              <div dir="ltr"
                class="px-[7px] py-[9px] h-[50px] flex justify-between items-center gap-1.5 border-r rounded-r-md border-gray-300">
                <img src="/images/ar-flag.svg" class="w-5 h-5" alt="SA-Flag">
                <span class="text-gray-700 font-medium text-sm leading-5">{{ phone_country }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.29289 7.57024C5.68342 7.17971 6.31658 7.17971 6.7071 7.57024L9.99999 10.8631L13.2929 7.57024C13.6834 7.17971 14.3166 7.17971 14.7071 7.57024C15.0976 7.96076 15.0976 8.59393 14.7071 8.98445L10.7071 12.9845C10.3166 13.375 9.68341 13.375 9.29289 12.9845L5.29289 8.98445C4.90237 8.59393 4.90237 7.96076 5.29289 7.57024Z"
                    fill="#374151" />
                </svg>
              </div>
              <span>{{ phone.replace(phone_country, "") }}</span>
            </div>
          </div>
          <Input v-else input_style="h-[50px]" label_style="lg:text-lg pb-2" v-model="phone"
            :label_name="$t('label_phone')" label_for="input-phone" input_id="input-phone" input_name="phone"
            input_type="text" input_dir="ltr" :input_phone_country="true" input_placeholder="534398859"
            @phone-country="getPhoneCountry" />
          <!-- Region -->
          <InputSelect @select-call-back="changeRegion" input_id="input-region-select" :select_data="region_array"
            :select_value="region" v-model="region" input_style="h-[50px]" option_index_name="name"
            option_index_value="name">
            {{ $t('label_region') }}
          </InputSelect>
          <!-- City -->
          <InputSelect input_id="input-city-select" :select_data="city_array" :select_value="city" v-model="city"
            input_style="h-[50px]" option_index_name="name" option_index_value="name">
            {{ $t('label_city') }}
          </InputSelect>
          <!-- Neighborhood -->
          <Input input_style="h-[50px]" label_style="text-base lg:text-xl lg:pb-2 pb-1" v-model="neighborhood"
            :label_name="$t('label_neighborhood')" label_for="input-neighborhood" input_id="input-neighborhood"
            input_name="neighborhood" input_type="text">
          </Input>
          <!-- Address Description -->
          <Input input_style="h-[50px]" label_style="text-base lg:text-xl lg:pb-2 pb-1" v-model="street"
            :label_name="$t('label_address')" label_for="input-street" input_id="input-street" input_name="street"
            input_type="text" :input_notes="true">
          <div class="flex justify-start items-center text-xs font-semibold text-gray-500">
            {{ $t('input_notes_address') }}
          </div>
          </Input>
          <!-- Radio Main Address -->
          <div class="flex items-center">
            <input id="input-main-address" type="radio" value="" name="main_address" v-model="main_address"
              :checked="main_address"
              class="w-4 h-4 lg:w-[18px] lg:h-[18px] cursor-pointer text-gray-600 bg-white border-gray-300 focus:ring-gray-600 focus:ring-2">
            <label for="input-main-address"
              class="ms-2 cursor-pointer text-sm lg:text-base font-semibold leading-5 text-gray-700">{{
        $t('label_main_address_select') }}</label>
          </div>
        </form>


      </div>

      <!-- Shipping Time -->
      <div v-if="step != 'select_payment'"
        class="flex flex-col lg:gap-[30px] gap-[25px] pt-[40px] pb-[25px] lg:py-[30px]">
        <!-- Title -->
        <h4
          class="flex items-center justify-start text-gray-500 lg:text-gray-900 font-bold leading-5 lg:text-xl text-base">
          {{ $t('shipping_time_title') }}
        </h4>
        <!-- Item -->
        <div class="bg-gray-100 py-[17px] px-6 flex justify-start ring-1 ring-gray-300 rounded-lg">
          <!-- Content -->
          <div class="flex flex-1 gap-4">
            <div class="w-7 h-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <rect y="0.277344" width="16" height="16" rx="8" fill="#9CA3AF" />
                <circle cx="8" cy="8.27734" r="3" fill="white" />
              </svg>
            </div>
            <div class="flex flex-col justify-start items-start gap-3 text-gray-500 leading-5">
              <h5 class="flex items-start justify-start font-extrabold text-sm lg:text-base">
                {{ $t('shipping_normal_type_title') }}
              </h5>
              <span class="font-normal text-sm">
                {{ $t('shipping_normal_type_details') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Submit Address Select -->
      <button v-if="step == 'select_address'" @click="skipAddress()"
        class="w-full mt-5 lg:mt-0 rounded-md shadow bg-gray-900 h-[50px] flex justify-center items-center text-white font-semibold text-base">
        {{ $t('continue_btn') }}
      </button>

      <!-- Submit Address Add | Edit -->
      <button v-if="step == 'add_address' || step == 'edit_address'" type="submit" @click="submitAddress()"
        :disabled="!phone || !full_name || !neighborhood || !street || !city"
        class="w-full rounded-md shadow bg-gray-900 h-[50px] flex justify-center items-center text-white font-bold text-base disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed">
        {{ $t('continue_btn') }}
      </button>
    </ClientOnly>
  </div>

</template>

<script setup>

const emits = defineEmits(['nextStep', 'saveAddress'])
const props = defineProps({
  step: {
    type: String,
    default: 'add_address'
  }
})
const { getRegions, getCities, defaultAddress, getAreaId, addAddress, editAddress } = useAddress()
const { getCustomer } = useCustomer()

const country = ref(1)
const region_array = ref(await getRegions(country.value))
const address_data = ref(await defaultAddress())
const city_array = ref([])
const region = ref('')
const city = ref('')
const neighborhood = ref('')
const street = ref('')
const main_address = ref(true)
const customer_data = await getCustomer()
const phone_country = ref('+966')
const full_name = ref(customer_data && customer_data.name ? customer_data.name : '')
const phone = ref(customer_data && customer_data.mobile ? customer_data.mobile : '')

onMounted(async () => {
  initFlowbite();
  if (address_data.value && address_data.value.region && props.step == 'add_address') {
    emits('nextStep', 'select_address')
  }
  if (address_data.value.region) {
    region.value = address_data.value.region
  } else if (region_array.value && region_array.value.length > 0) {
    region.value = region_array.value[0].name
  } else {
    region.value = ''
  }
  changeRegion(region.value)
  neighborhood.value = address_data.value && address_data.value.neighborhood ? address_data.value.neighborhood : ''
  street.value = address_data.value && address_data.value.street ? address_data.value.street : ''
})


async function changeRegion(region_name) {
  const region_id = getAreaId(region_name, region_array.value)
  if (region_id) {
    city_array.value = await getCities(region_id)
    if (city_array.value && city_array.value.length > 0) {
      if (address_data.value.city) {
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

function getPhoneCountry(code) {
  phone_country.value = code
}

async function submitAddress() {
  const city_id = getAreaId(city.value, city_array.value)
  const new_address = ref({})
  if (props.step == 'add_address') {//add
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
    address_data.value = await defaultAddress()
    emits('nextStep', 'select_payment')
    emits('saveAddress', address_data.value.id)
  }
}

function skipAddress() {
  emits('nextStep', 'select_payment')
  emits('saveAddress', address_data.value.id)
}

</script>