import axios from 'axios'
import Vue from 'vue'
// 导入NProgress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
axios.interceptors.request.use(config => {
    // 拦截请求，给她加上给token
    // 展示进度条
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

axios.interceptors.response.use(config => {
    // 隐藏进度条
    NProgress.done()
    return config
})