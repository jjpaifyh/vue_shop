import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () =>
    import ("@/views/Login/Login")
const Home = () =>
    import ("@/views/Home/Home")
const Welcome = () =>
    import ("@/components/home/Welcome")
const User = () =>
    import ('@/components/home/User/User')
const RoleList = () =>
    import ('@/components/home/role_list')


Vue.use(VueRouter)


const routes = [{
    path: "",
    redirect: '/Login'
}, {
    path: "/Login",
    component: Login
}, {
    path: "/home",
    component: Home,
    redirect: '/welcome',
    children: [{
            path: "/welcome",
            component: Welcome
        },
        {
            path: "/_users",
            component: User
        },
        {
            path: '/_roles',
            component: RoleList
        }

    ]
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