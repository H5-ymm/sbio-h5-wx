import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/scss/global.scss'
import 'amfe-flexible/index.js'
import { getUrlQuery, getIsWxClient, locationUrl } from './utils/tool'
import { getSession } from './api/wxApi'
import moment from 'moment'
Vue.config.productionTip = false
Vue.prototype.$moment = moment
if (getUrlQuery('connect_redirect') && getIsWxClient()) {
  // let baseUrl = location.href.split('?')[0].split('#')[0]
  // location.replace(decodeURIComponent(baseUrl))
  this.$router.go(-1)
}
let shuoshiOpenid = sessionStorage.getItem('shuoshiOpenid2')
if (!shuoshiOpenid && getIsWxClient()) {
  sessionStorage.setItem('shuoshiOpenid2', true)
  // 获取跳转url
  location.href = locationUrl()
}
initApp()
async function initApp() {
  // 获取code
  if (getUrlQuery('code') && getIsWxClient()) {
    sessionStorage.setItem('shuoshiCode', getUrlQuery('code'))
  }
  if (sessionStorage.getItem('shuoshiCode')) {
    let query = {
      code: sessionStorage.getItem('shuoshiCode'),
      type: 1
    }
    const { data } = await getSession(query)
    sessionStorage.setItem('shuoshiSessionId', data.sessionId)
  }
  return new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}