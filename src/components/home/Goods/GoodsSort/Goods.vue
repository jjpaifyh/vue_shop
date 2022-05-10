<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
        <el-row>
            <el-col class="zk-table-top" >
                <el-button type="primary" @click="AddGoods">添加分类</el-button>
            </el-col>
            <!-- 表格 -->
            <zk-table 
            :data="catlist" 
            :columns="columns" 
            :selection-type="false" 
            :expand-type="false"
            :show-index="true"
            index-text="#"
            border
            >
            <template slot="isok" slot-scope="scope">
                <i class="el-icon-success" v-if="scope.row.cat_deleted==false"></i>
                <i class="el-icon-error" v-else></i>
            </template>
            <template slot-scope="scope" slot="order">
                <el-tag v-if="scope.row.cat_level==0">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.cat_level==1">二级</el-tag>
                <el-tag type="warning" v-else>三级</el-tag>
            </template>
            <template slot="opt" slot-scope="scope">
                <div class="w">
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="redact(scope.row)">编辑</el-button>
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="del(scope.row)">删除</el-button>
                </div>
            </template>
            </zk-table>
            <!-- 分页 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="querInfo.pagenum"
            :page-sizes="[2, 5, 10]"
            :page-size="querInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-row>
    </el-card>
    <goods-dlia-log :isAddGodds="isAddGodds" :parentCateList="parentCateList"></goods-dlia-log>
    <goods-redact :istf_Redact="istf_Redact" :datas_goods="datas_goods"></goods-redact>
  </div>
</template>

<script>
import GoodsRedact from './GoodsRedact.vue'
import GoodsDliaLog from "./GoodsDliaLog.vue"
export default {
    name:"Goods",
    components:{
        GoodsDliaLog,
        GoodsRedact,
    },
    data() {
        return {
            // 查询条件
            querInfo:{
                type:3,
                pagenum:1,
                pagesize:5
            },
            total:0,
            // 商品分类的数据列表
            catlist:[],
            // 添加框的显示
            isAddGodds:false,
            // 编辑框的显示
            istf_Redact:false,
            // id获取的数据
            datas_goods:{},
            columns:[{
                label:'分类名称',
                prop:'cat_name'
            },{
                label:"是否有效",
                type:"template",
                template:"isok"
            },
            {
                label:"排序",
                type:"template",
                template:"order"
            },
            {
                label:"操作",
                type:"template",
                template:"opt"
            }],
            parentCateList:[]
        }
    },
    methods:{
        async getCateList(){
            const {data:res}= await this.$http.get('categories',{params:this.querInfo})
            if(res.meta.status!=200){ return this.$Message.error('获取商品失败')}
            // 数据列表
            this.catlist=res.data.result
            console.log(this.catlist);
            // 为总数据条数赋值
            this.total=res.data.total
            console.log(this.total);
        },
        handleSizeChange(newsize){
            this.querInfo.pagesize=newsize
            this.getCateList()
        },
        handleCurrentChange(newpage){
            this.querInfo.pagenum=newpage
            this.getCateList()
        },
        async AddGoods(){
            // 获取父级数据分类列表
            const {data:res}=await this.$http.get('categories',{params:{type:2}})
            if(res.meta.status!=200){return this.$$Message.error("获取失败")}
            console.log(res);
            this.isAddGodds=true
            this.parentCateList=res.data
        },
        async redact(data){
            this.istf_Redact=true
            const {data:res}=await this.$http.get('categories/'+data.cat_id)
            if(res.meta.status!=200){return this.$Message.error("获取数据失败")}
            this.datas_goods=res.data
        },
        del(data){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async ()=>{
            const {data:res}=await this.$http.delete('categories/'+data.cat_id)
            if(res.meta.status!=200){return  this.$Message.error("删除失败")}
            this.$Message.success("删除成功")
            this.getCateList()

        })
        }
    },
    created(){
        this.getCateList()
    }
}
</script>

<style scoped>
.zk-table-top{
    margin-bottom: 10px;
}
.el-icon-success{
    color: rgb(17, 219, 27);
}
.el-icon-error{
    color: rgb(243, 70, 70);
}
.w{
    width: 200px;
}
</style>