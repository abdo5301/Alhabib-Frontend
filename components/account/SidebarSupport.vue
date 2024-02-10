<template>
  <div class="lg:-mt-[26px] flex flex-col lg:gap-[18px] gap-[16px] w-full py-[25px] lg:px-[24px] px-[20px] bg-white rounded-md shadow-lg">
    <h4 class="text-gray-500 text-lg lg:text-xl font-semibold leading-4 mb-2 lg:mb-0">
      <slot />
    </h4>
    <AccountSidebarSupportItem item_type="contact" :item_link="localePath('/')">
      {{ $t('footer_help_menu_contact') }}
    </AccountSidebarSupportItem>
    <AccountSidebarSupportItem item_type="faq" :item_link="localePath('/')">
      {{ $t('footer_help_menu_faq') }}
    </AccountSidebarSupportItem>
    <AccountSidebarSupportItem item_type="return" :item_link="localePath('/')">
      {{ $t('footer_help_menu_return') }}
    </AccountSidebarSupportItem>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
</script>
