<template>
  <q-page class="row items-center justify-evenly" style="background-color: #dbedf5;">
    <LoginForm></loginForm>
   
  </q-page>
</template>

<script setup lang="ts">
import LoginForm from 'components/loginForm.vue';

defineOptions({
  name: 'IndexPage'
});


</script>
