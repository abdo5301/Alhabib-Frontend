<template>
  <div>
     <Card :card_title="$t('login_title')">
        
          <div class="mb-5 text-center leading-6 font-sans-serif">
              <div class="text-base font-normal  text-gray-500">{{ $t('phone_confirm_title') }}</div>
              <div class="font-bold text-lg pt-5 pb-5 text-gray-900" dir="ltr">{{ phone }}</div>
              <div class="font-normal text-base text-gray-900">
              <span class="px-1">{{ $t('phone_confirm_edit_phone') }}</span>
              <NuxtLink :to="localPath('/auth/login-phone')" class="underline decoration-1">{{ $t('phone_confirm_edit_phone_link') }}</NuxtLink>
              </div>
          </div>
          
         <form class="space-y-6 pt-2" action="#" @submit.prevent="login">
            
           <Alert color="red" v-if="error_text" :alert_icon="true">{{ error_text }}</Alert> 

           <Input  :error_text="error_text" :input_phone_otp="true" v-model="code" :label_name="$t('label_otp')" label_for="code" input_id="input-code" input_name="code" input_dir="ltr"/>
          
           <Button type="submit" color="black" class="flex w-full justify-center" :outline="false" :disabled="!unDisabled">{{ $t('login_title') }}</Button>
          
        </form>
    
    </Card>
  </div>
</template>

<script setup>
//import { ArrowLeftIcon,ArrowRightIcon } from '@heroicons/vue/20/solid'

definePageMeta({ layout: 'blank' })

const phone = ref('+966534398859')
const code = ref('');
const { t } = useI18n()
const localPath = useLocalePath()
const isLoading = ref(false);

const unDisabled = computed(()=>{
  return  code.value.length > 0;
})

const error_text = computed(()=>{
  if(code.value.length > 0)
  return t('phone_confirm_error');
})

function login(){
  var formBody = {
    code: code.value,   
  }
  console.log(formBody);
}
  
</script>