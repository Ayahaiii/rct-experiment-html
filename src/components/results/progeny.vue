<template>
  <div class="container">
    <div class="title">
      <span class="tit">成果预览</span>
    </div>
    <div class="line"></div>
    <div class="ware">
      <p>RCT结果报告</p>
      <iframe
        id="mainiframe"
        width="100%"
        height="800"
        :src="url+baseUrl+wordUrl"
        frameborder="0"
        scrolling="auto"
      ></iframe>
    </div>
    <div class="start">
          <el-row type="flex"
                  justify="center">
            <el-button type="danger"
                       @click="toEnd"
                       >结束实验</el-button>
          </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wordUrl:"",
      url:"http://view.officeapps.live.com/op/view.aspx?src=",
      sizeForm: {
        name: ""
      },
      userTaskId:"",
      id:""
    };
  },
  created(){
    this.userTaskId=localStorage.getItem("userTaskId");
    this.id = localStorage.getItem("taskId");
    var param = {
      id: this.userTaskId
    };
    this.httpPost("/userTask/getWordUrl", param).then(res => {
      this.wordUrl=res.data;
    });
  },
  components: {},
  

  methods: {
    toEnd(){
        this.id = localStorage.getItem('userTaskId')
        let params = {
            id: this.id
        }
         this.httpPost('/userTask/finallTask', params).then((res) => {
            if (res && res.code === 0) {
                this.$router.push('/rct/index');
            }
         })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/deep/.start .el-button {
  padding: 14px 55px;
}

.container {
  width: 920px;
  float: right;
  .title {
    padding-bottom: 20px;
    .tit {
      color: #3ab5d7;
      font-size: 20px;
      font-weight: 350;
    }
  }
  .line {
    width: 920px;
    height: 0px;
    border: 0.25px solid #ddd;
    margin-bottom: 43px;
  }
  .ware {
    width: 910px;
    height: 862px;
    p {
      margin-bottom: 10px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>