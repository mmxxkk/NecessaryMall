const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:9527',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          // '/api': '',
        }
      }
    }
  }
})
