<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      flat
      class="my-card"
      :style="$q.screen.lt.sm ? {width: '380px', height: '550px'} : {width: '700px', height: '500px' }">
      <q-card-section class="bg-positive text-white">
        <div class="text-h6"><q-icon name="event" size="25px"/> Elige fecha y hora </div>
      </q-card-section>


      <q-card-actions>
        <div class="q-pa-md">
          <div class="q-gutter-md row items-start">
            <q-date
              v-model="date"
              label="Fecha"
              color="blue"
              mask="YYYY-MM-DD"
              :locale="locale"
              :style="$q.screen.lt.sm ? {width: '330px', height: '350px'} : {}"
            />
            <q-select
              v-model="time"
              color="blue"
              outlined
              class="q-mt-lg"
              :options="options"
              label="Seleccionar hora"
              :style="$q.screen.lt.sm ? {width: '330px', height: '350px'} : {width: '345px'}"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>

    <q-card
      flat
      class="my-card"
      :style="$q.screen.lt.sm ? {width: '380px', height: '250px'} : {width: '300px', height: '250px'}">
      <q-card-section class="bg-blue text-white">
        <div class="text-h6">Resumen de la cita</div>
      </q-card-section>

      <div class="q-pa-md text-h6">
        Servicio: {{useProcesoCompra.nombre_servicio}}
      </div>
      <div class="q-pl-md text-h6 text-positive">
        Total: ${{useProcesoCompra.precio}}
      </div>

      <q-card-actions class="q-gutter-md" style="height: 40%; justify-content: flex-end;">
        <q-btn style="width: 100%" color="blue" no-caps @click="confirmAppointment">Confirmar cita</q-btn>
      </q-card-actions>

    </q-card>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Notify } from 'quasar';
import { procesoCompra } from 'stores/procesoCompra';
import {backend} from 'boot/axios';
import {userData} from 'stores/userData';
import { HoraCita } from 'src/interfaces/Interfaces';


const date = ref('');
const time = ref<HoraCita>({ value: '', label: '' });
const useProcesoCompra = procesoCompra()
const useUserData = userData()


// Definir el locale en español
const locale = {
  days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthsShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ]
};


// Función para confirmar la cita
const confirmAppointment = async () => {

  const { access_token, id_user } = useUserData;
  const { nombre_servicio, precio } = useProcesoCompra


  if (!date.value && !time.value) {
    Notify.create({
    message: 'Debes de seleccionar fecha y hora.',
    type: 'warning',
    icon: 'warning',
    timeout: 3000,
  });
  } else if (!time.value) {
    Notify.create({
    message: 'Debes de seleccionar la hora.',
    type: 'warning',
    icon: 'warning',
    timeout: 3000,
  });
  } else if (!date.value) {
    Notify.create({
      message: 'Debes de seleccionar el día.',
      type: 'warning',
      icon: 'warning',
      timeout: 3000,
    })
  } else {

    const formData = {
      nombre_Cita: nombre_servicio,
      total_cita: precio,
      fecha_cita: date.value,
      hora_cita: time.value.value,
      user: id_user,
    }
    console.log(formData, 'data')
    const response = await backend.post('registro-citas/', formData , {
      headers:{
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('pasamos')
    console.log(response)
  }
};

const options = Array.from({ length: (14 - 7 + 1) * 4 }, (_, i) => {
  const hour = Math.floor(i / 4) + 7;
  const minuteOptions = [0, 15, 30, 45];
  const minute = minuteOptions[i % 4];
  return {
    label: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    value: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
  };
});


</script>

<style scoped>

</style>
