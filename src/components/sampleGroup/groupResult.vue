<template>
  <div class="container">
    <div class="title">
      <span class="tit">分组结果通知 </span>
    </div>
    <div class="line"></div>
    <div class="flag">请选择方法告知您的分组结果</div>
    <div class="radio" @change="changeHandler">
      <div>
        <el-radio v-model="radio" label="1" v-bind:disabled="disable">召集所有样本与治疗师，现场宣布分组结果</el-radio>
      </div>
      <div>
        <el-radio v-model="radio" label="2" v-bind:disabled="disable">发送不透光的信封通知样本与治疗师</el-radio>
      </div>
      <div>
        <el-radio v-model="radio" label="3" v-bind:disabled="disable">让治疗师写信通知样本</el-radio>
      </div>
    </div>
    <div class="flag">恭喜您到达了执行阶段，是否开始派驻治疗师</div>
    <div class="start">
      <el-row type="flex" justify="center">
        <!-- //TODO 跳转路径 -->
        <el-button type="primary" @click="start" v-if="nextNum==2">开始</el-button>
      </el-row>
    </div>
    <div class="vide">
      <video :src="videoSrc" controls="controls" autoplay></video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexNum:6,
      nextNum:2,
      disable:false,
      radio: "1",
      videoState: false,
      videoSrc: "",
      userTaskId: "",
      id: "",
      groupResult: ""
    };
  },
  components: {},
  mounted() {
    this.userTaskId = localStorage.getItem("userTaskId");
    this.id = localStorage.getItem("taskId");
    var param1 = {
        id: this.userTaskId,
    };
    this.httpPost('/rct/v1/groupResult', param1).then((res) => {
      if(res.code == 0){
        if(res.data.finishStepNum && res.data.finishStepNum > this.indexNum){
            this.nextNum=1;
            this.disable=true;
        }
        if(res.data.groupResult!=null){
            this.common(res.data.groupResult);
            this.radio=res.data.groupResult+"";
        }else{
          this.common(1);
        }
    }
    });

  },
  // mounted(){
  //   this.userTaskId=localStorage.getItem("userTaskId");
  //   this.id = localStorage.getItem("taskId");
  // },
  methods: {
    changeHandler(val) {
      this.groupResult = val.target.attributes[4].nodeValue;
      // this.common(val.target.attributes[4].nodeValu);
      switch (val.target.attributes[4].nodeValue) {
        case "1":
          var param = {
            id: this.id
          };
          this.httpPost("/rct/v1/getGroupResultNotice1Flash", param).then(
            res => {
              this.videoSrc = res.data;
            }
          );
          break;
        case "2":
          var param = {
            id: this.id
          };
          this.httpPost("/rct/v1/getGroupResultNotice2Flash", param).then(
            res => {
              this.videoSrc = res.data;
            }
          );
          break;
        case "3":
          var param = {
            id: this.id
          };
          this.httpPost("/rct/v1/getGroupResultNotice3Flash", param).then(
            res => {
              this.videoSrc = res.data;
            }
          );
          break;
      }
    },
    common(nodeValue){
      switch (nodeValue) {
          case 1:
            var param = {
              id: this.id
            };
            this.httpPost("/rct/v1/getGroupResultNotice1Flash", param).then(
              res => {
                this.videoSrc = res.data;
              }
            );
            break;
          case 2:
            var param = {
              id: this.id
            };
            this.httpPost("/rct/v1/getGroupResultNotice2Flash", param).then(
              res => {
                this.videoSrc = res.data;
              }
            );
            break;
          case 3:
            var param = {
              id: this.id
            };
            this.httpPost("/rct/v1/getGroupResultNotice3Flash", param).then(
              res => {
                this.videoSrc = res.data;
              }
            );
            break;
        }
    },
    start() {
      var param = {
        id: this.userTaskId,
        taskId: this.id,
        groupResult: this.radio
      };
      this.httpPost("/rct/v1/updateUserTask", param).then(res => {
        var param = {
          id: this.userTaskId
        };
        this.httpPost("/rct/v1/nextStep", param).then(res => {
           if (res && res.code === 0) {
				this.$store.commit("setSteoNum", this.$store.state.stepNum + 1)
               let url ='/rct/expersteps/firstfollow/' + localStorage.getItem('userTaskId')
               this.$router.push(url)
               localStorage.setItem('currentPage', 7)
           }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.start .el-button {
	width: 180px;
	padding: 15px 0px;
}
/deep/.radio .el-radio__input.is-checked .el-radio__inner {
	border-color: #0b75bb;
	background-color: #0b75bb;
}
/deep/.radio .el-radio__input.is-checked + .el-radio__label {
	color: #0b75bb;
}
.container {
	width: 920px;
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
		margin-bottom: 40px;
	}
	.radio {
		height: 110px;
		margin-bottom: 40px;
		div {
			margin-bottom: 15px;
		}
	}
	.vide {
		width: 660px;
		height: 370px;
		margin-left: 127px;
		margin-top: 40px;
		video {
			width: 100%;
			height: 100%;
		}
	}
}
</style>