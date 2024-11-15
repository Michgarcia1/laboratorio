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
          <div v-show="showSimulatedReturnData">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel magna eu risus laoreet tristique. Nulla ut fermentum elit, nec consequat augue. Morbi et dolor nec metus tincidunt pellentesque. Nullam non semper ante. Fusce pellentesque sagittis felis quis porta. Aenean condimentum neque sed erat suscipit malesuada. Nulla eget rhoncus enim. Duis dictum interdum eros.
          </div>
        </transition>

        <q-inner-loading
          :showing="true"
          label="Please wait..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
      </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { backend } from 'boot/axios';
import adminLab from 'components/tramites/adminLab.vue';
import { userData } from 'stores/userData';

const {access_token} = userData()
const loading = ref(false);

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
    console.log('vamonos')
  }
})

</script>
