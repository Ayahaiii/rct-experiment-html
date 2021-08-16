<template>
  <div class="container">
    <div class="title">
      <span class="tit">结论撰写</span>
    </div>
    <div class="line"></div>
    <div class="ware">
      <el-form :model="sizeForm" :rules="rules" ref="form">
        <div class="discuss">
          <p>根据前文结果，展开讨论</p>
          <div class="textarea">
            <el-form-item prop="problem">
              <el-input
                v-bind:disabled="disable"
                type="textarea"
                :rows="10"
                :class="{'text':isActive}"
                placeholder="针对前文描述过的结果或数据进行讨论，可包含以下部分：

  研究中的发现以及这些发现的意义

  本研究或本发现的局限性

  对结果进行解释，提出猜想

  对后续研究的建议
  "
                v-model="sizeForm.problem"
                style="color: #eeee;"
                number="100"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="verdict">
          <p>根据结果以及讨论，简要撰写您的结论</p>
          <div class="textarea">
            <el-form-item prop="method">
              <el-input
                v-bind:disabled="disable"
                type="textarea"
                :rows="10"
                placeholder="重复你的研究问题和假设。

重复你最重要的发现。

指出研究的局限性。

说明研究的含义。

需要哪些后续研究，或者哪些研究方向因为你的研究而变得更加清晰?
"
                v-model="sizeForm.method"
                style="color: #eeee;"
                number="100"
                :class="{'text2':isActive}"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="footer">
        <el-button
          type="primary"
          style="cursor:pointer"
          class="bottom-right"
          @click="preserve(sizeForm)"
          v-if="!disable"
        >保存结果</el-button>
        <el-button
          type="primary"
          class="bottom-left"
          style="cursor:pointer"
          @click="setup"
          v-if="nextNum==2"
        >下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexNum: 11,
      nextNum: 2,
      disable: false,
      isActive: false,
      isActive2: false,
      userTaskId: "",
      id: "",
      sizeForm: {
        problem: "",
        method: ""
      },
      rules: {
        problem: [
          { required: true, message: "请阐述您的讨论", trigger: "blur" }
        ],
        method: [{ required: true, message: "请阐述您的结论", trigger: "blur" }]
      }
    };
  },
  created() {
    this.userTaskId = localStorage.getItem("userTaskId");
    this.id = localStorage.getItem("taskId");
    var param = {
      id: this.userTaskId
    };
    this.httpPost("/userTask/getDiscussAndConclus", param).then(res => {
      if (res.code == 0) {
        if (res.data.finishStepNum && res.data.finishStepNum > this.indexNum) {
          this.nextNum = 1;
        }
        if (res.data.discuss.length > 0 && res.data.conclusion.length > 0) {
          this.disable = true;
        }
        this.sizeForm.problem = res.data.discuss;
        this.sizeForm.method = res.data.conclusion;
      }
    });
  },
  components: {},
  methods: {
    preserve(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.userTaskId = localStorage.getItem("userTaskId");
          var param = {
            id: this.userTaskId,
            discuss: this.sizeForm.problem,
            conclusion: this.sizeForm.method
          };
          this.httpPost("/userTask/discussAndConclus", param).then(res => {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.disable = true;
          });
        } else {
          return false;
        }
      });

      // if (this.textarea === "" || this.textarea2 === "") {
      //   this.isActive = true;
      // } else {
      //   this.isActive = false;
        // this.userTaskId = localStorage.getItem('userTaskId')
        // var param = {
        //   id: this.userTaskId,
        //   discuss: this.textarea2,
        //   conclusion: this.textarea
        // };
        // this.httpPost("/userTask/discussAndConclus", param).then(res => {
        //   this.$message({
        //     message: '保存成功',
        //     type: 'success'
        //   });
        //   this.disable=true;
        // });
      // }
    },
    setup() {
      if (!this.disable) {
        this.$message({
          message: "你需要先点击保存结果",
          type: "warning"
        });
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        customClass: "loadingClass"
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
      var param = {
        userTaskId: this.userTaskId
      };
      this.httpPost("/enclosure/exportWord", param).then(res => {
        if (res && res.code === 0) {
          this.$store.commit("setSteoNum", this.$store.state.stepNum + 1);
          let url =
            "/rct/expersteps/progeny/" + localStorage.getItem("userTaskId");
          localStorage.setItem("currentPage", 12);
          this.$router.push(url);
        }
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
/deep/.container .el-button {
  padding: 14px 55px;
  margin-left: 220px;
  background-color: #1476b6;
}
/deep/.form .el-form-item__label {
  font-size: 16px;
  font-weight: 600;
  color: #1d1d16;
  margin-right: 40px;
}
/deep/.textarea .el-textarea__inner {
  resize: none;
}
.text /deep/.el-textarea__inner {
  border: 1px solid red;
}
.text2 /deep/.el-textarea__inner {
  border: 1px solid red;
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
    margin-bottom: 16px;
  }
  .ware {
    width: 910px;
    height: 862px;
  }
  .footer {
    width: 451px;
    height: 45px;
    margin-left: 199px;
    margin-top: 76px;
    display: inline-flex;
    justify-content: space-between;
    .bottom-right {
      width: 172px;
      height: 45px;
      border-radius: 4px;
      // background-color: rgba(20, 118, 182, 100);
      // color: rgba(255, 255, 255, 100);
      font-size: 16px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 100);
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
  .discuss {
    height: 227px;
    width: 870px;
    margin-left: 10px;
    margin-bottom: 43px;
    textarea {
      outline: none;
      border: 1px solid rgba(187, 187, 187, 100);
      width: 870px;
      height: 207px;
      text-align: left;
      font-size: 18px;
      overflow: hidden;
     
    }
    p {
      margin: 0;
      width: 154px;
      height: 20px;
      color: rgba(107, 114, 119, 100);
      font-size: 14px;
      color: black;
      margin-bottom: 10px;
      font-weight: 600;
      text-align: left;
    }
  }
  .verdict {
    height: 227px;
    width: 870px;
    margin-left: 10px;
    textarea {
      outline: none;
      border: 1px solid rgba(187, 187, 187, 100);
      width: 870px;
      height: 207px;
      text-align: left;
      font-size: 18px;
      overflow: hidden;
    }
    p {
      margin: 0;
      width: 238px;
      height: 20px;
      color: rgba(107, 114, 119, 100);
      font-size: 14px;
      color: black;
      margin-bottom: 10px;
      font-weight: 600;
      text-align: left;
    }
  }
  textarea::-ms-input-placeholder {
    line-height: 40px;
    text-align: left;
    color: #d6d6d6;
  }
  textarea::-webkit-input-placeholder {
    line-height: 40px;
    font-size: 14px;
    text-align: left;
    color: #d6d6d6;
  }
}
</style>