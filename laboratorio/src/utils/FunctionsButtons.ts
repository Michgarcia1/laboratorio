import { backend } from 'boot/axios';
import { ResponseLogin } from 'src/interfaces/Interfaces';
import { userData } from 'stores/userData';
import { useRouter } from 'vue-router';

const useUserData = userData()
const router = useRouter();

export default async function RefreshTokenFunctio() {
  const userData = sessionStorage.getItem('userData') || 'null';


  const dataJson = JSON.parse(userData);

  const data = {
    refresh: dataJson.refresh_token,
  };

  try{
    const response: ResponseLogin = await backend.post('refresh-token/', data);
    useUserData.setAccessToken(response.data.access)
    useUserData.setRefreshToken(response.data.refresh)

    return response;

  }catch (error){
    await useUserData.reset()
    await router.push('/')
  }
}

