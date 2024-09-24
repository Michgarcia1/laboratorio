<template>
  <q-page class="row items-center justify-evenly">
    <LoginForm></loginForm>
   
  </q-page>
</template>

<script setup lang="ts">
import LoginForm from 'components/loginForm.vue';

defineOptions({
  name: 'IndexPage'
});


</script>
