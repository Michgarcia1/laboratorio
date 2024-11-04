import { defineStore } from 'pinia';

export const procesoCompra = defineStore('procesoCompra', {
  state: () => ({
    nombre_servicio: '',
    icono: '',
    precio: 0,
  }),
  actions:{
    setNombreServicio(nombre_servicio:string){
      this.nombre_servicio = nombre_servicio
    },
    setIcono(icono:string){
      this.icono = icono
    },
    setPrecio(precio:number){
      this.precio = precio
    }
  }
})
