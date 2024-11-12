<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="q-pa-md" style="width: 300px; height: 450px;">
        <div class="q-ml-md">
          <q-icon class="q-mt-md" style="width: 50px; height: 50px" name="img:public/icons/lab.png" />
        </div>

        <q-form submit="confirm">
          <div class="q-mt-md q-ml-md q-mr-md">
            <p class="text-subtitle1" style="font-weight: bold;">Restablecer contraseña</p>
            <!-- Input -->
            <p class="text-caption q-ma-none q-mt-lg">Nueva contraseña</p>
            <q-input
              outlined
              type="password"
              v-model="newPassword"
              :dense="true"
              />

             <p class="text-caption q-ma-none q-mt-lg">Confirmar contraseña</p>
            <q-input
              outlined
              type="password"
              v-model="confirmPassword"
              :dense="true"
              />
             </div>

          <!-- Botón de Enviar correo -->
          <q-card-actions>
            <q-btn
              flat
              class="q-ma-sm q-mt-md"
              no-caps
              type="submit"
              style="width: 100%; background-color: #096393; color: white; font-size: 12px;"
              label="Confirmar"
              @click="confirm"
            />

            <!-- Volver al inicio -->
            <p class="text-caption" style="margin-left: 65px;">
              <a @click="() => router.push('/')" style="background: none; border: none; cursor: pointer; color: grey;">Volver a iniciar sesión</a>
            </p>
          </q-card-actions>
        </q-form>
      </q-card>

    </div>
  </template>

  <script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { backend } from 'boot/axios';
import { Loading, Notify } from 'quasar';

const newPassword = ref('');
const confirmPassword = ref('');
const router = useRouter();
const showDialog = ref(false);
const messageResponse = ref('');

const confirm = async () => {
  // Validación de contraseñas
  if (!newPassword.value || !confirmPassword.value) {
    Notify.create({
      message: 'Los campos son requeridos',
      type: 'warning',
      icon: 'warning',
      timeout: 2000,
    });
    return;
  }
  else if (newPassword.value !== confirmPassword.value) {
    Notify.create({
      message: 'Las contraseñas no coinciden',
      type: 'warning',
      icon: 'warning',
      timeout: 2000,
    });
    return;
  }

  try {
    const response = await backend.post('recovery-password/', { password: newPassword.value });
    if (response.status === 200) {
      Loading.hide();
      messageResponse.value = response.data.message;
      showDialog.value = true;
    }
  } catch (error) {
    Loading.hide();
  }
};
</script>


<style>

</style>

