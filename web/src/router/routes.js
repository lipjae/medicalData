
const routes = [

  {
    path: '/',
    name: 'Login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/admin',
    name: 'Admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ],
    meta: { requireAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
