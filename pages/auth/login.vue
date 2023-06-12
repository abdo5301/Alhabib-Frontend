<template>
  <div>
     <CardRegister card_title="تسجيل الدخول">
        
          <div class="mb-6">
              <div class="mb-2 font-sans-serif text-base font-bold leading-6 text-center text-gray-500">أهلاً بك!</div>
              <div class="font-sans-serif text-base font-normal leading-6 text-center text-gray-500">قم بتسجيل الدخول عن طريق رقم الجوال أو كلمة المرور</div>
          </div>

         <form class="space-y-6" action="#" @submit.prevent="createUser">
            <FormInput v-model="email" label_name="البريد الإلكتروني" label_for="email" input_id="input-email" input_name="email" input_type="email" input_dir="ltr" input_placeholder="e.g.you@gmail.com"/>
            <FormInput v-model="password" label_name="كلمة المرور" label_for="password" input_id="input-password" input_name="password" input_type="password" :input_password=true />

            <div class="flex items-center justify-between mt-1">
                <div class="flex items-center ">
                  <input v-model="remember" id="remember-me" name="remember-me" type="checkbox" checked="checked" class="h-4 w-4 rounded border-gray-900 text-gray-900 focus:ring-transparent" />
                  <label for="remember-me" class="ltr:ml-3 rtl:mr-2 block font-semibold text-sm leading-6 text-gray-900 cursor-pointer">تذكرني</label>
                </div>
              <div class="text-sm">
                <NuxtLink to="/auth/reset" class="font-bold text-xs text-gray-900 hover:text-gray-600">هل نسيت كلمة المرور ؟</NuxtLink>
              </div>
            </div>

            <Button type="submit" color="black" class="flex w-full justify-center" :outline="false" :disabled="!unDisabled">تسجيل الدخول</Button>

            <div class="flex items-center mt-1">
              <div class="text-xs text-gray-900">
                <span class="">هل أنت جديد هنا؟ </span>
                <NuxtLink to="/auth/register" class="font-bold  hover:text-gray-600 inline-block"> 
                  أنشئ حسابك الآن 
                  <ArrowRightIcon v-if="dir =='ltr'"  class="h-4 w-4 text-gray-900 inline-block" /> 
                 <ArrowLeftIcon v-else class="h-4 w-4 text-gray-900 inline-block" /> 
                 </NuxtLink>
              </div>
           </div>
          
        </form>

    </CardRegister>
  </div>
</template>

<script setup>
import { ArrowLeftIcon,ArrowRightIcon } from '@heroicons/vue/20/solid'

definePageMeta({ layout: 'blank' })

const email = ref('');
const password = ref('');
const remember = ref(true);

const isLoading = ref(false);

const unDisabled = computed(()=>{
  return  email.value.length > 0 && password.value.length > 0;
})

function createUser(){
  var formBody = {
    email: email.value,
    password: password.value,
    remember: remember.value
  }
  console.log(formBody);
}
  
</script>