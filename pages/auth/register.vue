<template>
  <div>
    <CardRegister card_title="إنشاء حساب">
        
      <div class="mb-10">
          <div class="mb-2 font-sans-serif text-base font-bold leading-6 text-center text-gray-500">أهلاً بك!</div>
      </div>

        <form class="space-y-6" action="#" @submit.prevent="createUser">
          <FormInput v-model="full_name" label_name="الاسم الكامل" label_for="full-name" input_id="input-full-name" input_name="full_name"/>
          <FormInput v-model="phone" label_name="رقم الجوال" label_for="phone" input_id="input-phone" input_name="phone" input_type="text"  input_dir="ltr" :input_phone_country="true" input_placeholder="534398859"/>
          <FormInput v-model="email" label_name="البريد الإلكتروني" label_for="email" input_id="input-email" input_name="email" input_type="email" input_dir="ltr" input_placeholder="e.g.you@gmail.com"/>
          <FormInput v-model="password" label_name="كلمة المرور" label_for="password" input_id="input-password" input_name="password" input_type="password" :input_password="true" />

          <div class="flex items-center justify-between mt-1">
            <div class="text-sm">
              <NuxtLink to="/auth/register" class="font-bold text-xs text-gray-900 hover:text-gray-600">تسجيلك يعني موافقتك على سياسة الخصوصية </NuxtLink>
            </div>
          </div>
          <div class="flex items-center flex-row-reverse  mt-1">
            <div class="text-xs text-gray-900">
              <span class="">لديك حساب؟</span>
              <NuxtLink to="/auth/login" class="font-bold  hover:text-gray-600"> 
                  سجل دخولك الآن
                </NuxtLink>
            </div>
          </div>
          <Button type="submit" color="black" class="flex w-full justify-center" :disabled ="!unDisabled">تسجيل الدخول</Button>
        </form>

    </CardRegister>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'blank' })

const full_name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');

const isLoading = ref(false);

const unDisabled = computed(()=>{
  return full_name.value.length > 0 && email.value.length > 0 && phone.value.length > 0 && password.value.length > 0;
})

function createUser(){
  var formBody = {
    name: full_name.value,
    phone: phone.value,
    email: email.value,
    password: password.value
  }
  console.log(formBody);
}
  
</script>