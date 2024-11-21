<template>
  <main class="flex justify-center full-width" style="height: 100vh">
    <ErrorComponente :componente="access_token === null || access_token === '' ? errorUnauthorized : errorRefreshToken" />
  </main>
</template>

<script setup lang="ts">
import ErrorComponente from 'components/ErrorComponente.vue';
import { errorRefreshToken, errorUnauthorized } from 'src/utils/Messages';

const access_token = sessionStorage.getItem('userData');

defineOptions({
  name: 'ErrorNotFound'
});
</script>
