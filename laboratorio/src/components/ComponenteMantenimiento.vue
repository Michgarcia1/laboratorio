<template>
  <div class="q-pa-md flex flex-center items-center min-h-screen" style="background: #E6EEF9">
    <q-card class="q-pa-lg shadow-2xl" style="max-width: 600px; text-align: center;">
      <q-card-section>
        <div class="text-h4 font-bold text-grey-9 q-mb-md">
          Estamos mejorando nuestros servicios
        </div>
        <div class="q-mx-auto q-mb-lg" style="width: 256px; height: 256px;">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <!-- Base del microscopio -->
            <rect x="35" y="80" width="30" height="10" fill="#4A5568" />
            <path d="M40 80 L35 60 L65 60 L60 80" fill="#4A5568" />

            <rect x="45" y="30" width="10" height="30" fill="#2D3748" />

            <circle cx="50" cy="25" r="10" fill="#2D3748" />

            <g :transform="`rotate(${rotate} 50 25)`">
              <circle cx="50" cy="15" r="5" fill="#4299E1" />
              <circle cx="60" cy="25" r="5" fill="#4299E1" />
              <circle cx="50" cy="35" r="5" fill="#4299E1" />
              <circle cx="40" cy="25" r="5" fill="#4299E1" />
            </g>

            <rect x="30" y="50" width="40" height="5" fill="#718096" />

            <circle cx="50" cy="65" r="5" fill="#FCD34D">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        <div class="text-lg text-grey-7 q-mb-lg">
          Nuestro laboratorio está en mantenimiento para mejorar la calidad de nuestros servicios.
          Volveremos pronto con resultados aún más precisos.
        </div>
        <div class="bg-blue-100 rounded-lg q-pa-md q-mb-lg">
          <div class="text-h6 font-semibold text-blue-800 q-mb-sm">
            ¿Necesita sus resultados con urgencia?
          </div>
          <p class="text-blue-700">
            Por favor, contacte a nuestro equipo de soporte al:
            <br />
            <a :href="useConfiguracionSitio.numero_telefonico" class="font-bold text-blue-900 hover:underline">{{useConfiguracionSitio.numero_telefonico}}</a>
          </p>
        </div>
        <p class="text-grey-6 text-caption">
          Laboratorio Clínico VYMAR - Innovando para su salud
        </p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { configuracionSitio } from 'stores/configuracionSitio';

const rotate = ref(0);
const useConfiguracionSitio = configuracionSitio()

const updateRotation = () => {
  rotate.value = (rotate.value + 1) % 360;
};

let interval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  interval = setInterval(updateRotation, 50);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #ebf8ff, #b2f5ea);
}
</style>
