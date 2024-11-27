<template>
  <q-page class="flex justify-center items-center" style="background-color: #E6EEF9;">
    <LoginForm />
  </q-page>
</template>

<script setup lang="ts">
import LoginForm from 'components/loginForm.vue';
import { useRouter, useRoute } from 'vue-router';
import { userData } from 'stores/userData';
import { onMounted } from 'vue';


const router = useRouter();
const useUserData = userData()
const rt = useRoute()

onMounted(() => {
  verificarInicio()
})


const verificarInicio = () => {
  if(useUserData.access_token !== ''){
    rt.path.replace('/iniciar-sesion', '/inicio')
    router.push('/inicio');
  }
}



</script>
