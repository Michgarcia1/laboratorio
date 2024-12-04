<template>
  <q-layout>
    <q-header flat style="background-color: white; color: black">
      <q-toolbar>
        <q-img
          class="q-ml-xs q-mr-xs"
          style="width: 35px; height: 35px"
          :src="useConfiguracionSitio.logo"
        />
        <div
          class="text-h6"
          style="font-weight: bold; cursor: pointer"
          @click="irAInicio"
        >
          {{ useConfiguracionSitio.nombre_sitio }}
        </div>
        <div
          v-if="useUserData.access_token !== ''"
          class="flex justify-end q-gutter-md"
          style="flex-grow: 1;"
        >
          <q-avatar size="48px">
            <q-icon
              name="logout"
              class="cursor-pointer"
              @click="cerrarSesion"/>
            <q-tooltip class="">Cerrar sesion</q-tooltip>
          </q-avatar>
        </div>
        <div
          v-if="
            useUserData.access_token === '' &&
            useConfiguracionSitio.activo &&
            !rutas_path.includes(rt.path) &&
            rt.matched[1].path !== '/restablecer-contrasena/:token/:uuid_user'
          "
          class="flex row justify-end q-gutter-md"
          style="flex-grow: 1"
        >
          <div>
            <q-btn @click="() => router.push('/iniciar-sesion')" flat>
              <q-tooltip class="">Iniciar sesion</q-tooltip>
              <q-icon name="person" size="25px" />
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <componenteFooter />
  </q-layout>
</template>

<script setup lang="ts">
import componenteFooter  from 'components/componenteFooter.vue'
import { useQuasar } from 'quasar';
import { userData } from 'stores/userData';
import { useRouter, useRoute } from 'vue-router';
import { backend } from 'boot/axios';
import { onMounted } from 'vue';
import { configuracionSitio } from 'stores/configuracionSitio';

defineOptions({
  name: 'MainLayout'
});

const useUserData = userData();
const router = useRouter();
const $q = useQuasar();
const useConfiguracionSitio = configuracionSitio()
const rt = useRoute()
const rutas_path = [
  '/iniciar-sesion',
  '/registro',
  '/olvide-contrasena'
]

onMounted(async () => {
  try{
    const response = await backend.get('configuracion-sitio/');
    if (response.status === 200) {
      if(response.data.results.length > 0){
        useConfiguracionSitio.setSiteConfig(response);
      }
    }
  }catch (error) {
    useConfiguracionSitio.reset()
  }

});

const irAInicio = () => {
    router.push('/');
};

const cerrarSesion = async () => {
  try {
    const { access_token, refresh_token } = useUserData;

    await backend.post('/logout/', { refresh: refresh_token }, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    useUserData.reset()

    $q.notify({
      type: 'positive',
      message: 'Sesión finalizada con éxito',
      icon: 'check',
      position: 'top'
    });

    await router.push('/');

  } catch (error) {
    const err = error as { response: { data: { detail: string } } };
    if (err.response.data.detail === 'Access token is invalid. Please refresh your token.'){
      useUserData.reset()
      router.push('/');
    }
  }
};
</script>
