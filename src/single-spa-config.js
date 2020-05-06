// single-spa-config.js
import * as singleSpa from 'single-spa' // 导入single-spa
import axios from 'axios'
/*
* runScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务
* */
const runScript = async (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode.insertBefore(script, firstScript)
  })
}

/*
* getManifest：远程加载manifest.json 文件，解析需要加载的js
* url: manifest.json 链接
* bundle：entry名称
* */
// eslint-disable-next-line no-async-promise-executor
const getManifest = (url, bundle) => new Promise(async (resolve) => {
  const {data} = await axios.get(url)
  const {entrypoints, publicPath} = data
  const assets = entrypoints[bundle].assets
  for (let i = 0; i < assets.length; i++) {
    await runScript(publicPath + assets[i]).then(() => {
      if (i === assets.length - 1) {
        resolve()
      }
    })
  }
})


// 使用manifest.json引入子项目文件
singleSpa.registerApplication( // 注册微前端服务
'singleDemo',
async () => {
  let singleVue = null
  await getManifest('http://localhost:8095/vueApp1/manifest.json', 'app').then(() => {
    singleVue = window.singleVue
  })
  return singleVue
},
location => location.pathname.startsWith('/vueApp1') // 配置微前端模块前缀
)

singleSpa.start() // 启动
