import { backend } from 'boot/axios';
import { ResponseLogin } from 'src/interfaces/Interfaces';

export default async function RefreshTokenFunctio() {
  const userData = sessionStorage.getItem('userData') || 'null';


  const dataJson = JSON.parse(userData);

  const data = {
    refresh: dataJson.refresh_token,
  };

  const response: ResponseLogin = await backend.post('/rest/v1/refresh_token', data);

  return response;
}

