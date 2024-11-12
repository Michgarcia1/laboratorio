import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/olvide-contrasena', component: () => import('pages/olvideContra.vue') },
      { path: '/restablecer-contrasena/:token/:uuid_user', component: () => import('pages/recuperarContra.vue') },
      { path: '/registro', component: () => import('pages/registroUsuario.vue')},
      { path: '/inicio', component: () => import('pages/paginaInicio.vue')},
      { path: '/examenes-clinicos', component: () => import('pages/tramites/clinicaExam.vue')},
      { path: '/proceso-de-compra', component: () => import('pages/procesoCompra.vue')},
      { path: '/resultados', component: () => import('pages/tramites/resultadosExam.vue')},
      { path: '/administrador', component: () => import('pages/tramites/administradorLab.vue')},
      { path: '/ubicacion', component: () => import('pages/tramites/ubicacionLab.vue') }
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
