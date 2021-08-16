<template>
    <div>
        <c-header></c-header>
        <div class="content-box">
            <!-- title -->
            <div class="title">
                <span class="icon iconfont idea">&#xe604;</span>
                <span class="tit"> 我的实验</span>
            </div>

            <!-- 实验列表 -->
            <div class="list" v-for="(item,index) in showList" :key="index">
                <el-row>
                    <el-col :span="24">
                        <h4 v-text="item.name"></h4>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8"  class="gray">
                        <span>开放时间：</span> <span v-text="item.beginTime"></span>
                    </el-col>
                    <el-col :span="9"  class="gray">
                        <span>结束时间：</span> <span v-text="item.endTime"></span>
                    </el-col>
                    <el-col :span="3">
                        <div v-if="item.status == 1">
                            <span class="finish">已完成</span>
                        </div>
                        <div v-else>
                            <span class="unfinish">未完成</span>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <div v-if="item.status == 1">
                            <el-button  type="primary" @click="toDetail(item)">查看</el-button>
                        </div>
                        <div v-else>
                            <el-button type="primary" @click="toContinue(item)">继续</el-button>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" @click="toDelete(item.userTaskId)">删除</el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 页显示 -->
            <div class="devidePage">
                <el-row>
                    <el-col :span="10" class="f14">
                        <span>当前第 <span v-if="startNum>0 && startNum!=endNum">{{startNum}} - </span>{{endNum}} 条, 共计 {{allNum}} 条
                        </span>
                    </el-col>
                    <el-col :span="14" class="right">
                        <el-pagination background layout="prev, pager, next" @current-change="changeCurrent" :page-size="pageSize" :total="allNum" :pager-count="5" >
                        </el-pagination>
                    </el-col>
                </el-row>
            </div>
        </div>
        <c-footer></c-footer>
    </div>
</template>
<script>
import CHeader from '../common/header'
import CFooter from '../common/footer'
export default {
  data () {
    return {
        startNum: 0, //当前页开始条数
        endNum: 0, //当前页结束条数
        allNum: 0, //总条数
        preVal: 0, //前页面页数
        pageNum: 0, //当前页页数
        pageSize: 10, //页面大小
        showList:[] //显示列表
    }
  },
  components: {
      CHeader,
      CFooter
  },
  created() {
    this.getList(1,10)
    },
  methods: {
      //获取显示列表
      getList(pageNum,pageSize){
          let  params = {
              pageNum: pageNum, //当前页
              pageSize: pageSize //每页数据条数
          }
        this.httpPost("/user/v1/getUserTaskList", params).then(res => {
            if (res && res.code === 0) {
                let data = res.data
                this.pageNum = data.pageNum
                this.pageSize = data.pageSize
                this.allNum = data.total
                this.showList = data.data
                this.startNum = (data.pageNum-1)*data.pageSize+1
                this.endNum = this.startNum+this.pageSize-1
                //非末页
                if(this.endNum<this.allNum){
                    this.endNum = this.startNum+data.pageSize-1
                } else{
                    //末页
                    this.endNum = this.allNum
                }
                
            }
        })
      },

      //切换页数
      changeCurrent(val){
        this.getList(val,this.pageSize)
        this.preVal = val
      },

      //查看
      toDetail(item){
        //当前用户实验id存到
        localStorage.setItem("userTaskId",item.userTaskId);
        localStorage.setItem("taskId",item.taskId);
        localStorage.setItem("finishStepNum",item.finishStepNum);
        localStorage.setItem("ifIndexOrSee",1);
        let path = '/rct/expersteps/intro/'+item.taskId;
        this.$router.push(path);
        // let path = '/rct/expersteps/intro/'+id
      },

      //继续
      toContinue(item){
        localStorage.setItem("userTaskId",item.userTaskId);
        localStorage.setItem("taskId",item.taskId);
        localStorage.setItem("ifIndexOrSee",2);
        let path = '/rct/expersteps/intro/'+item.taskId;
        // localStorage.setItem("userTaskId",this.userTaskId);
        this.$router.push(path);
      },

      //删除
      toDelete(id){
        this.$confirm('此操作将永久删除该实验, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let  params = {
                id: id
            }
            this.httpPost("/userTask/delUserTask", params).then(res => {
                if (res && res.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //更新显示列表
                    this.getList(this.pageNum,this.pageSize)
                }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
  }
}
</script>
<style lang="less" scoped>
.content-box {
    width: 85%;
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 78px;
    .title {
        padding: 20px 0;
        border-bottom: 0.25px solid #ddd;
        .tit {
            display: inline-block;
            color: #3AB5D7;
            font-size: 20px;
            font-weight: 350;
            margin-left: 10px;
        }
        .idea{
            font-size: 42px;
            color: #FAB8B8;
            vertical-align: middle;
        }
    }
    .list{
        border-bottom: dashed 1px #ddd;
        padding: 20px 0 30px 0;
        .el-row{
            margin-left: 20px;
            h4{
                font-size: 15px;
                font-weight: 600;
            }
        }
        .gray{
                font-size: 14px;
                color: #a9a9a9;
            }
        .el-col span{
                font-size: 14px;
        }
        .finish, .unfinish{
            color: #FFFFFF;
            display: inline-block;
            width: 70px;
            height: 38px;
            line-height: 38px;
            border-radius: 5px;
            padding-left: 12px;
        }
        .finish{
            background-color: #B7B7B7;
        }
        .unfinish{
            background-color: #9BBD73;
        }
    }
    .devidePage{
        margin: 80px auto;
        .f14{
            font-size: 14px;
        }
        .right{
            text-align: right;
        }
    }
    
}
</style>