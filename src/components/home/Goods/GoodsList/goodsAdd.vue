<!--  -->
<template>
<div >
      <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>   
        <el-alert
            title="添加商品信息"
            type="info"
            center
            show-icon
            :closable="false">
        </el-alert>
        <el-steps :space="200" :active="active-0" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <el-form ref="form" :model="datas" label-width="80px" label-position="top" :rules="rules">
            <el-tabs tab-position="left"  v-model="active" :before-leave="beforeleave" @tab-click='tabClicked'>
                <el-tab-pane label="基本信息" name='0'>
                     <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="datas.goods_name"></el-input>
                    </el-form-item>
                     <el-form-item label="商品价格" prop="goods_price">
                        <el-input v-model="datas.goods_price" type="number"></el-input>
                    </el-form-item>
                     <el-form-item label="商品数量" prop="goods_number">
                        <el-input v-model="datas.goods_number" type="number"></el-input>
                    </el-form-item>
                     <el-form-item label="商品重量" prop="goods_weight">
                        <el-input v-model="datas.goods_weight" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goods_cat">
                     <el-cascader
                        v-model="datas.goods_cat"
                        :options="goodsList"
                        :props="{ expandTrigger: 'hover',...cascaderProps}"
                        @change="handleChange"
                        >
                    </el-cascader>
                     </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品参数" name='1' >
                    <!-- 渲染表单 -->
                    <el-form-item v-for="(item,index) in this.manyTanleData" :key="index" :label="item.attr_name" >
                         <el-checkbox-group v-model="item.attr_vals">
                            <el-checkbox v-for="(item,index) in item.attr_vals" :key="index" :label="item" border></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品属性" name='2'>
                    <el-form-item v-for="(item,index) in this.onlyTanleData" :key="index" :label="item.attr_name">
                        <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品图片" name='3'>
                    <!--action图片上传地址  -->
                    <el-upload
                    :action="$http.defaults.baseURL+'upload'"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    list-type="picture"
                    :headers="headers"
                    :on-success="handleSuccess">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-tab-pane>
                <el-tab-pane label="商品内容" name='4'>
                    <quill-editor v-model="datas.goods_introduce"></quill-editor>
                    <el-button type="primary" class="butt" @click="accomplish">完成</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog
    title="图片展示:"
    :visible.sync="is_preview"
    width="50%">
    <img :src="previewPath" class="imgg">
    <span slot="footer" class="dialog-footer">
    </span>
    </el-dialog>
</div>
</template>

<script>

export default {
name:'goodsAdd',
data() {
return {
    previewPath:'',
    active:0,
    is_preview:false,
    datas:{
        goods_name:'',
        goods_price:'',
        goods_cat:[],
        goods_number:'',
        goods_weight:'',
        pics:[],
        goods_introduce:'',
        attrs:[]
    },


    rules:{
        goods_name:[
             { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        goods_price:[
            { required: true, message: '请输入价格', trigger: 'blur' },
        ],
        goods_number:[
             { required: true, message: '请输入数量', trigger: 'blur' },
        ],
        goods_weight:[
             { required: true, message: '请输入重量', trigger: 'blur' },
        ],
        goods_cat:[
            { required: true, message: '请选择分类', trigger: 'blur' },
        ]
    },
    goodsList:[],
    cascaderProps:{
        value:"cat_id",
        label:"cat_name",
        children:'children',
    },
    manyTanleData:[],
    onlyTanleData:[],
    // 图片上传请求头
    headers:{
        Authorization:
        window.sessionStorage.getItem('token')
    }
};
},
//监听属性 类似于data概念
computed: {
    cateId(){
        return this.datas.goods_cat.length==3 ? this.datas.goods_cat[2] : null
    }
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    async getGoodsList(){
        const {data:res}=await this.$http.get("categories")
        if(res.meta.status!=200){ return this.$Message.error('获取分类数据失败')}
        this.goodsList=res.data
        console.log(this.goodsList);
    },
    handleChange(){
        console.log(this.datas);
        if(this.datas.goods_cat.length!=3){
            this.datas.goods_cat=[]
        }
    },
    beforeleave(activeName, oldActiveName){
        console.log(`${oldActiveName}==>${activeName}`);
        if( oldActiveName=='0' && this.datas.goods_cat.length!=3 ){
        return false
        }

    },
    async tabClicked(){
        if(this.active=='1'){
            const {data:res}=await this.$http.get(`categories/${this.cateId}/attributes`,{
                params:{sel:'many'}
            })
            if(res.meta.status!=200){ return this.$Message.error('获取分类数据失败')}
            res.data.forEach(item=>{
                 item.attr_vals=item.attr_vals.length==0 ? [] : item.attr_vals.split(',')
            })
            this.manyTanleData=res.data
        }else if(this.active=='2'){
             const {data:res}=await this.$http.get(`categories/${this.cateId}/attributes`,{
                params:{sel:'only'}
            })
            if(res.meta.status!=200){ return this.$Message.error('获取分类数据失败')}
            this.onlyTanleData=res.data
        };
        
    },
    handleSuccess(res){
        const picinfo={pic:res.data.tmp_path}
        this.datas.pics.push(picinfo);

    },
    // 处理图片预览效果
    handlePreview(data){
         this.previewPath=data.response.data.url;
         this.is_preview=true

    },
    // 处理移除图片
    handleRemove(file){
        const filePath=file.response.data.tmp_path
        const i= this.datas.pics.findIndex(x=>x.pic==filePath)
        this.datas.pics.splice(i,1)
    },
     accomplish(){
        this.$refs.form.validate( async vlid=>{
            if(!vlid){return this.$Message.error("请填写必要的表单项目")}
            // 执行添加
            // 深拷贝，防止数组变成字符串导致之前组件绑定的数值报错
            const form=JSON.parse(JSON.stringify(this.datas))
            form.goods_cat=form.goods_cat.join(',')
            // 处理动态参数
            this.manyTanleData.forEach(item=>{
                const newInfo={attr_id:item.attr_id,
                attr_value:item.attr_vals.join(' ')}
                this.datas.attrs.push(newInfo)
            })
            // 处理静态属性
            this.onlyTanleData.forEach(item=>{
                const newInfo={attr_id:item.attr_id,
                attr_value:item.attr_vals}
                this.datas.attrs.push(newInfo)
            })
            form.attrs=this.datas.attrs
            console.log(form);
            const {data:res}= await this.$http.post(`goods`,form)
            if(res.meta.status!=201){ return this.$Message.error('添加商品失败')}
            this.$Message.success('添加商品成功！')
            this.$router.push('/_goods')
        })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.getGoodsList()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
//beforeCreate() {}, //生命周期 - 创建之前
//beforeMount() {}, //生命周期 - 挂载之前
//beforeUpdate() {}, //生命周期 - 更新之前
//updated() {}, //生命周期 - 更新之后
//beforeDestroy() {}, //生命周期 - 销毁之前
//destroyed() {}, //生命周期 - 销毁完成
//activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.el-alert{
    margin-bottom: 10px;
}
.el-tabs{
    margin-top: 15px;
}
.el-checkbox{
    margin: 0 5px 0 5px !important;
}
.imgg{
    width: 100%;
}
.butt{
    margin: 10px;
    position: relative;
    left:88%;
}

</style>