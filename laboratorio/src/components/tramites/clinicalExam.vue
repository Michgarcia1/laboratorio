<template>
  <div class="bg-white q-pa-lg"
       :style="$q.screen.lt.sm ? {} : { height: '550px', width: '1200px' }">

    <div class="text-h6 q-ml-xs" style="font-weight: bold;">
      Servicios de Exámenes Clínicos
    </div>

    <div class="row q-gutter-md q-mt-md justify-center">

      <div v-for="objeto in servicios" :key="objeto.nombre_servicio">
        <div v-if="objeto.activo">
          <q-card class="q-pa-md text-subtitle2"
                  :style="$q.screen.lt.sm ? { height: '160px', width: '350px'} : { height: '180px', width: '350px'}">

            <div class="flex items-center" :style="$q.screen.lt.sm ? { } : { marginTop: '30px'}">
              <q-icon :name="objeto.icono" color="blue" size="80px" />
              <q-separator vertical/>
              <div>
                <div class="text-h6 q-ml-sm">{{ objeto.nombre_servicio }}</div>
              </div>
            </div>
            <q-card-actions class="justify-end">
              <q-btn
                @click="$router.push('/proceso-de-compra')"
                no-caps
                size="14px"
                label="Añadir"
                style="background: #096393; color: white;"/>
            </q-card-actions>
          </q-card>
        </div>
      </div>

    </div>

    <div class="q-pa-lg flex flex-center">
      <q-pagination color="blue"
        v-model="current"
        max="4"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { backend } from 'boot/axios';
import { ResponseServiciosClinicos, ServicioClinico } from 'src/interfaces/Interfaces';


const servicios = ref<ServicioClinico[]>([]);

onMounted( async () => {
  const response:ResponseServiciosClinicos = await backend.get('/servicios-clinicos/')
  response.data.results.map((service) => {
    servicios.value.push(service);
  })
})
/*const objetos = [
  { nombre: 'Biometria hematica', tipo: 'A', icono: 'bloodtype' },
  { nombre: 'Química sanguínea', tipo: 'B', icono: 'local_hospital' },
  { nombre: 'Perfil bioquímico 24', tipo: 'C', icono: 'bar_chart' },
  { nombre: 'Reacciones febriles', tipo: 'D', icono: 'thermostat' },
  { nombre: 'Grupo y RH', tipo: 'F', icono: 'bloodtype' },
  { nombre: 'Prueba de embarazo', tipo: 'G', icono: 'pregnant_woman' },
  { nombre: 'Antígeno dengue', tipo: 'H', icono: 'vaccines' },
  { nombre: 'Antidoping 3 elementos', tipo: 'I', icono: 'check_circle_outline' },
  { nombre: 'Antidoping 5 elementos', tipo: 'J', icono: 'check_circle_outline' },
  { nombre: 'Curva de tolerancia', tipo: 'K', icono: 'timeline' },
  { nombre: 'Exámen de orina', tipo: 'L', icono: 'water_drop' },
];
*/
//Lógica del paginado
const current = ref(1);
// const itemsPerPage = 6;

/*const paginatedObjetos = computed(() => {
  const start = (current.value - 1) * itemsPerPage;
  return objetos.slice(start, start + itemsPerPage);
});*/

/*const totalPages = computed(() => {
  return Math.ceil(objetos.length / itemsPerPage);
});*/


</script>

<style scoped>

</style>
