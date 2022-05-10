<template>
  <el-dialog
  title="添加角色"
  :visible.sync="add_isft"
  width="50%"
  :before-close="handleClose">

  <el-form ref="roleform" :model="roleAdd" label-width="80px">
  <el-form-item label="角色名称">
    <el-input v-model="roleAdd.roleName"></el-input>
  </el-form-item>
  <el-form-item label="角色描述">
    <el-input v-model="roleAdd.roleDesc"></el-input>
  </el-form-item>
  </el-form>


  <span slot="footer" class="dialog-footer">
    <el-button @click="add_isft_click">取 消</el-button>
    <el-button type="primary" @click="add_isft_click_end">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
    name:"RoleAdd",
    data() {
      return {
        roleAdd:{
          roleName:'',
          roleDesc:''
        }
      }
    },
    props:{
      add_isft:{
        type:Boolean,
        default(){
          return false
        }
      }
    },
    methods:{
      add_isft_click(){
        this.$parent.add_isft=false
      },
      handleClose(){
        this.$parent.add_isft=false
      },
      async add_isft_click_end(){
        const {data:res}= await this.$http.post('roles',{
          roleName:this.roleAdd.roleName,
          roleDesc:this.roleAdd.roleDesc}) 
        console.log(res);
        if(res.meta.status!=201){ return this.$Message.error('添加角色失败')
        }
        this.$Message.success('添加角色成功')
        this.add_isft_click()
        this.$parent.getRolesList()
      }
    }
}
</script>

<style scoped>

</style>