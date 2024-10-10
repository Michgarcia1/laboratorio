import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/registro',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/registroUsuario.vue') }],
  },
  {
    path: '/recuperar-contraseña',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/olvideContra.vue') }],
  },
  {
    path: '/inicio',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/paginaInicio.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
