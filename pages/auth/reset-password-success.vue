<template>
  <div>
     <Card card_title="تم تحديث كلمة المرور">
        
          <div class="mt-10 mb-9 px-2">
            <div class="font-sans-serif text-base font-normal leading-6 text-justify text-gray-700">
              مرحبًا بك مجددًا،
<br><br>
تم تحديث كلمة المرور الخاصه بك بنجاح.

            </div>
          </div>
          
          <Button type="button" @click.prevent="redirect" color="black" class="flex w-full justify-center" :outline="false">العودة للصفحة الرئيسية</Button>
          
    </Card>
  </div>
</template>

<script setup>

definePageMeta({ layout: 'blank' })

const dir = ref('rtl')
const email = ref('');
const isLoading = ref(false);
const router = useRouter();

function redirect(){
  router.push('/');
}
  
</script>