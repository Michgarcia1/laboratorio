<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="q-pa-md" style="width: 300px; height: 380px;">
        <div class="q-ml-md">
          <q-icon class="q-mt-md" style="width: 50px; height: 50px" name="img:public/icons/lab.png" />
        </div>

        <q-card-select>
          <div class="q-mt-md q-ml-md q-mr-md">
            <p class="text-subtitle1" style="font-weight: bold;">Recuperar contraseña</p>
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
              <button @click="() => router.push('/')" style="background: none; border: none; cursor: pointer; color: grey;">Volver a iniciar sesión</button>
            </p>
          </q-card-actions>
        </q-card-select>
      </q-card>


    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const email = ref('');
  const password = ref('');
  const router = useRouter('');

  const login = () => {
    // Validaciones
    if (!email.value) {
      alert('Por favor, ingresa tu correo electrónico.');
      return;
    }

    if (!password.value) {
      alert('Por favor, ingresa tu contraseña.');
      return;
    }

    // Lógica para iniciar sesión
    if (email.value === 'usuario@example.com' && password.value === 'contraseña') {
      alert('Inicio de sesión exitoso');
      // Redirigir a otra página
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  }
  </script>

<style>

</style>

