const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'

const MOCKURL = 'http://127.0.0.1:4523/m1/1397927-0-default'
const PRODURL = 'http://localhost:3000'

const EnvConfig = {
  dev: {
    baseApi: '',
    mockApi: MOCKURL
  },
  prod: {
    baseApi: PRODURL,
    mockApi: MOCKURL
  }
}
export default {
  env,
  ...EnvConfig[env]
}
