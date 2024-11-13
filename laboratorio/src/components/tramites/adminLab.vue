<template>
  <div class="bg-white q-pa-lg"
  :style="$q.screen.lt.sm ? {height: '750px', width: '380px'} : { height: '650px', width: '1200px' }">

    <div class="text-h6 q-pa-md" style="font-weight: bold">
      Buscar resultados
    </div>

        <searchComponent/>


  </div>



</template>
<script setup lang="ts">
import searchComponent from 'components/searchComponent.vue'


</script>
