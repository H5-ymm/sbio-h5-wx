import axios from 'axios'
import QS from 'qs'
// const baseURL = 'https://testapi.s-sbio.com'
const baseURL = 'https://api.s-sbio.com'
axios.defaults.baseURL = baseURL
axios.interceptors.request.use(config => {
  const sessionId = sessionStorage.getItem('shuoshiSessionId')
  const { headers } = config
  if (sessionId) {
    headers['sessionId'] = sessionId
  }
  return config
}, error => {
  console.error(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  const { data } = response
  return data
}, error => {
  console.error(error)
  return Promise.reject(error)
})
export function downloadData(url, params) {
  let data = QS.stringify(params)
  window.location.href = `${baseURL}/${url}?${data}`
}
export default axios
