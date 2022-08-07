const DEVURL = 'http://localhost:3000'

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 9527,
    proxy: {
      '': {
        target: DEVURL
      }
    }
  }
})
