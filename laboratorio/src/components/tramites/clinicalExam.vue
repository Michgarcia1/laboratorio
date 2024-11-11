<template>
  <div v-if="contenido">
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
                      :max="total_page"
        />
      </div>

    </div>
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
</template>

<script setup lang="ts">
import { ref, onMounted, watch} from 'vue';
import { serviciosDisponibles } from 'stores/serviciosDisponibles';
import { ServicioClinico } from 'src/interfaces/Interfaces';
import { procesoCompra } from 'stores/procesoCompra';
import { backend } from 'boot/axios';
import { ResponseServiciosClinicos } from 'src/interfaces/Interfaces';

const useServiciosDisponibles = serviciosDisponibles()
const useProcesoCompra = procesoCompra()
const servicios = ref<ServicioClinico[]>([]);
const contenido = ref(false)
const current = ref(1);
const total_page = ref(0)


onMounted(async() => {
  peticionServicios()
})

const peticionServicios = async () => {
  useServiciosDisponibles.reset()
  const response:ResponseServiciosClinicos = await backend.get(`/servicios-clinicos/?page=${current.value}`)
  if( response.data.results.length > 0 ){
    total_page.value = response.data.total_pages
    response.data.results.map((service) => {
      useServiciosDisponibles.setServiciosDisponibles([service])
    })
    if(response.data.results.length === 1 && !response.data.results[0].activo){
      contenido.value = false
      servicios.value = useServiciosDisponibles.servicios
    }else{
      contenido.value = true
      servicios.value = useServiciosDisponibles.servicios
    }
  }else{
    contenido.value = false
  }
}

watch(() => current.value, () => {
  peticionServicios()
})


</script>

