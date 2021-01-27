import http from '@/utils/http'
export function reportCovid(data) {
  return http.get('/sample/api/reportCovid/get', {
    params: data
  })
}
// 通用下载方法
export function downResport(params) {
  return http.get('/sample/api/downReportCovid', { params }, {
    responseType: 'blob'
  }).then((data) => {
    window.open(window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' })))
  }).catch((r) => {
    console.error(r)
  })
}