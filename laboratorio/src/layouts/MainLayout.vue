<template>
  <q-layout>
    <q-header flat style="background-color: white; color: black;">
      <q-toolbar>
        <q-icon class="q-ml-xs q-mr-xs" style="width: 25px; height: 25px" name="img:../../public/icons/lab.png" />
        <div class="text-h6"
             style="font-weight: bold; cursor: pointer;"
             @click="irAInicio">
          Laboratorio VYMAR
        </div>
        <div class="flex justify-end q-gutter-md" style="flex-grow: 1;">
          <a v-if="useUSerData.access_token !== ''" @click="cerrarSesion" style="background: none; border: none; cursor: pointer; color: #096393; font-size: 15px; font-weight: bold">Cerrar sesión</a>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { userData } from 'stores/userData';
import { useRouter } from 'vue-router';
import { backend } from 'boot/axios';

defineOptions({
  name: 'MainLayout'
});

const useUSerData = userData();
const router = useRouter();
const $q = useQuasar();

const irAInicio = () => {
  if (useUSerData.access_token !== '') {
    router.push('/inicio');
  }
};

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
      message: 'Sesión finalizada con éxito',
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
</script>
