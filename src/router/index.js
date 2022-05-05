import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () =>
    import ("@/components/Login")
const Home = () =>
    import ("@/components/Home")
Vue.use(VueRouter)

const routes = [{
    path: "",
    redirect: '/Login'
}, {
    path: "/Login",
    component: Login
}, {
    path: "/home",
    component: Home
}]

const router = new VueRouter({
        routes
    })
    // 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/Login') return next()
    const tokenstr = window.sessionStorage.getItem('token')
    if (!tokenstr) return next('/Login')
    if (tokenstr) return next()
})

export default router