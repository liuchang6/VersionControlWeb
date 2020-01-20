import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Server from '../components/server/Server.vue'
import WebSSH from '../components/ssh/WebSSH.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/index',
    name: 'index',
    component: Home,
    children: [
      {
        path: '/server',
        name: 'server',
        component: Server,
      },
    ]
  },
  {
    path: '/ssh',
    name: 'ssh',
    component: WebSSH,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
