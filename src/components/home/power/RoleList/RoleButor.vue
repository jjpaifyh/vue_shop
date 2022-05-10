<template>
  <el-dialog
  title="提示"
  :visible.sync="butor_istf"
  width="70%"
  :before-close="handleClose" 
  @close="trssclose">
    <el-tree ref="treeRef" :data="rightslist" 
    :props="tessProps" 
    show-checkbox 
    node-key="id"
    :default-checked-keys="reff"
    
    ></el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="RoleButor_istf">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
    name:"RoleButor",
    props:{
        butor_istf:{
            type:Boolean,
            default(){
                return false
            }
        },
        rightslist:{
            type:Array,
            default(){
                return []
            }
        },
        reff:{
            type:Array,
            default(){
                return []
            }
        },
        roleId:{
            type:Number,
            default(){
                return null
            }
        }
    }
    ,
    data() {
        return {
            tessProps:{
                label:'authName',
                children:'children',
            },

        }
    },

    methods:{
        RoleButor_istf(){
            this.$parent.butor_istf=false
            console.log(this.rightslist);
        },
        handleClose(){
            this.$parent.butor_istf=false
        },
        trssclose(){
            this.$parent.reff=[]
        },
        async allotRights(){
            const keys=[
                ...this.$refs.treeRef.getCheckedKeys(),
                ...this.$refs.treeRef.getHalfCheckedKeys()
            ]
             const idStr=keys.join(',')
            const {data:res}=await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr})
             if(res.meta.status!=200){ return this.$Message.error('权限获取失败')}
             this.$Message.success('权限获取成功')
              this.$parent.getRolesList()
             this.$parent.butor_istf=false
            
        }

    }
}
</script>

<style scoped>

</style>