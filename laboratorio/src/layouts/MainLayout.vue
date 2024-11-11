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
        <div class="flex justify-end q-gutter-md" style="flex-grow: 1;">
          <a v-if="useUSerData.access_token !== ''" @click="cerrarSesion" style="background: none; border: none; cursor: pointer; color: #096393; font-size: 15px; font-weight: bold">Cerrar sesión</a>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>
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
import { useQuasar } from 'quasar';
import { userData } from 'stores/userData';
import { useRouter } from 'vue-router';
import {backend} from 'boot/axios';


defineOptions({
  name: 'MainLayout'
});

const useUSerData = userData();
const router = useRouter();
const $q = useQuasar();
const leftDrawerOpen = ref(useUSerData.access_token !== '');

const cerrarSesion = async () => {
  try {
    const { access_token, refresh_token } = useUSerData;

    await backend.post('/logout/', { refresh: refresh_token }, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    useUSerData.access_token = '';
    useUSerData.refresh_token = '';

    $q.notify({
      type: 'positive',
      message: 'Sesión cerrada exitosamente',
      icon: 'check',
      position: 'top'
    });

    await router.push('/');

  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    $q.notify({
      type: 'negative',
      message: 'No se pudo cerrar la sesión',
      icon: 'error',
      position: 'top'
    });
  }
};

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

function toggleLeftDrawer() {
  console.log($q.screen.sm);
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
