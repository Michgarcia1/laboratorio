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
                @click="() => {
                  useProcesoCompra.setNombreServicio(objeto.nombre_servicio)
                  useProcesoCompra.setIcono(objeto.icono)
                  useProcesoCompra.setPrecio(objeto.precio_unitario_servicio)
                  $router.push('/proceso-de-compra')
                }"
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
import { ref, watch, onMounted } from 'vue';
import { serviciosDisponibles } from 'stores/serviciosDisponibles';
import { ServicioClinico } from 'src/interfaces/Interfaces';
import { procesoCompra } from 'stores/procesoCompra';

const useServiciosDisponibles = serviciosDisponibles()
const useProcesoCompra = procesoCompra()
const servicios = ref<ServicioClinico[]>([]);


onMounted(() => {
  console.log(useServiciosDisponibles.servicios, 'useServiciosDisponibles.servicios')
  servicios.value = useServiciosDisponibles.servicios
})


watch(() => useServiciosDisponibles.servicios, () => {
  servicios.value = useServiciosDisponibles.servicios
  console.log(servicios.value)
})

//Lógica del paginado
const current = ref(1);



</script>

