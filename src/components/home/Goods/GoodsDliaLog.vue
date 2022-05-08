<template>
  <el-dialog
  title="提示"
  :visible.sync="isAddGodds"
  width="50%"
  :before-close="handleClose">
    <el-form ref="form" :model="addCateForm" label-width="100px" :rules="rules">
        <el-form-item label="分类名称：" prop="cat_name">
            <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
    <el-form-item label="父级分类">
        <el-cascader
        v-model="value"
        :options="parentCateList"
        :props="{expandTrigger:'hover', ...cascaderProps,checkStrictly:true}"
        @change="parentCateChanged"
        clearable
        filterable
        >

        </el-cascader>
    </el-form-item>
    </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="clickqd">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
    name:'GoodsDliaLog',
    data() {
        return {
            addCateForm:{
                // 添加胡名称
                cat_name:'',
                // 父级分类等级，默认一级
                cat_pid:0,
                // 分类等级，默认一级
                cat_level:0

            },
            // 指定级联选择器的配置对象
            cascaderProps:{
                value:"cat_id",
                label:"cat_name",
                children:'children',
            },
            // 选中的父级
            value:[],
            // 规则
            rules:{
                cat_name:[
                { required: true, message: '请输入名称', trigger: 'blur' },
                 {
                    min: 1,
                    max: 10,
                    message: '名称长度需要在 1 到 8 个字符',
                    trigger: 'blur',
                },
                 ]
            }
        }
    },
    props:{
        isAddGodds:{
            type:Boolean,
            default(){
                return false
            }
        },
        parentCateList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods:{
        handleClose(){
            this.$parent.isAddGodds=false
            this.$refs.form.resetFields()
            this.value=[]
        },
        parentCateChanged(){
            if(this.value.length>0){
                this.addCateForm.cat_pid=this.value[this.value.length-1]
                this.addCateForm.cat_level=this.value.length
                return
            } else{
                 this.addCateForm.cat_pid=0
                this.addCateForm.cat_level=0
            }
        
        },
        clickqd(){
            console.log(this.addCateForm);
            this.$refs.form.validate(async valid=>{
                if(!valid)return
                const {data:res}=await this.$http.post('categories',this.addCateForm)
                if(res.meta.status !=201){return this.$Message.error("添加分类失败")}
                this.$Message.success("添加分类成功！")
                this.$parent.getCateList()
                this.handleClose()
            })
        }
    }
}
</script>

<style scoped>
.el-cascader{
    width: 100%;
}
</style>