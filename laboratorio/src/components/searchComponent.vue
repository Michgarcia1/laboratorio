<template>
    <div class="q-gutter-sm q-ml-xs row">
      <q-select
        filled
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
      :label="$q.screen.lt.sm ? '' : 'Buscar'"
      icon="search"
       type="submit"
      :style="$q.screen.lt.sm ? {fontWeight: 'bold', background: '#096393', color: 'white', width: '19%' } : {fontWeight: 'bold', background: '#096393', color: 'white', width: '10%' } "
      />

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { backend } from 'boot/axios';

const options = ref([])
const stringOptions = ref([])
const selectedOption = ref('')

onMounted(async () => {
  const response = await backend.get('registro-citas/')
  stringOptions.value.push(...response.data.results)
  options.value = stringOptions.value
})

function filterFn (val, update, abort) {
  update(() => {
    console.log(abort)
    const needle = val.toLocaleLowerCase()
    options.value = stringOptions.value.filter(v => v.numero_cita.toLocaleLowerCase().indexOf(needle) > -1)
  })
}

function setModel (val) {
  selectedOption.value = val
}

</script>
