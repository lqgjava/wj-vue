import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Home from '@/components/Home' /*导入home组件*/
import LibraryIndex from '@/components/library/LibraryIndex'

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'history',
    routes: [
        // 下面都是固定的写法
        {
            path: '/home',
            name: 'Home',
            component: Home,
            // home页面并不需要被访问
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    name: 'AppIndex',
                    component: AppIndex,
                    meta: {
                        requireAuth: true
                    }
                },
                {
                    path: '/library',
                    name: 'library',
                    component: LibraryIndex,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})
/*里和 App.vue 一样，写入了一个 <router-view/>，也就是子页面（组件）显示的地方。接下来，来建立路由的父子关系。注意我们在一个组件中通过导入引用了其它组件，也可以称之为父子组件，但想要通过
<router-view/>控制子组件的显示，则需要进行路由的相关配置。*/

/*注意我们并没有把首页的访问路径设置为 /home/index，仍然可以通过 /index 访问首页，这样配置其实是感受不到 /home 这个路径的存在的。之后再添加新的页面，可以直接在 children 中增添对应的内容。*/