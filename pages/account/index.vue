<template>
  <Title>{{ website_name }}</Title>
  <div class="h-96 text-3xl font-bold text-gray-800 flex flex-col gap-10 items-center justify-center">
    <span>
      Account Data Here
    </span>

    <button @click="logout()"
      class="w-[200px] h-14 text-2xl ring-1 ring-gray-300 rounded-md bg-white focus:bg-gray-100 hover:bg-gray-100">
      Logout
    </button>

  </div>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })
import { initFlowbite } from 'flowbite'
onMounted(() => {
  initFlowbite();
})
const website_name = useState('website_name')
const localePath = useLocalePath()
const login = useAuth().isLoggedIn
onMounted(() => {
  //console.log(login.value)
})

async function logout() {
  try {
    await useNuxtApp().$apiFetch('/customer/logout', {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('user_token')
      }
    })
  } catch (error) {
    console.log(error.data)
  } finally {
    useAuth().removeUser()
    window.location.pathname = localePath('/auth/login-phone')
  }
}
</script>