/*最上面 import 了几个模块，其中 vue 模块在 node_modules 中，App 即 App.vue 里定义的组件，router 即 router 文件夹里定义的路由。*/
import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 设置反向代理，前端请求默认发送到 http://localhost:8088/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8088/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

/*作用是阻止vue 在启动时生成生产提示。*/
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


/*new Vue({ render: h => h(App), }).$mount('#app')到底什么意思
export default 打包的发布的时候，template以及style样式会跟着一起打包。
render函数的作用
render函数是vue通过js渲染dom结构的函数createElement，约定可以简写为h

render: h => h(App) 是下面内容的缩写：
render: function (createElement) {
  return createElement(App);
}


继续缩写
render (h) {
  return h(App);
}


箭头函数
h => h(App);

实际渲染
import App from './App'
new Vue
({
  el: '#root',
  template: '<App></App>',
  components: {
    App
  }
})*/
