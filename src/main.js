import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faTasks,
  faLayerGroup,
  faSearch,
  faTimes,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CKEditor from '@ckeditor/ckeditor5-vue';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import { router } from './router';
import App from './App.vue';

import './bootstrap.scss';
import './index.css';

library.add(faPlus, faTasks, faLayerGroup, faSearch, faTimes, faEdit);

Amplify.configure(awsconfig);

const app = createApp(App);
app
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .use(router)
  .use(CKEditor)
  .mount('#app');

app.config.globalProperties.$filters = {
  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(new Date(date));
  },
  countTasks(html) {
    let tmp = document.createElement('DIV');
    tmp.innerHTML = html;

    let { completed, total } = { completed: 0, total: 0 };
    tmp.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      if (checkbox.getAttribute('checked')) {
        completed++;
      }

      total++;
    });

    if (total > 0) {
      return `${completed}/${total}`;
    }

    return null;
  },
};
