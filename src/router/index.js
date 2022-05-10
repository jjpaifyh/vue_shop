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
    import ('@/components/home/power/RoleList/role_list.vue')
const Rights = () =>
    import ("@/components/home/power/Rights/Rights.vue")
const Goods = () =>
    import ("@/components/home/Goods/GoodsSort/Goods.vue")
const Params = () =>
    import ("@/components/home/Goods/Params/Params.vue")
const GoodsList = () =>
    import ("@/components/home/Goods/GoodsList/goodsList.vue")
const GoodsAdd = () =>
    import ("@/components/home/Goods/GoodsList/goodsAdd.vue")
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
        },
        {
            path: '/_rights',
            component: Rights
        },
        {
            path: '/_categories',
            component: Goods
        },
        {
            path: '/_params',
            component: Params
        },
        {
            path: '/_goods',
            component: GoodsList
        },
        {
            path: '/goodsadd',
            component: GoodsAdd
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