import { defineStore } from 'pinia';

export const userData = defineStore('userData', {
  state: () => ({
    email: '',
    password: ''
  }),
  actions:{
    setEmail(email:string){
      this.email = email
    },
    setPassword(password:string){
      this.password = password
    }
  }
})
