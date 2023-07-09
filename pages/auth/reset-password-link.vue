<template>
  <div>
     <Card card_title="تم إرسال رابط إستعادة كلمة المرور">
        
          <div class="mt-10 mb-9 px-2">
            <div class="font-sans-serif text-base font-normal leading-6 text-justify text-gray-700">
                            تم ارسال رابط إستعادة كلمة المرور الى بريدك الإلكتروني المرتبط بحسابك في مفارش الحبيب.
              <br><br>
              لم تستلم الرابط؟ تفقد البريد المهمل في بريدك، او اطلب إعادة ارسال الرابط. 
            </div>
          </div>
          
          <Button type="button" @click.prevent="resendLink" color="black" class="flex w-full justify-center" :outline="false"> إعادة إرسال الرابط</Button>
          
    </Card>
  </div>
</template>

<script setup>

definePageMeta({ layout: 'blank' })

const dir = ref('rtl')
const router = useRouter();

function resendLink(){
  router.push('/auth/reset-password-form');
}
  
</script>