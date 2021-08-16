<template>
  <div class="container">
    <el-row flex
            justify="center">
      <div class="wrap fl">
        <!-- <h1>{{username}}1111</h1> -->

        <div class="title1-b">亲子互动疗法对儿童破快行为问题疗效的RCT实验-简介</div>
        <video class="video-box"
               controls
               autoplay
               :poster="baseUrl+imgUrl"
               preload="auto"
               :src="flash">
        </video>
        <div class="part">
          <div class="title2-b">实验组-PCIT疗法</div>
          <p class="indent"><span class="txt-b">亲子互动治疗（Parent-childinteractiontherapy,PCIT）</span>是Sheila
            Eyberg等人提出的一种针对2~7岁儿童的亲子互动干预方法。该治疗方法融合了社会学习理论、依恋理论等观点，是一种短期的、以证据为基础的干预方法。该方法能够显著地减少儿童及其同胞的不适应行为及母亲的忧虑，增强父母的适应性，促使家庭成员间更好的联系、更有效地处理问题。目前,PCIT除了干预对立违抗性障碍、多动障碍或品行障碍儿童群体中出现的破坏性行为(如不服从、乱发脾气、攻击他人等)外，并取得一定的疗效。
          </p>
        </div>
        <div class="part">
          <p><span class="title2-b">对照组-日常疗法:</span> <span class="txt-b">日常疗法（TAU，treatment as usual）</span>即针对此问题常用的精神科医师跟踪治疗，采取物理、药物、心理咨询等针对儿童行为问题的常用方式。<span class="txt-b">本实验采用日常疗法作为参照组</span>。</p>
        </div>
        <div class="part">
          <div class="title2-b">实验目的</div>
          <p class="indent">通过开展随机对照试验，针对PCIT疗法与日常来哦发的疗效对比展开研究，根据分析结果得出相关结论，从而初步<span class="txt-b">掌握RCT实验方法步骤</span>。</p>
        </div>

        <div class="start">
          <el-row type="flex"
                  justify="center">
            <el-button type="danger"
                       @click="toStart"
                       v-if="status == 1">开始实验</el-button>
            <el-button type="danger"
                       @click="toContinue"
                       v-if="status == 2">继续实验</el-button>
             <el-button type="danger"
                       @click="toContinue1"
                       v-if="status == 3">查看实验</el-button>           
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
  name: 'rctIntro',
  data() {
    return {
      id: null, //实验id
      userTaskId: null, //用户实验id
      status: 1, //1-已完成，2-未完成
      title: '',
      flash: '',
      summary: '',
      imgUrl: '',
      finishStepNum: 0,
    }
  },
  mounted() {
   let ifIndexOrSee =localStorage.getItem("ifIndexOrSee");
   /**
    * 1代表用户是重查看过来的
    */
   if(ifIndexOrSee!=null && ifIndexOrSee == 1){
          this.status = 3
          this.userTaskId=localStorage.getItem("userTaskId");
          this.finishStepNum =parseInt(localStorage.getItem("finishStepNum"));
          this.getDetail(localStorage.getItem("taskId"));
          this.$store.commit("setSteoNum",this.finishStepNum);
   }else{
    this.id = this.$route.params.id
    localStorage.setItem('taskId',this.id)
    // taskid 实验id   userTaskid 用户实验id
    this.getStatus(this.$route.params.id)
    this.getDetail(this.$route.params.id)
   }
   
  },
  methods: {
    //获取实验是否完成
    getStatus(id) {
      let params = {
        taskId: id,
      }
      this.httpPost('/userTask/ifBegin', params).then((res) => {
        if (res && res.code === 0) {
          this.status = 2
          this.userTaskId = res.data.id
          this.finishStepNum = res.data.finishStepNum
          this.$store.commit("setSteoNum",res.data.finishStepNum)
          localStorage.setItem('userTaskId', this.userTaskId)
        } else if (res && res.code === 1) {
          this.$store.commit("setSteoNum",0)
          this.status = 1
        }
      })
    },
    //请求实验简介
    getDetail(id) {
      let params = {
        rctTaskId: id,
      }
      this.httpPost('/task/getRctTask', params).then((res) => {
        if (res && res.code === 0) {
          let data = res.data
          this.title = data.name
          this.flash = data.indexFlash
          this.summary = data.digest
          this.imgUrl = data.coverImg
        }
      })
    },

    //开始实验
    toStart() {
      let params = {
        taskId: this.id,
      }
      this.httpPost('/userTask/beginRctTask', params).then((res) => {
        if (res && res.code === 0) {
         this.$store.commit("setSteoNum",this.$store.state.stepNum + 1)
          this.userTaskId = res.data
          let path = '/rct/expersteps/tools/' + localStorage.getItem('taskId')
          localStorage.setItem('currentPage',1)
          localStorage.setItem('userTaskId', this.userTaskId)
          this.$router.push(path)
        }
      })
    },
    toContinue1(){
        this.toContinue();
    },
    //继续试验
    toContinue() {
      if (this.finishStepNum === 1) {
        localStorage.setItem('currentPage', 1)
        let path = '/rct/expersteps/tools/' + this.userTaskId
        this.$router.push(path)
      } else if (this.finishStepNum === 2) {
        let path = '/rct/expersteps/register/' + this.userTaskId
        this.localStorage.setItem('currentPage', 2)
        this.$router.push(path)
      } else if (this.finishStepNum === 3) {
        let path = '/rct/expersteps/select/' + this.userTaskId
        localStorage.setItem('currentPage', 3)
        this.$router.push(path)
      } else if (this.finishStepNum === 4) {
        let path = '/rct/expersteps/agree/' + this.userTaskId
        localStorage.setItem('currentPage', 4)
        this.$router.push(path)
      } else if (this.finishStepNum === 5) {
        let path = '/rct/expersteps/randomgroup/' + this.userTaskId
        localStorage.setItem('currentPage', 5)
        this.$router.push(path)
      } else if (this.finishStepNum === 6) {
        let path = '/rct/expersteps/groupresult/' + this.userTaskId
        localStorage.setItem('currentPage', 6)
        this.$router.push(path)
      } else if (this.finishStepNum === 7) {
        let path = '/rct/expersteps/firstfollow/' + this.userTaskId
        localStorage.setItem('currentPage', 7)
        this.$router.push(path)
      } else if (this.finishStepNum === 8) {
        let path = '/rct/expersteps/secondfollow/' + this.userTaskId
        localStorage.setItem('currentPage', 8)
        this.$router.push(path)
      } else if (this.finishStepNum === 9) {
        let path = '/rct/expersteps/flowcharts/' + this.userTaskId
        localStorage.setItem('currentPage', 9)
        this.$router.push(path)
      } else if (this.finishStepNum === 10) {
        let path = '/rct/expersteps/analysis/' + this.userTaskId
        localStorage.setItem('currentPage', 10)
        this.$router.push(path)
      } else if (this.finishStepNum === 11) {
        let path = '/rct/expersteps/conclusion/' + this.userTaskId
        localStorage.setItem('currentPage', 11)
        this.$router.push(path)
      } else if (this.finishStepNum === 12) {
        let path = '/rct/expersteps/progeny/' + this.userTaskId
        localStorage.setItem('currentPage', 12)
        this.$router.push(path)
      }
    },
  },
}
</script>
<style lang="less" scoped>
/deep/.start .el-button {
  padding: 14px 55px;
}
.container {
  .wrap {
    .part {
      margin-top: 20px;
    }
    video {
        width: 100%;
        position:absolute;
        height:100%;
    }
    .video-box {
        position:relative;
        width: 100%;
        height: 56%;
    }
  }
}
</style>