<template>
    <q-page class="row items-center justify-evenly" style="background-color: #E6EEF9;">
       <div v-if="contenido">
         <clinicalExam/>
       </div>
      <div v-else>
        <q-inner-loading :showing="true" class="q-gutter-md">
          <q-spinner-gears size="50px" color="success" />
          <div class="flex column items-center q-gutter-xs">
            <p style="font-size: 1.2rem">Lo sentimos por el momento no tenemos servicios disponibles :(</p>
            <q-btn
              label="Regresar al inicio"

              @click="$router.push('/inicio')"
            />
          </div>
        </q-inner-loading>

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
  useServiciosDisponibles.reset()
  const response:ResponseServiciosClinicos = await backend.get('/servicios-clinicos/')
  if( response.data.results.length > 0 ){
    response.data.results.map((service) => {
      useServiciosDisponibles.setServiciosDisponibles([service])
    })
    contenido.value = true
    console.log(useServiciosDisponibles.servicios)
  }else{
    contenido.value = false
  }
})
</script>
