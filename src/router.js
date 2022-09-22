import { createRouter, createWebHashHistory } from 'vue-router';
import { Auth } from 'aws-amplify';

const routes = [
  {
    name: 'index',
    path: '/',
    component: () => import('./pages/index.vue'),
  },
  {
    name: 'group',
    path: '/group/:groupId',
    component: () => import('./pages/index.vue'),
  },
  {
    name: 'note',
    path: '/group/:groupId/note/:noteId',
    component: () => import('./pages/index.vue'),
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('./pages/About.vue'),
  },
  {
    name: 'login',
    path: '/auth/login',
    component: () => import('./pages/Auth/Signin.vue'),
    props: true,
  },
  {
    name: 'signup',
    path: '/auth/signup',
    component: () => import('./pages/Auth/Signup.vue'),
  },
  {
    name: 'confirm',
    path: '/auth/confirm',
    component: () => import('./pages/Auth/Confirm.vue'),
    props: true,
  },
  {
    name: 'changelog',
    path: '/changelog',
    component: () => import('./pages/Changelog.vue'),
    props: true,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (
    !to.path.includes('auth') &&
    !to.path.includes('about') &&
    !to.path.includes('changelog')
  ) {
    try {
      await Auth.currentSession();
    } catch (e) {
      next('/auth/login');
      return;
    }
  }

  next();
});
