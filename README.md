# vue single-spa 改造

## 父项目
   1、安装`npm install single-spa --save`
   
   2、新建`single-spa-config.js`并在`main.js`中引入
   
   3、`App.vue`中添加标识，用于引入子项目`<div id="vue"></div>`
   
   4、父项目404问题，添加一个路由指向 
   ```txt
   {
       path: '/vueApp1*', // 包含子路由
     },
   ```
   
### 子项目
  1、`vue.config.js`添加如果设置  
  ```txt
  {
  publicPath: "//localhost:8095/vueApp1/", // 对应父项目startsWith('/vueApp1')
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
      contentBase: './',
      compress: true,
      headers: {'Access-Control-Allow-Origin': '*'}
    }
    }
  ``` 

  2、安装 `npm install single-spa-vue --save` `npm install stats-webpack-plugin --save`
  
  3、改写main.js
  ```txt
  const vueOptions = {
    el: "#vue",
    router,
    store,
    render: h => h(App)
  };
  
  // 判断当前页面使用singleSpa应用,不是就渲染
  if (!window.singleSpaNavigate) {
    delete vueOptions.el;
    new Vue(vueOptions).$mount('#app');
  }
  
  
  // singleSpaVue包装一个vue微前端服务对象
  const vueLifecycles = singleSpaVue({
    Vue,
    appOptions: vueOptions
  });
  
  export const bootstrap = vueLifecycles.bootstrap; // 启动时
  export const mount = vueLifecycles.mount; // 挂载时
  export const unmount = vueLifecycles.unmount; // 卸载时
  
  export default vueLifecycles;
  ```
  
4、修改路由`base:'/vueApp1'`,对应父项目`startsWith('/vueApp1')`
