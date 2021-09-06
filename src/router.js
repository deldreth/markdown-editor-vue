import { createRouter, createWebHashHistory } from 'vue-router';
import { Auth } from 'aws-amplify';

const routes = [
  {
    path: '/',
    component: () => import('./pages/index.vue'),
    children: [
      {
        path: 'group/:groupId',
        component: () => import('./components/Group.vue'),
        children: [
          {
            path: 'note/:noteId',
            component: () => import('./components/Note.vue'),
          },
        ],
      },
    ],
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
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!to.path.includes('auth')) {
    try {
      await Auth.currentSession();
    } catch (e) {
      next('/auth/login');
      return;
    }
  }

  next();
});
