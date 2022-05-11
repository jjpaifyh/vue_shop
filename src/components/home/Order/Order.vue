<!--  -->
<template>
  <div class="">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row>
            <el-col :span="8">
                 <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @clear="getOrder">
                    <el-button slot="append" icon="el-icon-search" @click="getOrder"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="OrderList.goods" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="点单编号" prop="order_number"></el-table-column>
            <el-table-column label="订单价格" prop="order_price"></el-table-column>
            <el-table-column label="是否付款" prop="pay_status">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.pay_status==0">未付款</el-tag>
                    <el-tag type="success" v-else>已付款</el-tag>
                    
                </template>
            </el-table-column>
            <el-table-column label="是否发货" prop="is_send"></el-table-column>
            <el-table-column label="下单时间" prop="create_time">
                <template slot-scope="scope">
                    {{scope.row.create_time | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column width="150px">
                <template slot-scope="scope">
                     <el-button type="primary" icon="el-icon-edit" circle @click="showbox(scope.row.order_id)"></el-button>
                    <el-button type="success" icon="el-icon-check" circle @click="Logistics"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </el-card>
    <order-dia-log ref="OrderDiaLog"></order-dia-log>
    <order-logistics ref="OrderLogistics"></order-logistics>
  </div>
</template>

<script>
import OrderLogistics from './OrderLogistics.vue'
import OrderDiaLog from "./OrderDiaLog.vue"
export default {
  name: 'Order',
  components:{
      OrderDiaLog,
      OrderLogistics
  },
  data() {
    return {
        queryInfo:{
            query:'',
            pagenum:1,
            pagesize:10
        },
        total:0
        ,
        OrderList:[]
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
       async getOrder(){
           console.log(this.queryInfovalue);
            const {data:res}= await this.$http.get('orders',{params:this.queryInfo})
            console.log(res);
            if(res.meta.status!=200){return this.$Message.error('获取数据失败')}
            this.OrderList=res.data
            this.total=res.data.total
            console.log(this.OrderList);
      },
      handleCurrentChange(pagenum){
          this.queryInfo.pagenum=pagenum
          this.getOrder()
      },
      handleSizeChange(size){
          this.queryInfo.pagesize=size
          this.getOrder()
      },
      showbox(id){
          this.$refs.OrderDiaLog.dataId=id
          this.$refs.OrderDiaLog.is_DiaLog=true

      },
      Logistics(){
          this.$refs.OrderLogistics.is_OrderLogistics=true
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      this.getOrder()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.el-table{
    margin-top: 10px;
}
</style>