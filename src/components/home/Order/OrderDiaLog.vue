<!--  -->
<template>
  <div class="">
      <el-dialog
        title="修改地址"
        :visible.sync="is_DiaLog"
        width="50%"
        :before-close="handleClose"
        @close="closed">

          <el-form ref="form" :model="datas" :rules="datasrules" label-width="100px">
          <el-form-item label="省市区/县" prop="addres1">
            <el-cascader :options="citydata" v-model="datas.addres1"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="addres2">
            <el-input v-model="datas.addres2"></el-input>
          </el-form-item>
          </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary"  @click="changed">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import citydata from '@/assets/js/citydata.js'
export default {
  name: 'OrderDiaLog',
  data() {
    return {
      is_DiaLog:false,
      // 垃圾数据
      datas:{
        addres1:[],
        addres2:''
      },
      datasrules:{
        addres1:[ { required: true, message: '不可为空', trigger: 'blur' }],
        addres2:[ { required: true, message: '请输入详细地址', trigger: 'blur' }]
      },
      citydata,
      dataId:''
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClose(){
      this.is_DiaLog=false
    },
    closed(){
      this.$refs.form.resetFields()
    },
    changed(){
      this.handleClose()
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

}
</script>
<style scoped>
</style>