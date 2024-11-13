<template>
    <q-page class="row q-pt-lg justify-evenly" style="background-color: #E6EEF9;">
       <div class="q-gutter-sm">
         <q-select
           filled
           use-input
           :options="options"
           option-label="numero_cita"
           option-value="numero_cita"
           input-debounce="0"
           label="Simple filter"
           @filter="filterFn"
           style="background: white"
           behavior="menu"
         />
       </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { backend } from 'boot/axios';

const options = ref([])

let stringOptions = [
  'Google', 'Facebook'
]

onMounted(async () => {
  const response = await backend.get('registro-citas/')
  response.data.results.map((objeto) => {
    stringOptions.push(objeto)
  })
})


function filterFn (val, update) {
  if (val === '') {
    update(() => {
      options.value = stringOptions
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

</script>
