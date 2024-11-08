import { defineStore } from 'pinia';
import { ServicioClinico } from 'src/interfaces/Interfaces';
export const serviciosDisponibles = defineStore('serviciosDisponibles', {
  state: () => ({
    servicios : [] as ServicioClinico[]
  }),
  actions:{
    setServiciosDisponibles(servicios:ServicioClinico[]){
      this.servicios.push(...servicios);
    },
    reset(){
      this.$state = {
        servicios : [] as ServicioClinico[]
      }
    }
  },
})
