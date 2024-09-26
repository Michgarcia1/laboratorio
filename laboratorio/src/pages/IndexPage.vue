<template>
  <q-page class="row items-center justify-evenly" style="background-color: #E6EEF9;">
    <LoginForm/>
  </q-page>
</template>

<script setup lang="ts">
import LoginForm from 'components/loginForm.vue';

defineOptions({
  name: 'IndexPage'
});


</script>
