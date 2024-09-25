<template>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="q-pa-md" style="width: 300px; height: 400px;">
        <q-card-section>
          <img alt="Mi icono" />
        </q-card-section>
  
        <q-card-select>
          <div class="q-ma-md"> 
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
              icon="lock"
              />
  
            <p class="text-caption q-ma-none">
              <a href="#" style="text-decoration: none; color: gray; font-size: 10px;">Olvidé mi contraseña</a>
            </p>
          </div>
  
          <!-- Botón de Iniciar Sesión -->
          <q-card-actions>
            <q-btn 
              flat 
              class="q-ma-sm" 
              no-caps 
              style="width: 100%; background-color: #096393; color: white; font-size: 12px;" 
              label="Iniciar sesión" 
              @click="handleLogin" 
            />
  
            <p class="text-caption q-ma-none" style="margin-left: 30px;">
              ¿Aún no tienes cuenta? 
              <a href="#" style="text-decoration: none; color: #096393;">Crea una</a>
            </p>
          </q-card-actions>
        </q-card-select>
      </q-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  
  const handleLogin = () => {
    // Validaciones
    if (!email.value) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }
    
    if (!password.value) {
      alert("Por favor, ingresa tu contraseña.");
      return;
    }
    
    // Lógica para iniciar sesión 
    if (email.value === "usuario@example.com" && password.value === "contraseña") {
      alert("Inicio de sesión exitoso");
      // Redirigir a otra página
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  }
  </script>
  
<style>

</style>
  