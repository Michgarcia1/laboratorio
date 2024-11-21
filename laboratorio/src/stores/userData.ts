import { defineStore } from 'pinia';
import { ResponseLogin } from 'src/interfaces/Interfaces';

export const userData = defineStore('userData', {
  state: () => {
    const userDataString = sessionStorage.getItem('userData');
    let parsedUserData = {
      email: '',
      password: '',
      id_user: 0,
      access_token: '',
      refresh_token: '',
      is_superuser: false,
    };
    if (userDataString) {
      try {
        parsedUserData = JSON.parse(userDataString);
      } catch (error) {
        console.error('Error al analizar los datos de sessionStorage:', error);
      }
    }

    return {
      email: '',
      password: '',
      id_user: parsedUserData.id_user || '',
      access_token: parsedUserData.access_token || '',
      refresh_token: parsedUserData.refresh_token || '',
      is_superuser: parsedUserData.is_superuser || false,
    };
  },

  actions: {
    setUserId(id: number) {
      this.id_user = id;
    },
    setAccessToken(access_token: string) {
      this.access_token = access_token;
    },
    setRefreshToken(refresh_token: string) {
      this.refresh_token = refresh_token;
    },
    setIsSuperuser(isSuperuser: boolean) {
      this.is_superuser = isSuperuser;
    },
    setUserData(data: ResponseLogin) {
      const userDataToStore = {
        access_token: data.data.access,
        refresh_token: data.data.refresh,
        is_superuser: data.data.is_superuser,
        id_user: data.data.user_id,
      };
      sessionStorage.setItem('userData', JSON.stringify(userDataToStore));
      this.access_token = userDataToStore.access_token;
      this.refresh_token = userDataToStore.refresh_token;
      this.is_superuser = userDataToStore.is_superuser;
      this.id_user = userDataToStore.id_user;
    },
    reset() {
      this.access_token = '';
      this.refresh_token = '';
      this.is_superuser = false;
      this.id_user = '';
      sessionStorage.clear()
    }
  },
})
