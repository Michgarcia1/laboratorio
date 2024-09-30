<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="q-pa-md" style="width: 300px; height: 510px;">
        <div class="q-ml-md">
          <q-icon class="q-mt-md" style="width: 50px; height: 50px" name="img:public/icons/lab.png" />
        </div>

        <q-card-select>
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

            <p class="text-caption q-mt-xs q-ma-none">Repetir contraseña</p>
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
              <button @click="() => router.push('/')" style="background: none; border: none; cursor: pointer; color: #096393;">Iniciar sesión</button>
            </p>
          </q-card-actions>
        </q-card-select>
      </q-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

  const text = ref('');
  const email = ref('');
  const password = ref('');
  const passwordConfirm = ref('');
  const router = useRouter('');

  const crearCuenta = () => {
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
