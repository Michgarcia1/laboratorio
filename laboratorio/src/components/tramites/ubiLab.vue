<template>
  <div class="bg-white q-pa-lg"
  :style="$q.screen.lt.sm ? {} : { height: '550px', width: '1200px' }">

    <div class="text-h6 q-pa-md" style="font-weight: bold">
      Ubicación del Laboratorio
    </div>

    <div id="map" style="height: calc(100% - 64px);"></div>
  </div>
</template>

<script setup lang="ts">



</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
