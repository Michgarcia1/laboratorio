import { defineStore } from 'pinia';

export const userData = defineStore('userData', {
  state: () => ({
    email: '',
    password: '',
    access_token: '',
    refresh_token: '',
  }),
  actions:{
    setEmail(email:string){
      this.email = email
    },
    setPassword(password:string){
      this.password = password
    },
    setAccessToken(access_token:string){
      this.access_token = access_token
    },
    setRefreshToken(refresh_token:string){
      this.refresh_token = refresh_token
    }
  }
})
