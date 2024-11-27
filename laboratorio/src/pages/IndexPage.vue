<template>
  <q-page v-if="useConfiguracionSitio.activo" class="row items-center justify-evenly" style="background-color: #E6EEF9;">
    <HomePage />
  </q-page>
  <q-page v-else>
    <ComponenteMantenimiento />
  </q-page>
</template>

<script setup lang="ts">
import HomePage from 'pages/HomePage.vue';
import { onMounted, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { userData } from 'stores/userData';
import { configuracionSitio } from 'stores/configuracionSitio';
import ComponenteMantenimiento from 'components/ComponenteMantenimiento.vue';

const router = useRouter();
const useUserData = userData()
const mostrar = ref(true)
const useConfiguracionSitio = configuracionSitio()

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
