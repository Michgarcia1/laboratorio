<template>
  <div>

    <q-card
      flat
      class="q-pa-md q-gutter-md"
      :style=" $q.screen.lt.sm ? {fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '20px', maxWidth: '100%', background: 'none'} :
      {fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '20px', background: 'none'}">

      <div class="flex justify-center">
        <p>Laboratorio de Análisis Clínico</p>
      </div>

      <div class="q-gutter-md"
      :style="$q.screen.lt.sm ? { } : { display: 'flex', flexDirection: 'row'}">
        <q-card-section>
          <q-btn
            class="q-ma-md icono"
            flat
            icon="medication"
            size="100px"
            style="color: #096393"/>
          <div>
            <p class="q-mt-sm text-center">Exámenes clínicos</p>
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn
            class="q-ma-md icono"
            flat
            icon="assignment"
            size="100px"
            style="color: #096393"/>
          <div>
            <p class="q-mt-sm text-center">Resultados</p>
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn
            class="q-ma-md icono"
            flat icon="place"
            size="100px"
            style="color: #096393"/>
          <div>
            <p class="q-mt-sm text-center">Ubicación</p>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </div>

</template>

<script setup>
import {useQuasar} from 'quasar';

const $q = useQuasar();

</script>


<style scoped>
.icono {
  transition: transform 0.3s;
}

.icono:hover {
  transform: scale(1.1); /* Aumenta el tamaño */
}
</style>
