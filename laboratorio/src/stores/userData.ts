import { defineStore } from 'pinia';

export const userData = defineStore('userData', {
  state: () => ({
    email: '',
    password: '',
    id_user: 0,
    access_token: '',
    refresh_token: '',
    is_superuser: false
  }),
  actions:{
    setEmail(email:string){
      this.email = email
    },
    setPassword(password:string){
      this.password = password
    },
    setUserId(id:number){
      this.id_user = id
    },
    setAccessToken(access_token:string){
      this.access_token = access_token
    },
    setRefreshToken(refresh_token:string){
      this.refresh_token = refresh_token
    },
    setIsSuperuser(isSuperuser:boolean){
      this.is_superuser = isSuperuser
    }
  }
})
