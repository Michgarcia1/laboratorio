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
              <q-btn @click="() => router.push('/')" style="background: none; border: none; cursor: pointer; color: #096393;">Iniciar sesión</q-btn>
            </p>
          </q-card-actions>
        </q-card-select>
      </q-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userData } from 'stores/userData';
import { Notify } from 'quasar';

const text = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const router = useRouter();
const useUserData = userData();

const usersDatabase = ref([]);

const crearCuenta = () => {
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

  // Verificar si el usuario ya existe
  const userExists = usersDatabase.value.find(user => user.email === email.value);
  if (userExists) {
    Notify.create({
      message: 'Cuenta ya existente.',
      type: 'warning',
      icon: 'warning',
      timeout: 2000,
    });
    return;
  }

  // Crear el nuevo usuario
  usersDatabase.value.push({ name: text.value, email: email.value, password: password.value });
  useUserData.setEmail(email.value);
  useUserData.setPassword(password.value);
  Notify.create({
    message: 'Cuenta creada exitosamente.',
    type: 'positive',
    icon: 'check',
    timeout: 2000,
  });
  // router.push('/');
};

</script>
