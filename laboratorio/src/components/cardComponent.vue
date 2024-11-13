<template>
  <div class="q-gutter-sm q-ml-xs row">
    <q-card
    :style="$q.screen.lt.sm ? { width: '95%', height: '160px' } : { width: '49%', height: '150px'}"
    class="q-mt-lg"
    >
      <div class="q-ma-md">
        <div class="text-h5 text-weight-bold">Cita: {{message}}</div>
        <div class="text-subtitle2 text-grey-5">Tipo: PDF</div>
      </div>

      <div class="flex justify-center">
        <q-btn no-caps
          class="q-mt-sm"
          label="Descargar resultado"
          style="width: 40%; background: #096393; color: white;"
        />
      </div>

    </q-card>

  </div>
</template>

<script setup>

const message = '123'


</script>
