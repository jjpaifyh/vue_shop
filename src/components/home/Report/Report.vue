<template>
  <div class="">
    <!-- import * as echarts from 'echarts' -->
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card> 

        <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
// 导入echarts
import * as echarts from 'echarts';
export default {
  name: 'Report',
  data() {
    return {
        // 需要合并的数据
        options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
        var myChart = echarts.init(document.getElementById('main'));
        const {data:res} = await this.$http.get('reports/type/1')
        if(res.meta.status!==200){ return this.$Message.error('获取数据失败')}
        this.$Message.success('获取数据成功')
        Object.assign(this.options, res.data)
        myChart.setOption(res.data)
  },
} 
</script>
<style scoped>
</style>