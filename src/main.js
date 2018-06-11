/*
* @Author: Marte
* @Date:   2018-06-08 09:45:12
* @Last Modified by:   Marte
* @Last Modified time: 2018-06-08 16:37:33
*/

import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store';
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
});