<template>
  <div>
     <Card :card_title="$t('login_title')">
        
          <div class="mb-6">
              <div class="mb-2 font-sans-serif text-base font-bold leading-6 text-center text-gray-500">{{ $t('login_card_title') }}</div>
              <div class="font-sans-serif text-base font-normal leading-6 text-center text-gray-500">{{ $t('login_card_description') }}</div>
          </div>
          
         <form class="space-y-6 pt-14" action="#" @submit.prevent="login">
          <div class="relative border rounded-b-md rtl:rounded-l-md ltr:rounded-r-md border-gray-300 space-y-6 pt-2 pb-7 rtl:pr-4 rtl:pl-6 ltr:pl-4 ltr:pr-6">
           
            <div class="absolute bg-white flex px-7 py-[9px] top-0 rtl:right-[-1px] ltr:left-[-0.5px]  transform -translate-x-0 -translate-y-10  border rounded-t-md border-gray-300 border-b-white">
              <span class="text-gray-700 text-base leading-5 font-semibold">{{ $t('label_phone') }}</span>
            </div>
            <NuxtLink :to="localePath('/auth/login-email')" class="absolute bg-white flex px-4 py-[7px] top-0 left-[45%] transform sm:-translate-x-[58px] ltr:lg:-translate-x-[30px] ltr:-translate-x-[15px] -translate-y-[63px] -translate-x-[60%]">
              <span class="text-gray-500 text-base leading-5 font-semibold">{{ $t('label_email') }}</span>
            </NuxtLink> 
            
            <Input v-model="phone" :label_name="$t('label_phone')" label_for="phone" input_id="input-phone" input_name="phone" input_type="text"  input_dir="ltr" :input_phone_country="true" input_placeholder="534398859"/>
         
            <div class="flex items-center justify-between mt-1">
                <div class="flex items-center ">
                  <input v-model="remember" id="remember-me" name="remember-me" type="checkbox" checked="checked" class="h-4 w-4 rounded border-gray-900 text-gray-900 focus:ring-transparent" />
                  <label for="remember-me" class="ltr:ml-3 rtl:mr-2 block font-semibold text-sm leading-6 text-gray-900 cursor-pointer">{{ $t('label_remember') }}</label>
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
const phone = ref('');
const remember = ref(true);

const isLoading = ref(false);
const router = useRouter();


const unDisabled = computed(()=>{
  return  phone.value.length > 0;
})

function login(){
  var formBody = {
    phone: phone.value,
    remember: remember.value
  }
  console.log(formBody);
  router.push(localePath('/auth/phone-confirm'));
  //window.location.pathname = '/auth/phone-confirm';
}
  
</script>
