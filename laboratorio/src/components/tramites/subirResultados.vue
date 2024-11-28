<template>
  <div class="q-ma-lg q-pa-sm">
    <q-dialog v-model="visibleDialog">
      <q-card>
        <q-card-section>
          <q-uploader
            color="blue"
            bordered
            square
            :filter="checkFileType"
            @rejected="onRejected"
            add-button
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuasar, QRejectedEntry } from 'quasar'

const props = defineProps({
  showLoading: Boolean,
})

const visibleDialog = ref(props.showLoading)

function checkFileType(files: readonly File[] | FileList): readonly File[] {
  console.log(files, 'files')
  return Array.from(files).filter(file => file.type === 'application/pdf')
}

function onRejected(rejectedEntries: QRejectedEntry[]) {
  const $q = useQuasar()
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  })
}

watch(() => props.showLoading, (newValue: boolean) => {
    visibleDialog.value = newValue
  }
)
</script>
