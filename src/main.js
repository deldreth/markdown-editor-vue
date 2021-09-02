import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CKEditor from '@ckeditor/ckeditor5-vue';

import { router } from './router';
import App from './App.vue';

import 'element-plus/dist/index.css';
import './index.css';

library.add(faPlus);

createApp(App)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .use(router)
  .use(CKEditor)
  .mount('#app');
