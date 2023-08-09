<template>
  <div>
     <Card :card_title="$t('reset_password_title')">
          
         <form class="space-y-6 py-4" action="#" @submit.prevent="resetPassword">

           <Input v-model="password" :label_name="$t('label_new_password')" :label_notes="$t('label_password_notes')" label_for="password" input_id="input-password" input_name="password" input_type="password" :input_password="true" />
           
           <Input v-model="password_confirm" :label_name="$t('label_password_confirm')" label_for="password_confirm" input_id="input-password_confirm" input_name="password_confirm" input_type="password" :input_password="true" />

           <Button type="submit" color="black" class="flex w-full justify-center" :outline="false" :disabled="!unDisabled">{{ $t('reset_password_title') }}</Button>
          
        </form>
    
    </Card>
  </div>
</template>

<script setup>

definePageMeta({ layout: 'blank' })

const localePath = useLocalePath()
const password = ref('');
const password_confirm = ref('');
const isLoading = ref(false);
const router = useRouter();

const unDisabled = computed(()=>{
  return  password.value.length > 5 &&  password_confirm.value.length > 5 && password_confirm.value === password.value;
})


function resetPassword(){
  var formBody = {
    password: password.value,
    confirm: password_confirm.value
  }
  console.log(formBody);
  router.push(localePath('/auth/reset-password-success'));
}
  
</script>