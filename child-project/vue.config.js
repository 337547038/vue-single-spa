const StatsPlugin = require('stats-webpack-plugin')
module.exports = {
  publicPath: "//localhost:8095/vueApp1/", // 要设置真实服务地址，否则加载子页面js时，会到当前浏览器域名的根路径查找，有404问题
  // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
  css: {
    extract: false
  },
  lintOnSave: false,
  configureWebpack: {
    devtool: 'none', // 不打包sourcemap
    output: {
      library: 'singleVue', // 导出名称
      libraryTarget: 'window' // 挂载目标
    },
    plugins: [
      new StatsPlugin('manifest.json', {
        chunkModules: false,
        entrypoints: true,
        source: false,
        chunks: false,
        modules: false,
        assets: false,
        children: false,
        exclude: [/node_modules/]
      })
    ]
  },
  devServer: {
   // contentBase: './',
    compress: true,
    headers: {'Access-Control-Allow-Origin': '*'}
  }
}


