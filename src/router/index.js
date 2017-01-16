import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: require('src/views/dashboard')
  },
  {
    path: '*',
    component: require('src/views/notfound')
  }
];

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'is-active',
  routes
});

export default router;
