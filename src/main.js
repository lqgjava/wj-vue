/*最上面 import 了几个模块，其中 vue 模块在 node_modules 中，App 即 App.vue 里定义的组件，router 即 router 文件夹里定义的路由。*/
import Vue from 'vue'
import App from './App.vue'   /*导入App.vue*/
import router from "./router/index.js";  /*导入router文件夹的index.js*/
import store from './store/index.js'
import ElementUI from 'element-ui' /*导入element-ui*/
import 'element-ui/lib/theme-chalk/index.css'

// 设置反向代理，前端请求默认发送到 http://localhost:8088/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8088/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

/*作用是阻止vue 在启动时生成生产提示。*/
Vue.config.productionTip = false

Vue.use(ElementUI)

/*这个的逻辑很简单，首先判断访问的路径是否需要登录，如果需要，判断 store 里有没有存储 user 的信息，如果存在，则放行，否则跳转到登录页面，并存储访问的页面路径（以便在登录后跳转到访问页）。*/
router.beforeEach((to, from, next) => {
      if (to.meta.requireAuth) {
        if (store.state.user.username) {
          next()
        } else {
          next({
            path: 'login',
            query: {redirect: to.fullPath}
          })
        }
      } else {
        next()
      }
    }
)

new Vue({
  render: h => h(App),
  router,
  store,
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
