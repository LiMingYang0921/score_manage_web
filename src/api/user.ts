import request from '@/utils/request'

export default {
  XHRLogin (data: object) {
    return request({
      url: '/api/login',
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
      url: '/api/userinfo',
      method: 'get',
      mock: true
    })
  },
  XHRMenuList () {
    return request({
      url: '/api/menuList',
      method: 'get',
      mock: true
    })
  }
}
