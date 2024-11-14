<template>
  <div class="bg-white q-pa-lg"
  :style="$q.screen.lt.sm ? {height: '750px', width: '380px'} : { height: '550px', width: '1200px' }">

    <div class="text-h6 q-pa-md" style="font-weight: bold">
      Consulta tus resultados
    </div>

    <searchComponent/>
    <cardComponent :data="dataCitas"/>

  </div>

</template>
<script setup lang="ts">
import searchComponent from 'components/searchComponent.vue'
import cardComponent from 'components/cardComponent.vue'
import { onMounted, ref, watch } from 'vue';
import { backend } from 'boot/axios';
import { userData } from 'stores/userData';
import { citasMedicas } from 'stores/citasMedicas';

const useCitasMedicas = citasMedicas()
const {access_token} = userData()
const dataCitas = ref(useCitasMedicas.citas)

onMounted(async () => {
  const response = await backend.get('registro-citas/', {
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'multipart/form-data'
    }
  })
  useCitasMedicas.setCitasMedicas(response.data.results)
})

watch(() => useCitasMedicas.citas, (newValue) => {
  console.log(newValue, 'valor desde el admin')
  dataCitas.value = newValue
})

</script>
