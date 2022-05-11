module.exports = {
    // 关闭万恶之源
    lintOnSave: false,
    chainWebpack: config => {
        //发布模式 production
        config.when(process.env.NODE_ENV === 'production', config => {
                //entry找到默认的打包入口，调用clear则是删除默认的打包入口
                //add添加新的打包入口
                config.entry('app').clear().add('./src/main-prod.js')

                //使用externals设置排除项
                // config.set('externals', {
                //     vue: 'Vue',
                //     'element-ui': 'ELEMENT',
                //     'vue-router': 'VueRouter',
                //     axios: 'axios',
                //     lodash: '_',
                //     echarts: 'echarts',
                //     nprogress: 'NProgress',
                //     'vue-quill-editor': 'VueQuillEditor',

                // })

            })
            //开发模式 development
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
        })
    }

}