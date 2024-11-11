<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="q-pa-md" style="width: 300px; height: 510px;">
        <div class="q-ml-md">
          <q-icon class="q-mt-md" style="width: 50px; height: 50px" name="img:public/icons/lab.png" />
        </div>

        <q-form submit="crearCuenta">
          <div class="q-mt-md q-ml-md q-mr-md">
            <p class="text-subtitle1" style="font-weight: bold;">Crear cuenta</p>
            <!-- Input -->
            <p class="text-caption q-ma-none">Nombre</p>
            <q-input
              outlined
              type="text"
              v-model="text"
              :dense="true"
              />

            <p class="text-caption q-mt-xs q-ma-none">Correo electrónico</p>
            <q-input
              outlined
              type="email"
              v-model="email"
              :dense="true"
              />

            <p class="text-caption q-mt-xs q-ma-none">Contraseña</p>
            <q-input
              outlined
              type="password"
              v-model="password"
              :dense="true"
              />

            <p class="text-caption q-mt-xs q-ma-none">Confirmar contraseña</p>
            <q-input
              outlined
              type="password"
              v-model="passwordConfirm"
              :dense="true"
              />

          </div>

          <!-- Botón de Crear cuenta -->
          <q-card-actions>
            <q-btn
              flat
              class="q-ma-sm"
              no-caps
              type="submit"
              style="width: 100%; background-color: #096393; color: white; font-size: 12px;"
              label="Crear cuenta"
              @click="crearCuenta"
            />

            <p class="text-caption q-ma-none" style="margin-left: 30px;">
              ¿Ya tienes cuenta?
              <a @click="() => router.push('/')" style="background: none; border: none; cursor: pointer; color: #096393;">Iniciar sesión</a>
            </p>
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// import { userData } from 'stores/userData';
import { Notify } from 'quasar';
import {backend} from 'boot/axios';
import {ResponseRegister} from 'src/interfaces/Interfaces';


const text = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const router = useRouter();
// const useUserData = userData();

// const usersDatabase = ref([]);

const crearCuenta = async () => {
  // Validaciones
  if (!text.value) {
    Notify.create({
      message: 'Por favor, ingresa tu nombre.',
      type: 'warning',
      icon: 'warning',
      timeout: 2000,
    });
    return;
  }

  if (!email.value || (email.value.match(/@/) || []).length !== 1) {
    Notify.create({
      message: !email.value
        ? 'Por favor, ingresa tu correo electrónico.'
        : 'Ingresar un correo electrónico válido.',
      type: 'warning',
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
    return;
  }

  if (password.value !== passwordConfirm.value) {
    Notify.create({
      message: 'Las contraseñas no coinciden.',
      type: 'warning',
      icon: 'warning',
      timeout: 2000,
    });
    return;
  }

  try{
      const response:ResponseRegister = await backend.post('register/', {
      username: text.value,
      email: email.value,
      password: password.value,
    }, {})

    if(response.status === 201) {
      Notify.create({
      message: 'Cuenta creada exitosamente.',
      type: 'positive',
      icon: 'check',
      timeout: 2000,
      });
    }
  }catch(error:unknown){

    Notify.create({
      message: (error as { response: { data: {email: ''} } }).response.data.email,
      type: 'negative',
      icon: 'error',
      timeout: 2000,
      });
  }


};

</script>
