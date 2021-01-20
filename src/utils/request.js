import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? '/coachAI-robust' : process.env.VUE_APP_BASE_URL + '/coachAI-robust', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.url.indexOf('experiment') != -1) {
      config.headers['Content-Type'] = 'application/json'
    } else {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 将返回的数据处理到data
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response.status === 401) {
      if (error.response.config.url != '/coachAI-robust/publicKey') {
        location.href = process.env.VUE_APP_PUBLIC + '#/login?redirect=' + encodeURIComponent(location.pathname + location.search)
      } else {
        Message({
          message: '请求地址有误',
          type: 'error',
          duration: 5 * 1000
        })
      }
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
