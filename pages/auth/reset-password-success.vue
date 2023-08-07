<template>
  <div>
    <Card :card_title="$t('reset_password_success_title')">

      <div class="mt-10 mb-9 px-2">
        <div class="font-sans-serif text-base font-normal leading-6 text-justify text-gray-700">
          {{ $t('reset_password_welcome') }}
          <br><br>
          {{ $t('reset_password_success') }}
        </div>
      </div>

      <Button type="button" @click.prevent="redirect" color="black" class="flex w-full justify-center"
        :outline="false">{{ $t('reset_password_redirect') }}</Button>
    </Card>
  </div>
</template>

<script setup>

definePageMeta({ layout: 'blank' })

const localePath = useLocalePath()
const email = ref('');
const isLoading = ref(false);
const router = useRouter();

function redirect() {
  router.push(localePath('/'));
}

</script>