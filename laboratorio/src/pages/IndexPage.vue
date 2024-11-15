<template>
  <q-page v-show="mostrar" class="row items-center justify-evenly" style="background-color: #E6EEF9;">
    <LoginForm/>
  </q-page>
</template>

<script setup lang="ts">
import LoginForm from 'components/loginForm.vue';
import { onMounted, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { userData } from 'stores/userData';

const router = useRouter();
const useUserData = userData()
const mostrar = ref(true)

onMounted(() => {
  montar()
})

function montar(){
  if (useUserData.access_token) {
    mostrar.value = false
    router.push('/inicio');
  }else{
    mostrar.value = true
  }
}

watch(() => useUserData.access_token, () => {
  montar()
})

defineOptions({
  name: 'IndexPage'
});

</script>
