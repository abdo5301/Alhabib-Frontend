<template>
  <Title>{{ $t('reset_password_title') }} | {{ website_name }}</Title>
  <div v-if="form_success" class="mt-12">
    <Card :card_title="$t('reset_password_link_title')">
      <div class="mt-10 mb-9 px-2">
        <Alert v-if="resend_success" color="green" :alert_icon="true" class="my-5">{{ resend_success }}</Alert>
        <Alert v-if="resend_error" color="red" :alert_icon="true" class="my-5">{{ resend_error }}</Alert>
        <div class="font-sans-serif text-base font-normal leading-6 text-justify text-gray-700">
          {{ $t('reset_password_link_notes_1') }}
          <br><br>
          {{ $t('reset_password_link_notes_2') }}
        </div>
      </div>
      <Button type="button" @click.prevent="forgotPasswordSubmit(true)" color="black" class="flex w-full justify-center"
        :outline="false" :disabled="isLoading">
        {{ $t('reset_password_resend_link') }}
      </Button>
    </Card>
  </div>
  <div v-else class="mt-12">
    <Card :card_title="$t('reset_password_card_title')" class="mt-12">
      <div class="mb-6">
        <div class="font-sans-serif text-base font-normal leading-6 text-center text-gray-700">
          {{ $t('reset_password_notes') }}
        </div>
      </div>
      <form class="space-y-6" action="#" @submit.prevent="forgotPasswordSubmit">
        <Input v-model="email" :label_name="$t('label_email')" label_for="email" input_id="input-email"
          input_name="email" input_type="email" input_dir="ltr" input_placeholder="e.g.you@gmail.com"
          :error_text="form_error" input_aria_describedby="input-email-error" />

        <Button type="submit" color="black" class="flex w-full justify-center" :outline="false"
          :disabled="!unDisabled || isLoading">
          {{ $t('reset_password_send_link') }}
        </Button>
      </form>
    </Card>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blank' })
const website_name = useState('website_name');
const localePath = useLocalePath()
const email = ref('');
const isLoading = ref(false);
const router = useRouter();
const form_success = ref(false)
const form_error = ref('')
const resend_success = ref('')
const resend_error = ref('')
const unDisabled = computed(() => {
  return email.value.length > 0;
})


async function forgotPasswordSubmit(resend = false) {
  isLoading.value = true
  form_error.value = ''
  resend_error.value = ''
  resend_success.value = ''
  const submit_data = await useAuth().forgotPassword(email.value)
  if (submit_data.status && submit_data.status == true) {
    form_success.value = true
    if (resend == true) {
      resend_success.value = submit_data.message
    }
  } else {
    if (resend == true) {
      resend_error.value = submit_data.message
    } else {
      form_error.value = submit_data.message
    }
  }
  isLoading.value = false
}

</script>