import 'src/styles/theme.css';

import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';

Vue.use(ElementUI);

new Vue({ // eslint-disable-line
  el: '#app',
  ...App,
  router
});
