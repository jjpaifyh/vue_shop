<template>
<el-dialog
  title="编译角色"
  :visible.sync="istf"
  width="50%"
  :before-close="handleClose">

    <el-form ref="rele_from" :model="rele" label-width="80px"  @close="deitDialogClosed">
        <el-form-item label="角色名称">
            <el-input v-model="rele.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
            <el-input v-model="rele.roleDesc"></el-input>
        </el-form-item>
    </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="istf_role_list">取 消</el-button>
    <el-button type="primary" @click="rolelist">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
    name:"role_lista_dialog",
    data() {
        return {
            
        }
    },
    props:{
        istf:{
            type:Boolean,
            default(){
                return false
            }
        },
        rele:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        istf_role_list(){
            this.$parent.istf=false
            
        },
        handleClose(){
            this.$parent.istf=false
        },
        deitDialogClosed(){
            this.$refs.rele_from.resetFields()
        },
        async rolelist(){
             const {data:res}= await this.$http.put('roles/'+this.rele.roleId,{
                 roleName:this.rele.roleName,
                 roleDesc:this.rele.roleDesc
             })
             if(res.meta.status!=200){ return this.$Message.error('修改角色失败')
             }
            this.$Message.success('编辑角色成功')
            this.istf_role_list()
            this.$refs.rele_from.resetFields()
            this.$parent.getRolesList()

            
        }
    }
}
</script>

<style>

</style>