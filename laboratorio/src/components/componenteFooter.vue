<template>
  <div>
    <q-footer>
      <q-toolbar
      style="background-color: white">
        <q-toolbar-title
          class="text-black toolbar-title"
          style="font-size: 13px; text-align: center;background-color: white;"
        >
         <div class="flex column full-width justify-center text-justify items-center">
           <div>
             <p> Si tienes alguna duda puedes contactarnos mediante nuestro correo: <b
               style="color: #096393; cursor: pointer; text-decoration: #a6d2fe">{{useConfiguracionSitio.correo_electronico}}</b> </p>
           </div>
           <div>
             <p
             > Tambien puedes contactarnos a nuestro numero telefonico: <b
               style="color: #096393; cursor: pointer; text-decoration: #a6d2fe">{{useConfiguracionSitio.numero_telefonico}}</b></p>
           </div>
         </div>
          <div>
            <p> ©{{useConfiguracionSitio.derechos_reservados}} </p>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script setup lang="ts">
import { configuracionSitio } from 'stores/configuracionSitio';

const useConfiguracionSitio = configuracionSitio();

</script>

