<template>
    <q-page class="row items-center justify-evenly" style="background-color: #E6EEF9;">
       <div v-if="contenido">
         <clinicalExam/>
       </div>
      <div v-else>
        <p> No hay nada</p>
      </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { backend } from 'boot/axios';
import clinicalExam from 'components/tramites/clinicalExam.vue';
import { ResponseServiciosClinicos } from 'src/interfaces/Interfaces';
import { serviciosDisponibles } from 'stores/serviciosDisponibles';

const useServiciosDisponibles = serviciosDisponibles();
const contenido = ref(false)
onMounted(async () => {
  const response:ResponseServiciosClinicos = await backend.get('/servicios-clinicos/')
  if( response.data.results.length > 0 ){
    response.data.results.map((service) => {
      console.log(service, 'map')
      useServiciosDisponibles.setServiciosDisponibles([service])
    })
    contenido.value = true
    console.log(useServiciosDisponibles.servicios)
  }else{
    contenido.value = false
  }
})
</script>
