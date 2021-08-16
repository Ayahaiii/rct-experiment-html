<template>
  <div class="container">
    <div class="title">
      <!-- •	/rct/v1/getRandomGroupFlash 动画接口 -->
      <!-- •	/rct/v1/searchUserTaskSampleByParam  请求用户接口 -->
      <span class="tit">随机分组</span>
      <i class="iconfont icon-bofang hand"
         @click="checkVideoFun"></i>
    </div>

    <!-- 遮罩层动画 -->
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

    <div class="line"></div>
    <div class="flag">您的样本已经就绪，请您对您的样本进行随机分组</div>
    <div class="random">
      <!-- //TODO 节流防抖 -->
      <el-button plain
                 @click="rangdom" v-bind:disabled="disable">简单随机化</el-button>
    </div>
    <div class="pcit">
      <p class="title-b">实验组：PCIT疗法</p>
      <el-table :data="tableData"
                border
                style="width: 100%">
        <el-table-column prop="sampleId"
                         label="样本编号"
                         width="183%"></el-table-column>
        <el-table-column prop="age"
                         label="年龄"
                         width="184"></el-table-column>
        <el-table-column prop="sex"
                         label="性别"
                         width="184"></el-table-column>
        <el-table-column prop="measurementScore"
                         label="初始测量分数"
                         width="184"></el-table-column>

        <el-table-column prop="groupType"
                         label="组别"
                         width="184"></el-table-column>
      </el-table>
    </div>
    <div class="tau">
      <p class="title-b">对照组: TAU疗法</p>
      <el-table :data="tableData2"
                border
                style="width: 100%">
        <el-table-column prop="sampleId"
                         label="样本编号"
                         width="183%"></el-table-column>
        <el-table-column prop="age"
                         label="年龄"
                         width="184"></el-table-column>
        <el-table-column prop="sex"
                         label="性别"
                         width="184"></el-table-column>
        <el-table-column prop="measurementScore"
                         label="初始测量分数"
                         width="184"></el-table-column>

        <el-table-column prop="groupType"
                         label="组别"
                         width="184"></el-table-column>
      </el-table>
    </div>
    <div class="start">
      <el-row type="flex"
              justify="center">
        <el-button type="primary"
                   @click="next" v-if="nextNum==2">下一步</el-button>
      </el-row>
    </div>
    <div class="intro">
      <p class="title1-b">常用随机方法</p>
      <p>
        <span class="title2-b">简单随机化（simple randomization）：</span>又称为完全随机化分组，是对研究对象直接进行随机分组，常通过掷硬币或随机数字表，或者计算机产生随机数来进行随机化，在事先或者实施过程中不作任何限制和干预或调整。
      </p>
      <p>
        <span class="title2-b">区域随机化（block randomization）：</span>将样本按照某一特征分组（block）,比如按照职业分成两个区组，然后再在组内进行随机分组，最后再合并为实验组、对照组。
      </p>
      <p>
        <span class="title2-b">分层随机化（stratified randomization）：</span>假设认为性别、年龄特征对实验结果有影响，则可以这两个因素作为分组依据，分为四组（如大于18岁男性、小于18岁男性；大于18岁女性、小于18岁女性），然后在小组内随机分为实验组、对照组，再把这几个小的分组合并为最终的实验组、对照组。
      </p>
    </div>
    <div style="height: 24px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexNum:5,
      nextNum:2,
      disable:false,
      videoSrc: '',
      videoState: false,
      userTaskId: "",
      taskId: "",
      tableData: [],
      tableData2: [],
    }
  },
  components: {},
  created(){
    this.userTaskId=localStorage.getItem("userTaskId");
    this.taskId = localStorage.getItem("taskId");

      // this.httpPost('/rct/v1/updateUserTaskSampleListGroupType', param).then(
      //   (res) => {
        var param1 = {
            id: this.userTaskId,
        };
        this.httpPost('/userTask/getCurrentStep', param1).then((res) => {
          if(res.code== 0){
            if(res.data && res.data > this.indexNum){
                this.nextNum=1;
                this.disable=true;
            }
        }
        });
          var param = {
            id: this.userTaskId,
          }
          this.httpPost('/rct/v1/searchGroupResult', param).then((res) => {
            this.tableData = res.data.pcitList
            this.tableData2 = res.data.tauList
            if(this.tableData.length>0&&this.tableData2.length>0){
                this.disable=true;
            }
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

              if (item.groupType === 1) {
                this.$set(item, 'groupType', 'PCIT')
              } else if (item.groupType === 2) {
                this.$set(item, 'groupType', 'TAU')
              }
            })
            this.tableData2.forEach((item) => {
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

              if (item.groupType === 1) {
                this.$set(item, 'groupType', 'PCIT')
              } else if (item.groupType === 2) {
                this.$set(item, 'groupType', 'TAU')
              }
            })
            this.tableData = res.data.pcitList
            this.tableData2 = res.data.tauList
          })
      //   }
      // )
  },

  //TODO 判断setnumb跟后端返回的finshnumber 对比 小于就重新请求一下列表
  mounted() {
    var param = {
      id: this.userTaskId,
    }
    // this.httpPost('/userTask/ifBegin', param).then((res) => {})
  },

  methods: {
    next() {
        //判断有无简单随机化
        if(!this.disable ||this.tableData.size == 0 || this.tableData2.size ==0){
              this.$message({
                message: '点击简单随机化后方可进行下一步',
                type: 'warning'
              });
        
            return;
        }
      // 发送请求 使的setupnumber + 1
      var param = {
        id: this.userTaskId,
      }
      this.httpPost('/rct/v1/nextStep', param).then((res) => {
        if (res && res.code === 0) {
          this.$store.commit("setSteoNum",this.$store.state.stepNum + 1)
          // 跳转路径用的
          let url =
            '/rct/expersteps/groupresult/' + localStorage.getItem('userTaskId')
          this.$router.push(url)
          localStorage.setItem('currentPage', 6)
        }
      })
    },
    // /点击按钮出现弹窗播放视频
    checkVideoFun(videos) {
      var param = {
        id: this.taskId,
      }
      this.httpPost('/rct/v1/getRandomGroupFlash', param).then((res) => {
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
    rangdom() {
      var param = {
        userTaskId: this.userTaskId,
        taskId: this.taskId,
      }
      this.httpPost('/rct/v1/updateUserTaskSampleListGroupType', param).then(
        (res) => {
        
          var param = {
            id: this.userTaskId,
          }
          this.httpPost('/rct/v1/searchGroupResult', param).then((res) => {
             this.disable=true;
             this.$message({
              message: '随机分组成功',
              type: 'success'
            });
            this.tableData = res.data.pcitList
            this.tableData2 = res.data.tauList
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

              if (item.groupType === 1) {
                this.$set(item, 'groupType', 'PCIT')
              } else if (item.groupType === 2) {
                this.$set(item, 'groupType', 'TAU')
              }
            })
            this.tableData2.forEach((item) => {
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

              if (item.groupType === 1) {
                this.$set(item, 'groupType', 'PCIT')
              } else if (item.groupType === 2) {
                this.$set(item, 'groupType', 'TAU')
              }
            })
            this.tableData = res.data.pcitList
            this.tableData2 = res.data.tauList
          })
        }
      )
    },
  },
}
</script>

<style lang="less" scoped>
.el-button {
  color: #0b75bb;
}
.el-button--primary {
  background-color: #1476b6;
  border-color: #1476b6;
}
/deep/.start .el-button {
  color: #fff;
  padding: 14px 55px;
  background-color: #1476b6;
}
/deep/.start .el-button:hover {
  background-color: #1a87cf;
}
// /deep/.random .el-button {
//   padding: 12px 24px;
//   background-color: #1476b6;
// }
.container {
  width: 920px;
  .title {
    display: inline-flex;
    align-items: center;
    padding-bottom: 15px;
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
    .iconfont {
      color: #3ab5d7;
      font-size: 28px;
      margin-left: 20px;
    }
  }
  .line {
    width: 920px;
    height: 0px;
    border: 0.25px solid #ddd;
    margin-bottom: 20px;
  }
  .flag {
    font-size: 15px;
    font-weight: 600;
    color: #6b7277;
    margin-bottom: 20px;
  }
  .pcit{
    margin-bottom: 30px;

  }
  .tau {
    margin-bottom: 30px;
  }
  .intro {
    padding-top: 20px;
  }
  .random {
    margin-bottom: 20px;
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
    color: white;
  }
}
</style>