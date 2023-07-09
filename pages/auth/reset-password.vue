<template>
  <div>
     <Card card_title="هل نسيت كلمة المرور؟">
        
          <div class="mb-6">
            <div class="font-sans-serif text-base font-normal leading-6 text-center text-gray-700">سيرسل رابط إستعادة كلمة المرور الى بريدك الإلكتروني</div>
          </div>
          
         <form class="space-y-6" action="#" @submit.prevent="login">

            <Input v-model="email" label_name="البريد الإلكتروني" label_for="email" input_id="input-email" input_name="email" input_type="email" input_dir="ltr" input_placeholder="e.g.you@gmail.com"/>

            <Button type="submit" color="black" class="flex w-full justify-center" :outline="false" :disabled="!unDisabled">إرسال الرابط</Button>
          
        </form>
    
    </Card>
  </div>
</template>

<script setup>

definePageMeta({ layout: 'blank' })

const dir = ref('rtl')
const email = ref('');
const isLoading = ref(false);
const router = useRouter();

const unDisabled = computed(()=>{
  return  email.value.length > 0;
})


function login(){
  var formBody = {
    email: email.value
  }
  console.log(formBody);
  router.push('/auth/reset-password-link');
}
  
</script>