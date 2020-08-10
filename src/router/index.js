import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import reportDetail from '@/page/reportDetail'
import logisticsDetail from '@/page/logisticsDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
    },
    {
      path: '/reportDetail',
      name: 'reportDetail',
      component: reportDetail
    },
    {
      path: '/logisticsDetail',
      name: 'logisticsDetail',
      component: logisticsDetail 
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})