<!--  -->
<template>
  <div class="">
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>参数列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 卡片 -->
  <el-card>
      <!-- 警告区域 -->
      <el-alert show-icon title="注意：只允许为第三级分类设置相关参数！" type="warning"></el-alert>

    <!-- 选择商品分类区域 -->
    <el-row>
        <el-col>
            <span class="xz">选择商品分类:</span>
            <!-- 选择商品分类的级联选择框 -->
                <el-cascader
                v-model="selectedCateKeys"
                :options="catelist"
                :props="{expandTrigger:'hover', ...cascaderProps,checkStrictly:true}"
                @change="handleChange">
                </el-cascader>
        </el-col>
    </el-row>
    <!-- 页签 -->
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="动态属性" name="many">
        <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="add" class="but">添加参数</el-button>
        <!-- 动态参数表格 -->
        <el-table :data="manyTabData" border stripe>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-tag v-for="(litem,index) in scope.row.attr_vals" :key="index" closable @close="del_tag(scope.row,index)">{{litem}}</el-tag>
              <!-- 输入文本框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="adds(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-detele" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="静态属性" name="only">
        <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="add" class="but">添加参数</el-button>
         <el-table :data="onlyTabData" border stripe>
          <el-table-column type="expand">


            <template slot-scope="scope">
              <el-tag v-for="(litem,index) in scope.row.attr_vals" :key="index" closable @close="del_tag(scope.row,index)">{{litem}}</el-tag>
              <!-- 输入文本框 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
            </template>


          </el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <!-- 有问题要问一下 -->
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="adds(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-detele" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-tab-pane>
  </el-tabs>
  </el-card>
  <params-dia-log :sitf_addParams="sitf_addParams" ref="dialog" :conut="conut"></params-dia-log>
  </div>
</template>

<script>
import ParamsDiaLog from "./ParamsDiaLog.vue"
export default {
  name: 'Params',
  data() {
    return {
        catelist:[],
        conut:0,
        cascaderProps:{
            value:"cat_id",
            label:"cat_name",
            children:'children',
            },
            selectedCateKeys:[],
            // 被激活的页签的名称
            activeName:'many',
            manyTabData:[],
            onlyTabData:[],
            // 判断添加对话框的出现
            sitf_addParams:false
    }
  },
  //监听属性 类似于data概念
  computed: {
    //   如果按钮需要被禁用就返回true
    isBtnDisabled(){
            return this.selectedCateKeys.length!=3
    },
    cateId(){
        return this.selectedCateKeys.length==3 ? this.selectedCateKeys[2] : null;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      async getCateList(){
          const {data:res}=await this.$http.get('categories')
          if(res.meta.status!=200){return this.$Message.error('删除操作失败')}
          this.catelist=res.data

      },
       handleChange(){
        this.getParamsData()
      },
      async handleInputConfirm(data){
        if(data.inputValue.trim().length==0){
          data.inputVisible=false
          data.inputValue=''
          return
        }
          this.axios_gat(data)        
      },
      async axios_gat(data){
        data.attr_vals.push(data.inputValue)
        data.inputVisible=false
        data.inputValue=''
        const {data:res}= await this.$http.put(`categories/${data.cat_id}/attributes/${data.attr_id}`,{
          attr_name:data.attr_name,
          attr_sel:data.attr_sel,
          attr_vals:data.attr_vals.join(',')
        })
        if(res.meta.status!=200){return this.$Message.error('添加操作失败')}
        this.$Message.success('添加成功')
          
      },
      showInput(data){
        data.inputVisible=true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
    //   获取参数的列表数据
    async getParamsData(){
          this.$refs.dialog.datasforms.attr_id=this.selectedCateKeys[this.selectedCateKeys.length-1];
          if(this.selectedCateKeys.length!==3){
              this.selectedCateKeys=[]
              this.manyTabData=[]
              this.onlyTabData=[]
              this.$Message.error("请查看自己的权限允许选择的范围！")
              return
          }
            const {data:res} = await this.$http.get(`categories/${this.cateId}/attributes`,
            {
                params:{sel:"many"}
            })
            const {data:ress} = await this.$http.get(`categories/${this.cateId}/attributes`,
            {
                params:{sel:"only"}
            })
            if(res.meta.status!=200 && ress.meta.status!=200){return this.$Message.error('请求失败')}
            console.log(res);
            console.log(123456);
            res.data.forEach(item=>{
              item.attr_vals=item.attr_vals ? item.attr_vals.split(',') : []
              item.inputVisible=false
              item.inputValue=''
            })
            ress.data.forEach(item=>{
              item.attr_vals=item.attr_vals ? item.attr_vals.split(',') : []
              item.inputVisible=false
              item.inputValue=''
            })
            console.log(res);
            console.log(55555);
            this.manyTabData=res.data
            this.onlyTabData=ress.data
    },
    // 删除tag标签
    del_tag(data,index){
      data.attr_vals.splice(index,1)
      if(data.attr_vals[data.attr_vals.length-1]==''){
          data.attr_vals.pop()
      }else if(data.attr_vals[index]==''){
        data.attr_vals.splice(index,1)
      }
      
      console.log(data);
      this.axios_gat(data)
      // this.getParamsData()

    },
    add(){
      this.conut=0
      this.sitf_addParams=true
    },
    adds(data){
      this.conut=1
      this.sitf_addParams=true
      this.$refs.dialog.datasforms.attr_id=data.attr_id
      this.$refs.dialog.datasforms.attr_name=data.attr_name
      this.$refs.dialog.datasforms.cat_id=data.cat_id
      console.log(data);
    },
    //   tab页签点击事件处理函数
      handleTabClick(){
          console.log(this.activeName);
          this.$refs.dialog.datasforms.attr_sel=this.activeName
      },
      del(data){
        console.log(data);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
          const {data:res}= await this.$http.delete(`categories/${data.cat_id}/attributes/${data.attr_id}`)
          if(res.meta.status!=200){return this.$Message.error('删除操作失败')}
          this.$Message.success('删除成功')
          this.getParamsData()
        }).catch(err=>err)
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      this.getCateList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  components:{
    ParamsDiaLog
  }

}
</script>
<style scoped>
.xz{
    display: block;
    margin: 10px;
}
.but{
  margin-bottom: 10px;
}
.el-tag{
  margin: 3px;
}
.input-new-tag{
  width: 120px;
}
</style>