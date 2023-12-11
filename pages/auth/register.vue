<template>
  <div>
    <Card :card_title="$t('register_title')">
        
      <div class="mb-10">
          <div class="mb-2 font-sans-serif text-base font-bold leading-6 text-center text-gray-500">{{ $t('register_card_title') }}</div>
      </div>

        <form class="space-y-6" action="#" @submit.prevent="createUser">
          <Input v-model="full_name" :label_name="$t('label_full_name')" label_for="full-name" input_id="input-full-name" input_name="full_name"/>
          <Input v-model="phone" :label_name="$t('label_phone')" label_for="phone" input_id="input-phone" input_name="phone" input_type="text"  input_dir="ltr" :input_phone_country="true" input_placeholder="534398859" @phone-country="getPhoneCountry"/>
          <Input v-model="email" :label_name="$t('label_email')" label_for="email" input_id="input-email" input_name="email" input_type="email" input_dir="ltr" input_placeholder="e.g.you@gmail.com"/>
          <Input v-model="password" :label_name="$t('label_password')" :label_notes="$t('label_password_notes')" label_for="password" input_id="input-password" input_name="password" input_type="password" :input_password="true" />

          <div class="flex items-center justify-between mt-1">
            <div class="text-sm">
              <NuxtLink :to="localePath('/auth/register')" class="font-bold text-xs text-gray-900 hover:text-gray-600">{{ $t('privacy_policy_notes') }}</NuxtLink>
            </div>
          </div>
          <div class="flex items-center flex-row-reverse  mt-1">
            <div class="text-xs text-gray-900">
              <span>{{ $t('login_link_1') }}</span>&nbsp;
              <NuxtLink :to="localePath('/auth/login-phone')" class="font-bold  hover:text-gray-600"> 
                {{ $t('login_link_2') }}
                </NuxtLink>
            </div>
          </div>
          <Button type="submit" color="black" class="flex w-full justify-center" :disabled ="!unDisabled">{{ $t('login_title') }}</Button>
        </form>

    </Card>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blank' })

const localePath = useLocalePath()

const full_name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const phone_country = ref('+966')

const isLoading = ref(false);

const unDisabled = computed(()=>{
  return full_name.value.length > 0 && email.value.length > 0 && phone.value.length > 0 && password.value.length > 0;
})

function getPhoneCountry(country_key){
  phone_country.value = country_key
}

function createUser(){
  var formBody = {
    name: full_name.value,
    phone_country: phone_country.value,
    phone: phone.value,
    email: email.value,
    password: password.value
  }
  console.log(formBody);
}
  
</script>