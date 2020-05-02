import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import OverView from '../components/overview/OverView.vue'
import Login from '../components/login/Login.vue'
import WebSSH from '../components/ssh/WebSSH.vue'
import Server from '../components/server/Server.vue'
import Repository from '../components/repository/Repository.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
  }
  },
  {
    path: '/ssh',
    name: 'ssh',
    component: WebSSH,
    meta: {
      title: 'SSH客户端',
  }
  },
  {
    path: '/index',
    name: 'index',
    component: Home,
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: OverView,
        meta: {
          title: '概览',
      }
      },
      {
        path: 'server',
        name: 'server',
        component: Server,
        meta: {
          title: '服务器列表',
          requireAuth: true,
      }
      },
      {
        path: 'repository',
        name: 'repository',
        component: Repository,
        meta: {
          title: '代码仓库列表',
          requireAuth: true,
      }
      },
    ]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
