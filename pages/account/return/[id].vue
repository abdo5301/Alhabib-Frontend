<template>
  <Title>{{ $t('return_title') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :current="$t('return_title')" />
    <AccountPageTitle>{{ $t('return_title') }}</AccountPageTitle>
    <div
      class="w-full relative flex flex-col gap-[30px] lg:gap-[50px] bg-white py-5 px-5 lg:py-[40px] lg:px-[30px] rounded-lg shadow">
      <ClientOnly>
        <div class="flex justify-center lg:justify-start gap-[50px] items-center font-semibold">
          <!-- ID -->
          <div class="flex flex-col gap-1 lg:gap-3 justify-start lg:items-start items-center">
            <span class="text-gray-900 text-xs lg:text-base font-semibold leading-[15px] lg:leading-[15px]">{{
              $t('text_order_number')
            }}</span>
            <div
              class="text-gray-500 flex gap-[1px] lg:gap-[5px] text-xs lg:text-sm justify-center items-center font-semibold leading-[15px] lg:leading-[15px]">
              <span>
                #{{ order_id }}
              </span>
              <span class="cursor-pointer" @click="copyText(order_id)" :title="$t('text_copy')">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M5 10H3.75C3.05964 10 2.5 9.44036 2.5 8.75V3.75C2.5 3.05964 3.05964 2.5 3.75 2.5H8.75C9.44036 2.5 10 3.05964 10 3.75V5M6.25 12.5H11.25C11.9404 12.5 12.5 11.9404 12.5 11.25V6.25C12.5 5.55964 11.9404 5 11.25 5H6.25C5.55965 5 5 5.55964 5 6.25V11.25C5 11.9404 5.55965 12.5 6.25 12.5Z"
                    stroke="#9CA3AF" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </div>
          <!-- Date -->
          <div v-if="order_data.created_at"
            class="flex flex-col gap-[5px] lg:gap-3 justify-start lg:items-start items-center">
            <span class="font-semibold text-xs lg:text-base text-gray-900 lg:leading-[15px] leading-[15px]">
              {{ $t('text_order_date') }}
            </span>
            <span dir="ltr"
              class="flex justify-center items-center text-xs gap-[5px] lg:text-sm lg:leading-[15px] leading-[15px] text-gray-500 font-semibold uppercase max-w-[150px]">
              {{ format(new Date(order_data.created_at), "dd MMM, yyyy") }}
            </span>
          </div>
        </div>
        <!-- Stepper Start -->
        <div class="w-full relative flex lg:flex-col lg:justify-start justify-center animate-flip-down animate-once">
          <!-- Step 1 -->
          <AccountStepperItem ref="stepper_item" :step="1" :currentStep="current_step" :totalSteps="total_steps"
            @set-current-step="setCurrent" :edit_step_btn="$t('read_btn')" :validStep="return_policy">
            <template #title>
              <span class="lg:block hidden">{{ $t('return_exchange_policy_title') }}</span>
              <span class="lg:hidden">{{ $t('return_exchange_policy_mobile_title') }}</span>
            </template>
            <template #subtitle>
              {{ $t('return_exchange_policy_subtitle') }}
            </template>
            <template #content>
              <div class="w-full flex flex-col gap-[10px] text-gray-600 lg:text-sm text-xs pb-5">
                <p class="font-semibold leading-5">
                  {{ $t('return_exchange_policy_notes_line1') }}<br>
                  {{ $t('return_exchange_policy_notes_line2') }}
                  <NuxtLink class="font-extrabold" :title="$t('return_exchange_policy_title')"
                    :to="localePath('/return')" target="_blank"> {{ $t('return_exchange_policy_title') }}
                  </NuxtLink>
                </p>
                <ul class="font-semibold leading-[30px] bg-gray-50 shadow rounded-lg p-[15px] lg:ps-6">
                  <li class="font-bold">
                    <h3>
                      {{ $t('return_exchange_policy_title') }}
                    </h3>
                  </li>
                  <li>- {{ $t('return_exchange_policy_condition1') }}</li>
                  <li>- {{ $t('return_exchange_policy_condition2') }}</li>
                  <li>- {{ $t('return_exchange_policy_condition3') }}</li>
                </ul>
                <ClientOnly>
                  <label for="return-policy"
                    class="lg:py-3 py-6 w-full max-w-max flex gap-2 lg:items-center items-start justify-start lg:font-medium font-semibold text-gray-900 cursor-pointer text-sm">
                    <input v-model="return_policy" id="return-policy" name="return-policy" type="checkbox"
                      :checked="return_policy"
                      class="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-transparent cursor-pointer" />
                    <span class="lg:font-medium font-semibold">
                      {{ $t('return_exchange_policy_checkbox') }}
                      <span class="lg:font-extrabold font-semibold">
                        {{ $t('return_exchange_policy_title') }}
                      </span>
                    </span>
                  </label>
                </ClientOnly>
              </div>
            </template>
          </AccountStepperItem>
          <!-- Step 2 -->
          <AccountStepperItem :step="2" :currentStep="current_step" :totalSteps="total_steps"
            @set-current-step="setCurrent" :valid-step="true">
            <template #title>
              {{ $t('return_products_select_title') }}
            </template>
            <template #subtitle>
              {{ $t('return_products_select_subtitle1') }}
              <!-- Selected Products Count  --> 2
              {{ $t('return_products_select_subtitle2') }}
            </template>
            <template #content>
              <div class="h-40 p-4 bg-red-400">
                Select Products Here
              </div>
            </template>
          </AccountStepperItem>
          <!-- Step 3 -->
          <AccountStepperItem :step="3" :currentStep="current_step" :totalSteps="total_steps"
            @set-current-step="setCurrent" :valid-step="true">
            <template #title>
              {{ $t('financial_recovery_title') }}
            </template>
            <template #subtitle>
              {{ $t('financial_recovery_subtitle') }}
            </template>
            <template #content>
              <div class="w-full flex flex-col lg:gap-6 gap-5 text-gray-600 lg:text-sm text-xs pb-5 pt-[10px]">
                <h3 class="lg:text-gray-800 text-gray-500 text-sm lg:text-base font-semibold leading-5">
                  {{ $t('return_financial_recovery_select') }}
                </h3>
                <InputRadio v-model="financial_recovery" input_id="input-financial-recovery-order-method"
                  input_name="financial_recovery" input_value="order_method" input_style="mt-1"
                  label_style="flex lg:text-gray-600 text-gray-700 lg:text-sm leading-6"
                  :input_checked="financial_recovery == 'order_method' ? true : false">
                  {{ $t('return_financial_recovery_order_method') }}
                </InputRadio>
                <InputRadio v-model="financial_recovery" input_id="input-financial-recovery-wallet-method"
                  input_name="financial_recovery" input_value="wallet_method" input_style="mt-1"
                  label_style="flex lg:text-gray-600 text-gray-700 lg:text-sm focus:lg:text-base leading-6"
                  :input_checked="financial_recovery == 'wallet_method' ? true : false">
                  {{ $t('return_financial_recovery_wallet_method') }}
                </InputRadio>
              </div>
            </template>
          </AccountStepperItem>
        </div>
        <!-- Stepper End -->
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { format } from "date-fns";
import { initFlowbite } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const route = useRoute()
const { t } = useI18n()
const { setActiveSection } = useAccount()
const { getOrder } = useOrder()
const order_id = Number(route.params.id)
const order_status = ref('')
const order_data = ref([])
const total_steps = 3
const current_step = ref(1)
//form reference
const return_policy = ref(false)
const financial_recovery = ref('wallet_method')
const stepper_item = ref()
const contentBox = ref()
const contentBoxContainer = ref()
function fixContentHeight(selected_step) {
  setTimeout(() => {
    contentBox.value = document.getElementById('step-content-' + selected_step)
    contentBoxContainer.value = document.getElementById('step-content-height-dev-' + selected_step)
    if (contentBoxContainer.value && contentBox.value &&
      typeof contentBox.value.offsetHeight !== "undefined") {
      //console.log(contentBox.value.offsetHeight);
      contentBoxContainer.value.style.height = contentBox.value.offsetHeight + 150 + 'px'
    }
  }, 100)
}
function setCurrent(step) {
  current_step.value = step
  fixContentHeight(step)
}


onMounted(async () => {
  initFlowbite()
  setActiveSection('return')
  if (!isNaN(order_id)) {
    order_data.value = await getOrder(order_id)
    order_status.value = order_data.value.state.id
    // console.log(order_data.value)
  }
})

</script>