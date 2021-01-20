import request from '@/utils/request'

export default {
  login(params) {
    return request({
      url: '/user/login',
      method: 'get',
      params
    })
  },
  logout() {
    return request({
      url: '/exit',
      method: 'get'
    })
  }
}
export function publicKey() {
  return request({
    url: '/publicKey',
    method: 'post'
  })
}
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// export function logout() {
//   return request({
//     url: '/v1/exit',
//     method: 'get'
//   })
// }
