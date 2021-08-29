import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

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
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
