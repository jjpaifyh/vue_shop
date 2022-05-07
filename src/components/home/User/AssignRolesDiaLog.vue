<template>
  <el-dialog
  title="分配角色"
  :visible.sync="istf_assign_roles"
  width="50%"
  :before-close="handleClose"
  @close="closeassign">
  <div class="formm">
  <span>用户名：{{datas.username}}</span><br>
  <span>角色：{{datas.role_name}}</span>
  <span>分配新角色：
    <el-select v-model="selectedRoleId" placeholder="请选择">
        <el-option
        v-for="item in relesList"
        :key="item.id"
        :label="item.roleName"
        :value="item.id">
        </el-option>
    </el-select>
  </span>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
    name:"AssignRolesDiaLog",data() {
        return {
            // 选中的角色
            selectedRoleId:''
        }
    },
    props:{
        istf_assign_roles:{
            type:Boolean,
            default(){
                return false
            }
        },
        datas:{
            type:Object,
            default(){
                return {}
            } 
        },
        relesList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        handleClose(){
            this.$parent.istf_assign_roles=false
        },
        closeassign(){
            this.selectedRoleId=''
            this.datas={}
        },
        // 点击按钮分配角色
        async saveRoleInfo(){
            if(!this.selectedRoleId){
                this.$Message.error("请选择角色！")
            }
            const {data:res}=await this.$http.put(`users/${this.datas.id}/role`,{rid:this.selectedRoleId})
            if(res.meta.status!=200){return this.$Message.error('操作失败')}
            this.$Message.success("获取成功")
            this.handleClose()
            this.$parent.getUserList()
        }
    }
}
</script>

<style scoped>
.formm span{
    display: block;
    margin: 5px;
}
</style>