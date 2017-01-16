import 'src/styles/theme.css';

import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import Http from './http';

Vue.use(ElementUI);
Vue.use(Http);

new Vue({ // eslint-disable-line
  el: '#app',
  ...App,
  router
});
