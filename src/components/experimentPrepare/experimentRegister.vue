<template>
    <div class="container">
        <div class="title">
            <span class="tit">实验注册</span>
        </div>
        <div class="line"></div>
        <div class="form">
            <el-form :model="sizeForm" :rules="rules" ref="form" label-width="100px" size="middle" label-position="right">
            <el-form-item  label="注册题目：" prop="title">
                <el-input v-bind:disabled="disable" v-model="sizeForm.title" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="注册时间：" prop="time">
                <el-input v-model="sizeForm.time" style="width: 500px" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item   label="注  册  号 ：">
                <el-input v-model="sizeForm.num" style="width: 500px;" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item  label="注册状态：">
                <el-input v-model="sizeForm.status" style="width: 500px" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item  label="伦理审查：">
                <el-input v-model="sizeForm.result" style="width: 500px " :disabled="true"></el-input>
            </el-form-item>
            
            <el-form-item size="large"  style="margin-top: 20px; " v-if="ifShow==1">
                <div class="start"><el-row type="flex" justify="center"><el-button type="primary" @click="onSubmit(sizeForm)">提交审核</el-button></el-row></div>
            </el-form-item>
            <el-form-item>
                <div class="start"><el-row v-if="ifShow==2" type="flex" justify="center"><el-button type="primary" @click="toContinue(sizeForm)">下一步</el-button></el-row></div>
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
        ifShow:1,//显示是审核
        index:2,
        id: 0,//用户实验id
        nowDate: null,
        sizeForm: {
          title: '',
          time: '',
          num: null,
          status: null,
          result: null
        },
        rules: {
            title: [
                { required: true, message: '请输入注册题目', trigger: 'blur'}
            ],
            time: [
                { required: true, message: '请输入注册时间', trigger: 'blur'}
            ]

        }
    }
  },
  components: {
  },
  created(){
     this.id = localStorage.getItem('userTaskId');
      let date = new Date()
      this.sizeForm.time = date.toLocaleString('chinese', { hour12: false });
      this.nowDate = date.getTime();
      this.getRegisterInfo(this.id)
  },
  methods: {
      //页面加载时需要查查询改步骤是否完成  如果完成 修改 ifShow 为 false
      getRegisterInfo(id){
        let params = {
            id: id
        }
        this.httpPost("/userTask/getUserTask", params).then(res => {
            if (res && res.code === 0) {
                let data = res.data
            
                this.sizeForm.title = data.registerTitle
                if(data.registerTime){
                    this.sizeForm.time = data.registerTime
                }
                this.sizeForm.num = data.registerNum
                if(data.registerStatus == 1){
                    this.sizeForm.status = '已完成'
                } else if(data.registerStatus == 2){
                    this.sizeForm.status = '未完成'
                } else{
                    this.sizeForm.status = null
                }
                if(data.registerResult == 1){
                    this.sizeForm.result = '通过'
                } else if(data.registerResult == 2){
                    this.sizeForm.result = '审核中'
                } else{
                    this.sizeForm.result = null
                }
                if(data.finishStepNum && data.finishStepNum>this.index){
                    this.ifShow=3;
                    this.disable=true;
                }
            }
        });
      },

      onSubmit(form) {
        if(!form.title){
            this.$message({
                message: '请输入注册题目！',
                type: 'warning'
            });
            return
        } else if(!form.time) {
            this.$message({
                message: '请注册时间！',
                type: 'warning'
            });
            return
        }
        let params = {
            id: this.id,
            registerTitle: form.title,
            registerNum: form.num
        }
        this.httpPost("/userTask/getNewRegisterNum").then(res => {
          if (res && res.code === 0) {
            this.sizeForm.num = res.data
            params.registerNum = res.data
            params.registerStatus = 1
            params.registerResult = 1
            this.sizeForm.status = '已完成'
            this.sizeForm.result = '通过'
            this.ifShow=2;//用于控制按钮显示状态
          }
        });
      },
      //下一步
      toContinue(form){
          let params = {
              id: this.id,
              registerTitle: form.title,
              registerNum: form.num,
              registerTime: this.nowDate,
              registerStatus: 1,
              registerResult: 1
          }
        this.httpPost("/userTask/ExperimentalRegiste", params).then(res => {
          if (res && res.code === 0) {
				this.$store.commit("setSteoNum", this.$store.state.stepNum + 1)
            let url = '/rct/expersteps/select/'+localStorage.getItem('userTaskId')
            this.ifShow=3;
            this.$router.push(url);            	
            localStorage.setItem('currentPage',3)
            this.$message({
                message: '提交保存！',
                type: 'success'
            });
            let path = '/rct/expersteps/select/'+this.id
            this.$router.push(path);
          }
        });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-button--primary {
    background-color: #1476b6;
    border-color: #1476b6;
}
/deep/.container .el-textarea__inner {
    color: #bbb;
    font-family: 'Microsoft YaHei';
    line-height: 28px;

}
/deep/.form .el-form-item__label {
    font-size: 14px;
    font-weight: 600;
    color: #1D1D16;
    margin-right: 40px;
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
    width: 920px;
    float: right;
    .title {
        padding-bottom: 10px;
        .tit {
            color: #3AB5D7;
            font-size: 18px;
            font-weight: 350;
            .icon-dengpao {
                font-size: 34px;
                color:#FCA2A2;
                margin-right: 12px;
            }
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