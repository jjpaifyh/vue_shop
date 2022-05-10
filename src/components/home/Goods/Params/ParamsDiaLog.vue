<!--  -->
<template>
  <el-dialog
  :title="textParams"
  :visible.sync="sitf_addParams"
  width="50%"
  :before-close="handleClose">
    <el-form ref="form" :model="datasforms" label-width="100px" :rules="rules">
        <el-form-item label="属性名称：" prop="attr_name">
            <el-input v-model="datasforms.attr_name"></el-input>
        </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="app">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
export default {
  name: 'ParamsDiaLog',
  props:{
      sitf_addParams:{
          type:Boolean,
          default(){
              return false
          }
      },
      conut:{
          type:Number,
          default(){
              return 0
          }
      }
  },
  data() {
    return {
        datasforms:{
            cat_id:Number,
            attr_id:Number,
            attr_name:'',
            attr_sel:'many',
            attr_vals:''
        },
        rules:{
            attr_name: [
          { required: true, message: '请输入属性名', trigger: 'blur' },
        ]
        }
    }
  },
  //监听属性 类似于data概念
  computed: {
      textParams(){
          return this.$parent.activeName=='many' ? '添加动态属性' : "添加静态属性"

      }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      handleClose(){
          this.$parent.sitf_addParams=false
          this.$refs.form.resetFields()
      },
       app(){
          this.$refs.form.validate(async valid=>{
            if(this.conut==0){const {data:res}= await this.$http.post(`categories/${this.datasforms.attr_id}/attributes`,{
                attr_name:this.datasforms.attr_name,
                attr_sel:this.datasforms.attr_sel
            })
             if(res.meta.status!==201){ return this.$Message.error('添加失败')}
             this.$Message.success('添加成功')}
             else{
                 const {data:res}= await this.$http.put(`categories/${this.datasforms.cat_id}/attributes/${this.datasforms.attr_id}`,{
                    //  params:{attr_sel:this.$parent.activeName},
                    attr_sel:this.$parent.activeName,
                     attr_name:this.datasforms.attr_name
                })
             if(res.meta.status!==200){ return this.$Message.error('编辑失败')}
             this.$Message.success('编辑成功')
                    
             }
             this.handleClose()
             this.$parent.getParamsData()
             
          })
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