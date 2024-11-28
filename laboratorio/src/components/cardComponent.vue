<template>
  <div class="q-gutter-sm q-ml-xs row">
    <q-card
    :style="$q.screen.lt.sm ? { width: '95%', height: '190px' } : { width: '49%', height: '140px'}"
    class="q-mt-lg"
    v-for="cita in citas"
    :key="cita.numero_cita"
    >
      <div class="q-ma-md">
        <div class="text-h5 text-weight-bold">Estudio: {{cita.nombre_Cita}}</div>
        <div>Folio: <strong>{{cita.numero_cita}}</strong></div>
        <!--<div class="text-subtitle2 text-grey-5">Tipo: PDF</div> -->
      </div>

      <div class="flex justify-end q-mr-xs items-en">
        <q-btn no-caps
               v-if="!useUserData.is_superuser"
               :disable="cita.resultados.length !== 1"
               class="q-mt-sm"
               label="Descargar resultado"
               style="width: 40%; background: #096393; color: white;"
        />
        <q-btn no-caps
               v-else
               class="q-mt-sm"
               label="Subir resultado"
               @click="() => subirResultado(cita.id, cita.numero_cita, cita.nombre_Cita, cita.user)"
               style="width: 40%; background: #096393; color: white;"
        />
      </div>

    </q-card>

    <subirResultados
      :cita_escogida="numero_cita"
      :userID="userID"
      :folioCita="folioCita"
      :showLoading="useComunicacionComponentes.dialogSubirResultados"/>

  </div>
</template>

<script setup lang="ts">
import {  ResultadosCitas } from 'src/interfaces/Interfaces';
import { userData } from 'stores/userData';
import { watch, ref } from 'vue';
import subirResultados from 'src/components/tramites/subirResultados.vue'
import { comunicacionComponentes } from 'stores/comunicacionComponentes';


const props = defineProps<{
  data: ResultadosCitas[];
}>();
const useUserData = userData();
const citas = ref<ResultadosCitas[]>([])
const useComunicacionComponentes = comunicacionComponentes()
const numero_cita = ref(0)
const folioCita = ref('')
const nombreEstudio = ref('')
const userID = ref(0)


watch(() => props.data, (newValue) => {
  citas.value = newValue
})


const subirResultado = async (cita:number, folio_cita:string, nombre_estudio:string, user_id:number) => {
  numero_cita.value = cita
  folioCita.value = folio_cita
  nombreEstudio.value = nombre_estudio
  userID.value = user_id
  useComunicacionComponentes.setDialogSubirResultados(true)
}


</script>
