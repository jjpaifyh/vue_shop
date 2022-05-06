<template>
<el-container>
  <!-- 头部 -->
  <el-header>
    <div class="logo">
      <img src="@/assets/img/Login/logo.png" alt="" />
      <span>商城后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button> 
  </el-header>

  <el-container>
    <!-- 折叠 -->

    <!-- 侧边栏 -->
    <el-aside :width="istf ? '64px':'200px'">
      <div class="conceal" @click="click_conceal">
      |||
      </div>
       <el-menu
      :default-active="index_item"
      class="el-menu-vertical-demo"

      background-color=transparent
      text-color="#fff"
      active-text-color="#ffd04b" 
      unique-opened 
      :collapse='istf'
      :collapse-transition="false"
      :router="true"
     
      >
      <!-- 一级菜单 -->
      <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
        <!-- 一级菜单模板区 -->
        <template slot="title">
          <!-- 图标 -->
          <i :class="menulist_icon[item.id]"></i>
          <!-- 文本 -->
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item  @click="get_index_item('_'+itemhz.path)" :index="'_'+itemhz.path" v-for="itemhz in item.children "  :key="itemhz.id">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{itemhz.authName}}</span>
        </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <!-- 右侧内容主体 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menulist:[],
      menulist_icon:{
        '125':"el-icon-s-custom",
        "103":"el-icon-key",
        '101':"el-icon-shopping-bag-1",
        '102':'el-icon-notebook-1',
        '145':'el-icon-pie-chart'
      },
      istf:false,
      index_item:''
    }
  },
  created(){
    this.getMenList()
    this.index_item=window.sessionStorage.getItem('index')
  },
  methods:{
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/Login')
    },
    // 获取列表数据
    // async 与 await
    async getMenList(){
      const { data: res } = await this.$http.get('menus')
      if(res.meta.status!==200) return console.log(res.meta.msg)
      this.menulist=res.data
    },
    click_conceal(){
      this.istf=!this.istf
    },
    get_index_item(index){
      window.sessionStorage.setItem('index',index)
    }
  }
}
</script>

<style lang='less' scoped>
.el-header{
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
   background-image: linear-gradient(
    to right,
    rgb(24, 224, 147),
    rgb(95, 80, 235)
  );
  .logo{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
    img{
      width: 8%;
    }
  }
}
.el-aside{
  background-image: linear-gradient(
    rgb(24, 224, 147),
    rgb(95, 80, 235)
  );
}
.el-main{
  background-color: #eaedf1;
}
.el-container{
  height: 100%;
}
.el-menu{
  border-right: 0;
}
.conceal{
  width: 100%;
  height: 25px;
  background-color: rgb(122, 238, 167);
  text-align: center;
  line-height: 25px;
  cursor: pointer;
}
</style>