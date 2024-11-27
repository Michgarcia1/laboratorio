<template>
  <div>
    <q-footer>
      <q-toolbar>
        <q-toolbar-title
          class="text-black toolbar-title"
          style="font-size: 13px; text-align: center"
        >
          <p>{{useConfiguracionSitio.correo_electronico}}</p>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script setup lang="ts">
import { configuracionSitio } from 'stores/configuracionSitio';

const useConfiguracionSitio = configuracionSitio();

</script>

