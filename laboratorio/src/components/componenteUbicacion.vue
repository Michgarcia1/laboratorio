<template>
  <div id="map" style="height: 70%; width: 100%;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

onMounted(() => {
  new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([-99.1332, 19.4326]),
      zoom: 2,
    }),
  });
});

</script>
