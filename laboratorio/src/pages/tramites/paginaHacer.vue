<template>
  <q-page class="flex justify-center full-width" style="background-color: #E6EEF9;">

    <div v-if="spinner">
      <q-inner-loading :showing="true" class="q-gutter-md">
        <q-spinner size="50px" color="success" />
      </q-inner-loading>
    </div>

    <div v-else class="full-width">
      <porHacer :citaDia="dataCitasPorHoy"/>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import porHacer from 'src/components/tramites/porHacer.vue';
import { onMounted, ref, watch } from 'vue';
import { backend } from 'boot/axios';
import { userData } from 'stores/userData';
import { useRouter } from 'vue-router';
import { comunicacionComponentes } from 'stores/comunicacionComponentes';
import { CitaPorDia } from 'src/interfaces/Interfaces';

const {access_token} = userData()
const useComunicacionComponentes = comunicacionComponentes()
const loading = ref(false);
const router = useRouter();
const spinner = ref(useComunicacionComponentes.showSpinner);
const dataCitasPorHoy = ref<CitaPorDia[]>([])

onMounted(async() => {
  await verifyToken()
  await peticionCitasPorDia()
})

const verifyToken = async () => {
  try{
    const response = await backend.post('/verify-token/verify/', {
      token: access_token
    }, {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'multipart/form-data'
      }
    })
    if(response.status === 200){
      loading.value = true
    }
  }catch(error){
    await router.push('/error')
  }
}


const peticionCitasPorDia = async () => {
  try{
    const response = await backend.get('registro-citas/citas-hoy/', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    if(response.status === 200){
      const citas: CitaPorDia = response;
      console.log('andamos apenas por el if')
      dataCitasPorHoy.value.push(citas);
      useComunicacionComponentes.setShowSpinner(false);

    }
  }catch(error){
    console.log(error)
  }
}

watch(() => useComunicacionComponentes.showSpinner, (newValue) => {
  spinner.value = newValue
})

</script>
