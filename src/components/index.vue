<template>
  <div>
    <div class="container">
      <c-header></c-header>
      <div class="wrap">
        <div class="title1-b">RCT实验简介</div>
        <button v-if="false"
                @click="getExperimentsList">111111111</button>
        <p class="indent"><span class="txt-b">随机对照实验（randomized controlled
            trial,RCT）</span>是一种对医疗卫生服务中的某种疗法或药物的效果进行检测的手段，特别常用于医学，生物学，农学。随机对照试验的基本方法是，将研究对象随机分组，对不同组实施不同的干预，一对照效果的不同。具有能够最大程度地避免临床实验设计、实施中可能出现的各种偏倚，平衡混杂因素，提过统计学检验的有效性等诸多优点，被公认为<span
                class="txt-b">是评价干预措施的金标准</span></p>
        <p class="indent">
          <span class="txt-b">RCT的设计要遵循三个基本原则，即设置对照组（control），研究对象的随机化分组（Randomization）和盲法试验（blind）。</span>其中，盲法实验主要包括单盲试验（single-blinded）、双盲（double blinded）实验等，<span
                class="txt-b">单盲试验</span>是仅研究者知道每个病人用药的具体内容，而病人不知道，可以避免来自病人主观因素的偏倚。<span class="txt-b">双盲实验</span>是研究者和病人都不知道每个病人分在哪一组，也不知道何组接受了治疗，此法的优点可以避免来自受试者与研究者的偏倚。
        </p>
        <div class="title1-b">RCT实验虚拟仿真项目</div>
        <div class="order">
          <span>排序：</span>
          <div class="btn"
               @click="order(0)"><span :class="{active: newActive}">最新<i class="el-icon-d-caret"></i></span></div>
          <div class="btn"
               @click="order(1)"><span :class="{active: viewActive}">浏览人数<i class="el-icon-d-caret"></i></span></div>
        </div>
        <div class="items">
          <div class="item mr fl"
               @click="detailHandler(item.id)"
               v-for="(item,index) in list"
               :key="index">
             <div>
                 <img :src="baseUrl+item.coverImg"
                 alt=""
                 width="365px"
                 height="250px"
                 class="imgBorder">
            <div v-text="item.name"></div>
          </div>
        </div>
      </div>
  </div>
        <c-footer></c-footer>
    </div>
  </div>
</template>

<script>
import CHeader from './common/header'
import CFooter from './common/footer'
export default {
  data() {
    return {
      list: [],
      newActive: false,
      viewActive: false,
    }
  },
  components: {
    CHeader,
    CFooter,
  },
  created() {
    this.getExperimentsList()
  },
  methods: {
    detailHandler(id){   
            localStorage.setItem("taskId",id);
            localStorage.setItem("ifIndexOrSee",2);
            let url =  	'/rct/expersteps/intro/'+id
            this.$router.push(url)
            localStorage.setItem('currentPage',0);
        },
    //获取实验列表
    getExperimentsList() {
      let params = {
        pageNum: 1,
        pageSize: 12,
        createTimeAsc: 1,
        viewNumAsc: 2,
      }
      this.httpPost('/task/getListRctTask', params).then((res) => {
        if (res && res.code === 0) {
          this.list = res.data.data
        }
      })
    },
    //是否根据最新获取列表
    order(flag) {
      //最新
      let time = 2
      let view = 2
      if (flag == 0) {
        if (this.newActive == false) {
          time = 0 //时间倒序
        } else {
          time = 1 //时间升序
        }
        this.newActive = !this.newActive
      }
      if (flag == 1) {
        if (this.viewActive == false) {
          view = 1 //浏览次数倒序
        } else {
          view = 0 //浏览次数升序
        }
        this.viewActive = !this.viewActive
      }
      let params = {
        pageNum: 1,
        pageSize: 12,
        createTimeAsc: time,
        viewNumAsc: view,
      }
      this.httpPost('/task/getListRctTask', params).then((res) => {
        if (res && res.code === 0) {
          this.list = res.data.data
        }
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
/deep/.start .el-button {
  padding: 14px 55px;
}
.container {
  width: 100%;
  .wrap {
    width: 1200px;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 24px;
    margin-bottom: 130px;
    .title1-b {
      margin-top: 28px;
    }
    .order {
      height: 48px;
      line-height: 48px;
      border: 1px solid #ccc;
      color: #797979;
      margin-bottom: 50px;
      padding-left: 12px;
      span {
        float: left;
        margin-right: 12px;
        i {
          padding-left: 4px;
          color: #797979;
        }
      }
      .btn {
        cursor: pointer;
      }
      .btn:hover span {
        color: #1864af;
      }
      .btn:hover i {
        color: #1864af;
      }
      .btn .active {
        color: #1864af;
        i {
          color: #1864af;
        }
      }
    }
    .items {
      cursor: pointer;
      .item {
        width: 365px;
        height: 280px;
        color: #90949E;
      }
      .item img{
        border: 1px solid #ccc;
      }
      .item:hover img {
        border: 1px solid #ff8711;
      }
      .item:hover div {
        color: #1864af;
      }
      .mr {
        margin-right: 52px;
      }
      .mr:nth-child(3n + 3) {
        margin-right: 0;
      }
    }
  }
}
body {
  position: relative;
}

.bot {
  position: absolute;
  width: 100%;
  bottom: 0px;
}
</style>