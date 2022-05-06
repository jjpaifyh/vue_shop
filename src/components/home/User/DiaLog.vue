<template>
  <el-dialog
  title="信息写入"
  :visible.sync="dialogVisible"
  width="50%"
  @close="addDialogClosed"
   :before-close="handleClose">
<el-form :model="addForm" :rules="addrules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
  <el-form-item label="用户名称" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel_dialog">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
    name:"DiaLog",
    data() {
        var checkEmail=(rule,value,cb)=>{
            const regEmail=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
            if(regEmail.test(value)){
                return cb()
            }
            cb(new Error("请输入合法邮箱"))
        }
        return {
        addrules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail,trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            min: 8,
            max: 16,
            message: '长度在 11 到 15 个字符',
            trigger: 'blur',
          },
        ],
      } 
        }
    },
    props:{
        dialogVisible:{
            type:Boolean,
            default(){
                return false
            }
        },
        addForm:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        addUser(){
           this.$refs.ruleForm.validate(async valid =>{
             if(!valid)return
             const {data:res} =await this.$http.post('users',this.addForm)
             console.log(res);
             if(res.meta.status!==201){ return this.$Message.error('添加用户失败')}
             this.$Message.success('添加用户成功')
             this.$parent.dialogVisible=false
             this.$parent.getUserList()
           })
        },
        // 清空表单
        addDialogClosed(){
          this.$refs.ruleForm.resetFields()
        },
        cancel_dialog(){
            this.$parent.dialogVisible=false
        },
        handleClose(){
            this.$parent.dialogVisible=false
        }
    }
}
</script>

<style scoped>

</style>