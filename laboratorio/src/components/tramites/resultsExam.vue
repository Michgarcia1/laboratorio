<template>
  <div class="bg-white q-pa-lg"
  :style="$q.screen.lt.sm ? {height: '750px', width: '380px'} : { height: '550px', width: '1200px' }">

    <div class="text-h6 q-pa-md" style="font-weight: bold">
      Consulta tus resultados
    </div>

    <searchComponent/>
    <cardComponent/>

  </div>

</template>
<script setup lang="ts">
import searchComponent from 'components/searchComponent.vue'
import cardComponent from 'components/cardComponent.vue'

</script>
