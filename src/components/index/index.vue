<template>
  <div>
    <div class="container indexcontent">
      <!-- 头部 -->
      <c-header></c-header>
      <!-- 主体 -->
      <div class="wrap">
        <!-- 侧栏菜单控制按钮 -->
        <div class="menu-btn fl"
             v-show="isBtn"
             @click="toggleEvent"><i class="iconfont icon-leibie1"></i></div>
        <!-- 侧边栏 -->
        <div class="sider fl"
             v-show="isShow">
          <div class="title"><i class="iconfont icon-leibie1"></i>实验步骤<i @click="toggleEvent"
               class="iconfont icon-caidan1"></i></div>
          <ul>
            <li class="li-out"
                @click="toggleLi(0)"><i class="iconfont icon-dian"></i>RCT实验简介</li>
            <ul v-show="isShow0">
              <li @click="handleEvent(0)">
                <span><i class="spot"
                     :class="{spotLight: currentStep=== 0}"></i><span :class="{active: currentStep===0}">实验简介</span></span>
              </li>
            </ul>
            <li class="li-out"
                @click="toggleLi(1)"><i class="iconfont icon-dian"></i>实验准备</li>
            <ul v-show='isShow1'>
              <li @click="handleEvent(1)">
                <span><i class="spot"
                     :class="{spotLight: currentStep===1}"></i><span :class="{active: currentStep===1}">实验目的与工具</span>
                </span>
              </li>
              <li @click="handleEvent(2)">
                <span><i class="spot"
                     :class="{spotLight: currentStep===2}"></i><span :class="{active: currentStep===2}">实验注册</span></span>
              </li>
            </ul>
            <li class="li-out"
                @click="toggleLi(2)"><i class="iconfont icon-dian"></i>样本初选</li>
            <ul v-show='isShow2'>
              <li @click="handleEvent(3)">
                <span><i class="spot"
                     :class="{spotLight: currentStep===3}"></i><span :class="{active: currentStep===3}">实验选点和初筛</span></span>
              </li>
              <li @click="handleEvent(4)"><span><i class="spot"
                     :class="{spotLight: currentStep===4}"></i><span :class="{active: currentStep===4}">知情同意与基线测量</span></span></li>
            </ul>
            <li class="li-out"
                @click="toggleLi(3)"><i class="iconfont icon-dian"></i>样本入组</li>
            <ul v-show='isShow3'>
              <li @click="handleEvent(5)"><span><i class="spot"
                     :class="{spotLight: currentStep===5}"></i><span :class="{active: currentStep===5}">随机分组</span></span></li>
              <li @click="handleEvent(6)"><span><i class="spot"
                     :class="{spotLight: currentStep===6}"></i><span :class="{active: currentStep===6}">分组结果通知</span></span></li>
            </ul>
            <li class="li-out"
                @click="toggleLi(4)"><i class="iconfont icon-dian"></i>跟踪随访</li>
            <ul v-show='isShow4'>
              <li @click="handleEvent(7)"><span><i class="spot"
                     :class="{spotLight: currentStep===7}"></i><span :class="{active: currentStep===7}">第一次随访</span></span></li>
              <li @click="handleEvent(8)"><span><i class="spot"
                     :class="{spotLight: currentStep===8}"></i><span :class="{active: currentStep===8}">第二次随访</span></span></li>
            </ul>
            <li class="li-out"
                @click="toggleLi(5)"><i class="iconfont icon-dian"></i>结果分析</li>
            <ul v-show="isShow5">
              <li @click="handleEvent(9)"><span><i class="spot"
                     :class="{spotLight: currentStep===9}"></i><span :class="{active: currentStep===9}">实验流程图</span></span></li>
              <li @click="handleEvent(10)"><span><i class="spot"
                     :class="{spotLight: currentStep===10}"></i><span :class="{active: currentStep===10}">结果数据分析</span></span></li>
              <li @click="handleEvent(11)"><span><i class="spot"
                     :class="{spotLight: currentStep===11}"></i><span :class="{active: currentStep===11}">讨论与结论</span></span></li>
              <li @click="handleEvent(12)"><span><i class="spot"
                     :class="{spotLight: currentStep===12}"></i><span :class="{active: currentStep===12}">成果预览</span></span></li>
            </ul>
          </ul>
        </div>
        <!-- 中心替换内容 -->
        <el-row type="flex"
                justify="center">
          <router-view></router-view>
        </el-row>
      </div>
    </div>
    <!-- 步骤提示栏 -->
    <div class="footer">
      <step></step>
    </div>
  </div>
</template>

<script>
import CHeader from '../common/header'
import step from '../common/step'

