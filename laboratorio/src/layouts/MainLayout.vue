<template>
  <q-layout>
    <q-header flat style="background-color: white; color: black;">
      <q-toolbar>
        <q-btn
          v-if="$q.screen.xs"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-icon class="q-ml-xs q-mr-xs" style="width: 25px; height: 25px" name="img:public/icons/lab.png" />
        <div class="text-h6" style="font-weight: bold;">
          Laboratorio VYMAR
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      v-if="$q.screen.xs"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Sugerencias
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
import {useQuasar} from 'quasar';

defineOptions({
  name: 'MainLayout'
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'lab',
  }
];

const leftDrawerOpen = ref(false);
const $q = useQuasar();

function toggleLeftDrawer () {
  console.log($q.screen.sm)
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
