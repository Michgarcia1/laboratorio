<template>
  <div class="q-pa-md items-start q-gutter-md">
    <q-card class="q-pa-md" style="width: 300px; height: 450px">
      <div class="q-ml-md">
        <q-icon
          class="q-mt-md"
          style="width: 50px; height: 50px"
          name="img:../../public/icons/lab.png"
        />
      </div>

      <q-form submit="confirm">
        <div class="q-mt-md q-ml-md q-mr-md">
          <p class="text-subtitle1" style="font-weight: bold">
            Restablecer contraseña
          </p>
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
            style="
              width: 100%;
              background-color: #096393;
              color: white;
              font-size: 12px;
            "
            label="Confirmar"
            @click="confirm"
          />

          <!-- Volver al inicio -->
          <p class="text-caption" style="margin-left: 65px">
            <a
              @click="() => router.push('/')"
              style="
                background: none;
                border: none;
                cursor: pointer;
                color: grey;
              "
              >Volver a iniciar sesión</a
            >
          </p>
        </q-card-actions>
      </q-form>
    </q-card>

    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="showDialog">
        <q-card>
          <q-card-section class="q-ma-sm q-mt-lg" style="width: 400px; font-size: 16px; font-weight: bold;">
            {{mensaje}}
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="bg-grey-7 q-mb-xs" no-caps label="Cerrar" @click="() => showDialog = !showDialog" color="gray"/>
            <q-btn class="q-mb-xs q-mr-xs" style="background: #096393; color: white" no-caps label="Ir al inicio" @click="() => router.push('/')"/>
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
import { useRoute } from 'vue-router';

const newPassword = ref('');
const confirmPassword = ref('');
const router = useRouter();
const showDialog = ref(false);
const messageResponse = ref('');
const route = useRoute();
const mensaje = ref('')

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
  } else if (newPassword.value !== confirmPassword.value) {
    Notify.create({
      message: 'Las contraseñas no coinciden',
      type: 'warning',
      icon: 'warning',
      timeout: 2000,
    });
    return;
  }

  const token = route.params.token;
  const id_user = route.params.user_id;

  try {
    const response = await backend.post('recovery-password/password-send/', {
      token: token,
      user_id: parseInt(id_user),
      new_password: newPassword.value
    });
    if (response.status === 200) {
      mensaje.value = response.data.message
      Loading.hide();
      messageResponse.value = response.data.message;
      showDialog.value = true;
    }
  } catch (error) {
    console.log('no entro', error);
    Loading.hide();
  }
};
</script>
