import RefreshTokenFunction from './FunctionsButtons';

export const errorUnauthorized = {
  numero_error: 'Error 403',
  mensaje: 'Lo sentimos, usted no tiene permisos para estar en esta sección.',
  url_redirect: '/',
  botones: [
    {
      mensaje: 'Ir al inicio',
      url_redirect: '/',
    }
  ]
}


export const errorRefreshToken = {
  numero_error: 'Error 401',
  mensaje: 'Lo sentimos su token ha expirado!',
  url_redirect: '/',
  botones: [
    {
      mensaje: 'Ir al inicio',
      url_redirect: '/',
    },
    {
      mensaje: 'Recargar la pagina',
      url_redirect: '/inicio',
      onClick: () => RefreshTokenFunction()
    }
  ]
}
