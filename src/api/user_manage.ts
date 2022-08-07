import request from '@/utils/request'

export default {
  XHRGetUserList (params: any, url = '') {
    return request({
      // url: '/user/list',
      url,
      method: 'get',
      params
    })
  }
}
