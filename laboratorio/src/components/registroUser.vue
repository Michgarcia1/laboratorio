<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="q-pa-md" style="width: 300px; height: 450px;">
        <div>
          <img alt="Mi icono" />
          <p class="text-center text-subtitle1" style="font-weight: bold;">Crea una cuenta</p>
        </div>
  
        <q-card-select>
          <div class="q-ma-md"> 
            
            <!-- Input -->
            <p class="text-caption q-ma-none">Nombre</p>
            <q-input
              outlined 
              type="text" 
              v-model="email"
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
              icon="lock"
              />

            <p class="text-caption q-mt-xs q-ma-none">Repetir contraseña</p>
            <q-input
              outlined 
              type="password" 
              v-model="password"
              :dense="true"
              icon="lock"
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
              @click="handleLogin" 
            />
  
            <p class="text-caption q-ma-none" style="margin-left: 30px;">
              ¿Ya tienes cuenta? 
              <button @click="() => router.push('/')" style="text-decoration: none; color: #096393;">Iniciar sesión</button>
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
  
  const handleLogin = () => {
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