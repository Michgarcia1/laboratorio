<template>
    <div class="q-gutter-sm q-ml-xs row">
      <q-select
        outlined
        :model-value="selectedOption"
        use-input
        behavior="menu"
        hide-selected
        option-label="numero_cita"
        option-value="numero_cita"
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        @input-value="setModel"
        :style="$q.screen.lt.sm ? {background: 'white', width: '73%'} : {background: 'white', width: '88%'}"
      />
      <q-btn no-caps
             @click="() => buscarCita(selectedOption)"
            :label="$q.screen.lt.sm ? '' : 'Buscar'"
            icon="search"
            type="submit"
            :style="$q.screen.lt.sm ? {fontWeight: 'bold', background: '#096393', color: 'white', width: '19%' } : {fontWeight: 'bold', background: '#096393', color: 'white', width: '10%' } "
      />

    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { backend } from 'boot/axios';
import { citasMedicas } from 'stores/citasMedicas';
import { userData } from 'stores/userData';

const options = ref([])
const stringOptions = ref([])
const selectedOption = ref('')
const useCitasMedicas = citasMedicas()

const { access_token } = userData()

watch(() => useCitasMedicas.citas, (newValue) => {
  stringOptions.value.push(...newValue)
  options.value = stringOptions.value
})

function filterFn (val, update) {
  update(() => {
    const needle = val.toLocaleLowerCase()
    console.log(needle)
    console.log(selectedOption.value)
    if(needle !== selectedOption.value.toLowerCase()) {
      reestablecerValores()
      options.value = []
    }
    options.value = stringOptions.value.filter(v => v.numero_cita.toLocaleLowerCase().indexOf(needle) > -1)
  })

}

function setModel (val) {
  selectedOption.value = val
}

const reestablecerValores = async () => {
  const response = await backend.get('registro-citas/', {
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'multipart/form-data'
    }
  })
  useCitasMedicas.setCitasMedicas(response.data.results)
}

const buscarCita = async (opcion) => {
  const response = await backend.get('registro-citas/numero_cita', {
      params: {
        numero_cita: opcion
      },
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'multipart/form-data',
      }
  })
  const citasMedicas = Array.isArray(response.data) ? response.data : [response.data];
  useCitasMedicas.setCitasMedicas(citasMedicas)
}

</script>
