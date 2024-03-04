<template>
  <div :class="['w-full lg:w-[400px] min-w-[400px] h-auto px-[27px] py-[30px] flex-col gap-[20px] lg:gap-12',
    activeSection != 'account' ? 'hidden lg:flex' : 'flex']">
    <!-- Title -->
    <h2 class="text-black lg:text-3xl text-2xl font-bold leading-6">{{ $t('account_title') }}</h2>
    <!-- Welcome -->
    <div class="flex justify-start items-center gap-[5px] lg:gap-3 text-black text-xl lg:text-2xl">
      <span class="font-semibold lg:font-medium">
        {{ $t('account_text_welcome') }}
      </span>
      <span class="font-bold"> عبدالرحمن </span>
    </div>
    <!-- Sidebar Links -->
    <div class="flex flex-col lg:gap-7 gap-[22px] w-full py-[30px] bg-white rounded-md shadow-lg">
      <!-- Section -->
      <AccountSidebarBlock v-for="(item, index) in sidebar_array" :key="index" :title="item.title" :links="item.links"
        :divider="item.divider" />
    </div>
    <!-- Support Links -->
    <AccountSidebarSupport>{{ $t('cart_notes_support_title') }}</AccountSidebarSupport>
  </div>
</template>

<script setup>
const { activeSection } = useAccount()
const localePath = useLocalePath()
const { $i18n } = useNuxtApp();
const t = $i18n.t

const sidebar_array = [
  {
    title: '',
    divider: false,
    links: [
      {
        name: t('rewards_title'),
        key: 'rewards',
        link: localePath('/account/rewards'),
        icon: '/images/account/brand-icon.png'
      },
      {
        name: t('wallet_title'),
        key: 'wallet',
        link: localePath('/account/wallet'),
        icon: '/images/account/wallet-icon.png'
      }
    ]
  },
  {
    title: t('orders_title'),
    divider: true,
    links: [
      {
        name: t('orders_title'),
        key: 'orders',
        link: localePath('/account/order'),
        icon: '/images/account/order-icon.png'
      },
      {
        name: t('return_title'),
        key: 'return',
        link: localePath('/account/order'),
        icon: '/images/account/return-icon.png'
      }
    ]
  },
  {
    title: t('account_info_title'),
    divider: true,
    links: [
      {
        name: t('text_personal_info'),
        key: 'edit_personal_info',
        link: localePath('/account/info'),
        icon: '/images/account/user-icon.png'
      },
      {
        name: t('edit_password_title'),
        key: 'edit_password',
        link: localePath('/account/password'),
        icon: '/images/account/password-icon.png'
      },
      {
        name: t('address_directory_title'),
        key: 'address',
        link: localePath('/account/address'),
        icon: '/images/account/address-icon.png'
      }
    ]
  },
  {
    title: t('account_settings_title'),
    divider: true,
    links: [
      {
        name: t('subscriptions_title'),
        key: 'subscribe',
        link: localePath('/account/subscribe'),
        icon: '/images/account/reply-icon.png'
      },
      {
        name: t('logout_title'),
        key: 'logout',
        link: '',
        icon: '/images/account/logout-icon.png'
      },
      {
        name: t('delete_account_title'),
        key: 'delete_account',
        link: '',
        icon: '/images/account/delete-icon.png'
      }
    ]
  },
]
</script>