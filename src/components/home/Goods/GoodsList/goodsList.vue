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
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @clear="getGoodsList">
                    <el-button slot="append" icon="el-icon-search" @click="getGoodsList" ></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                     <el-button type="primary" class="butt" @click="add">添加商品</el-button>
            </el-col>
        </el-row>
        <!-- 表格区 -->
        <el-table :data="goodslist" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="商品名称" prop="goods_name"></el-table-column>
            <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
            <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
            <el-table-column label="创建时间" prop="add_time" width="170px">
                <template slot-scope="scope">
                    {{scope.row.add_time | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope" >
                   
                    <el-button size="mini" type="primary" icon="el-icon-edit" >编辑</el-button>
                    <el-button size="mini"  type="danger" icon="el-icon-delete" @click="clickdel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" background="">
        </el-pagination>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  data() {
    return {
        queryInfo:{
            query:'',
            pagenum:1,
            pagesize:10
        },
        goodliek:'',
        goodslist:[],
        total:0
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  components:{
  },
  //方法集合
  methods: {
      async getGoodsList(){
          const {data:res}=await this.$http.get("goods",{params:this.queryInfo})
          if(res.meta.status!=200){
              return this.$Message.error("获取商品列表失败")
          }
          console.log(res);
          this.total=res.data.total
          this.goodslist=res.data.goods
          console.log(this.goodslist);
      },
      handleSizeChange(size){
          this.queryInfo.pagesize=size
          this.getGoodsList()
      },
      handleCurrentChange(page){
          this.queryInfo.pagenum=page
          this.getGoodsList()
      },
      add(){
          this.$router.push('/goodsadd')
      },
      clickdel(data){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
            console.log(data);
            const {data:res}=await this.$http.delete(`goods/${data.goods_id}`)
             if(res.meta.status!=200){ return this.$Message.error('删除失败')}
             this.$Message.success('删除成功')
            this.getGoodsList()
        }).catch(err=>err)
      }
      
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      this.getGoodsList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

}
</script>
<style scoped>
.butt{
    margin-left: 20px;
}
.el-row{
    margin-bottom: 10px;
}
</style>