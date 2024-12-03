<template>
  <div class="q-mb-xl">
    <div class="flex column q-gutter-lg">
      <q-card>
        <q-card-section style="height: 400px;">
          <div id="map" style="height: 100%; width: 100%;"></div>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section flat>
          <q-card class="q-pa-md" flat>
            <q-card-section>
              <div class="text-h6">Información de Contacto</div>
            </q-card-section>
            <q-card-section>
              <div class="q-mb-md">
                <div class="flex items-center q-mb-sm">
                  <q-icon name="place" size="md" class="q-mr-sm text-grey-7" />
                  <p>123 Calle Principal, Ciudad, País, CP 12345</p>
                </div>
                <div class="flex items-center q-mb-sm">
                  <q-icon name="phone" size="md" class="q-mr-sm text-grey-7" />
                  <p>+1 (234) 567-8900</p>
                </div>
                <div class="flex">
                  <q-icon name="schedule" size="md" class="q-mr-sm text-grey-7 q-mt-xs" />
                  <div>
                    <p class="text-weight-medium">Horario de Atención:</p>
                    <ul class="q-pl-md">
                      <li>Lunes - Viernes: 9:00 AM - 6:00 PM</li>
                      <li>Sábado: 10:00 AM - 4:00 PM</li>
                      <li>Domingo: Cerrado</li>
                    </ul>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

onMounted(() => {
  const coordinates = fromLonLat([-100.172028, 25.682861]);

  const pointFeature = new Feature({
    geometry: new Point(coordinates),
  });


  pointFeature.setStyle(
    new Style({
      image: new Icon({
        src: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
        scale: 0.08,
      }),
    })
  );

    const vectorSource = new VectorSource({
    features: [pointFeature],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const divMapa = document.getElementById('map') || 'map'

  console.log(divMapa, 'mapa')

  new Map({
    target: divMapa,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer,
    ],
    view: new View({
      center: coordinates,
      zoom: 15,
    }),
  });
  console.log(document.getElementById('map'), 'mapa')
});
</script>

