import { createRouter, createWebHistory } from 'vue-router';
import { Auth } from 'aws-amplify';

import Index from './pages/index.vue';
import Group from './components/Group.vue';
import Note from './components/Note.vue';
import Signin from './pages/Auth/Signin.vue';
import Signup from './pages/Auth/Signup.vue';
import Confirm from './pages/Auth/Confirm.vue';

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: 'group/:groupId',
        component: Group,
        children: [
          {
            path: 'note/:noteId',
            component: Note,
          },
        ],
      },
    ],
  },
  {
    name: 'login',
    path: '/auth/login',
    component: () => Signin,
    props: true,
  },
  {
    name: 'signup',
    path: '/auth/signup',
    component: () => Signup,
  },
  {
    name: 'confirm',
    path: '/auth/confirm',
    component: () => Confirm,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!to.path.includes('auth')) {
    try {
      await Auth.currentSession();
    } catch (e) {
      console.log(e);
      next('/auth/login');
      return;
    }
  }

  next();
});
