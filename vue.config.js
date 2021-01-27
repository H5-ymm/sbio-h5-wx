module.exports = {
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    proxy: {
      '/': {
        target: 'https://testapi.s-sbio.com',
        changeOrigin: true
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  css: {
    loaderOptions: {
      sass: {
        // 根据自己样式文件的位置调整
        prependData: '@import "@/assets/scss/global.scss";'
      }
    }
  }
};
