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
import { backend } from 'boot/axios';
import { comunicacionComponentes } from 'stores/comunicacionComponentes';

const { access_token } = userData()
const router = useRouter()
const useComunicacionComponentes = comunicacionComponentes()

const isLoading = ref(true);

onMounted(async () => {
  try{
    const response = await backend.post('/verify-token/verify/', {
      token: access_token
    }, {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(response.data, 'da')
    if(response.status === 200){
      isLoading.value = false
    }
  }catch (error) {
    await router.push('/error')
  }

  finally {
    useComunicacionComponentes.setShowSpinner(true)
  }
})
</script>
