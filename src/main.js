import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import '@/plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/iconfont'
import './assets/js/axios_x'
import ZkTable from 'vue-table-with-tree-grid'
Vue.config.productionTip = false
Vue.use(ZkTable)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')