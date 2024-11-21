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
        <div
          v-if="useUserData.access_token !== ''"
          class="flex justify-end q-gutter-md"
          style="flex-grow: 1">
          <q-btn icon="menu" flat>
            <q-menu class="q-ml-xl" transition-show="scale" transition-hide="scale">
              <q-list>
                <q-item class="flex column ">
                  <q-item-section>
                    <q-icon name="shopping_card" flat/>
                  </q-item-section>
                  <q-item-section>
                   <q-btn icon="logout" flat @click="cerrarSesion" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
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


const useUserData = userData();
const router = useRouter();
const $q = useQuasar();

const irAInicio = () => {
  if (useUserData.access_token !== '') {
    router.push('/inicio');
  }
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
