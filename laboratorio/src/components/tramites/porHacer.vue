<template>
  <div class="q-pa-md" v-if="showContent">
    <div class="full-width flex items-center justify-center">
      <h1 class="text-h4 q-mb-md">Citas programadas para el dia de hoy</h1>
    </div>
    <q-card>
      <q-card-section >
        <q-table
          flat
          :rows="citas[0].data.results"
          :columns="columns">

          <template v-slot:body-cell-hora_cita="props">
            <q-td :props="props">
              <p>
                {{ props.row.hora_cita.split(':')[0] }}:{{ props.row.hora_cita.split(':')[1] }}
              </p>
            </q-td>
          </template>

          <template v-slot:body-cell-pagado="props">
            <q-td :props="props">
              <q-chip :color="props.row.pagado ? 'positive' : 'negative'" text-color="white">
                {{ props.row.pagado ? 'Pagado' : 'Pendiente' }}
              </q-chip>
            </q-td>
          </template>
          <template v-slot:body-cell-acciones="props">
            <q-td :props="props">
              <q-btn
                v-if="!props.row.pagado"
                color="blue"
                label="Marcar como Pagado"
                dense
                flat
                @click="marcarComoPagado(props.row.id)"
              />
              <q-btn
                v-else
                color="grey"
                label="Sin acciones"
                dense
                flat
                disable
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>

  <div v-else>
    <div class="q-pa-md q-mt-xl flex flex-col items-center justify-center min-h-screen">
      <div class="text-center">
        <!-- Icono del calendario -->
        <q-icon name="event" size="48px" color="blue" />

        <!-- Título y subtítulo -->
        <h2 class="q-mt-sm text-h5 text-grey-9">No hay citas para hoy</h2>
        <p class="q-mt-xs text-body2 text-grey-7"></p>

        <!-- Imagen -->
        <div class="q-mt-md">
          <img
            src="/placeholder.svg?height=200&width=300"
            alt="Calendario vacío"
            class="q-mx-auto"
          />
        </div>

        <!-- Mensaje -->
        <p class="q-mt-sm text-body2 text-grey-6">
          No se han registrado citas para el día de hoy.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { CitaPorDia } from 'src/interfaces/Interfaces';
import { useQuasar } from 'quasar';
import { backend } from 'boot/axios';
import { userData } from 'stores/userData';
import { Loading } from 'quasar';

const props = defineProps<{
  citaDia: CitaPorDia[]
}>();

const showContent = ref(false);
const citas = ref(props.citaDia)
const {access_token} = userData()
const $q = useQuasar();
const columns = [
  { name: 'numero_cita', label: 'Número de Cita', field: 'numero_cita', sortable: true },
  { name: 'nombre_Cita', label: 'Nombre de la Cita', field: 'nombre_Cita', sortable: true },
  { name: 'hora_cita', label: 'Hora', field: 'hora_cita', sortable: true },
  { name: 'total_cita', label: 'Total', field: 'total_cita', sortable: true },
  { name: 'pagado', label: 'Estado de Pago', field: 'pagado', sortable: true },
  { name: 'acciones', label: 'Acciones', field: 'acciones' }
]

const marcarComoPagado = async(id:number) => {
  Loading.show()
  const index = citas.value[0].data.results.findIndex(cita => cita.id === id);
  try{
    const response = await backend.patch('registro-citas/pagar-cita/', {
      'numero_cita': citas.value[0].data.results[index].numero_cita,
    },{
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'multipart/form-data',
      },
    })
    if(response.status === 200){
      Loading.hide()
    }
    if (index !== -1) {
      citas.value[0].data.results[index].pagado = true
      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'check',
        message: 'Cita marcada como pagada'
      })
    }
  }catch(error) {
    console.log(error);
    Loading.hide()
  }

}


onMounted(() => {
  console.log(citas.value, 'citaDia')
  showContent.value = props.citaDia[0].data.results.length > 0;
})


watch(() => props.citaDia, (newValue) => {
  citas.value = newValue;
})

</script>
