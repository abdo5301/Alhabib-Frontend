<template>
  <div>
    <Card :card_title="$t('reset_password_link_title')">
      <div class="mt-10 mb-9 px-2">
        <div class="font-sans-serif text-base font-normal leading-6 text-justify text-gray-700">
          {{ $t('reset_password_link_notes_1') }}
          <br><br>
          {{ $t('reset_password_link_notes_2') }}
        </div>
      </div>
      <Button type="button" @click.prevent="resendLink" color="black" class="flex w-full justify-center" :outline="false">
        {{ $t('reset_password_resend_link') }}
      </Button>
    </Card>
  </div>
</template>

<script setup>

definePageMeta({ layout: 'blank' })
const localePath = useLocalePath()
const router = useRouter();

function resendLink() {
  router.push(localePath('/auth/reset-password-form'));
}

</script>