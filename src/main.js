import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as api from './restful/api.js'


Vue.use(ElementUI)
Vue.prototype.$api = api
Vue.config.productionTip = false

Vue.prototype.setLocalValue = function (name, value) {
    if (window.localStorage) {
        localStorage.setItem(name, value);
    } else {
        alert('This browser does NOT support localStorage');
    }
};
Vue.prototype.getLocalValue = function (name) {
    const value = localStorage.getItem(name);
    if (value) {
        return value;
    } else {
        return '';
    }
};

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    setTimeout((res) => {
        if (to.meta.title) {
            document.title = to.meta.title
        }

        if (to.meta.requireAuth) {
            if (store.state.token !== '') {
                next();
            } else {
                next({
                    name: 'login',
                })
            }
        } else {
            next()
        }
    })

})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
