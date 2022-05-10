<template>
  <el-dialog
  title="提示"
  :visible.sync="istf_Redact"
  width="50%"
  :before-close="handleClose">
    <el-form ref="form" :model="datas_goods" label-width="80px">
    <el-form-item label="商品名称">
        <el-input v-model="datas_goods.cat_name"></el-input>
    </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
    name:"GoodsRedact",
    props:{
        istf_Redact:{
            type:Boolean,
            default(){
                return false
            }
        },
        datas_goods:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        handleClose(){
            this.$parent.istf_Redact=false
        },
        async add(){
            const {data:res} = await this.$http.put("categories/"+this.datas_goods.cat_id,{
                cat_name:this.datas_goods.cat_name
            })
            if(res.meta.status!=200){return this.$Message.error("编辑失败")}
            this.$$Message.success("编辑成功")
            console.log(res);
            this.handleClose()
            this.$parent.getCateList()

        }
    }
}
</script>

<style scoped>

</style>