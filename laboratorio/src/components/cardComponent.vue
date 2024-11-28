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
               @click="() => showDialog = !showDialog"
               style="width: 40%; background: #096393; color: white;"
        />
      </div>

    </q-card>

    <subirResultados :showLoading="showDialog"/>

  </div>
</template>

<script setup lang="ts">
import {  ResultadosCitas } from 'src/interfaces/Interfaces';
import { userData } from 'stores/userData';
import { watch, ref } from 'vue';
import subirResultados from 'src/components/tramites/subirResultados.vue'


const props = defineProps<{
  data: ResultadosCitas[];
}>();
const useUserData = userData();
const citas = ref<ResultadosCitas[]>([])
const showDialog = ref(false)


watch(() => props.data, (newValue) => {
  citas.value = newValue
})



</script>
