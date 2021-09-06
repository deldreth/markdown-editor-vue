import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Amplify from 'aws-amplify';
import CKEditor from '@ckeditor/ckeditor5-vue';

import { countTasks, formatDate } from './filters';
import awsconfig from './aws-exports';

import { router } from './router';
import App from './App.vue';
import './icons';

import './bootstrap.scss';
import './index.css';

Amplify.configure(awsconfig);

const app = createApp(App);
app
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .use(router)
  .use(CKEditor)
  .mount('#app');

app.config.globalProperties.$filters = {
  formatDate,
  countTasks,
};
