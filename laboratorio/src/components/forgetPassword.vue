<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="q-pa-md" style="width: 300px; height: 380px;">
        <div class="q-ml-md">
          <q-icon class="q-mt-md" style="width: 50px; height: 50px" name="img:public/icons/lab.png" />
        </div>

        <q-form submit="login">
          <div class="q-mt-md q-ml-md q-mr-md">
            <p class="text-subtitle1" style="font-weight: bold;">Restablecer contraseña</p>
            <!-- Input -->
            <p class="text-caption q-ma-none q-mt-lg">Correo electrónico</p>
            <q-input
              outlined
              type="email"
              v-model="email"
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
              label="Enviar correo"
              @click="login"
            />

            <!-- Volver al inicio -->
            <p class="text-caption" style="margin-left: 65px;">
              <a @click="() => router.push('/')" style="background: none; border: none; cursor: pointer; color: grey;">Volver a iniciar sesión</a>
            </p>
          </q-card-actions>
        </q-form>
      </q-card>

      <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="showDialog">
          <q-card>
            <q-card-section>
              {{messageResponse}}
            </q-card-section>
            <q-card-actions>
              <q-btn @click="() => showDialog = !showDialog" color="primary" label="cerrar"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { backend } from 'boot/axios';
  import { Loading, Notify } from 'quasar';

  const email = ref('');
  const router = useRouter('');
  const showDialog = ref(false);
  const messageResponse = ref('')

  const login = async() => {
    Loading.show({
      message: 'Enviando ...'
    })
    // Validaciones
    if (!email.value) {
      Loading.hide()
      Notify.create({
        message: 'Por favor ingresa tu correo electrónico',
        type: 'warning',
        icon: 'warning',
        timeout: 2000,
      });
      return;
    }

    try{
      const response = await backend.post('recovery-password/', {email: email.value});
      if (response.status === 200) {
        Loading.hide()
        messageResponse.value = response.data.message
        showDialog.value = true;
      }
    }catch(error){
      Loading.hide()
      Notify.create({
        message: error.response.data.email,
        type: 'warning',
        icon: 'warning',
        timeout: 2000,
      });
    }

  }
  </script>

<style>

</style>

