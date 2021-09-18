import { createApp } from 'vue';
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from '@fortawesome/vue-fontawesome';
import { VueShowdownPlugin } from 'vue-showdown';
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

var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf(' electron/') > -1) {
  app.config.globalProperties.$isElectron = true;
} else {
  app.config.globalProperties.$isElectron = false;
}

const requireComponent = require.context('./components', true);

requireComponent
  .keys()
  .filter(component => component.includes('.vue'))
  .forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = fileName.replace(/\.\/|\/|\.vue/g, '');

    app.component(componentName, componentConfig.default || componentConfig);
  });

app
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .component('FontAwesomeLayers', FontAwesomeLayers)
  .use(router)
  .use(CKEditor)
  .use(VueShowdownPlugin, {
    flavor: 'github',
  })
  .directive('focus', {
    mounted(el) {
      el.focus();
    },
  })
  .mount('#app');

app.config.globalProperties.$filters = {
  formatDate,
  countTasks,
};
