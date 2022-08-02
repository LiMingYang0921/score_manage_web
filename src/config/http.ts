const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
const EnvConfig = {
  dev: {
    baseApi: '',
    mockApi: 'http://127.0.0.1:4523/m1/1329976-0-default'
  },
  prod: {
    baseApi: '',
    mockApi: ''
  }
}
export default {
  env,
  mock: false,
  namespace: 'manager',
  ...EnvConfig[env]
}
