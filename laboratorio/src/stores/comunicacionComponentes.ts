import { defineStore } from 'pinia';

export const comunicacionComponentes = defineStore('comunicacionComponentes', {
  state: () => ({
    dialogSubirResultados: false,
    showSpinner: true,
  }),
  actions: {
    setDialogSubirResultados(activo:boolean) {
      this.dialogSubirResultados = activo
    },
    setShowSpinner(activo: boolean) {
      this.showSpinner = activo;
    },
  },
});
