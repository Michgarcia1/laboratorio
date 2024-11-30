<template>
  <div id="map" style="height: 70%; width: 100%;"></div>
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
