

import http from '@/utils/http'
export function getSession (data) {
  return http.get('/user/api/wechat/getSession', {
    params: data
  })
}