import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/login/Login.vue'
import WebSSH from '../components/ssh/WebSSH.vue'
import Server from '../components/server/Server.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/ssh',
    name: 'ssh',
    component: WebSSH,
  },
  {
    path: '/index',
    name: 'index',
    component: Home,
    children: [
      {
        path: 'server',
        name: 'server',
        component: Server,
      },
    ]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
