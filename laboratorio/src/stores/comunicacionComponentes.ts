import { defineStore } from 'pinia';

export const comunicacionComponentes = defineStore('comunicacionComponentes', {
  state: () => ({
    dialogSubirResultados: false
  }),
  actions: {
    setDialogSubirResultados(activo:boolean) {
      this.dialogSubirResultados = activo
    },
  },
});
