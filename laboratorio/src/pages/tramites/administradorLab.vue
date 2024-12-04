<template>
    <q-page class="row items-center justify-evenly" style="background-color: #E6EEF9;">
      <div v-if="loading">
        <adminLab/>
      </div>

      <div v-else>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >


        <q-inner-loading
          :showing="true"
          label="Please wait..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />

        </transition>
      </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { backend } from 'boot/axios';
import adminLab from 'components/tramites/adminLab.vue';
import { userData } from 'stores/userData';
import { useRouter } from 'vue-router';

const {access_token} = userData()
const loading = ref(false);
const router = useRouter();

onMounted(async() => {
  try{
    const response = await backend.post('/verify-token/verify/', {
      token: access_token
    }, {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'multipart/form-data'
      }
    })
    if(response.status === 200){
      loading.value = true
    }
  }catch(error){
    await router.push('/error')
  }
})

</script>
