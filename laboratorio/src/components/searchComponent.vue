<template>
    <div class="q-gutter-sm q-ml-xs row">
      <q-select
        outlined
        use-input
        :options="options"
        option-label="numero_cita"
        option-value="numero_cita"
        input-debounce="0"
        label="Buscar cita"
        @filter="filterFn"
        :menu-anchor="false"
        :style="$q.screen.lt.sm ? {background: 'white', width: '73%'} : {background: 'white', width: '88%'}"
        behavior="menu"
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

const stringOptions = ref([
  'Google', 'Facebook'
])

onMounted(async () => {
  const response = await backend.get('registro-citas/')
  stringOptions.value.push(...response.data.results)
  options.value = stringOptions.value
})

function filterFn (val, update) {
  if (val === '') {
    update(() => {
      options.value = stringOptions.value
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    options.value = stringOptions.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

</script>

<style scoped>

</style>
