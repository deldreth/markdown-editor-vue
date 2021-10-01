import { createRouter, createWebHashHistory } from 'vue-router';
import { Auth } from 'aws-amplify';

const routes = [
  {
    name: 'groups',
    path: '/',
    component: () => import('./pages/index.vue'),
    children: [
      {
        name: 'tag',
        path: 'tag/:tagId',
        component: () => import('./components/Tag.vue'),
        children: [
          {
            name: 'tagNote',
            path: 'note/:noteId',
            component: () => import('./components/Note.vue'),
          },
        ],
      },
      {
        name: 'group',
        path: 'group/:groupId',
        component: () => import('./components/Group.vue'),
        children: [
          {
            name: 'note',
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
