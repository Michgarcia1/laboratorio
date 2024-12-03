<template>
  <div>
    <div class="flex column q-gutter-lg">
      <q-card>
        <q-card-section style="height: 400px;">
          <div id="map" style="height: 100%; width: 100%;"></div>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section flat>
          <q-card class="q-pa-md full-width" flat>
            <q-card-section flat>
              <div class="text-h6">Información de Contacto</div>
            </q-card-section>
            <q-card-section>
              <div class="q-mb-md">
                <div class="flex items-center q-mb-sm ">
                  <q-icon name="place" size="md" class="q-mr-sm text-grey-7 q-pb-md" />
                  <p>{{useConfiguracionSitio.direccion !== '' ? useConfiguracionSitio.direccion : 'Direeccion por defecto'}}</p>
                </div>
                <div class="flex items-center q-mb-sm">
                  <q-icon name="phone" size="md" class="q-mr-sm q-pb-md text-grey-7" />
                  <p>{{ useConfiguracionSitio.numero_telefonico !== '' ? useConfiguracionSitio.numero_telefonico : '+1 (234) 567-8900' }}</p>
                </div>
                <div class="flex">
                  <q-icon name="schedule" size="md" class="q-mr-sm text-grey-7 q-mt-xs q-pb-xl" />
                  <div>
                    <p class="text-weight-medium">Horario de Atención:</p>
                    <ul class="q-pl-md">
                      <li>Lunes - Viernes: {{useConfiguracionSitio.horario_inicio}}:00 AM - {{useConfiguracionSitio.horario_final}}:00 PM</li>
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

  new Map({
    target: 'map',
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
});
</script>
