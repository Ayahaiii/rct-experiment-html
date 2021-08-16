<template>
  <div class="container">
    <div class="title">
      <span class="tit">实验选点与初筛</span>
      <i class="iconfont icon-bofang hand"
         @click="checkVideoFun"></i>
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

    <div class="line"></div>
    <div class="content">
      <div class="standard">
        <span class="stan-left fl">纳入/排除标准:</span>
        <div class="stan-right fr">
          <div class="textarea">
            <el-input type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      v-model="selectionCriteria"
                      v-bind:disabled="disable"
                      style="color: #eeee;"
                      number=100>
            </el-input>
          </div>
        </div>
      </div>
      <div class="select-btn">
        <el-tabs v-model="activeName"
                 type="card"
                 @tab-click="handleClick">
          <el-tab-pane label="选中"
                       name="first">
            <div class="selectd">
              <div>
                <el-form :inline="true"
                         :model="formInline"
                         class="demo-form-inline">
                  <el-form-item label="样本来源:"
                                style="font-weight: 600">
                    <el-select v-model="formInlineSelected.addressUnselectd"
                               placeholder="请选择" clearable
                               style="width: 185px;margin-right: 12px">
                      <el-option label="上海市第一小学"
                                 value="上海市第一小学"></el-option>
                      <el-option label="上海市幸福花园小区"
                                 value="上海市幸福花园小区"></el-option>
                      <el-option label="上海市胜利小学"
                                 value="上海市胜利小学"></el-option>
                      <el-option label="上海市成材幼儿园"
                                 value="上海市成材幼儿园"></el-option>
                      <el-option label="上海市前海豪庭小区"
                                 value="上海市前海豪庭小区"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="年龄">
                    <el-select v-model="formInlineSelected.ageUnselected"
                               placeholder="请选择" clearable
                               style="width: 100px;margin-right: 12px">
                      <el-option v-for="item in ageList"
                                 :label="item"
                                 :value="item"
                                 :key="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-select v-model="formInlineSelected.sexUnselected"
                               placeholder="请选择" clearable
                               style="width: 100px;margin-right: 12px">
                      <el-option label="男"
                                 value="1"></el-option>
                      <el-option label="女"
                                 value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="家庭情况">
                    <el-select v-model="formInlineSelected.familyStatusUnselected"
                               placeholder="请选择" clearable
                               style="width: 100px;margin-right: 12px">
                      <el-option label="正常"
                                 value="1"></el-option>
                      <el-option label="单亲"
                                 value="2"></el-option>
                      <el-option label="孤儿"
                                 value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="fr">
                    <div class="search">
                      <el-button type="primary"
                                 @click="selectedSearch"
                                 style="width: 100px">搜索</el-button>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <div class="remind" v-if="tableDataSelected.length==0">
                <img src="../../assets/img/remind.png"
                     alt=""
                     width="60px">
                <div><span>请添加您所需要的样本</span>
                <span style="color: #fc9a74;margin-left:12px" class="hand" @click="toUnselected">立即添加</span></div>
              </div>
              <div class="table"
                   v-if="!tableDataSelected.length==0">
                 <div class="table">
                <el-table :data="tableDataSelected"
                          style="width: 100%"
                          :header-cell-style="{textAlign: 'center'}"
                          :cell-style="{ textAlign: 'center' }">
                  <el-table-column prop="id"
                                   label="样本编号"
                                   ></el-table-column>
                  <el-table-column prop="age"
                                   label="年龄"
                                   width="150"></el-table-column>
                  <el-table-column label="性别"
                                   >
                    <template slot-scope="scope">
                      <span v-if="scope.row.sex==1">男</span>
                      <span v-if="scope.row.sex==2">女</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="家庭情况"
                                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.familyStatus==1">正常</span>
                      <span v-if="scope.row.familyStatus==2">单亲</span>
                      <span v-if="scope.row.familyStatus==3">孤儿</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address"
                                   label="来源地点"
                                   ></el-table-column>
                  <el-table-column label="操作"
                                   v-if="statusNex==2">
                    <template slot-scope="scope"
                              v-if="statusNex==2">
                      <el-button @click.native.prevent="deleteRow(scope.$index, tableDataUnselected.slice((pageNumUnselected-1)*pageSizeUnselected,pageNumUnselected*pageSizeUnselected))"
                                 type="text"
                                 size="small">
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
                <div style="margin-bottom: 12px;"></div>
                <el-pagination @size-change="handleSizeChangeSelected"
                               @current-change="handleCurrentChangeSelected"
                               :current-page="currentPageSelected"
                               :page-sizes="[10, 20, 50, 100]"
                               :page-size="pageSizeSelected"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="totalSelected">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="未选中"
                       name="second">
            <div class="unselectd">
              <div>
                <el-form :inline="true"
                         :model="formInline"
                         class="demo-form-inline">
                  <el-form-item label="样本来源:"
                                style="font-weight: 600">
                    <el-select v-model="formInline.addressUnselectd"
                               placeholder="请选择" clearable
                               style="width: 185px;margin-right: 12px">
                      <el-option label="上海市第一小学"
                                 value="上海市第一小学"></el-option>
                      <el-option label="上海市幸福花园小区"
                                 value="上海市幸福花园小区"></el-option>
                      <el-option label="上海市胜利小学"
                                 value="上海市胜利小学"></el-option>
                      <el-option label="上海市成材幼儿园"
                                 value="上海市成材幼儿园"></el-option>
                      <el-option label="上海市前海豪庭小区"
                                 value="上海市前海豪庭小区"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="年龄">
                    <el-select v-model="formInline.ageUnselected"
                               placeholder="请选择" clearable
                               style="width: 100px;margin-right: 12px">
                      <el-option v-for="item in ageList"
                                 :label="item"
                                 :value="item"
                                 :key="item"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="性别">
                    <el-select v-model="formInline.sexUnselected"
                               placeholder="请选择" clearable
                               style="width: 100px;margin-right: 12px">
                      <el-option label="男"
                                 value="1"></el-option>
                      <el-option label="女"
                                 value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="家庭情况">
                    <el-select v-model="formInline.familyStatusUnselected"
                               placeholder="请选择" clearable
                               style="width: 100px;margin-right: 12px">
                      <el-option label="正常"
                                 value="1"></el-option>
                      <el-option label="单亲"
                                 value="2"></el-option>
                      <el-option label="孤儿"
                                 value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="fr">
                    <div class="search">
                      <el-button type="primary"
                                 @click="unselectSearch"
                                 style="width: 100px">搜索</el-button>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
              <div class="table">
                <el-table :data="tableDataUnselected"
                          style="width: 100%"
                          :header-cell-style="{textAlign: 'center'}"
                          :cell-style="{ textAlign: 'center' }">
                  <el-table-column prop="id"
                                   label="样本编号"
                                   ></el-table-column>
                  <el-table-column prop="age"
                                   label="年龄"
                                   ></el-table-column>
                  <el-table-column label="性别"
                                   >
                    <template slot-scope="scope">
                      <span v-if="scope.row.sex==1">男</span>
                      <span v-if="scope.row.sex==2">女</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="家庭情况"
                                   >
                    <template slot-scope="scope">
                      <span v-if="scope.row.familyStatus==1">正常</span>
                      <span v-if="scope.row.familyStatus==2">单亲</span>
                      <span v-if="scope.row.familyStatus==3">孤儿</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="address"
                                   label="来源地点"
                                   ></el-table-column>
                  <el-table-column label="操作"
                                   v-if="statusNex==2">
                    <template slot-scope="scope"
                              v-if="statusNex==2">
                      <el-button @click.native.prevent="addRow(scope.$index, tableDataUnselected.slice((pageNumUnselected-1)*pageSizeUnselected,pageNumUnselected*pageSizeUnselected))"
                                 type="text"
                                 size="small">
                        添加
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

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
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="start">
        <el-row type="flex"
                justify="center">
          <el-button type="primary"
                     @click="next"
                     v-if="statusNex==2">下一步</el-button>
        </el-row>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      videoSrc: '',
      videoState: false,
      disable:false,
      statusNex:2,//默认显示下一步按钮
      indexNum:3, //实验样本初筛
      status: 2,
      userTaskId: null,
      sampleId: null,
      selectionCriteria: '',
      activeName: 'first',
      tableDataUnselected: [],
      totalUnselected: null,
      pageNumUnselected: 1,
      pageSizeUnselected: 10,
      totalPagesUnselected: null,
      formInline: {
        sexUnselected: null,
        ageUnselected: null,
        familyStatusUnselected: null,
        addressUnselectd: null,
      },
      formInlineSelected: {
        sexUnselected: null,
        ageUnselected: null,
        familyStatusUnselected: null,
        addressUnselectd: null,
      },
      ageList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      tableDataSelected: [],
      totalSelected: null,
      pageNumSelected: 1,
      pageSizeSelected: 10,
      totalPagesSelected: null,
      currentPageSelected: 1,
      formInline: {
        user: '',
        region: '',
      },
    }
  },
  created() {
    // this.getSampleLists()
  },
  mounted() {
    this.getAllInfor()
    // this.getSampleLists()
    // this.getUserSampleLists()
  },
  methods: {

    // /点击按钮出现弹窗播放视频
    checkVideoFun(videos) {
      this.taskId=localStorage.getItem('taskId');
      var param = {
        id: this.taskId,
      }
      this.httpPost('/rct/v1/getScreenFlash', param).then((res) => {
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



    addRow(index, rows) {
      this.userTaskId = localStorage.getItem('userTaskId')
      let params = {
        userTaskId: this.userTaskId,
        sampleId: this.tableDataUnselected[index].id,
        name: this.tableDataUnselected[index].name,
        sex: this.tableDataUnselected[index].sex,
        age: this.tableDataUnselected[index].age,
        familyStatus: this.tableDataUnselected[index].familyStatus,
        address: this.tableDataUnselected[index].address,
      }
      this.httpPost('/rct/v1/addUserTaskSample', params).then((res) => {
        if (res && res.code === 0) {
          this.$message1.success({
            showClose: true,
            message: '添加成功',
            type: 'success',
          })
          // this.tableDataSelected.push(this.tableDataUnselected[index]);
          this.getSampleLists()
          this.getUserSampleLists()
        } else {
          this.$message1.error({
            showClose: true,
            message: '添加失败',
            type: 'error',
          })
        }
      })
    },
    deleteRow(index, rows) {
      this.sampleId = this.tableDataSelected[index].id
      let params = {
        id: this.sampleId,
      }
      this.httpPost('/rct/v1/deleteUserTaskSample', params).then((res) => {
        if (res && res.code === 0) {
          this.$message1.success({
            showClose: true,
            message: '删除成功',
            type: 'success',
          })
          // this.tableDataSelected.push(this.tableDataUnselected[index]);
          this.getSampleLists()
          this.getUserSampleLists()
        } else {
          this.$message1.error({
            showClose: true,
            message: '删除失败',
            type: 'error',
          })
        }
      })
    },
    unselectSearch() {
      let params = {
        userTaskId: this.userTaskId,
        pageNum: this.pageNumUnselected,
        pageSize: this.pageSizeUnselected,
        sex: this.formInline.sexUnselected,
        age: this.formInline.ageUnselected,
        familyStatus: this.formInline.familyStatusUnselected,
        address: this.formInline.addressUnselectd,
      }
      if(!params.sex && !params.age && !params.familyStatus && !params.address){
        params.sex = null
        params.age = null
        params.familyStatus = null
        params.address = null
      }
      this.httpPost('/rct/v1/searchSampleByParam', params).then((res) => {
        if (res && res.code === 0) {
          this.tableDataUnselected = res.data.data
          this.totalUnselected = res.data.total
          this.pageNumUnselected = res.data.pageNum
          this.pageSizeUnselected = res.data.pageSize
        }
      })
    },
    selectedSearch() {
      let params = {
        userTaskId: this.userTaskId,
        pageNum: this.pageNumSelected,
        pageSize: this.pageSizeSelected,
        sex: this.formInlineSelected.sexUnselected,
        age: this.formInlineSelected.ageUnselected,
        familyStatus: this.formInlineSelected.familyStatusUnselected,
        address: this.formInlineSelected.addressUnselectd,
      }
      this.httpPost('/rct/v1/searchUserTaskSampleByParam', params).then(
        (res) => {
          if (res && res.code === 0) {
            this.tableDataSelected = res.data.data
            this.totalSelected = res.data.total
            this.pageNumSelected = res.data.pageNum
            this.pageSizeSelected = res.data.pageSize
            this.totalPagesSelected = res.data.totalPages
          }
        }
      )
    },
    handleClick(tab, event) {},
    //未选中样本列表的获取
    getSampleLists() {
      this.userTaskId = localStorage.getItem('userTaskId')
      let params = {
        userTaskId: this.userTaskId,
        pageNum: this.pageNumUnselected,
        pageSize: this.pageSizeUnselected,
        sex: this.formInline.sexUnselected,
        age: this.formInline.ageUnselected,
        familyStatus: this.formInline.familyStatusUnselected,
        address: this.formInline.addressUnselectd,
      }
      if(!params.sex && !params.age && !params.familyStatus && !params.address){
        params.sex = null
        params.age = null
        params.familyStatus = null
        params.address = null
      }
      this.httpPost('/rct/v1/searchSampleByParam', params).then((res) => {
        if (res && res.code === 0) {
          this.tableDataUnselected = res.data.data
          this.totalUnselected = res.data.total
          this.pageNumUnselected = res.data.pageNum
          this.pageSizeUnselected = res.data.pageSize
        }
      })
    },
    handleSizeChangeUnselected(val) {
      this.pageSizeUnselected = val
      this.getSampleLists()
    },
    handleCurrentChangeUnselected(val) {
      this.pageNumUnselected = val
      this.getSampleLists()
    },
    //选中样本列表的获取
    getUserSampleLists() {
      this.userTaskId = localStorage.getItem('userTaskId')
      let params = {
        userTaskId: this.userTaskId,
        pageNum: this.pageNumSelected,
        pageSize: this.pageSizeSelected,
        sex: this.formInlineSelected.sexUnselected,
        age: this.formInlineSelected.ageUnselected,
        familyStatus: this.formInlineSelected.familyStatusUnselected,
        address: this.formInlineSelected.addressUnselectd,
      }
      this.httpPost('/rct/v1/searchUserTaskSampleByParam', params).then(
        (res) => {
          if (res && res.code === 0) {
            this.tableDataSelected = res.data.data
            this.totalSelected = res.data.total
            this.pageNumSelected = res.data.pageNum
            this.pageSizeSelected = res.data.pageSize
            this.totalPagesSelected = res.data.totalPages
          }
        }
      )
    },
    handleSizeChangeSelected(val) {
      this.pageSizeSelected = val
      this.getUserSampleLists()
    },
    handleCurrentChangeSelected(val) {
      this.pageNumSelected = val
      this.getUserSampleLists()
    },
    // 获取所有数据
    getAllInfor() {
      this.userTaskId = localStorage.getItem('userTaskId')
      let params = {
        id: this.userTaskId,
        pageNum: this.pageNumSelected,
        pageSize: this.pageSizeSelected,
      }
      this.httpPost('/rct/v1/enterSampleSelection', params).then((res) => {
        if (res && res.code === 0) {
          this.selectionCriteria = res.data.selectionCriteria
          if (
            res.data.finishStepNum &&
            res.data.finishStepNum > this.indexNum
          ) {
            this.statusNex = 1
            this.disable = true
          }
          this.tableDataUnselected = res.data.sampleList.data
          this.totalUnselected = res.data.sampleList.total
          this.pageNumUnselected = res.data.sampleList.pageNum
          this.pageSizeUnselected = res.data.sampleList.pageSize
          this.totalPagesUnselected = res.data.sampleList.totalPages
          this.tableDataSelected = res.data.userTaskSampleList.data
          this.totalSelected = res.data.userTaskSampleList.total
          this.pageNumSelected = res.data.userTaskSampleList.pageNum
          this.pageSizeSelected = res.data.userTaskSampleList.pageSize
          this.totalPagesSelected = res.data.userTaskSampleList.totalPages
        }
      })
    },

    next() {
      if(this.selectionCriteria==null||this.selectionCriteria == ""){
           this.$message1.warning({
          message: '选着标准未填写！',
          type: 'warning'
        });
          return;
      }
      if(this.tableDataSelected.length<10){
         this.$message1.warning({
          message: '选中样本数量不能小于10个',
          type: 'warning'
        });
          return;
      }
      this.userTaskId = localStorage.getItem('userTaskId')
      let params = {
        id: this.userTaskId,
        selectionCriteria: this.selectionCriteria,
      }
      this.httpPost('/rct/v1/sampleNext', params).then((res) => {
        if (res && res.code === 0) {
          this.$store.commit('setSteoNum', this.$store.state.stepNum + 1)
          this.status = res.data.data
          let path = '/rct/expersteps/agree/' + this.userTaskId
          this.$router.push(path)
          localStorage.setItem('currentPage', 4)
        }
      })
    },
    toUnselected(){
        this.activeName = 'second';
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.iconfont {
  font-size: 28px;
}
.el-button--primary {
  background-color: #1476b6;
  border-color: #1476b6;
}
.start {
  margin-top: 30px;
}
/deep/.select-btn .el-tabs__item {
  padding: 0;
  width: 80px;
  height: 40px;
  text-align: center;
}
/deep/.start .el-button {
  padding: 14px 55px;
  background-color: #1476b6;
}
/deep/.start .el-button:hover {
  padding: 14px 55px;
  background-color: #1a87cf;
}
/deep/.search .el-button:hover {
  background-color: #1a87cf;
}
/deep/.textarea .el-textarea__inner {
  resize: none;
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
    margin-bottom: 30px;
  }
  .content {
    .standard {
      height: 100px;
      line-height: 86px;
      margin-bottom: 12px;
      .stan-left {
        font-weight: 550;
      }
      .stan-right {
        width: 780px;
      }
    }
    .select-btn {
      .table {
        margin-bottom: 24px;
      }
    }
    .selectd {
      .remind {
        width: 920px;
        height: 400px;
        padding-top: 150px;
        margin: 0 auto;
        text-align: center;
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