<template>
  <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @clear="sx">
        <el-button slot="append" icon="el-icon-search" @click="sx"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="add" class="butt-le">添加用户</el-button>
      </el-col>
  </el-row>
</template>

<script>
export default {
    name:"UserButton",
    data() {
        return {
            
        }
    },
    props:{
        queryInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        sx(){
            this.$emit("getUserList")
        },
        add(){
            this.$emit('addup')
        }
    },
 


}
</script>

<style scoped>
.butt-le{
  position: absolute;
  right: 15px;
}
</style>