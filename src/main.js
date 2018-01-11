// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//iview
import iview from 'iview'
import 'iview/dist/styles/iview.css'
//router
import router from './router'
//store
import store from './store'
//axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(iview)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

//when refresh browser and user has already login
if (window.sessionStorage.user) {
    store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user));
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (store.state.userInfo.username) {
      next();
    } else {
      next({
        name: 'login',
        query: {redirect: to.fullPath}
      });
    }
  } else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
