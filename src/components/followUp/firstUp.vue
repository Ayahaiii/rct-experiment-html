<template>
  <div class="container">
    <div class="title">
      <span class="tit">第一次随访</span>
      <i class="iconfont icon-bofang hand" @click="checkVideoFun"></i>
    </div>

    <!-- 遮罩层动画 -->
    <div class="mask" v-if="videoState == true"></div>

    <div class="videomasks" v-if="videoState == true">
      <!-- //视频：h5的视频播放video -->
      <video :src="videoSrc" controls="controls" autoplay>
        <!-- 您的浏览器不支持 video 标签。 -->
      </video>
      <el-button class="btn" type="primary" @click="toContinue">跳过</el-button>
    </div>

    <div class="line"></div>
    <h5>实验开展6个月后，开展第一次随访</h5>
    <div class="ware">
      <div class="pcit">
        <p class="title-b">实验组：PCIT疗法</p>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="sampleId" label="样本编号" width="183%"></el-table-column>
          <el-table-column prop="age" label="年龄" width="184"></el-table-column>
          <el-table-column  label="性别" width="184">
               <template slot-scope="scope">
                                      <span v-if="scope.row.sex==1">男</span>
                                      <span v-if="scope.row.sex==2">女</span>
               </template>
          </el-table-column>
          <el-table-column prop="measurementScore" label="初始测量分数" width="184">
                <template slot-scope="scope">
                                      <span v-if="scope.row.measurementScore==0">失访</span>
                                      <span v-if="scope.row.measurementScore==null"></span>
                                      <span v-if="scope.row.measurementScore>0">{{scope.row.measurementScore}}</span>
               </template>
          </el-table-column>

          <el-table-column prop="firstAccessScore" label="第六个月" width="184">
                <template slot-scope="scope">
                                      <span v-if="scope.row.firstAccessScore==0">失访</span>
                                      <span v-if="scope.row.firstAccessScore==null"></span>
                                      <span v-if="scope.row.firstAccessScore>0">{{scope.row.firstAccessScore}}</span>
               </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tau">
        <p class="title-b">对照组: TAU疗法</p>
        <el-table :data="tableData2" align="center" border style="width: 100%">
          <el-table-column prop="sampleId" label="样本编号" width="183%"></el-table-column>
          <el-table-column prop="age" label="年龄" width="184"></el-table-column>
          <el-table-column  label="性别" width="184">
              <template slot-scope="scope">
                                      <span v-if="scope.row.sex==1">男</span>
                                      <span v-if="scope.row.sex==2">女</span>
               </template>
          </el-table-column>
          <el-table-column prop="measurementScore" label="初始测量分数" width="184">
                <template slot-scope="scope">
                                      <span v-if="scope.row.measurementScore==0">失访</span>
                                      <span v-if="scope.row.measurementScore==null"></span>
                                      <span v-if="scope.row.measurementScore>0">{{scope.row.measurementScore}}</span>
               </template>
          </el-table-column>

          <el-table-column prop="firstAccessScore" label="第六个月" width="184">
               <template slot-scope="scope">
                                      <span v-if="scope.row.firstAccessScore==0">失访</span>
                                      <span v-if="scope.row.firstAccessScore==null"></span>
                                      <span v-if="scope.row.firstAccessScore>0">{{scope.row.firstAccessScore}}</span>
               </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-button  type="primary" class="bottom-right" style="cursor:pointer" @click="firtstvisit" v-if="!disable" v-bind:disabled="disable">开始第一次随访</el-button>
        <el-button  type="primary" class="bottom-left" style="cursor:pointer" @click="next" v-if="nextNum==2">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexNum:7,
      nextNum:2,
      disable:false,
      videoSrc: "",
      videoState: false,
      sizeForm: {
        name: ""
      },
      tableData: [],
      tableData2: [],
      userTaskId: "",
      taskId: ""
    };
  },
  components: {},
  created() {
    this.userTaskId=localStorage.getItem("userTaskId");
    this.taskId = localStorage.getItem("taskId");
    var param = {
      id: this.userTaskId
    };
    this.httpPost("/rct/v1/searchGroupResult", param).then(res => {
      this.tableData = res.data.pcitList;
      this.tableData2 = res.data.tauList;
      if(res.data.finishStepNum && res.data.finishStepNum > this.indexNum){
          this.nextNum=1
      }
      let diableNum=0;
       this.tableData.forEach((item) => {
         if(item.firstAccessScore && item.firstAccessScore>0){
            diableNum=diableNum+1;
         }
       });
        this.tableData2.forEach((item) => {
         if(item.firstAccessScore && item.firstAccessScore>0){
            diableNum=diableNum+1;
         }
       });
       if(diableNum>0){
         this.disable=true;
       }
    });
  },
  mounted(){
    
  },
  methods: {
    // /点击按钮出现弹窗播放视频
    checkVideoFun(videos) {
      var param = {
        id: this.taskId
      };
      this.httpPost("/rct/v1/getFirstAccessFlash", param).then(res => {
        this.videoSrc = res.data;
      });

      // 取消事件的默认动作
      var cancelDefaultAction = function(e) {
        e.preventDefault();
      };
      // 弹框显示时
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", cancelDefaultAction, false); //禁止页面滑动

      this.videoState = true;
    },
    toContinue() {
      this.videoState = false;
      // 弹框隐藏时
      var cancelDefaultAction = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "auto";
      document.removeEventListener("touchmove", cancelDefaultAction, false); //放开页面滑动
    },
    onSubmit() {
    },
    firtstvisit() {
      var param = {
        userTaskId: this.userTaskId,
        taskId: this.taskId
      };
      this.httpPost(
        "/rct/v1/updateUserTaskSampleListFirstAccessScore",
        param
      ).then(res => {
        this.disable=true;
         this.$message({
          message: '第一次随访成功',
          type: 'success'
        });
        var param = {
          id: this.userTaskId
        };
        this.httpPost("/rct/v1/searchGroupResult", param).then(res => {
          this.tableData = res.data.pcitList;
          this.tableData2 = res.data.tauList;
          let ifdata=0;
           this.tableData.forEach((item)=>{
             if(item.firstAccessScore>0){
                ifdata=ifdata+1;
             }
           });
            this.tableData2.forEach((item)=>{
             if(item.firstAccessScore>0){
                ifdata=ifdata+1;
             }
           });
           if(ifdata>0){
              this.disable=true;
           }
        });
      });
    },
    next() {
      if(!this.disable){
        this.$message({
          message: '你需要先点击开始第一次随访',
          type: 'warning'
        });
        return;
      }
      var param = {
        id: this.userTaskId
      };
      this.httpPost("/rct/v1/nextStep", param).then(res => {
        this.$store.commit("setSteoNum",this.$store.state.stepNum + 1)
         localStorage.setItem('currentPage',8);
        let url ="/rct/expersteps/secondfollow/" +localStorage.getItem('taskId')
        this.$router.push(url);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/deep/.container .el-textarea__inner {
  color: #bbb;
  font-family: "Microsoft YaHei";
  line-height: 28px;
}
.container {
  width: 920px;
  float: right;
  .title {
    display: inline-flex;
    align-items: center;
    padding-bottom: 20px;
    .tit {
      color: #3ab5d7;
      font-size: 20px;
      font-weight: 350;
    }
    .iconfont {
      color: #3ab5d7;
      font-size: 28px;
      margin-left: 20px;
    }
  }
  h5 {
    color: #6b7277;
    font-size: 14px;
  }
  .line {
    width: 920px;
    height: 0px;
    border: 0.25px solid #ddd;
    margin-bottom: 17px;
  }
  .ware {
    .title-b {
      font-weight: 600;
    }
    width: 920px;
    height: 100%;
    .pcit {
      margin-bottom: 40px;
    }
    .tau {
      margin-bottom: 100px;
    }
    .footer {
      margin-bottom: 50px;
      :focus {
        outline: none;
      } /*for IE*/
      ::-moz-focus-inner {
        border-color: transparent;
      } /*for mozilla*/
      width: 451px;
      height: 45px;
      margin-left: 199px;
      display: inline-flex;
      justify-content: space-between;
      .bottom-right {
        width: 172px;
        height: 45px;
        border-radius: 4px;
        // background-color: rgba(20, 118, 182); 
        // color: rgba(255, 255, 255);
        font-size: 16px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255);
      }
      .bottom-left {
        width: 172px;
        height: 45px;
        border-radius: 4px;
        // background-color: rgba(20, 118, 182, 100);
        // color: rgba(255, 255, 255, 100);
        font-size: 16px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 100);
      }
    }
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