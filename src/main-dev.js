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
import './assets/js/dateFormat'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.config.productionTip = false
Vue.use(ZkTable)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')