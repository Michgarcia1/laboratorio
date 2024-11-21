<template>
  <q-page v-if="isLoading" class="row items-center justify-evenly" style="background-color: #E6EEF9;">
    <q-spinner color="primary" />
  </q-page>
  <q-page v-else class="row items-center justify-evenly" style="background-color: #E6EEF9;">
    <pageInicio />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { userData } from 'stores/userData';
import { useRouter } from 'vue-router';
import pageInicio from 'src/components/pageInicio.vue'

const { access_token } = userData()
const router = useRouter()

const isLoading = ref(true);

onMounted(() => {
  if (!access_token || access_token === '') {
    router.push('/error');
  } else {
    isLoading.value = false;
  }
})
</script>
