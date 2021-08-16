<template>
	<div class="footer">
		<div class="wrap">
			<div class="itemone fl" @click="handleEvent(0)">
				<div class="circle fl" :class="{activeCircle: $store.state.stepNum>=0}"><i class="iconfont icon-jianjie" :class="{activeIconfont: $store.state.stepNum>=0}"></i></div>
				<div class="line fl"></div>
				<span class="fl txt active-txt" :class="{activeTxt:  $store.state.stepNum>=0}">简介</span>
			</div>
			<div class="itemtwo fl" @click="handleEvent(1)">
				<div class="line fl"></div>
				<div class="circle fl" :class="{activeCircle:  $store.state.stepNum>=1}"><i class="iconfont icon-zhunbeishouhuo" :class="{activeIconfont: $store.state.stepNum>=1}"></i></div>
				<div class="line fl"></div>
				<span class="fl txt" :class="{activeTxt: $store.state.stepNum>=1}">实验准备</span>
			</div>
			<div class="itemthree fl" @click="handleEvent(1)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=1}"></div>
				<div class="line fl"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=1}">实验目的</span>
			</div>
			<div class="itemthree fl" @click="handleEvent(2)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=2}"></div>
				<div class="line fl"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=2}">实验注册</span>
			</div>
			<div class="itemtwo fl" @click="handleEvent(3)">
				<div class="line fl"></div>
				<div class="circle fl" :class="{activeCircle: $store.state.stepNum>=3}"><i class="iconfont icon-shaixuan1" :class="{activeIconfont: $store.state.stepNum>=3}"></i></div>
				<div class="line fl"></div>
				<span class="fl txt" :class="{activeTxt: $store.state.stepNum>=3}">样本筛选</span>
			</div>
			<div class="itemthree fl" @click="handleEvent(3)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=3}"></div>
				<div class="line fl"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=3}">实验初筛</span>
			</div>
			<div class="itemthree fl" @click="handleEvent(4)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=4}"></div>
				<div class="line fl"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=4}">知情同意</span>
			</div>
			<div class="itemtwo fl" @click="handleEvent(5)">
				<div class="line fl"></div>
				<div class="circle fl" :class="{activeCircle: $store.state.stepNum>=5}"><i class="iconfont icon-tiqu" :class="{activeIconfont: $store.state.stepNum>=5}"></i></div>
				<div class="line fl"></div>
				<span class="fl txt" :class="{activeTxt: $store.state.stepNum>=5}">样本入组</span>
			</div>
			<div class="itemthree fl" @click="handleEvent(5)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=5}"></div>
				<div class="line fl"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=5}">随机分组</span>
			</div>
			<div class="itemthree fl" @click="handleEvent(6)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=6}"></div>
				<div class="line fl"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=6}">分组通知</span>
			</div>
			<div class="itemtwo fl" @click="handleEvent(7)">
				<div class="line fl"></div>
				<div class="circle fl" :class="{activeCircle: $store.state.stepNum>=7}"><i class="iconfont icon-genzong" :class="{activeIconfont: $store.state.stepNum>=7}"></i></div>
				<div class="line fl"></div>
				<span class="fl txt" :class="{activeTxt: $store.state.stepNum>=7}">跟踪随访</span>
			</div>
			<div class="itemthree fl" @click="handleEvent(7)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=7}"></div>
				<div class="line fl"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=7}">一次随访</span>
			</div>
			<div class="itemthree fl" @click="handleEvent(8)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=8}"></div>
				<div class="line fl"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=8}">二次随访</span>
			</div>
			<div class="itemtwo fl" @click="handleEvent(9)">
				<div class="line fl"></div>
				<div class="circle fl" :class="{activeCircle: $store.state.stepNum>=9}"><i class="iconfont icon-gongwenyuelan" :class="{activeIconfont: $store.state.stepNum>=9}"></i></div>
				<div class="line fl"></div>
				<span class="fl txt" :class="{activeTxt: $store.state.stepNum>=9}">阅览结果</span>
			</div>
			<div class="itemthree fl" @click="handleEvent(9)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=9}"></div>
				<div class="line fl"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=9}">流程图</span>
			</div>
			<div class="itemthree fl" @click="handleEvent(10)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=10}"></div>
				<div class="line fl"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=10}">数据分析</span>
			</div>
			<div class="itemthree fl" @click="handleEvent(11)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=11}"></div>
				<div class="line fl"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=11}">讨论/结论</span>
			</div>
			<div class="itemfour fl" @click="handleEvent(12)">
				<div class="line fl"></div>
				<div class="cir fl" :class="{activeCircle: $store.state.stepNum>=12}"></div>
				<span class="fl" :class="{activeTxt: $store.state.stepNum>=12}">预览</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'step',
	data() {
		return {
			finishStepNum: -1,
		}
	},
	created() {
		if (!this.$store.state.stepNum) {
			this.getTaskStepNum();
		}
	},
	mounted() {
	},
	methods: {
		/**
		 * 获取当前步骤NUM
		 */
		getTaskStepNum() {
			let params = {
				taskId: localStorage.getItem("taskId"),
			}
			this.httpPost('/userTask/ifBegin', params).then((res) => {
				if (res && res.code === 0) {
					this.$store.commit("setSteoNum", res.data.finishStepNum)
				} else if (res && res.code === 1) {
					this.$store.commit("setSteoNum", 0)
				}
			})
		},

		/**
		 * 点击下方步骤
		 */
		handleEvent(menu) {
			if (menu > this.$store.state.stepNum) {
				this.$message1.info("请先完成当前步骤")
				return
			}
			if (menu === 0) {
				localStorage.setItem('currentPage', 0);
				let url = '/rct/expersteps/intro/' + localStorage.getItem('taskId');
				this.$router.push(url);
				// this.$store.commit('setStepPage', 0)
			} else if ((menu === 1)) {
				let url = '/rct/expersteps/tools/' + localStorage.getItem('taskId');
				this.$router.push(url);
				localStorage.setItem('currentPage', 1);
			} else if ((menu === 2)) {
				let url = '/rct/expersteps/register/' + localStorage.getItem('taskId');
				this.$router.push(url);
				localStorage.setItem('currentPage', 2);
			} else if ((menu === 3)) {
				let url = '/rct/expersteps/select/' + localStorage.getItem('taskId');
				this.$router.push(url);
				// this.$store.commit('setStepPage', 3)
				localStorage.setItem('currentPage', 3);
			} else if ((menu === 4)) {
				let url = '/rct/expersteps/agree/' + localStorage.getItem('taskId');
				this.$router.push(url);
				// this.$store.commit('setStepPage', 4)
				localStorage.setItem('currentPage', 4);
			} else if ((menu === 5)) {
				let url = '/rct/expersteps/randomgroup/' + localStorage.getItem('taskId');;
				this.$router.push(url);
				localStorage.setItem('currentPage', 5);
			} else if ((menu === 6)) {
				let url = '/rct/expersteps/groupresult/' + localStorage.getItem('taskId');
				this.$router.push(url);
				// this.$store.commit('setStepPage', 6)
				localStorage.setItem('currentPage', 6);
			} else if ((menu === 7)) {
				let url = '/rct/expersteps/firstfollow/' + localStorage.getItem('taskId');
				this.$router.push(url);
				// this.$store.commit('setStepPage', 7)
				localStorage.setItem('currentPage', 7);
			} else if ((menu === 8)) {
				let url = '/rct/expersteps/secondfollow/' + localStorage.getItem('taskId');
				this.$router.push(url);
				// this.$store.commit('setStepPage', 8)
				localStorage.setItem('currentPage', 8);
			} else if ((menu === 9)) {
				let url = '/rct/expersteps/flowcharts/' + localStorage.getItem('taskId');
				this.$router.push(url);
				// this.$store.commit('setStepPage', 9)
				localStorage.setItem('currentPage', 9);
			} else if ((menu === 10)) {
				let url = '/rct/expersteps/analysis/' + localStorage.getItem('taskId');
				this.$router.push(url);
				// this.$store.commit('setStepPage', 10)
				localStorage.setItem('currentPage', 10);
			} else if ((menu === 11)) {
				let url = '/rct/expersteps/conclusion/' + localStorage.getItem('taskId');
				this.$router.push(url);
				// this.$store.commit('setStepPage', 11)
				localStorage.setItem('currentPage', 11);
			} else if ((menu === 12)) {
				let url = '/rct/expersteps/progeny/' + localStorage.getItem('taskId');
				this.$router.push(url);
				// this.$store.commit('setStepPage', 12)
				localStorage.setItem('currentPage', 12);
			}
			//   this.currentStep = Number(localStorage.getItem('currentPage'))
		},
	},
}
</script>
<style lang="less" scoped>
.activeCircle {
	background-color: #3ab4d6;
	border-color: #3ab4d6 !important;
}
.activeTxt {
	color: #3ab4d6!important;
}
.activeIconfont {
	color: #fff !important;
}
span {
	font-size: 14px;
}
.iconfont {
	width: 100%;
	display: inline-block;
	line-height: 44px;
	font-size: 28px;
	color: #bbb;
	margin-left: 8px;
	margin-right: 8px;
}
.footer {
	position: fixed;
	bottom: 0;
	width: 100%;
	border-top: 1px solid #bbb;
	background-color: #fbfbfb;
	height: 101px;
	z-index: 2;
	.wrap {
		width: 1375px;
		height: 60px;
		margin: 20px auto;
		.txt {
			font-weight: 600;
		}
		.itemone {
			width: 69px;
			cursor: pointer;
			span {
				padding-left: 5px;
			}
		}
		.itemfour {
			width: 45px;
			cursor: pointer;
			span {
				padding-left: 15px;
			}
		}
		.itemtwo {
			width: 94px;
			cursor: pointer;
			span {
				padding-left: 15px;
			}
		}
		.itemthree {
			width: 70px;
			cursor: pointer;
			span {
				padding-left: 5px;
			}
		}
		.circle {
			width: 44px;
			height: 44px;
			border: 1px solid #bbb;
			border-radius: 50%;
		}
		.cir {
			width: 20px;
			height: 20px;
			border: 1px solid #bbb;
			border-radius: 50%;
			margin: 15px 0px;
			position: relative;
		}
		.line {
			width: 25px;
			height: 0.5px;
			background-color: #bbb;
			margin: 24px 0px;
		}
	}
}
</style>

