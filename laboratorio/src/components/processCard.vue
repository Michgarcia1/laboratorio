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
              @update:model-value="handleDateChange"
            />
            <q-select
              v-model="time"
              color="blue"
              outlined
              class="q-mt-lg"
              :options="options"
              label="Seleccionar hora"
              :style="$q.screen.lt.sm ? {width: '330px', height: '350px'} : {width: '345px'}"
              :disable="!date"
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
const options = ref<HoraCita[]>([]);

const { access_token, id_user } = useUserData;
const { nombre_servicio, precio } = useProcesoCompra


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

const handleDateChange = async () => {
  if (date.value) {
    try {
      const response = await backend.get(`verificar-citas/?fecha=${date.value}`, {
        headers:{
          'Authorization': `Bearer ${access_token}`,
        },
      });
      options.value = response.data.horas_disponibles.map((hora:string) => {
        const formato_hora = hora.split(':')
        return {
          label: `${formato_hora[0]}:${formato_hora[1]}`,
          value: `${formato_hora[0]}:${formato_hora[1]}`,
        }
      });
    } catch (error) {
      Notify.create({
        message: 'Error al obtener las horas disponibles.',
        type: 'negative',
        icon: 'error'
      });
    }
  }
};


// Función para confirmar la cita
const confirmAppointment = async () => {


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
    console.log(response)
    const dia = new Date(date.value)
    console.log(dia)
    Notify.create({
      message: `Cita confirmada para el ${date.value} a las ${time.value.value}`,
      type: 'positive',
      icon: 'check_circle',
      timeout: 3000,
    })
    date.value = ''
    time.value.label = ''
    time.value.value = ''
  }
};



</script>
