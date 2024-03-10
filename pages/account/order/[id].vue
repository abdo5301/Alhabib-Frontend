<template>
  <Title>{{ $t('order_details_title') }} | {{ website_name }}</Title>
  <div class="w-full px-[27px] py-[30px] lg:p-0 flex flex-col gap-6 lg:gap-[30px]">
    <AccountBreadcrumb :pages="breadcrumbs_pages" :current="$t('order_details_title')" />
    <AccountPageTitle>{{ $t('order_details_title') }}</AccountPageTitle>
    <div class="w-full flex flex-col gap-[30px] bg-white py-5 px-5 lg:px-[30px] rounded-lg shadow">
      <!-- Data Loader -->
      <div v-if="data_loader" class="flex items-center justify-center h-[90px] max-h-screen w-full mx-auto">
        <InlineLoader loader_style="mx-auto flex items-center justify-center w-auto h-[90px]" />
      </div>
      <div :key="data_div_key" v-show="!data_loader" class="w-full flex flex-col gap-[30px]">
        <ClientOnly>
          <!-- Order Data -->
          <div class="w-full flex justify-between">
            <div class="flex-1 flex justify-start lg:items-start gap-5 lg:gap-[50px]">
              <!-- ID -->
              <div class="flex flex-col gap-2 lg:gap-3 justify-start items-start">
                <span class="text-gray-900 text-xs lg:text-base font-semibold leading-[15px] lg:leading-[15px]">
                  {{ $t('text_order_number') }}
                </span>
                <div
                  class="text-gray-900 flex gap-[5px] text-xs lg:text-base justify-center items-center font-bold leading-[15px] lg:leading-[15px]">
                  <span>
                    #{{ order_data.id }}
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
              <div v-if="order_data.created_at" class="flex flex-col gap-2 lg:gap-3 justify-start items-start">
                <span class="font-semibold text-xs lg:text-base text-gray-900 leading-[15px] lg:leading-[15px]">
                  {{ $t('text_order_date') }}
                </span>
                <span dir="ltr"
                  class="flex justify-center items-center text-xs gap-[5px] lg:text-base lg:leading-[15px] leading-[15px] text-gray-500 font-semibold uppercase max-w-[150px]">
                  {{ format(new Date(order_data.created_at), "dd MMM, yyyy") }}
                </span>
              </div>
            </div>
            <div class="flex justify-center items-center">
              <NuxtLink :to="localePath('/')" target="_blank"
                class="w-[120px] h-[30px] lg:w-[165px] lg:h-[42px] flex items-center justify-center gap-2 ring-1 ring-gray-300 shadow-sm rounded-md bg-white">
                <span class="text-gray-700 text-xs lg:text-sm font-semibold leading-5">{{ $t('text_tax_invoice')
                  }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="hidden lg:block" width="20" height="20"
                  viewBox="0 0 20 20" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.5 4V7H3.5C2.39543 7 1.5 7.89543 1.5 9V12C1.5 13.1046 2.39543 14 3.5 14H4.5V16C4.5 17.1046 5.39543 18 6.5 18H12.5C13.6046 18 14.5 17.1046 14.5 16V14H15.5C16.6046 14 17.5 13.1046 17.5 12V9C17.5 7.89543 16.6046 7 15.5 7H14.5V4C14.5 2.89543 13.6046 2 12.5 2H6.5C5.39543 2 4.5 2.89543 4.5 4ZM12.5 4H6.5V7H12.5V4ZM12.5 12H6.5V16H12.5V12Z"
                    fill="#6B7280" />
                </svg>
              </NuxtLink>
            </div>
          </div>
          <!-- Divider -->
          <div class="flex items-center justify-center w-full">
            <div class="border-b border-b-gray-200 w-full"></div>
          </div>
          <div class="py-1">
            <h4 class="text-gray-900 font-bold text-base lg:text-lg leading-5">{{ $t('order_status_title') }}</h4>
          </div>
          <!-- Completed Notes -->
          <div v-if="completed_status.includes(order_status)"
            class="flex justify-start items-center gap-[5px] text-gray-500 font-semibold text-xs lg:text-sm leading-[15px]">
            <!-- Canceled -->
            <div v-if="order_status == 'canceled'" class="flex justify-start items-center gap-[5px]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 lg:w-[26px] lg:h-[26px]" viewBox="0 0 26 26"
                fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M13 23.457C18.5228 23.457 23 18.9799 23 13.457C23 7.93418 18.5228 3.45703 13 3.45703C7.47715 3.45703 3 7.93418 3 13.457C3 18.9799 7.47715 23.457 13 23.457ZM11.3839 10.0731C10.8957 9.58499 10.1043 9.58499 9.61612 10.0731C9.12796 10.5613 9.12796 11.3528 9.61612 11.8409L11.2322 13.457L9.61612 15.0731C9.12796 15.5613 9.12796 16.3528 9.61612 16.8409C10.1043 17.3291 10.8957 17.3291 11.3839 16.8409L13 15.2248L14.6161 16.8409C15.1043 17.3291 15.8957 17.3291 16.3839 16.8409C16.872 16.3528 16.872 15.5613 16.3839 15.0731L14.7678 13.457L16.3839 11.8409C16.872 11.3528 16.872 10.5613 16.3839 10.0731C15.8957 9.58499 15.1043 9.58499 14.6161 10.0731L13 11.6893L11.3839 10.0731Z"
                  fill="#F87171" />
              </svg>
              <span>
                {{ $t('order_cancel_date_notes') }}
              </span>
              <span v-if="order_data.updated_at" dir="ltr" class="font-normal uppercase">
                {{ format(new Date(order_data.updated_at), "dd MMM, yyyy") }}
              </span>
            </div>
            <!-- Complete -->
            <div v-else-if="order_status == 'completed' || order_status == 'branch_order'"
              class="flex justify-start items-center gap-[5px]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 lg:w-[26px] lg:h-[26px]" viewBox="0 0 26 26"
                fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M13 23.457C18.5228 23.457 23 18.9799 23 13.457C23 7.93418 18.5228 3.45703 13 3.45703C7.47715 3.45703 3 7.93418 3 13.457C3 18.9799 7.47715 23.457 13 23.457ZM17.6339 11.8409C18.122 11.3528 18.122 10.5613 17.6339 10.0731C17.1457 9.58499 16.3543 9.58499 15.8661 10.0731L11.75 14.1893L10.1339 12.5731C9.64573 12.085 8.85427 12.085 8.36611 12.5731C7.87796 13.0613 7.87796 13.8528 8.36611 14.3409L10.8661 16.8409C11.3543 17.3291 12.1457 17.3291 12.6339 16.8409L17.6339 11.8409Z"
                  fill="#10B981" />
              </svg>
              <span>
                {{ $t('order_complete_date_notes') }}
              </span>
              <span v-if="order_data.updated_at" dir="ltr" class="font-normal uppercase">
                {{ format(new Date(order_data.updated_at), "dd MMM, yyyy") }}
              </span>
            </div>
            <span v-else>{{ order_data.state.name }}</span>
          </div>
          <!-- Pending Progress bar -->
          <div v-if="pending_status.includes(order_status) || order_status == 'shipped'"
            class="w-full flex flex-col justify-start gap-3">
            <div class="w-full bg-gray-200 rounded-[10px] h-[11px]">
              <div v-if="pending_status.includes(order_status)" class="bg-green-500 h-2.5 rounded-[10px]"
                style="width: 35%">
              </div>
              <div v-if="order_status == 'shipped'" class="bg-green-500 h-2.5 rounded-[10px]" style="width: 60%"></div>
            </div>
            <div class="w-full flex justify-between items-center">
              <span class="text-green-600 text-xs lg:text-base font-bold leading-4">{{ $t('order_status_pending')
                }}</span>
              <span
                :class="['text-xs lg:text-base leading-4', order_status == 'shipped' ? 'text-green-600 font-bold' : 'text-gray-500 font-semibold']">{{
    $t('order_status_shipped') }}</span>
              <span class="text-gray-500 text-xs lg:text-base font-semibold leading-4">{{ $t('order_status_complete')
                }}</span>
            </div>
          </div>
          <!-- Shipping Data -->
          <div v-if="(order_status == 'shipped' || order_status == 'ready_to_ship') && order_data.tracking_url"
            class="w-full flex justify-center items-center gap-[50px]">
            <!-- Shipping Company -->
            <div class="flex flex-col justify-center items-center gap-[5px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <path
                  d="M10.8333 13.3874V5.05404C10.8333 4.5938 10.4602 4.2207 10 4.2207H3.33333C2.8731 4.2207 2.5 4.5938 2.5 5.05404V13.3874C2.5 13.8476 2.8731 14.2207 3.33333 14.2207H4.16667M10.8333 13.3874C10.8333 13.8476 10.4602 14.2207 10 14.2207H7.5M10.8333 13.3874L10.8333 6.7207C10.8333 6.26047 11.2064 5.88737 11.6667 5.88737H13.8215C14.0425 5.88737 14.2545 5.97517 14.4107 6.13145L17.2559 8.97663C17.4122 9.13291 17.5 9.34487 17.5 9.56588V13.3874C17.5 13.8476 17.1269 14.2207 16.6667 14.2207H15.8333M10.8333 13.3874C10.8333 13.8476 11.2064 14.2207 11.6667 14.2207H12.5M4.16667 14.2207C4.16667 15.1412 4.91286 15.8874 5.83333 15.8874C6.75381 15.8874 7.5 15.1412 7.5 14.2207M4.16667 14.2207C4.16667 13.3002 4.91286 12.554 5.83333 12.554C6.75381 12.554 7.5 13.3002 7.5 14.2207M12.5 14.2207C12.5 15.1412 13.2462 15.8874 14.1667 15.8874C15.0871 15.8874 15.8333 15.1412 15.8333 14.2207M12.5 14.2207C12.5 13.3002 13.2462 12.554 14.1667 12.554C15.0871 12.554 15.8333 13.3002 15.8333 14.2207"
                  stroke="#9CA3AF" stroke-width="2" />
              </svg>
              <span class="text-gray-400 text-xs lg:text-sm font-semibold uppercase leading-4">{{
    $t('shipping_company_title')
  }}</span>
              <div class="h-6 flex flex-col justify-center text-gray-900 text-xs font-semibold uppercase leading-4">{{
      order_data.shipping_method_name }}</div>
            </div>
            <!-- Shipping Number -->
            <div class="flex flex-col justify-center items-center gap-[5px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <path
                  d="M16.6666 5.88802L9.99998 2.55469L3.33331 5.88802M16.6666 5.88802L9.99998 9.22135M16.6666 5.88802V14.2214L9.99998 17.5547M9.99998 9.22135L3.33331 5.88802M9.99998 9.22135V17.5547M3.33331 5.88802V14.2214L9.99998 17.5547"
                  stroke="#9CA3AF" stroke-width="2" stroke-linejoin="round" />
              </svg>
              <span class="text-gray-400 text-xs lg:text-sm font-semibold uppercase leading-4">{{
    $t('shipping_number_title')
  }}</span>
              <span class="h-6 flex flex-col justify-center text-gray-900 text-xs font-semibold uppercase leading-4">#{{
      order_data.shipment_label_id }}</span>
            </div>
            <!-- Shipping Contact -->
            <div class="flex flex-col justify-center items-center gap-[5px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path
                  d="M3 4.22135C3 3.30088 3.74619 2.55469 4.66667 2.55469H7.39937C7.75806 2.55469 8.07651 2.78421 8.18994 3.1245L9.43811 6.86903C9.56926 7.26246 9.39115 7.69245 9.02022 7.87791L7.13917 8.81843C8.05771 10.8557 9.69898 12.497 11.7363 13.4155L12.6768 11.5345C12.8622 11.1635 13.2922 10.9854 13.6857 11.1166L17.4302 12.3648C17.7705 12.4782 18 12.7966 18 13.1553V15.888C18 16.8085 17.2538 17.5547 16.3333 17.5547H15.5C8.59644 17.5547 3 11.9582 3 5.05469V4.22135Z"
                  stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span class="text-gray-400 text-xs lg:text-sm font-semibold uppercase leading-4">{{
    $t('shipping_contact_title')
  }}</span>
              <span dir="ltr"
                class="h-6 flex flex-col justify-center text-gray-900 text-xs font-semibold uppercase leading-4">{{
      order_data.contact_number }}</span>
            </div>
          </div>
          <!-- Shipping Duration -->
          <span v-if="pending_status.includes(order_status) || order_status == 'shipped'"
            class="w-full flex justify-center items-center text-gray-500 text-xs lg:text-base font-semibold leading-5">
            {{ $t('order_shipping_time_notes') }}
          </span>
          <!-- Shipping Tracking -->
          <div v-if="(order_status == 'shipped' || order_status == 'ready_to_ship') && order_data.tracking_url"
            class="w-full flex justify-center items-center">
            <NuxtLink :to="order_data.tracking_url" target="_blank"
              class="w-[135px] h-[38px] flex justify-center items-center gap-2 rounded-md bg-black shadow-sm">
              <span class="text-white text-xs lg:text-base font-semibold leading-4">{{ $t('text_track') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                <path
                  d="M11 3.05469C10.4477 3.05469 10 3.5024 10 4.05469C10 4.60697 10.4477 5.05469 11 5.05469H13.5858L7.29289 11.3476C6.90237 11.7381 6.90237 12.3713 7.29289 12.7618C7.68342 13.1523 8.31658 13.1523 8.70711 12.7618L15 6.4689V9.05469C15 9.60697 15.4477 10.0547 16 10.0547C16.5523 10.0547 17 9.60697 17 9.05469V4.05469C17 3.5024 16.5523 3.05469 16 3.05469H11Z"
                  fill="white" />
                <path
                  d="M5 5.05469C3.89543 5.05469 3 5.95012 3 7.05469V15.0547C3 16.1593 3.89543 17.0547 5 17.0547H13C14.1046 17.0547 15 16.1593 15 15.0547V12.0547C15 11.5024 14.5523 11.0547 14 11.0547C13.4477 11.0547 13 11.5024 13 12.0547V15.0547H5V7.05469L8 7.05469C8.55228 7.05469 9 6.60697 9 6.05469C9 5.5024 8.55228 5.05469 8 5.05469H5Z"
                  fill="white" />
              </svg>
            </NuxtLink>
          </div>
          <!-- Divider -->
          <div class="flex items-center justify-center w-full">
            <div class="border-b border-b-gray-200 w-full"></div>
          </div>
          <!-- WhatsApp -->
          <div v-if="pending_status.includes(order_status) || order_status == 'shipped'"
            class="flex flex-col justify-start gap-5">
            <div class="flex flex-col justify-start gap-2">
              <div class="flex justify-start items-center gap-[15px]">
                <h3 class="text-gray-900 font-extrabold lg:font-bold text-sm lg:text-lg leading-5">{{
    $t('whatsapp_title')
  }}
                </h3>
                <img src="/images/icons/phone-gray.png" class="w-9 h-9" alt="Whatsapp">
              </div>
              <div class="h-[38px] flex justify-start items-center">
                <span class="text-gray-600 text-sm lg:text-base font-semibold leading-5">
                  {{ $t('account_whatsapp_notes') }}
                </span>
              </div>
            </div>
            <InputRadio v-model="whatsapp_sub" input_id="input-account-whatsapp-subscribe"
              label_style="lg:text-sm flex items-center" input_name="account_whatsapp_subscribe" input_value="yes"
              :input_checked="whatsapp_sub == 'yes' ? true : false" @call-back="console.log(whatsapp_sub)">
              {{ $t('text_subscription') }}
            </InputRadio>
            <InputRadio v-model="whatsapp_sub" input_id="input-account-whatsapp-unsubscribe"
              label_style="lg:text-sm flex items-center" @call-back="console.log(whatsapp_sub)"
              input_name="account_whatsapp_subscribe" input_value="no"
              :input_checked="whatsapp_sub == 'no' ? true : false">
              {{ $t('text_unsubscribe') }}
            </InputRadio>
          </div>
          <!-- Divider -->
          <div v-if="pending_status.includes(order_status)" class="flex items-center justify-center w-full">
            <div class="border-b border-b-gray-200 w-full"></div>
          </div>
          <!-- Shipping Address -->
          <ul class="flex justify-start flex-col gap-7 py-2 text-gray-600 text-base font-semibold leading-5">
            <li class="text-gray-900 text-base lg:text-lg font-bold leading-5">{{ $t('shipping_address_title') }}</li>
            <li>{{ order_data.customer_name }}</li>
            <li>{{ order_data.customer_country }}</li>
            <li>{{ order_data.customer_region + '، ' }} {{ order_data.customer_city }}</li>
            <li>{{ order_data.customer_neighborhood + '، ' }} {{ order_data.customer_street }}</li>
          </ul>
          <!-- Divider -->
          <div class="flex items-center justify-center w-full">
            <div class="border-b border-b-gray-200 w-full"></div>
          </div>
          <!-- Payment Method -->
          <ul v-if="order_data.payment_gateway && order_data.payment_gateway.title"
            class="flex justify-start flex-col gap-7 py-2 text-gray-600 text-base font-semibold leading-5">
            <li class="text-gray-900 text-base lg:text-lg font-bold leading-5">{{ $t('payment_method_title') }}</li>
            <li>{{ order_data.payment_gateway.title }}</li>
          </ul>
          <!-- Divider -->
          <div class="flex items-center justify-center w-full">
            <div class="border-b border-b-gray-200 w-full"></div>
          </div>
          <!-- Products -->
          <div v-if="order_data && order_data.order_items && order_data.order_items.length > 0"
            class="flex justify-start flex-col gap-[30px] no-scrollbar lg:max-h-[600px] overflow-hidden hover:overflow-y-auto">
            <div class="flex flex-col justify-start">
              <h4 class="text-gray-900 text-base lg:text-lg font-bold leading-5 pt-2 pb-5">
                {{ $t('products_title') }}
              </h4>
              <span class="text-gray-500 text-base font-normal leading-5">
                {{ $t('label_quantity') }} &nbsp;{{ order_quantity }}
              </span>
            </div>
            <div class="flex justify-start flex-col gap-[30px]">
              <AccountOrderProductItem v-for="(item, index) in order_data.order_items" :key="index" :product="item" />
            </div>
            <!-- Divider -->
            <div class="flex items-center justify-center w-full">
              <div class="border-b border-b-gray-200 w-full"></div>
            </div>
          </div>
          <!-- Totals -->
          <div class="flex flex-col justify-start">
            <h4 class="text-gray-900 text-base font-bold leading-5 pt-2 pb-5">
              {{ $t('order_total_title') }}
            </h4>
            <CartPageTotals style_type="checkout_success"
              :wallet_credit="order_data.wallet_credit ? order_data.wallet_credit : 0" :subtotal="order_data.subtotal"
              :shipping="order_data.shipping" :tax="order_data.tax" :total="order_data.total"
              :totals="order_data.totals" />
          </div>
          <!-- Divider -->
          <div
            v-if="order_status == 'pending' || order_status == 'shipped' || order_status == 'ready_to_ship' || order_status == 'completed' || order_status == 'branch_order'"
            class="flex items-center justify-center w-full">
            <div class="border-b border-b-gray-200 w-full"></div>
          </div>
          <!-- Actions -->
          <div
            v-if="order_status == 'pending' || order_status == 'shipped' || order_status == 'ready_to_ship' || order_status == 'completed' || order_status == 'branch_order'"
            class="flex flex-row justify-center items-center gap-3 lg:gap-[30px]">
            <!-- Cancel Order -->
            <button type="button" v-if="order_status == 'pending'" @click="cancel_confirm_modal.show()"
              class="w-[100px] h-[28px] lg:w-[204px] lg:h-[42px] flex items-center justify-center ring-1 ring-gray-200 shadow-sm rounded-md bg-white">
              <span class="text-gray-700 lg:text-base text-[10px] font-semibold leading-4 lg:leading-4">{{
    $t('cancel_order_btn') }}</span>
            </button>
            <!-- Return Products -->
            <NuxtLink :to="localePath('/account/return/' + order_data.id)"
              v-if="order_status == 'completed' || order_status == 'branch_order'"
              class="w-[100px] h-[28px] lg:w-[204px] lg:h-[42px] flex items-center justify-center gap-2 ring-1 ring-gray-200 shadow-sm rounded-md bg-white">
              <img src="/images/icons/return.png" class="w-4 h-4 lg:w-5 lg:h-5" alt="return product">
              <span class="text-gray-700 lg:text-base text-[10px] font-semibold leading-4 lg:leading-4">{{
    $t('order_return_btn') }}</span>
            </NuxtLink>
            <!-- Review Products -->
            <NuxtLink :to="localePath('/account/order/review/' + order_data.id)" target="_blank"
              v-if="order_status == 'completed' || order_status == 'branch_order'"
              class="w-[100px] h-[28px] lg:w-[204px] lg:h-[42px] flex items-center justify-center gap-2 ring-1 ring-gray-200 shadow-sm rounded-md bg-white">
              <img src="/images/icons/edit.png" class="w-4 h-4 lg:w-5 lg:h-5" alt="return product">
              <span class="text-gray-700 lg:text-base text-[10px] font-semibold leading-4 lg:leading-4">{{
    $t('order_product_evaluation_btn') }}</span>
            </NuxtLink>
            <!-- Shipping Url -->
            <NuxtLink :to="order_data.tracking_url" target="_blank"
              v-if="(order_status == 'shipped' || order_status == 'ready_to_ship') && order_data.tracking_url"
              class="w-[100px] h-[28px] lg:w-[204px] lg:h-[42px] flex justify-center items-center gap-2 rounded-md bg-black shadow-sm">
              <span class="text-white text-[11px] lg:text-sm font-semibold leading-4 lg:leading-5">{{ $t('text_track')
                }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-5 lg:h-5 w-4 h-4" viewBox="0 0 20 21" fill="none">
                <path
                  d="M11 3.05469C10.4477 3.05469 10 3.5024 10 4.05469C10 4.60697 10.4477 5.05469 11 5.05469H13.5858L7.29289 11.3476C6.90237 11.7381 6.90237 12.3713 7.29289 12.7618C7.68342 13.1523 8.31658 13.1523 8.70711 12.7618L15 6.4689V9.05469C15 9.60697 15.4477 10.0547 16 10.0547C16.5523 10.0547 17 9.60697 17 9.05469V4.05469C17 3.5024 16.5523 3.05469 16 3.05469H11Z"
                  fill="white" />
                <path
                  d="M5 5.05469C3.89543 5.05469 3 5.95012 3 7.05469V15.0547C3 16.1593 3.89543 17.0547 5 17.0547H13C14.1046 17.0547 15 16.1593 15 15.0547V12.0547C15 11.5024 14.5523 11.0547 14 11.0547C13.4477 11.0547 13 11.5024 13 12.0547V15.0547H5V7.05469L8 7.05469C8.55228 7.05469 9 6.60697 9 6.05469C9 5.5024 8.55228 5.05469 8 5.05469H5Z"
                  fill="white" />
              </svg>
            </NuxtLink>
          </div>
        </ClientOnly>
      </div>
      <!-- Cancel Confirm Popup -->
      <div id="cancel-order-confirm-popup" tabindex="-1" aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div
          class="relative p-6 w-full max-w-[384px] max-h-full flex flex-col gap-5 items-center justify-center bg-white rounded-lg shadow-xl">
          <!-- icon -->
          <img class="w-12 h-12px" src="/images/icons/true-green.png" alt="success">
          <!-- title -->
          <h3 class="text-gray-900 font-medium text-lg leading-9">
            {{ $t('popup_cancel_order_confirm') }}
          </h3>
          <!-- Confirm Buttons -->
          <div class="pt-1 flex items-center justify-center gap-[18px]">
            <!-- Accept Confirm -->
            <button type="button" @click="cancelAction"
              class="w-[150px] h-[38px] text-white bg-gray-900 ring-1 ring-gray-300 rounded-md text-sm font-semibold leading-5 flex items-center justify-center shadow-sm hover:text-gray-700 hover:bg-gray-300">
              {{ $t('cancel_order_btn') }}
            </button>
            <!-- Cancel -->
            <button type="button" @click="cancel_confirm_modal.hide()"
              class="w-[150px] h-[38px] text-gray-700 bg-white ring-1 ring-gray-300 rounded-md text-sm font-semibold leading-5 flex items-center justify-center shadow-sm hover:text-white hover:bg-gray-500">
              {{ $t('popup_back_title') }}
            </button>
          </div>
        </div>
      </div>
      <!-- Cancel Success Popup -->
      <div id="cancel-order-success-popup" tabindex="-1" aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div
          class="relative p-6 w-full max-w-[384px] max-h-full flex flex-col gap-5 items-center justify-center bg-white rounded-lg shadow-xl">
          <!-- icon -->
          <img class="w-12 h-12px" src="/images/icons/true-green.png" alt="success">
          <!-- title -->
          <h3 class="text-gray-900 font-medium text-lg leading-9">
            {{ $t('popup_cancel_order_success') }}
          </h3>
          <!-- Notes -->
          <div
            class="flex justify-center items-center text-center text-gray-500 text-[15px] font-normal leading-8 -mt-2 -mx-1">
            {{ $t('popup_cancel_order_success_notes') }}
          </div>
        </div>
      </div>

      <!-- End Data Container -->
    </div>
  </div>
</template>

<script setup>
import { format } from "date-fns";
import { initFlowbite, Modal } from 'flowbite'
definePageMeta({ layout: 'account', middleware: ['auth'] })
const website_name = useState('website_name')
const localePath = useLocalePath()
const { setActiveSection } = useAccount()
const route = useRoute()
const { t } = useI18n()
const { getOrder } = useOrder()
const order_status = ref('')
const order_quantity = ref(0)
const whatsapp_sub = ref('no')
const order_id = ref(0)
const order_data = ref([])
const pending_status = ["payment_verification", "pending", "ready_to_ship", "review", "branch_review"]
const completed_status = ["completed", "branch_order", "refunded", "canceled"]
const data_loader = ref(true)
const cancel_confirm_modal = ref('')
const cancel_success_modal = ref('')
const data_div_key = ref(838)
onMounted(async () => {
  initFlowbite()
  setActiveSection('orders')
  if (!isNaN(route.params.id)) {
    order_id.value = Number(route.params.id)
  } else {
    navigateTo(localePath('/account/order'))
  }
  order_data.value = await getOrder(order_id.value)
  if (!order_data.value.state) {
    navigateTo(localePath('/account/order'))
  }
  order_status.value = order_data.value.state.id
  if (order_data.value.order_items && order_data.value.order_items.length) {
    order_data.value.order_items.forEach((value, index) => {
      order_quantity.value += parseInt(value.quantity);
    });
  }

  data_loader.value = false

  // set cancel order confirm popup
  const cancel_confirm_popup = document.getElementById('cancel-order-confirm-popup');

  // options 
  const cancel_confirm_popup_options = {
    placement: 'center',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
  };
  cancel_confirm_modal.value = new Modal(cancel_confirm_popup, cancel_confirm_popup_options);

  // set cancel order success popup
  const cancel_success_popup = document.getElementById('cancel-order-success-popup');

  // options
  const cancel_success_popup_options = {
    placement: 'center',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
  };
  cancel_success_modal.value = new Modal(cancel_success_popup, cancel_success_popup_options);
})

const breadcrumbs_pages = [
  {
    name: t('orders_title'),
    link: localePath('/account/order')
  }
]

async function cancelAction() {
  cancel_confirm_modal.value.hide()
  //Action here
  const cancel_response = await useOrder().cancelOrder(order_data.value.id)
  if (cancel_response == true) {//success
    cancel_success_modal.value.show()
    data_loader.value = true
    order_data.value = await getOrder(order_id.value)
    order_status.value = order_data.value.state.id
    order_data.value.order_items.forEach((value, index) => {
      order_quantity.value += parseInt(value.quantity);
    });
    data_div_key.value += 3
    data_loader.value = false
  } else {
    alert("Server Error!..Please Try Again Later.")
  }
}

</script>