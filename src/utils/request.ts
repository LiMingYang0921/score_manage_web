import axios, { AxiosResponse } from 'axios'
import config from '@/config/http'
import { ElMessage } from 'element-plus'
import { logout, getToken } from '@/utils/useUser'

interface IOptions {
  url: string,
  method: 'post' | 'get' | 'put' | 'delete',
  data?: object,
  params?: object,
  mock?: boolean,
}

// 创建axios实例对象, 添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})

const errorHandler = (error: { message: string }) => {
  ElMessage.error(error.message)
  return Promise.reject(error)
}

// 请求拦截
service.interceptors.request.use((config) => {
  if (getToken()) {
    if (config?.headers) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
  }
  return config
}, errorHandler)

// 响应拦截
service.interceptors.response.use((res: AxiosResponse) => {
  const { code, message } = res.data
  if (code !== 200) {
    ElMessage.error(message)
    if (code === 403) {
      logout()
    }
  }
  return res.data
}, error => {
  const err = error.response.data && error.response.data.apifoxError
  ElMessage.error(err?.message || '服务器异常')
  if (err.code === 403) {
    logout()
  }
  return Promise.reject(error)
})

function request (options: IOptions) {
  const mock = options?.mock
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = mock ? config.mockApi : config.baseApi
  }
  return service(options)
}

export default request