export default {
  data() {
    return {
      currentStep: 0,
      isBtn: false,
      isShow: true,
      isShow0: true,
      isShow1: true,
      isShow2: true,
      isShow3: true,
      isShow4: true,
      isShow5: true,
    }
  },
  components: {
    CHeader,
    step,
  },
  created() {
    this.currentStep = Number(localStorage.getItem('currentPage'))
  },
  updated() {
    this.currentStep = Number(localStorage.getItem('currentPage'))
  },
  methods: {
    toggleEvent() {
      this.isShow = !this.isShow
      this.isBtn = !this.isBtn
    },
    toggleLi(tab) {
      if (tab == 0) {
        this.isShow0 = !this.isShow0
      } else if (tab == 1) {
        this.isShow1 = !this.isShow1
      } else {
        if (tab == 2) {
          this.isShow2 = !this.isShow2
        } else {
          if (tab == 3) {
            this.isShow3 = !this.isShow3
          } else {
            if (tab == 4) {
              this.isShow4 = !this.isShow4
            } else {
              this.isShow5 = !this.isShow5
            }
          }
        }
      }
    },
    handleEvent(menu) {
      if (menu > this.$store.state.stepNum) {
        this.$message1.info('请先完成当前步骤')
        return
      }
      if (menu === 0) {
        localStorage.setItem('currentPage', 0)
        let url = '/rct/expersteps/intro/' + localStorage.getItem('taskId')
        this.$router.push(url)
        // this.$store.commit('setStepPage', 0)
      } else if (menu === 1) {
        let url = '/rct/expersteps/tools/' + localStorage.getItem('taskId')
        this.$router.push(url)
        localStorage.setItem('currentPage', 1)
      } else if (menu === 2) {
        let url = '/rct/expersteps/register/' + localStorage.getItem('taskId')
        this.$router.push(url)
        localStorage.setItem('currentPage', 2)
      } else if (menu === 3) {
        let url = '/rct/expersteps/select/' + localStorage.getItem('taskId')
        this.$router.push(url)
        // this.$store.commit('setStepPage', 3)
        localStorage.setItem('currentPage', 3)
      } else if (menu === 4) {
        let url = '/rct/expersteps/agree/' + localStorage.getItem('taskId')
        this.$router.push(url)
        // this.$store.commit('setStepPage', 4)
        localStorage.setItem('currentPage', 4)
      } else if (menu === 5) {
        let url =
          '/rct/expersteps/randomgroup/' + localStorage.getItem('taskId')
        this.$router.push(url)
        localStorage.setItem('currentPage', 5)
      } else if (menu === 6) {
        let url =
          '/rct/expersteps/groupresult/' + localStorage.getItem('taskId')
        this.$router.push(url)
        // this.$store.commit('setStepPage', 6)
        localStorage.setItem('currentPage', 6)
      } else if (menu === 7) {
        let url =
          '/rct/expersteps/firstfollow/' + localStorage.getItem('taskId')
        this.$router.push(url)
        // this.$store.commit('setStepPage', 7)
        localStorage.setItem('currentPage', 7)
      } else if (menu === 8) {
        let url =
          '/rct/expersteps/secondfollow/' + localStorage.getItem('taskId')
        this.$router.push(url)
        // this.$store.commit('setStepPage', 8)
        localStorage.setItem('currentPage', 8)
      } else if (menu === 9) {
        let url = '/rct/expersteps/flowcharts/' + localStorage.getItem('taskId')
        this.$router.push(url)
        // this.$store.commit('setStepPage', 9)
        localStorage.setItem('currentPage', 9)
      } else if (menu === 10) {
        let url = '/rct/expersteps/analysis/' + localStorage.getItem('taskId')
        this.$router.push(url)
        // this.$store.commit('setStepPage', 10)
        localStorage.setItem('currentPage', 10)
      } else if (menu === 11) {
        let url = '/rct/expersteps/conclusion/' + localStorage.getItem('taskId')
        this.$router.push(url)
        // this.$store.commit('setStepPage', 11)
        localStorage.setItem('currentPage', 11)
      } else if (menu === 12) {
        let url = '/rct/expersteps/progeny/' + localStorage.getItem('taskId')
        this.$router.push(url)
        // this.$store.commit('setStepPage', 12)
        localStorage.setItem('currentPage', 12)
      }
      //   this.currentStep = Number(localStorage.getItem('currentPage'))
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.active {
  color: #1c61ac;
}
.spotLight {
  background-color: #1c61ac !important;
}
.indexcontent{
  margin-bottom: 105px;
}
.container {
  // 主体
  .wrap {
    overflow: hidden;
    width: 1200px;
    margin: 40px auto 0px;
    // 侧栏菜单控制按钮
    .menu-btn {
      width: 40px;
      height: 40px;
      background: #0b75bb;
      margin-top: 5px;
      margin-right: 20px;
      padding: 10px 10px;
      // 图标样式
      .iconfont {
        font-size: 20px;
      }
      i {
        color: #fff;
      }
    }
    // 侧边栏
    .sider {
      margin-right: 80px;
      margin-bottom: 10px;
      width: 198px;
      overflow: hidden;
      zoom: 1;
      border: 1px solid #bbb;
      padding: 0px 1px;
      position: relative;
      .title,
      ul li {
        width: 192px;
        height: 42px;
        float: left;
        font-size: 14px;
        line-height: 42px;
        margin: 1px 1px;
        cursor: pointer;
        span {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      ul .li-out {
        background-color: #f2f2f2;
      }
      ul .spot {
        float: left;
        width: 4px;
        height: 4px;
        background-color: #999;
        line-height: 42px;
        margin: 18px 12px 0px 30px;
      }
      // 图标样式
      .iconfont {
        font-size: 20px;
      }
      .icon-leibie1 {
        color: #38a2dc;
        margin: 0px 16px;
      }
      .icon-caidan1 {
        float: right;
        margin-right: 16px;
        color: #999;
      }
      .icon-caidan1:hover {
        color: #38a2dc;
      }
      .icon-dian {
        font-size: 16px;
        margin: 0px 20px;
      }
      .rightContent {
        width: 920px;
        margin: 0 auto;
      }
    }
  }
  // 步骤提示栏
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>