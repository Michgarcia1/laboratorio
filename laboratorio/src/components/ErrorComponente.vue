<template>
  <main class="q-gutter-lg flex flex-col full-width justify-center items-center" style="background:#E6EEF9; height: 103vh">
    <div class="text-center">
      <p class="text-h1 font-bold" style="color: #096393">{{ numero_error }} :(</p>
      <p class="q-my-md text-body-2 text-grey-6">{{ mensaje }}</p>
      <div class="q-gutter-md flex flex-wrap justify-center">
        <q-btn
          v-for="(boton, index) in botones"
          :key="index"
          :label="boton.mensaje"
          :to="boton.url_redirect"
          class="rounded-borders font-medium"
          style="background: #096393; color: white;"
          @click="handleButtonClick(boton)"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ComponenteError } from 'src/interfaces/Interfaces';
import { userData } from 'stores/userData';

const props = defineProps<{
  componente: ComponenteError
}>();

const { numero_error, mensaje, botones } = props.componente;
const useUserData = userData();

const handleButtonClick = (boton: { mensaje: string; url_redirect: string; onClick?: () => void }) => {
  if (boton.mensaje.toLowerCase() === 'ir al inicio') {
    useUserData.reset()
  } else if (boton.onClick) {
    boton.onClick();
  }
};
</script>
