<template>
  <div>
    <q-card
      flat
      class="q-pa-md q-gutter-md"
      :style="$q.screen.lt.sm ? {fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '20px', maxWidth: '100%', background: 'none'} :
      {fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '20px', width:'1200px', background: 'none'}">

      <div class="flex justify-center">
        <p>Laboratorio de Análisis Clínico</p>
      </div>

      <div class="q-gutter-md"
           :style="$q.screen.lt.sm ? {  } : { display: 'flex', flexDirection: 'row', justifyContent: 'center' }">
        <q-card-section>
          <q-btn
            class="icono"
            flat
            icon="medical_services"
            size="100px"
            :style="$q.screen.lt.sm ? {color: '#096393', marginLeft: '40px' } : { color: '#096393', marginBottom: '10px' }"/>
          <div>
            <p class="q-mt-sm text-center">Exámenes clínicos</p>
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn
            class="icono"
            flat
            icon="assignment"
            size="100px"
            :style="$q.screen.lt.sm ? {color: '#096393', marginLeft: '40px' } : { color: '#096393', marginBottom: '10px' }"/>
          <div>
            <p class="q-mt-sm text-center">Resultados</p>
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn
            class="icono"
            flat
            icon="place"
            size="100px"
            :style="$q.screen.lt.sm ? {color: '#096393', marginLeft: '40px' } : { color: '#096393', marginBottom: '10px' }"/>
          <div>
            <p class="q-mt-sm text-center">Ubicación</p>
          </div>
        </q-card-section>
      </div>
    </q-card>

      <div class="q-pb-md q-pa-md q-gutter-md row"
           :style="$q.screen.lt.sm ? {} : { display: 'flex', flexDirection: 'row', justifyContent: 'center' }">

          <div style="width: 100%; max-width: 500px;">
            <span class="text-h2 text-bold">Misión</span>
            <div class="q-mt-md justify"
                 style="font-size: 16px">{{ mision }}</div>
          </div>

          <q-card class="my-card" flat>
              <q-img
                class="justify-end"
                src="public/lab-mision.jpg"
                :style="$q.screen.lt.sm ? {width: '100%'} : {}"
              />
            </q-card>
      </div>


    <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        autoplay="if='true' > 0"
        infinite
        swipeable
        animated
        control-color="blue"
        next-icon="chevron_right"
        prev-icon="chevron_left"
        navigation
        navigation-icon="circle"
        arrows
        padding
        height="250px"
        transition-prev="scale"
        transition-next="scale"
        class="text-black rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="science" size="56px" />
          <div class="q-mt-md text-center" style="font-size: 16px">{{ text }}</div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="vaccines" size="56px" />
          <div class="q-mt-md text-center" style="font-size: 16px">{{ text2 }}</div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="local_hospital" size="56px" />
          <div class="q-mt-md text-center" style="font-size: 16px">{{ text3 }}</div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="emergency" color="red" size="56px" />
          <div class="q-mt-md text-center" style="font-size: 16px">{{ text4 }}</div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const slide = ref('style');
const text = 'Ofrecemos un amplio rango de pruebas clínicas diseñadas para detectar, prevenir y monitorear condiciones de salud';
const text2 = 'Contamos con tecnología de vanguardia para garantizar resultados confiables';
const text3 = 'Nuestro equipo de profesionales está altamente capacitado para atenderte y resolver tus dudas';
const text4 = 'Ofrecemos análisis urgentes con resultados rápidos en situaciones de emergencia';

const mision = 'Proporcionar servicios de diagnóstico clínico de alta calidad mediante pruebas precisas y oportunas, promoviendo salud y el bienestar de nuestros pacientes a través de la innovación, la experiencia en la atención y la integridad en todos nuestros procesos.';

</script>

<style scoped>
.icono {
  transition: transform 0.3s;
}

.icono:hover {
  transform: scale(1.1);
}

.my-card{
  width: 100%;
  max-width: 500px;
}

</style>
