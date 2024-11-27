<template>
  <q-page class="q-mt-md" style="width: 80%">
    <main class="flex q-gutter-lg column">
      <div>
        <div class="q-mr-xl q-ml-xl" v-if="useConfiguracionSitio.imagenes_carrusel.length > 0">
          <q-carousel
            v-model="slide"
            :autoplay="3000"
            infinite
            swipeable
            animated
            control-color="blue"
            next-icon="chevron_right"
            prev-icon="chevron_left"
            navigation
            arrows
            padding
            :height="$q.screen.lt.sm ? '150px' : '250px'"
          transition-prev="scale"
          transition-next="scale"
          class="text-black rounded-borders"
          >
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <q-img src="public/icons/fondo-principal.webp" />
          </q-carousel-slide>
          <q-carousel-slide
            v-for="(imagen, index) in useConfiguracionSitio.imagenes_carrusel"
            :key="index"
            :name="`slide-${index}`"
            class="column no-wrap flex-center"
          >
            <div>
              <img
                :src="imagen.imagen"
                alt="Imagen carrusel"
                class="carousel-image"
              />
            </div>
          </q-carousel-slide>
          </q-carousel>
        </div>
      </div>

      <div class="flex column">
        <div class="flex justify-center q-mb-md">
          <p style="font-size: 20px">SERVICIOS DISPONIBLES</p>
        </div>

        <div :class="$q.screen.lt.sm ? 'q-mr-xl q-ml-xl flex column full-width q-gutter-lg q-mb-lg' : 'q-mr-xl q-ml-xl flex row q-gutter-lg q-mb-lg'">
          <q-card
            style="width:30%; cursor: default"
            :class="$q.screen.lt.sm ? 'flex column justify-center full-width card-description' : 'flex justify-center card-description'"
            v-for="servicio in useConfiguracionSitio.servicios_clinicos_descripcion" :key="servicio.nombre_servicio"
          >
            <q-card-section class="full-width flex items-center column q-gutter-sm">
              <q-avatar>
                <q-icon
                  size="55px"
                  :name="servicio.icono"
                />
              </q-avatar>
              <p style="text-align: justify">{{ servicio.descripcion }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </main>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { configuracionSitio } from 'stores/configuracionSitio';
import { useQuasar } from 'quasar';

const isLoading = ref(true);
const slide = ref('style');
const useConfiguracionSitio = configuracionSitio();
const $q = useQuasar();

watch(() => useConfiguracionSitio.imagenes_carrusel, () => {
  isLoading.value = false;
});
</script>

<style scoped>
.card-description {
  transition: transform 0.3s ease-in-out;
}

.card-description:hover {
  transform: scale(1.1);
  background: ghostwhite;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;  /* Ajusta la proporción de las imágenes dentro del carrusel */
  background-color: #fff;
}
</style>
