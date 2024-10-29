<template>
  <q-layout>
    <q-header flat style="background-color: white; color: black;">
      <q-toolbar>
        <q-btn
          v-if="useUSerData.access_token !== ''"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-icon class="q-ml-xs q-mr-xs" style="width: 25px; height: 25px" name="img:public/icons/lab.png" />
        <div class="text-h6"
             style="font-weight: bold; cursor: pointer;"
             @click="$router.push('/inicio')">
          Laboratorio VYMAR
        </div>
        <div>
        </div>
        <div class="flex justify-end q-gutter-md" style="flex-grow: 1;">
          <!--<div>
            <q-btn flat icon="shopping_cart" size="18px" @click="$router.push('/proceso-de-compra')" style="background: none; border: none; cursor: pointer; color: #096393;"/>
          </div>-->
          <button style="background: none; border: none; cursor: pointer; color: #096393; font-size: 15px; font-weight: bold">Cerrar sesión</button>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
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
import {userData} from 'stores/userData';

defineOptions({
  name: 'MainLayout'
});

const useUSerData = userData()

const linksList: EssentialLinkProps[] = [
  {
    title: 'Exámenes clínicos',
    link: 'examenes-clinicos'
  },
  {
    title: 'Resultados',
    link: 'resultados'
  },
  {
    title: 'Ubicación',
    link: 'ubicacion'
  }
];

const leftDrawerOpen = ref(useUSerData.access_token !== '');
const $q = useQuasar();

function toggleLeftDrawer () {
  console.log($q.screen.sm)
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
