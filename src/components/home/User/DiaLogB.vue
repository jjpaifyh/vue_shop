<template>
  <el-dialog
  title="修改用户"
  :visible.sync="editDialogVisible"
  width="50%"
  :before-close="handleClose">

<el-form ref="editFormRef" :model="editForm" :rules="editFormRyle" label-width="70px"  @close="deitDialogClosed">
  <el-form-item label="活动名称">
    <el-input v-model="editForm.username" disabled></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="editForm.email"></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="mobile">
    <el-input v-model="editForm.mobile"></el-input>
  </el-form-item>
</el-form>


  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible_x">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
    name:"DiaLogB",
    data() {
        var checkEmail=(rule,value,cb)=>{
                    const regEmail=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                    if(regEmail.test(value)){
                        return cb()
                    }
                    cb(new Error("请输入合法邮箱"))
                }
                return {
                    editFormRyle:{
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
        editDialogVisible:{
            type:Boolean,
            default(){
                return false
            }
        },
        editForm:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        handleClose(){
            this.$parent.editDialogVisible=false
        },
        editDialogVisible_x(){
            this.$parent.editDialogVisible=false
        },
        deitDialogClosed(){
            this.$refs.editFormRef.resetFields()
        },
         editUserInfo(){
            this.$refs.editFormRef.validate(async valid=>{
                if(!valid){return this.$Message.error("信息有误,更改失败！")}
                const {data:res} = await this.$http.put('users/'+this.editForm.id,{
                    email:this.editForm.email,
                    mobile:this.editForm.mobile
                    })

                if(res.meta.status!==200){ return this.$Message.error('添加用户失败')}
                this.$Message.success('更改成功')
                this.editDialogVisible_x()
                 this.$parent.getUserList()

            })

        }
    },
    
}
</script>

<style scoped>

</style>