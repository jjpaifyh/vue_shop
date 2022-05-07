<template>
  <div>
    <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 卡片视图 -->
  <el-card>
    <!-- 添加角色 -->
    <el-row>
      <el-col>
        <el-button type="primary" @click="clickadd">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 角色列表区域 -->
    <el-table :data="rolelist" border stripe>
      <!-- 展开权限树 -->
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-row v-for="(item,i1) in scope.row.children" :key="item.id" :class="['bott',i1==0?'topp':'','clit']">
          <!-- 渲染一级权限 -->
          <el-col :span="5"  >
            <el-tag @close="removeRightById(scope.row,item.id)" closable>{{item.authName}}</el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <!-- 渲染二三级权限 -->
          <el-col :span="19">
            <el-row  v-for="(items,i2) in item.children" :key="i2" :class="[i2!=-0?'topp':'','clit']">
              <el-col :span="6">
                <el-tag @close="removeRightById(scope.row,items.id)" closable type="success">{{items.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染三级权限 -->
              <el-col :span="18" >
                    <el-tag @close="removeRightById(scope.row,itemss.id)" closable type="warning" v-for="(itemss,i3) in items.children" :key="i3">{{itemss.authName}}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>  
      </template>
    </el-table-column>
      <!-- 索引列 -->
    <el-table-column type="index"></el-table-column>
    <el-table-column label="角色名称" prop="roleName"></el-table-column>
    <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
    <el-table-column label="操作" width="300px">
      <template slot-scope="scope" >
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="clickeditor(scope.row.id)">编辑</el-button>
        <el-button size="mini"  type="danger" icon="el-icon-delete" @click="clickdel(scope.row.id)">删除</el-button>
        <el-button size="mini"  type="warning" icon="el-icon-setting" @click="clickdistributor(scope.row)">分配权限</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
  <role-lista-diglog :istf="istf" :rele="rele"></role-lista-diglog>
  <role-add :add_isft="add_isft"></role-add>
  <role-butor :butor_istf="butor_istf" :rightslist="rightslist" :reff="reff" :roleId="roleId"></role-butor>
  </div>

</template>

<script>
import RoleButor from "./RoleButor.vue"
import RoleAdd from './RoleAdd.vue'
import RoleListaDiglog from './role_lista_dialog.vue'
export default {
    name:"role_list",
    data() {
      return {
        rolelist:[],
        roleId:null,
        istf:false,
        // 编辑展现的数据
        rele:{
          roleDesc:'',
          roleId:'',
          roleName:''
        },
        // 添加角色对话框显示与隐藏
        add_isft:false,
        // 分配权限对话框显示与隐藏
        butor_istf:false,
        // 所有权限的数据
        rightslist:[],
        reff:[]
      }
    },
    created() {
      this.getRolesList()
    },
     methods:{
      // 获取所以角色的列表
      async getRolesList(){
        const {data:res}=await this.$http.get('roles')
        if(res.meta.status!=200){return this.$Message.error("获取所以角色的列表失败")}
        this.rolelist=res.data
        console.log(this.rolelist);

      },
      // 获取点击的用户数据
      async clickeditor(id){
        this.istf=true
        const {data:res}= await this.$http.get('roles/'+id)
        if(res.meta.status!==200){ return this.$Message.error('查询角色失败')}
         this.rele=res.data
      },
      clickadd(){
        this.add_isft=true
      },
      // 删除用户
      async clickdel(id){
        const res=await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(res);
      if(res!="confirm"){return this.$Message.info("已取消删除")}

      const {data:ress} = await this.$http.delete('roles/'+id)
      if(ress.meta.status!=200){ return this.$Message.error('删除角色失败')}
      this.$Message.success('删除角色成功')
      this.getRolesList()
      
      },
      // 展开权限树节点删除操作
      async removeRightById(role,rightId){
        // 弹框提示
         const res=await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
         if(res!="confirm"){return this.$Message.info("已取消删除")}

         const {data:ress} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
         if(ress.meta.status!=200){ return this.$Message.error('删除权限失败')}
         this.$Message.success('删除权限成功')
        role.children=ress.data
      },
      // 获取所有权限数据
      async clickdistributor(role){
        this.roleId=role.id
         const {data:res}=await this.$http.get("rights/tree")
          if(res.meta.status!=200){ return this.$Message.error('获取权限失败')}
          this.getLeafKeys(role,this.reff)
          this.rightslist=res.data
          this.butor_istf=true

      },
        getLeafKeys(node,arr){
        if(!node.children){
            return arr.push(node.id)

        }
        node.children.forEach(item =>{
            this.getLeafKeys(item,arr)
        })
      }
    },
    components:{
      RoleListaDiglog,
      RoleAdd,
      RoleButor
    }
}
</script>

<style scoped>
.el-table{
  margin-top: 15px;
}
.el-tag{
  margin: 7px;
}
.bott{
  border-bottom: 0.5px solid rgb(201, 198, 198);
}
.topp{
  border-top: 0.5px solid rgb(201, 198, 198);
}
.clit{
  display: flex;
  align-items: center;
}
</style>