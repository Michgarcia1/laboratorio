<template>
  <div class="q-ma-lg q-pa-sm">
    <q-dialog
      persistent
      v-model="visibleDialog">
      <q-card style="max-width: 450px">
        <q-card-section>
          <q-input
            v-model="fileInput"
            type="file"
            accept="application/pdf"
            color="blue"
            class="q-my-md q-ml-md q-mr-md"
            dense
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="upload" color="blue" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions class="flex row justify-end">

          <q-btn
            @click="() => {
              useComunicacionComponentes.setDialogSubirResultados(false)
              fileInput = null
            }"
            color="grey"
          >
            Cerrar
          </q-btn>

          <q-btn
            color="blue"
            text-color="white"
            @click="subirResultado"
          >
            Subir
          </q-btn>

        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { comunicacionComponentes } from 'stores/comunicacionComponentes';
import { backend } from 'boot/axios';
import { userData } from 'stores/userData';
import { Loading, Notify } from 'quasar';
import { useRouter } from 'vue-router';

const props = defineProps({
  showLoading: Boolean,
  cita_escogida: Number,
  folioCita: String,
  nombreEstudio: String,
  userID: Number
})

const useComunicacionComponentes = comunicacionComponentes()
const visibleDialog = ref(props.showLoading)
const numero_cita = ref(props.cita_escogida)
const folioCita = ref(props.folioCita)
const nombreEstudio = ref(props.nombreEstudio)
const userID = ref(props.userID)
const fileInput = ref(null)
const {access_token} = userData()
const router = useRouter()

watch(() => props.showLoading, (newValue:boolean) => {
    visibleDialog.value = newValue
  }
)

watch(() => props.userID, (newValue:number | undefined) => {
  if(newValue !== undefined){
    userID.value = newValue
  }
})

watch(() => props.nombreEstudio, (newValue:string | undefined) => {
  if (newValue !== undefined) {
    nombreEstudio.value = newValue
  }
})

watch(() => props.cita_escogida, (newValue: number | undefined) => {
  if (newValue !== undefined) {
    numero_cita.value = newValue;
  }
});

watch(() => props.folioCita, (newValue:string | undefined) => {
  if (newValue !== undefined) {
    folioCita.value = newValue;
  }
})

const subirResultado = async () => {
  Loading.show()
  if (fileInput.value){

    const file = fileInput.value[0];
    const formData = new FormData();

    formData.append('archivo', file);
    formData.append('dating', String(numero_cita.value ?? 1));
    formData.append('folio_cita', folioCita.value ?? '')
    formData.append('nombre_estudio', nombreEstudio.value ?? '')
    formData.append('user_id', String(userID.value ?? 1))

    try{
      const response = await backend.post('/resultado-citas/', formData, {
        headers: {
          'Authorization': 'Bearer ' + access_token,
          'Content-Type': 'multipart/form-data'
        }
      });
      if(response.status === 201){
        Loading.hide()
        fileInput.value = null

      }
    }catch(error){
      await router.push('/error')
    }
  }else{
    Loading.hide()
    Notify.create({
      message: 'Debe de seleccionar al menos un archivo!',
      icon: 'warning',
      type: 'warning',
      timeout: 2000,
    })
  }
}
</script>
