<template>
    <div class="container">
        <div class="title">
            <span class="tit">实验目的与工具</span>
        </div>
        <div class="line"></div>
        <div class="form">
            <el-form :model="sizeForm" :rules="rules" ref="form"  label-width="100px" size="middle" label-position="left">
            <el-form-item   label="测量工具：" prop="name">
                <el-select v-bind:disabled="disable" v-model="sizeForm.name" placeholder="请选择"  style="width: 500px;">
                    <el-option label="艾森伯格儿童行为量表（ECBI）" value="艾森伯格儿童行为量表（ECBI）"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item   label="测量维度:" prop="region">
                <el-select v-bind:disabled="disable" v-model="sizeForm.region" placeholder="请选择"  style="width: 500px;">
                    <el-option label="ECBI-intensity问题频率得分（母亲视角）" value="ECBI-intensity问题频率得分（母亲视角）"></el-option>
                    <el-option label="ECBI-intensity问题频率得分（父亲视角）" value="ECBI-intensity问题频率得分（父亲视角）"></el-option>
                    <el-option label="ECBI-intensity问题强度得分" value="ECBI-intensity问题强度得分"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="实验题目：" style="width: 600px;margin-top: 40px;" prop="thme">
                <el-input v-bind:disabled="disable" v-model="sizeForm.thme" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item  label="目的描述：" prop="textarea">
                <div class="textarea">
                    <el-input v-bind:disabled="disable" type="textarea" :rows="10" placeholder="请输入内容" v-model="sizeForm.textarea" style="color: #eeee; " number=100>
                    </el-input>
                </div>
            </el-form-item>
            <el-form-item size="large">
                <div class="start"><el-row type="flex" justify="center" v-if="show==1"><el-button type="primary"  @click="onSubmit(sizeForm)">下一步</el-button></el-row></div>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
        disable:false,
        show:1,
        index:1,
        id: 0,
        sizeForm: {
          name:'',
          thme: '',
          region: 'ECBI-intensity问题频率得分（母亲视角）',
          textarea: '',
        },
        rules: {
            name: [
                { required: true, message: '请输入测量工具', trigger: 'blur'}
            ],
            thme: [
                { required: true, message: '请输入实验题目', trigger: 'blur'}
            ],
            region: [
                { required: true, message: '请输入实验题目', trigger: 'blur'}
            ],
            textarea: [
                { required: true, message: '请输入目的描述', trigger: 'blur'}
            ]

        }
        
    }
  },
  components: {
  },
  created(){
      this.id = localStorage.getItem('userTaskId');
      this.getTools(this.id)
  },
  methods: {
      //编辑实验目的与工具
      onSubmit(form) {
        //输入要求
        if(!form.name){
            this.$message({
                message: '请输入测量工具！',
                type: 'warning'
            });
            return
        } else if(!form.region) {
            this.$message({
                message: '请选择测量维度！',
                type: 'warning'
            });
            return
        } else if(!form.thme) {
            this.$message({
                message: '请输入实验题目！',
                type: 'warning'
            });
            return
        } else if(!form.textarea) {
            this.$message({
                message: '请输入目的描述！',
                type: 'warning'
            });
            return
        }
        let params = {
            id: this.id,
            measureTool: form.name,
            measureDimension: form.region,
            taskTitle: form.thme,
            taskPurpose: form.textarea
        }
        this.httpPost("/userTask/purposeAndTools", params).then(res => {
          if (res && res.code === 0) {
         this.$store.commit("setSteoNum",this.$store.state.stepNum + 1)
            this.show=2;
            let url = '/rct/expersteps/register/'+localStorage.getItem('userTaskId')
            this.$router.push(url);            	
            localStorage.setItem('currentPage',2);
            this.$message({
                message: '成功保存！',
                type: 'success'
            });
          }
        });
      },

      //获取实验目的与工具
      getTools(id) {
        let params = {
            id: id
        }
        this.httpPost("/userTask/getUserTask", params).then(res => {
            if (res && res.code === 0) {
            let data = res.data
            this.sizeForm.name = data.measureTool
            this.sizeForm.thme = data.taskTitle
            this.sizeForm.region = data.measureDimension
            this.sizeForm.textarea = data.taskPurpose
             if(data.finishStepNum && data.finishStepNum > this.index){
                    this.show=2;
                    this.disable=true;
                }
            }
        });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/deep/.textarea .el-textarea__inner {
    resize:none;
}
/deep/.main .el-textarea__inner {
    color: #bbb;
    font-family: 'Microsoft YaHei';
    line-height: 28px;

}
.el-button--primary {
    background-color: #1476b6;
    border-color: #1476b6;
}
/deep/.form .el-form-item__label {
    font-size: 14px;
    font-weight: 500;
    color: #1D1D16;
}
/deep/.form .el-form-item__label {
    font-size: 14px;
    font-weight: 600;
    color: #1D1D16;
}
/deep/.start .el-button {
  padding: 14px 55px;
  background-color: #1476b6;
}
/deep/.start .el-button:hover {
  padding: 14px 55px;
  background-color: #1a87cf;
}
.container {
    .title {
        padding-bottom: 10px;
        .tit {
            color: #3AB5D7;
            font-size: 18px;
            font-weight: 350;
            // .icon-dengpao {
            //     font-size: 34px;
            //     color:#FCA2A2;
            //     margin-right: 12px;
            // }
        }
    }
    .line {
        width: 920px;
        height:0px;
        border: 0.25px solid #ddd;
        margin-bottom: 30px;
    }
}
</style>