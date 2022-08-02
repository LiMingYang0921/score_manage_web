import request from '@/utils/request'

export default {
  XHRLogin (data: object) {
    return request({
      url: '/login',
      method: 'post',
      data,
      mock: true
    })
  },
  XHRLogout () {
    return request({
      url: '/logout',
      method: 'get',
      mock: true
    })
  },
  XHRUserInfo () {
    return request({
      url: '/userinfo',
      method: 'get',
      mock: true
    })
  }
}
