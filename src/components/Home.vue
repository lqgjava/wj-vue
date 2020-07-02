<template>
    <div>
        <nav-menu></nav-menu>
        <!--这里和 App.vue 一样，写入了一个 <router-view/>，也就是子页面（组件）显示的地方-->
        <router-view></router-view>
    </div>
</template>

<script>
    import NavMenu from './common/NavMenu'
    export default {
        name: "Home",
        components: {NavMenu}
    }
</script>

<style scoped>
    .nav-menu {
        /*margin-bottom: 40px;*/
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
    }
</style>