<template>
  <div class="container">
    <div class="title">
      <span class="tit">实验流程图</span>
    </div>
    <div class="line"></div>
    <div class="ware"
         ref="imageDom"
         style="height: 714px;">
      <!-- 最上面盒子 -->
      <div class="mountNode">
        <div class="box-1">
          <p>初筛后符合测量条件的样本</p>
        </div>
        <div class="box-1">
          <p>纳入/排除出后纳入<span class="number">&nbsp;{{this.sdad.includeNum}}&nbsp;</span>例</p>
        </div>
        <div class="box-1">
          <p>签署知情同意后测量<span class="number">&nbsp;{{this.sdad.agreeNum}}&nbsp;</span>例</p>
        </div>
        <div class="box-2">
          <p>随机分组</p>
        </div>
      </div>
      <div class="layer">
        <!-- 最下面的盒子 -->
        <div class="bootom">
          <!-- 最左边盒子 -->
          <div class="boxleft">
            <div class="box-3">
              <p>PCIT组：<span class="number">&nbsp;{{this.sdad.pcitNum}}&nbsp;</span>例</p>
            </div>
            <div class="box-3">
              <p>第一次随访：<span class="number">&nbsp;{{this.sdad.pcitFirstAccessNum}}&nbsp;</span>例</p>
            </div>
            <div class="box-4">
              <p>第二次随访：<span class="number">&nbsp;{{this.sdad.pcitSecondAccessNum}}&nbsp;</span>例</p>
            </div>
          </div>
          <!-- 最右边盒子 -->
          <div class="boxright">
            <div class="box-3">
              <p>TAU组：<span class="number">&nbsp;{{this.sdad.tauNum}}&nbsp;</span>例</p>
            </div>
            <div class="box-3">
              <p>第一次随访：<span class="number">&nbsp;{{this.sdad.tauFirstAccessNum}}&nbsp;</span>例</p>
            </div>
            <div class="box-4">
              <p>第二次随访：<span class="number">&nbsp;{{this.sdad.tauSecondAccessNum}}&nbsp;</span>例</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button class="bottom-right"
              style="cursor:pointer"
              @click="clickGeneratePicture()"
              v-loading.fullscreen.lock="fullscreenLoading"
              v-if="nextNum==2">下一步</button>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  data() {
    return {
      fullscreenLoading: false,
      indexNum: 9,
      nextNum: 2,
      sizeForm: {
        name: '',
      },
      sdad: {},
      imgUrl: "",
      userTaskId: "",
      id:""
    };
  },
  created() {
    this.userTaskId = localStorage.getItem('userTaskId')
    this.id = localStorage.getItem('taskId')
  },
  components: {},
  mounted() {
    var param = {
      userTaskId: this.userTaskId,
    }
    this.httpPost('/rct/v1/generateFlowChart', param).then((res) => {
      this.sdad = res.data
      if (res.data.finishStepNum && res.data.finishStepNum > this.indexNum) {
        this.nextNum = 1
      }
    })
  },
  methods: {
    clickGeneratePicture() {
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'loadingClass'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
      setTimeout(() => {
        html2canvas(this.$refs.imageDom).then((canvas) => {
          // 转成图片，生成图片地址
          this.imgUrl = canvas.toDataURL('image/png')
          var param = {
            userTaskId: this.userTaskId,
            imgUrl: this.imgUrl,
          }
          this.httpPost('/enclosure/bash64ToImg', param).then((res) => {
            this.$store.commit('setSteoNum', this.$store.state.stepNum + 1)
            if (res && res.code === 0) {
              let url =
                '/rct/expersteps/analysis/' + localStorage.getItem('taskId')
              this.$router.push(url)
              localStorage.setItem('currentPage', 10)
            }
          })

          // var a = document.createElement("a"); // 生成一个a元素
          // var event = new MouseEvent("click"); // 创建一个单击事件
          // a.download = name || "photo"; // 设置图片名称
          // a.href = this.imgUrl; // 将生成的URL设置为a.href属性
          // a.dispatchEvent(event);
        })
      }, 1000)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.number{
  color: #ff9600;
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
    margin-bottom: 17px;
  }
  .footer {
    .bottom-right {
      width: 172px;
      height: 45px;
      border-radius: 4px;
      background-color: rgba(20, 118, 182, 100);
      color: rgba(255, 255, 255, 100);
      font-size: 16px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 100);
    }
  }
  width: 910px;
  height: 762px;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  .ware {
    .mountNode {
      width: 234px;
      height: 350px;
      margin: 0 auto;
      margin-bottom: 8px;
      .box-1 {
        width: 233px;
        height: 50px;
        margin-bottom: 37px;
        border: 1px solid rgba(187, 187, 187, 100);
        box-shadow: 1px 0.5px 1px 0.5px rgba(187, 187, 187, 100);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        p {
          text-align: center;
          padding: 0;
        }
      }
      .box-2 {
        width: 233px;
        height: 50px;
        margin-bottom: 40px;
        border: 1px solid rgba(187, 187, 187, 100);
        box-shadow: 1px 0.5px 1px 0.5px rgba(187, 187, 187, 100);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        p {
          text-align: center;
          padding: 0;
        }
      }
      .box-1:before {
        content: '';
        position: absolute;
        display: block;
        width: 1px;
        top: 49px;
        left: 115px;
        height: 32px;
        background-color: black;
      }
      .box-1:after {
        content: ' ';
        height: 0;
        position: absolute;
        width: 0;
        border: 6px solid transparent;
        border-top-color: #333;
        top: 80px;
        left: 124px;
        margin-left: -15px;
      }
      .box-2:before {
        content: '';
        position: absolute;
        display: block;
        width: 1px;
        top: 49px;
        left: 32px;
        height: 42px;
        background-color: black;
      }
      .box-2:after {
        content: ' ';
        height: 0;
        position: absolute;
        width: 0;
        border: 6px solid transparent;
        border-top-color: #333;
        top: 90px;
        left: 41px;
        margin-left: -15px;
      }
      .box-2 p:after {
        content: ' ';
        height: 0;
        position: absolute;
        width: 0;
        border: 6px solid transparent;
        border-top-color: #333;
        top: 90px;
        left: 209px;
        margin-left: -15px;
      }
      .box-2 p:before {
        content: '';
        position: absolute;
        display: block;
        width: 1px;
        top: 49px;
        left: 200px;
        height: 42px;
        background-color: black;
      }
    }
    .layer {
      display: inline-flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .bootom {
        width: 570px;
        height: 280px;
        margin: 0 auto;
        display: inline-flex;
        justify-content: space-between;
        .boxleft {
          margin-left: 3px;
          .box-3 {
            width: 233px;
            height: 50px;
            margin-bottom: 47px;
            border: 1px solid rgba(187, 187, 187, 100);
            box-shadow: 1px 0.5px 1px 0.5px rgba(187, 187, 187, 100);
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            p {
              text-align: center;
              padding: 0;
            }
          }
          .box-4 {
            width: 233px;
            height: 50px;
            margin-bottom: 37px;
            border: 1px solid rgba(187, 187, 187, 100);
            box-shadow: 1px 0.5px 1px 0.5px rgba(187, 187, 187, 100);
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            p {
              text-align: center;
              padding: 0;
            }
          }
          .box-3:before {
            content: '';
            position: absolute;
            display: block;
            width: 1px;
            top: 49px;
            left: 114px;
            height: 42px;
            background-color: black;
          }
          .box-3:after {
            content: ' ';
            height: 0;
            position: absolute;
            width: 0;
            border: 6px solid transparent;
            border-top-color: #333;
            top: 90px;
            left: 123px;
            margin-left: -15px;
          }
        }
        .boxright {
          margin-right: -81px;
          .box-3 {
            width: 233px;
            height: 50px;
            margin-bottom: 47px;
            border: 1px solid rgba(187, 187, 187, 100);
            box-shadow: 1px 0.5px 1px 0.5px rgba(187, 187, 187, 100);
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            p {
              text-align: center;
              padding: 0;
            }
          }
          .box-4 {
            width: 233px;
            height: 50px;
            margin-bottom: 47px;
            border: 1px solid rgba(187, 187, 187, 100);
            box-shadow: 1px 0.5px 1px 0.5px rgba(187, 187, 187, 100);
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: relative;
            p {
              text-align: center;
              padding: 0;
            }
          }
          .box-3:before {
            content: '';
            position: absolute;
            display: block;
            width: 1px;
            top: 49px;
            left: 114px;
            height: 42px;
            background-color: black;
          }
          .box-3:after {
            content: ' ';
            height: 0;
            position: absolute;
            width: 0;
            border: 6px solid transparent;
            border-top-color: #333;
            top: 90px;
            left: 123px;
            margin-left: -15px;
          }
        }
      }
      .preserve {
        .box-3 {
          width: 233px;
          height: 50px;
          margin-bottom: 47px;
          border: 1px solid rgba(187, 187, 187, 100);
          box-shadow: 1px 0.5px 1px 0.5px rgba(187, 187, 187, 100);
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
          p {
            text-align: center;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>