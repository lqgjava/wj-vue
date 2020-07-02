<template>
    <body id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
        <h3 class="login_title">系统登录</h3>
        <el-form-item>
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
        </el-form-item>
    </el-form>
    </body>
</template>


<script>
    export default {
        name: "Login",
        /*data() 为变量赋值等*/
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                responseResult: []
            }
        },
        /*mounted在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作*/

        /*<template> 标签中随便写了一个登录的界面， methods 中定义了登录按钮的点击方法，即向后端 /login 接口发送数据，获得成功的响应后，页面跳转到 /index。
        因为之前我们设置了默认的 URL，所以请求实际上发到了 http://localhost:8443/api/login。*/
        /* methods 编写js函数*/
        methods: {
            login() {
                var _this = this
                console.log(this.$store.state)
                this.$axios
                    /*向后端 /login 接口发送数据*/
                    .post('/login', {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    })
                    .then(successResponse => {
                        if (successResponse.data.code === 200) {
                            // var data = this.loginForm
                            _this.$store.commit('login', _this.loginForm)
                            var path = this.$route.query.redirect
                            /*响应成功后，页面跳转到 /index*/
                            //页面跳转  replace：替换  用push的话，可以使用后退按钮回到登录页，用replace不可以回到登录页
                            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})

                        }
                    })
                    .catch(failResponse => {
                    })
            }


        }
    }
</script>

<style scoped>
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    #poster {
        background:url("../assets/eva.jpg") no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }
    body{
        margin: 0px;
    }
</style>