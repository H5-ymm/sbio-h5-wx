import http from '@/utils/http'
export function getSampleDetail (data) {
  return http.get('/sample/api/get', {
    params: data
  })
}
export function getSampleList (data) {
  return http.get('/sample/api/list', {
    params: data
  })
}

export function downResport (data) {
  return http.get('/sample/api/download', {
    params: data
  })
}

export function getRoute (data) {
  return http.get('/sample/api/logistics/getRoute', {
    params: data
  })
}

export function getCancelFlag (data) {
  return http.get('/sample/api/logistics/getCancelFlag', {
    params: data
  })
}
