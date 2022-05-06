<template>
<div>
    <!-- 面包屑导航区域 -->
  <breadcrumb></breadcrumb>
    <!-- 卡片视图区域 -->
<el-card>
    <!-- 搜索 添加用户 -->
  <user-button :queryInfo="queryInfo" @addup="add" @getUserList="getUserList"></user-button>
<!-- 用户列表 -->
<el-table :data="userlist" :border="true" :stripe="true">
    <el-table-column type="index"></el-table-column>
    <el-table-column label="用户名" prop="username"></el-table-column>
    <el-table-column label="邮箱" prop="email"></el-table-column>
    <el-table-column label="电话" prop="mobile"></el-table-column>
    <el-table-column label="角色" prop="role_name"></el-table-column>
    <el-table-column label="状态" prop="mg_state">
        <template slot-scope="scope">
            <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="userStateChanged(scope.row)">
            </el-switch>
        </template>
    </el-table-column>
    <el-table-column label="操作"  width="180px">

        <template slot-scope="scope">
            <!-- 修改 -->
            <el-tooltip class="item" effect="dark" content="修改用户" placement="top" :open-delay="1000">
                 <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :open-delay="1000">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id)"></el-button>
            </el-tooltip>
            <!-- 分配 -->
            <el-tooltip class="item" effect="dark" content="分配用户" placement="top" :open-delay="1000">
                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
        </template>
    </el-table-column>
</el-table>
    <!-- 分页 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>   
</el-card>
<!-- 添加用户对话框 -->
<dia-log :dialogVisible="dialogVisible"></dia-log>
<!-- 修改用户的对话框 -->
<dia-log-b :editDialogVisible="editDialogVisible" :editForm="editForm"></dia-log-b>

</div>
</template>

<script>
import DiaLog from "./DiaLog"
import UserButton from "./UserButton.vue"
import Breadcrumb from "./Breadcrumb.vue"
import DiaLogB from './DiaLogB.vue'
export default {
    name:"User",
    data() {
        return {
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:10
            },
            editForm:{},
            input:'',
            userlist:[],
            total:0,
            dialogVisible:false,
            editDialogVisible:false,
            // 添加用户表单数据
            addForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
        }
    },
    components:{
      Breadcrumb,
      UserButton,
      DiaLog,
      DiaLogB
    },
    created(){
        this.getUserList()
    },
    methods:{
      // 获取用户列表
        async getUserList(){
           const res= await this.$http.get('users',{params:this.queryInfo})
           console.log(res);
           console.log(res.data.meta.status);
           if(res.data.meta.status!==200) {return console.log('获取用户列表失败');}
           this.userlist=res.data.data.users
           this.total=res.data.data.total
        },
        // 监听pagesize改变的事件
        handleSizeChange(newSize){
            this.queryInfo.pagesize=newSize
             this.getUserList()
        },
        // 监听页码值改变的事件
        handleCurrentChange(newPage){

            this.queryInfo.pagenum=newPage
            this.getUserList()
           
        },
        // 更改用户启用情况
        async userStateChanged(queryInfo){
          const {data:res} = await this.$http.put(`users/${queryInfo.id}/state/${queryInfo.mg_state}`)
          console.log(res);
          if(res.meta.status!=200){
              queryInfo.mg_state=!queryInfo.mg_state
              return this.$Message.error("更改失败")}
            this.$Message.success("更改成功")
        },
        // 修改值控制表单消失和出现
        add(){
            this.dialogVisible=true
            console.log('dialogVisible改为true了'+this.dialogVisible);
        },
        async showEditDialog(id){
          this.editDialogVisible=true
          const {data:res}=await this.$http.get("users/"+id)
          if(res.meta.status!=200){return this.$Message.error('更新操作失败')}
          this.editForm=res.data
        },
        // 删除用户
        async removeUser(id){
          const res=await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        console.log(res);
        if(res!="confirm"){return this.$Message.info("已取消删除")}

          const {data: ress} =await this.$http.delete('users/'+id)
          if(ress.meta.status!=200){return this.$Message.error('删除操作失败')}
          this.$Message.success("删除成功")
          this.getUserList()
        
        }

    }
}
</script>

<style scoped>
.el-table{
    margin-top: 15px;
}
.el-pagination{
    margin-top: 15px;
}
.butt-le{
  position: absolute;
  right: 15px;
}
</style>