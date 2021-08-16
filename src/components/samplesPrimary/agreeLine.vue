<template>
  <div class="container">
    <div class="title">
      <span class="tit">样本筛选与基线数据</span>
    </div>
    <div class="line"></div>

    <div class="report" >
      <div class="left-box">
        <!-- 点击播放第一个视频 -->
        <i class="iconfont icon-bofang"
           @click="checkVideoFun"
           style="cursor:pointer;"></i>
        <div class="qianshu">签署知情同意书</div>
        <el-button @click="sign()" v-bind:disabled="ifSgin" class="bttn">立即签署</el-button>
        <!-- v-bind:disabled="ifSgin" -->
      </div>
      <div class="right-box">
        <!-- 点击播放第二个视频 -->
        <i class="iconfont icon-bofang"
           @click="checkVideoFun1"
           style="cursor:pointer;"></i>

        <div class="qianshu">测量基线数据</div>

        <el-button @click="survey()" v-bind:disabled="ifSurvey">立即测量</el-button>
        <!-- v-bind:disabled="ifSurvey" -->
      </div>
    </div>
    <div class="mask"
         v-if="videoState == true"></div>
    <div class="videomasks"
         v-if="videoState == true">
      <!-- //视频：h5的视频播放video -->
      <video :src="videoSrc"
             controls="controls"
             autoplay>
        <!-- 您的浏览器不支持 video 标签。 -->
      </video>
      <el-button class="btn"
                 type="primary"
                 @click="toContinue">跳过</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData"
                style="width: 100%"
                :cell-style="{ textAlign: 'center'}"
                :header-cell-style="{textAlign: 'center'}" class="tablebox">
        <el-table-column prop="sampleId"
                         label="样本编号"
                         width="130px"></el-table-column>
        <el-table-column prop="age"
                         label="年龄"
                         width="130px"></el-table-column>
        <el-table-column prop="sex"
                         label="性别"
                         width="130px"></el-table-column>
        <el-table-column prop="familyStatus"
                         label="家庭情况"
                         width="130px"></el-table-column>
        <el-table-column prop="address"
                         label="来源地点"
                         width="130px"></el-table-column>
        <el-table-column prop="ifAgree"
                         label="是否同意签署"
                         width="130px"></el-table-column>
        <el-table-column prop="measurementScore"
                         label="测量得分"
                         width="130px"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChangeUnselected"
                        @current-change="handleCurrentChangeUnselected"
                        :current-page="pageNumUnselected"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="pageSizeUnselected"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalUnselected">
        </el-pagination>
      </div>
    </div>
    <div class="start">
      <el-row type="flex"
              justify="center">
        <el-button type="primary"
                   @click="next" v-if="nextNum==2">下一步</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifSgin:false,//是否签署同意书 默认为false
      ifSurvey:false,//是否测量分数 默认为false
      indexNum:4,
      nextNum:2,
      videoSrc: '',
      videoState: false,
      tableData: [],
      userTaskId:"",
      id: "",
      pageNumUnselected: 1,
      pageSizeUnselected: 10,
      totalUnselected: null
    };
  },
  created() {
    this.userTaskId=localStorage.getItem("userTaskId"),
    this.id = localStorage.getItem("taskId")
    var param = {
      userTaskId: this.userTaskId,
    }
    var param1 = {
        id: this.userTaskId,
    };
    this.httpPost('/userTask/getCurrentStep', param1).then((res) => {
      if(res.code== 0){
        if(res.data && res.data > this.indexNum){
            this.nextNum=1;
        }
    }
    });
    this.getSampleLists(this.pageSizeUnselected,this.pageNumUnselected)
  },
  components: {},
  methods: {
    next() {
       if(!this.ifSgin){
        this.$message({
          message: '需要先签署同意书',
          type: 'warning'
        });
        return;
      }
       if(!this.ifSurvey){
        this.$message({
          message: '需要点击测量得分',
          type: 'warning'
        });
        return;
      }
      this.userTaskId = localStorage.getItem('userTaskId')
      let params = {
        id: this.userTaskId,
      }
      this.httpPost('/rct/v1/nextStep', params).then((res) => {
        if (res && res.code === 0) {
         this.$store.commit("setSteoNum",this.$store.state.stepNum + 1)
          let url ='/rct/expersteps/randomgroup/' + this.userTaskId
          this.$router.push(url)
        }
      }) 
      localStorage.setItem('currentPage', 5)
    },
    //点击按钮出现弹窗播放视频
    checkVideoFun(videos) {
      var param = {
        id: this.taskId,
      }
      this.httpPost('/rct/v1/getConsentFormFlash', param).then((res) => {
        this.videoSrc = res.data
      })
      // 取消事件的默认动作
      var cancelDefaultAction = function (e) {
        e.preventDefault()
      }
      // 弹框显示时
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', cancelDefaultAction, false) //禁止页面滑动

      this.videoState = true
    },
    toContinue() {
      this.videoState = false
      // 弹框隐藏时
      var cancelDefaultAction = function (e) {
        e.preventDefault()
      }
      document.body.style.overflow = 'auto'
      document.removeEventListener('touchmove', cancelDefaultAction, false) //放开页面滑动
    },
    // 测量的代码
    //点击按钮出现弹窗播放视频
    checkVideoFun1(videos) {
      var param = {
        id: this.taskId,
      }
      this.httpPost('/rct/v1/getMetricalDataFlash', param).then((res) => {
        this.videoSrc = res.data
      })
      // 取消事件的默认动作
      var cancelDefaultAction = function (e) {
        e.preventDefault()
      }
      // 弹框显示时
      var cancelDefaultAction = function (e) {
        e.preventDefault()
      }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', cancelDefaultAction, false) //禁止页面滑动

      this.videoState = true
    },
    toContinue2() {
      this.videoState = false
      // 弹框隐藏时
      var cancelDefaultAction = function (e) {
        e.preventDefault()
      }
      document.body.style.overflow = 'auto'
      document.removeEventListener('touchmove', cancelDefaultAction, false) //放开页面滑动
    },
    sign() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'loadingClass'
      });
      setTimeout(() => {
        loading.close();
      }, 500);
      var param = {
        userTaskId: this.userTaskId,
        taskId: this.id,
      }
      this.httpPost('/rct/v1/updateUserTaskSampleListIfAgree', param).then(
        (res) => {
          var param = {
            userTaskId: this.userTaskId,
          }
          this.httpPost('/rct/v1/searchUserTaskSampleByParam', param).then(
            (res) => {
              this.ifSgin=true;
              this.tableData = res.data.data
              this.tableData.forEach((item) => {
                if (item.sex === 1) {
                  // 'status'为属性名，'非活动'为修改后的内容
                  this.$set(item, 'sex', '男')
                } else if (item.sex === 2) {
                  this.$set(item, 'sex', '女')
                }
                if (item.familyStatus === 1) {
                  this.$set(item, 'familyStatus', '正常')
                } else if (item.familyStatus === 2) {
                  this.$set(item, 'familyStatus', '单亲')
                } else if (item.familyStatus === 3) {
                  this.$set(item, 'familyStatus', '孤儿')
                }

                if (item.ifAgree === 1) {
                  this.$set(item, 'ifAgree', '是')
                } else if (item.ifAgree === 2) {
                  this.$set(item, 'ifAgree', '否')
                }
              })
            }
          )
        }
      )
    },
    getSampleLists(pageSize,pageNum){
      let param = {
        userTaskId: this.userTaskId,
        pageNum: pageNum,
        pageSize: pageSize
      }
      this.httpPost('/rct/v1/searchUserTaskSampleByParam', param).then((res) => {
        this.tableData = res.data.data
        this.totalUnselected = res.data.total
        let sign=0;
        let sevey=0;
        this.tableData.forEach((item) => {
          if (item.sex === 1) {
            // 'status'为属性名，'非活动'为修改后的内容
            this.$set(item, 'sex', '男')
          } else if (item.sex === 2) {
            this.$set(item, 'sex', '女')
          }
          if (item.familyStatus === 1) {
            this.$set(item, 'familyStatus', '正常')
          } else if (item.familyStatus === 2) {
            this.$set(item, 'familyStatus', '单亲')
          } else if (item.familyStatus === 3) {
            this.$set(item, 'familyStatus', '孤儿')
          }

          if (item.ifAgree === 1) {
            sign=sign+1;
            this.$set(item, 'ifAgree', '是')
          } else if (item.ifAgree === 2) {
            sign=sign+1;
            this.$set(item, 'ifAgree', '否')
          }
          if(item.measurementScore>0){
              sevey=sevey+1;
          }
        });
        if(sign>0){
            this.ifSgin=true;
        }
        if(sevey>0){
            this.ifSurvey=true;
        }
      });
    },
    handleSizeChangeUnselected(val) {
      this.pageSizeUnselected = val
      this.getSampleLists(this.pageSizeUnselected, this.pageNumUnselected)
    },
    handleCurrentChangeUnselected(val) {
      this.pageNumUnselected = val
      this.getSampleLists(this.pageSizeUnselected, this.pageNumUnselected)
    },
    survey() {
      if(!this.ifSgin){
        this.$message({
          message: '需要先签署同意书',
          type: 'warning'
        });
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'loadingClass'
      });
      setTimeout(() => {
        loading.close();
      }, 500);
      var param = {
        userTaskId: this.userTaskId,
        taskId: this.id,
      }
      this.httpPost(
        '/rct/v1/updateUserTaskSampleListMeasurementScore',
        param
      ).then((res) => {
        this.ifSurvey=true;
        var param = {
          userTaskId: this.userTaskId
        };
        this.httpPost("/rct/v1/searchUserTaskSampleByParam", param).then(
          res => {
              this.tableData = res.data.data;
              this.tableData.forEach(item => {
                if (item.sex === 1) {
                  // 'status'为属性名，'非活动'为修改后的内容
                  this.$set(item, "sex", "男");
                } else if (item.sex === 2) {
                  this.$set(item, "sex", "女");
                }
                if (item.familyStatus === 1) {
                  this.$set(item, "familyStatus", "正常");
                } else if (item.familyStatus === 2) {
                  this.$set(item, "familyStatus", "单亲");
                } else if (item.familyStatus === 3) {
                  this.$set(item, "familyStatus", "孤儿");
                }

                if (item.ifAgree === 1) {
                  this.$set(item, "ifAgree", "是");
                } else if (item.ifAgree === 2) {
                  this.$set(item, "ifAgree", "否");
                }
              });
          }
        )
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.iconfont {
  font-size: 28px;
  color: #92969b;
}
.el-button {
  color: #0b75bb;
}
button {
  outline: none;
}
.block{
  margin-top: 25px;
}
.el-button--primary {
  color: #fff;
  background-color: #1476b6;
  border-color: #1476b6;
}
/deep/.start .el-button {
  padding: 14px 55px;
  background-color: #1476b6;
}
/deep/.start .el-button:hover {
  background-color: #1a87cf;
}
/deep/.el-table td,
.el-table th {
  padding: 12px 0px;
}
.container {
  width: 920px;
  float: right;
  .title {
    padding-bottom: 10px;
    .tit {
      color: #3ab5d7;
      font-size: 18px;
      font-weight: 350;
      .icon-dengpao {
        font-size: 34px;
        color: #fca2a2;
        margin-right: 12px;
      }
    }
  }
  .report {
    display: inline-flex;
    margin-bottom: 20px;
    .left-box {
      width: 296px;
      height: 42px;
      display: inline-flex;
      justify-content: space-around;
      align-items: center;
      margin-right: 50px;
      .iconfont {
        color: #1460a7;
      }
      .qianshu {
        color: #1460a7;
      }
      button {
        width: 138px;
        height: 41px;
        border-radius: 20px;
        background-color: white;
        border: 1px solid #1460a7;
        color: #1460a7;
      }
      button:hover{
        background-color: #e3f0ff;
      }
    }
    .right-box {
      width: 296px;
      height: 42px;
      display: inline-flex;
      justify-content: space-around;
      align-items: center;
      .iconfont {
        color: #1460a7;
      }
      .qianshu {
        color: #1460a7;
      }
      button {
        width: 138px;
        height: 41px;
        border-radius: 20px;
        background-color: white;
        border: 1px solid #1460a7;
        color: #1460a7;
      }
      button:hover{
        background-color: #e3f0ff;
      }

    }
  }
  .line {
    width: 920px;
    height: 0px;
    border: 0.25px solid #ddd;
    margin-bottom: 30px;
  }
  .btn {
    margin: 0px auto 8px;
  }
  .table {
    margin-bottom: 40px;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: #000000;
    opacity: 0.6;
  }
  // 内容层 z-index要比遮罩大，否则会被遮盖
  .videomasks {
    max-width: 1200px;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 20;
    transform: translate(-50%, -50%);
  }
  .videomasks video {
    width: 100%;
    height: 100%;
  }
  .videomasks .btn {
    width: 100px;
    position: absolute;
    bottom: -62px;
    left: 271px;
  }
}
</style>