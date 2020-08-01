import axios from 'axios'
axios.defaults.baseURL = 'https://testapi.s-sbio.com'
axios.interceptors.request.use(config => {
  const sessionId = sessionStorage.getItem('shuoshiSessionId')
  console.log(sessionId)
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

export default axios