<!--  -->
<template>
  <div class="" >
        <el-dialog
            title="查看物流"
            :visible.sync="is_OrderLogistics"
            width="50%"
            :before-close="handleClose"
            @close="closed">

            <el-timeline :reverse="true">
                <el-timeline-item
                v-for="(activity, index) in datas"
                :key="index"
                :timestamp="activity.time">
                {{activity.context}}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
  </div>
</template>

<script>
 import datas from '@/assets/js/dataLogistics.js'
export default {
  name: 'OrderLogistics',
  data() {
    return {
        datas,
        is_OrderLogistics:false
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      handleClose(){
          this.is_OrderLogistics=false
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

}
</script>
<style scoped>

</style>