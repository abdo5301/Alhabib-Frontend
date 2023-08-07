<template>
  <div>
     <Card :card_title="$t('login_title')">
        
          <div class="mb-6">
              <div class="mb-2 font-sans-serif text-base font-bold leading-6 text-center text-gray-500">{{ $t('login_card_title') }}</div>
              <div class="font-sans-serif text-base font-normal leading-6 text-center text-gray-500">{{ $t('login_card_description') }}</div>
          </div>
          
         <form class="space-y-6 pt-14" action="#" @submit.prevent="login">
          <div class="relative border rounded-md box-border border-gray-300 space-y-6 pt-2 pb-7 pr-4 pl-6">
           
            <NuxtLink :to="localePath('/auth/login-phone')" class="absolute bg-white flex px-4 py-[7px] top-0 rtl:right-0 ltr:left-0 transform -translate-x-0 -translate-y-10">
              <span class="text-gray-500 text-base leading-5 font-semibold">{{ $t('label_phone') }}</span>
            </NuxtLink> 
            <div class="absolute bg-white flex px-4 ltr:px-9 py-[9px] top-0 left-1/2 transform rtl:sm:-translate-x-[58px] ltr:-translate-x-[75px] -translate-y-[63px] -translate-x-[60%] border rounded-t-md border-gray-300 border-b-white ">
              <span class="text-gray-700 text-base leading-5 font-semibold">{{ $t('label_email') }}</span>
            </div>

            <Input v-model="email" :label_name="$t('label_email')" label_for="email" input_id="input-email" input_name="email" input_type="email" input_dir="ltr" input_placeholder="e.g.you@gmail.com"/>
            <Input v-model="password" :label_name="$t('label_password')" label_for="password" input_id="input-password" input_name="password" input_type="password" :input_password=true />

            <div class="flex items-center justify-between mt-1">
                <div class="flex items-center ">
                  <input v-model="remember" id="remember-me" name="remember-me" type="checkbox" checked="checked" class="h-4 w-4 rounded border-gray-900 text-gray-900 focus:ring-transparent" />
                  <label for="remember-me" class="ltr:ml-3 rtl:mr-2 block font-semibold text-sm leading-6 text-gray-900 cursor-pointer">{{ $t('label_remember') }}</label>
                </div>
              <div class="text-sm">
                <NuxtLink :to="localePath('/auth/reset-password')" class="font-bold text-xs text-gray-900 hover:text-gray-600">{{ $t('forget_password_link') }}</NuxtLink>
              </div>
            </div>
          </div>
            <Button type="submit" color="black" class="flex w-full justify-center" :outline="false" :disabled="!unDisabled">{{ $t('login_title') }}</Button>

            <div class="flex items-center mt-1">
              <div class="text-xs text-gray-900">
                <span>{{ $t('register_link_1') }}</span>&nbsp;
                <NuxtLink :to="localePath('/auth/register')" class="font-bold  hover:text-gray-600 inline-block"> 
                   {{ $t('register_link_2') }}
                  <ArrowRightIcon v-if="$lang.dir =='ltr'"  class="h-4 w-4 text-gray-900 inline-block" /> 
                 <ArrowLeftIcon v-else class="h-4 w-4 text-gray-900 inline-block" /> 
                 </NuxtLink>
              </div>
           </div>
          
        </form>
    
    </Card>
  </div>
</template>

<script setup>
import { ArrowLeftIcon,ArrowRightIcon } from '@heroicons/vue/20/solid'

definePageMeta({ layout: 'blank' })
const { $lang } = useNuxtApp()
const localePath = useLocalePath()
const email = ref('');
const password = ref('');
const remember = ref(true);

const isLoading = ref(false);

const unDisabled = computed(()=>{
  return  email.value.length > 0 && password.value.length > 0;
})

function login(){
  var formBody = {
    email: email.value,
    password: password.value,
    remember: remember.value
  }
  console.log(formBody);
}
  
</script>