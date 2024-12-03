<template>
  <div class="bg-white q-pa-lg"
  :style="$q.screen.lt.sm ? {} : { width: '1200px' }">

    <div class="text-h6 q-pa-md" style="font-weight: bold">
      Ubicación del Laboratorio
    </div>
    <componenteUbicacion />
  </div>
</template>

<script setup lang="ts">
import componenteUbicacion from 'src/components/componenteUbicacion.vue'


</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
