<template>
  <div class="container">
    <div class="title">
      <span class="tit">结果数据分析</span>
    </div>
    <div class="line"></div>
    <div class="ware">
      <el-table :data="tableData" style="width: 100%,border-color:#ddd" 
      :header-cell-style="tableHeaderCellStyle" 
      :cell-style="tableCellStyle">
        <el-table-column prop="name" label="请在此输入测量工具+维度" width="126">

        </el-table-column>
        <el-table-column  prop="" label="基线数据（T0）" align="center">
          <el-table-column prop="pcitT0Num" align="center" label="N" width="80"></el-table-column>
          <el-table-column prop="pcitT0Mean" label="Mean" align="center" width="71"></el-table-column>
          <el-table-column prop="pcitT0SD" align="center" label="SD" width="69"></el-table-column>
        </el-table-column>
        <el-table-column label="第一次随访（T1）" align="center">
          <el-table-column prop="pcitT1Num" align="center" label="N" width="74"></el-table-column>
          <el-table-column prop="pcitT1Mean" label="Mean" align="center" width="69"></el-table-column>
          <el-table-column prop="pcitT1SD" label="SD" align="center" width="65"></el-table-column>
        </el-table-column>
        <el-table-column label="T0-T1变化" align="center" style="width: 918px !import">
          <el-table-column prop="pcitT0T1T" label="T值(p=0.001)" align="center" width="92"></el-table-column>
          <el-table-column prop="pcitT0T1Cohensd" align="center" label="Cohen'sd" width="90"></el-table-column>
        </el-table-column>
        <el-table-column label="第二次随访（T2）" align="center">
          <el-table-column prop="pcitT2Num" align="center" label="N" width="74"></el-table-column>
          <el-table-column prop="pcitT2Mean" label="Mean" align="center" width="69"></el-table-column>
          <el-table-column prop="pcitT2SD" label="SD" align="center" width="65"></el-table-column>
        </el-table-column>
        <el-table-column label="T0-T2变化" align="center" style="width: 918px !import">
          <el-table-column prop="pcitT0T2T" label="T值(p=0.001)" align="center" width="89"></el-table-column>
          <el-table-column prop="pcitT0T2Cohensd" label="Cohen'sd" align="center" width="89"></el-table-column>
        </el-table-column>
      </el-table>
      <div class="footer">
        <!-- <button class="bottom-right" >保存结果</button> -->
        <el-button type="primary" class="bottom-left" style="cursor:pointer" @click="next" v-if="nextNum==2">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       indexNum:10,
      nextNum:2,
      sizeForm: {
        name: ""
      },
      userTaskId: "",
      id:"",
      tableData: []
    };
  },
  created() {
    this.userTaskId = localStorage.getItem('userTaskId')
    var param = {
      userTaskId: this.userTaskId
    };
    this.httpPost("/rct/v1/generateResultDataAnalysis", param).then(res => {
        
        if (res && res.code === 0) {
          if(res.data.finishStepNum && res.data.finishStepNum>this.indexNum){
             this.nextNum=1;
      }
        }
      let obj = res.data;
      let obj1 = {};
      let obj2 = {};
      for (let key in obj) {
        if (/pcit/.test(key)) {
          obj1[key] = obj[key];
          obj1.name ="实验组（PCIT）"
        } else {
          let key2 = key.replace(/tauT/,"pcitT")
          obj2[key2] = obj[key];
          obj2.name ="对照组（TAU）"
        }
      }
      this.tableData.push(obj1);
      this.tableData.push(obj2);
    });
  },
   mounted(){
    this.userTaskId=localStorage.getItem("userTaskId");
    this.id = localStorage.getItem("taskId");
  },
  methods: {
    tableCellStyle () {
      return 'border-color: #ddd;'
    },
    // 修改 table header cell的背景色
    tableHeaderCellStyle () {
      return 'border-color: #ddd; color:#606266'
    },
    next() {
        this.$store.commit("setSteoNum",this.$store.state.stepNum + 1)
      let url = "/rct/expersteps/conclusion/" + localStorage.getItem('taskId');
      this.$router.push(url);
      localStorage.setItem('currentPage',11)
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-table--border:after,
.el-table--group:after,
.el-table:before {
    background-color: #ddd;
}

.el-table--border,
.el-table--group {
    border-color: #ddd;
}

.el-table td,
.el-table th.is-leaf {
        border-bottom: 1px solid #ddd;
}

.el-table--border th,
.el-table--border th.gutter:last-of-type {
        border-bottom: 1px solid #ddd;
}

.el-table--border td,
.el-table--border th {
        border-right: 1px solid #ddd;
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
    margin-bottom: 56px;
  }
  .ware {
    /deep/.el-table__body-wrapper {
      width: 915px;
    }
    /deep/.el-table__header-wrapper {
      width: 918px;
    }
    /deep/.el-table__body-wrapper .el-table__body {
      width: 915px !important;
    }
    width: 917px;
    height: 862px;
    input {
      text-align: center;
      border: none;
      width: 70px;
      height: 60px;
      outline: none;
    }
    .el-table thead {
      color: black;
    }
    .footer {
      width: 451px;
      height: 45px;
      margin-left: 199px;
      margin-top: 76px;
      display: inline-flex;
      justify-content: center;
      // justify-content: space-between;
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
  }
}
</style>