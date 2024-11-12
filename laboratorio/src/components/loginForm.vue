<template>
    <div class="q-pa-md items-start q-gutter-md">
      <q-card class="q-pa-md" style="width: 300px; height: 450px;">
        <div class="q-ml-md">
          <q-icon class="q-mt-md" style="width: 50px; height: 50px" name="img:public/icons/lab.png" />
        </div>

        <q-form submit="login">
          <div class="q-mt-md q-ml-md q-mr-md">
            <p class="text-subtitle1" style="font-weight: bold;">Bienvenido</p>
            <!-- Input -->
            <p class="text-caption q-ma-none">Correo electrónico</p>
            <q-input
              outlined
              type="email"
              v-model="email"
              :dense="true"
              />

            <p class="text-caption q-mt-md q-ma-none">Contraseña</p>
            <q-input
              outlined
              type="password"
              v-model="password"
              :dense="true"
              />


            <!-- Contraseña -->
            <p class="text-caption q-ma-none q-mt-xs">
              <a @click="() => router.push('/olvide-contrasena')" style="background: none; border: none; cursor: pointer; color: grey;">Olvidé mi contraseña</a>
            </p>
          </div>

          <!-- Botón de Iniciar Sesión -->
          <q-card-actions>
            <q-btn
              flat
              class="q-ma-sm"
              no-caps
              type="submit"
              style="width: 100%; background-color: #096393; color: white; font-size: 12px;"
              label="Iniciar sesión"
              @click="login"
            />

            <p class="text-caption q-ma-none" style="margin-left: 30px;">
              ¿Aún no tienes cuenta?
              <a @click="() => router.push('/registro')" style="background: none; border: none; cursor: pointer; color: #096393;">Crea una</a>
            </p>
          </q-card-actions>
        </q-form>
      </q-card>


    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userData } from 'stores/userData';
import { Notify } from 'quasar';
import {backend} from 'boot/axios';
import {ResponseLogin} from 'src/interfaces/Interfaces';

const email = ref('');
const password = ref('');
const router = useRouter();
const useUserData = userData();

const login = async () => {
  // Validaciones
  if (!email.value || (email.value.match(/@/g) || []).length !== 1) {
    Notify.create({
      message: !email.value
        ? 'Por favor, ingresa tu correo electrónico.'
        : 'Ingresar un correo electrónico válido.',
      type: 'negative',
      icon: 'warning',
      timeout: 2000,
    });
    return;
  }

  if (!password.value) {
    Notify.create({
      message: 'Por favor, ingresa tu contraseña.',
      type: 'warning',
      icon: 'warning',
      timeout: 2000,
    });
  }

  const response: ResponseLogin = await backend.post('/login/', {
    email: email.value,
    password: password.value,
  });

  console.log(response.data.user_id)

  if (response.status === 200 && response.data.access !== '') {
    // Guardar los datos del usuario en sessionStorage
    sessionStorage.setItem('user_data', JSON.stringify({
      access: response.data.access,
      refresh: response.data.refresh,
      user_id: response.data.user_id,
      is_superuser: response.data.is_superuser,  // Asegúrate de que este dato esté disponible en la respuesta
    }));

    // Guardar el token de acceso por separado si es necesario
    sessionStorage.setItem('access', response.data.access);

    // Guardar el token de refresh si es necesario
    useUserData.setAccessToken(response.data.access)
    useUserData.setRefreshToken(response.data.refresh);
    useUserData.setUserId(response.data.user_id);

    router.push('/inicio');
  }

}

</script>

<style>

</style>
