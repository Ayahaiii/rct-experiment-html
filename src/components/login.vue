<template>
	<div class="container-login">
		<!-- 头部 -->
		<div class="page-header">
			<div class="fl">
				<img class="fl loginImg" src="../assets/img/loginlogo.png" alt="">
				<div class="fl">
					<span class="txt1-left">循证社会工作虚拟仿真实验平台</span>
					<span class="txt2-left">RCT实验平台</span>
				</div>
			</div>
		</div>

		<!-- 登陆部分 -->
		<div class="main" style="padding: 0;">
			<div class="main-wrap">
				<div class="wrapper-form">
					<div class="login-title">
						<span>账号登录</span>
					</div>
					<el-form :model="loginForm" :rules="loginRules" ref="loginForm">
						<el-form-item prop="loginName">
							<el-input v-model="loginForm.loginName" placeholder="请输入用户名/邮箱/手机号" type="text">
								<i slot="prefix" class="el-icon-user-solid"></i>
							</el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')" placeholder="请输入密码" type="password">
								<i slot="prefix" class="el-icon-lock"></i>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
						</el-form-item>
						<el-form-item>
							<el-button :disabled="isDisabled" style="width:100%;" type="primary" @click="submitForm('loginForm')">登录</el-button>
						</el-form-item>
						<p>
							<span>
								还没有账号？<span @click="toRegister" style="color:#409eff;cursor: pointer;">立即注册！</span>
							</span>
							<span class="getPassword">忘记密码</span>
							<span class="getPassword" @click="getPassword">忘记密码</span>
						</p>
					</el-form>
				</div>
			</div>
		</div>
		<!-- 底部 -->
		<div class="bot">
			<c-footer></c-footer>
		</div>
	</div>
</template>

<script>
import CFooter from '../components/common/footer'
import crypto from "crypto";
export default {
	components: {
        CFooter,
	},

	data() {
		return {
			loginForm: {
				loginName: "",
				password: "",
				rememberMe: true
			},
			loginRules: {                           // 登录表单的验证规则
				loginName: [{
					required: true,
					message: "请输入用户名/手机号/邮箱",
					trigger: "blur"
				}],
				password: [{
					required: true,
					message: "请输入密码",
					trigger: "blur"
				}]
			},
			isDisabled: false, //禁用登录按钮
			name: "",
			logo: "",//logo
		};
	},
	created() {
		this.checkUserIfLogin();
	},
	mounted() {
		this.loginForm.loginName = window.localStorage.getItem("loginName");
		this.loginForm.password = window.localStorage.getItem("userPassword");
	},
	methods: {

		/*判断用户是否登陆*/
		checkUserIfLogin() {
			if (this.$cookies.isKey("tokenWeb")) {
				let userInfo = this.$cookies.get("userInfo");
				if (userInfo && !userInfo.hasOwnProperty("ifLoginEXP")) {
					this.httpPost("/user/v1/userInfo", null).then(res => {
						if (res && res.code === 0) {
							userInfo.ifLoginEXP = true;
							this.$cookies.set("userInfo", userInfo);
							this.$router.push("/rct/index");
						}
					});
				}
			}
		},

		/*点击登陆事件*/
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					var ip = '';
					var city = '';
					var client = "EXP";
					this.isDisabled = true
					if (window.localStorage.key('ip')) {
						// ip = window.localStorage.getItem('ip')
						// city = window.localStorage.getItem('city')
						ip = '192.169.0.169'
						city = '上海市'
					}
					if (this.loginForm.password.toString().length != 32) {
						const md5 = crypto.createHash("md5");
						md5.update(this.loginForm.password);
						this.loginForm.password = md5.digest("hex");
					}
					this.httpPostToken("/oauth/token",
						`grant_type=password&username=${this.loginForm.loginName}&password=${this.loginForm.password}&clientType=${client}&ip=${ip}&city=${city}`
					).then(res => {
						if (res && res.code === 0) {
							//缓存用户名密码
							if (this.loginForm.rememberMe) {
								window.localStorage.setItem("loginName", this.loginForm.loginName);
								window.localStorage.setItem("userPassword", this.loginForm.password);
							} else {
								window.localStorage.setItem("loginName", '');
								window.localStorage.setItem("userPassword", '');
							}
							let userInfo = this.$cookies.get("userInfo");
							this.httpPost("/user/v1/login", {
								"userName": this.loginForm.loginName
							}).then(res => {
								if (res.code == 0) {
									localStorage.setItem('currentPage', 0);
									this.isDisabled = false
									this.$router.replace({
										path: "/rct/index"
									})
								} else {
									this.isDisabled = false
									this.$message.error(res.message);
								}
							}).catch(err => {
								this.isDisabled = false
							})
						} else if (res) {
							this.isDisabled = false;
							this.$message.error(res.message);
						}
					});
				} else {
					return false;
				}
			});
		},

		/*点击注册*/
		toRegister() {
			window.location.href = "https://lab.ringdata.com/#/register"
		},


		/*忘记密码*/
		getPassword() {
			window.location.href = "https://lab.ringdata.com/#/find/pass"
		},

	}
};
</script>
<style lang="less" scoped>
.container-login {
    margin-bottom: 78px;
	// 图标样式
	.iconfont {
		font-size: 20px;
	}
	// 主体样式
	.page-header {
		width: 100%;
		background: #ffffff;
		color: #0b75bb;
		height: 86px;
		padding: 0px 34px;
		.loginImg {
			width: 55px;
			height: 55px;
			vertical-align: middle;
			margin-top: 15px;
			margin-right: 10px;
		}
		.txt1-left {
			display: inline-block;
			font-size: 24px;
			line-height: 86px;
		}
		.txt2-left {
			display: inline-block;
			font-size: 22px;
			font-weight: 500;
			line-height: 86px;
			color: #eca50c;
			padding-left: 28px;
		}
		.txt-right {
			display: inline-block;
			line-height: 86px;
		}
	}

	.main {
		position: fixed;
		top: 86px;
		bottom: 55px;
		left: 0;
        width: 100%;
        background-size: 100% 100%;
	    background-attachment: fixed;
		background: url("../assets/img/bg-login.jpg");
		background-repeat: no-repeat;
		background-position: center;
		.wrapper-form {
			width: 320px;
			height: 390px;
			background: #fff;
			padding: 30px 20px;
			border-radius: 5px;
			box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
			position: absolute;
			top: 0;
			bottom: 0;
			right: 120px;
			margin: auto;
			.getPassword {
				position: absolute;
				right: 20px;
				color: #409eff;
				cursor: pointer;
			}
		}

		.login-title {
			font-size: 18px;
			font-weight: bold;
			color: #595959;
			border-bottom: 1px solid #d5d5d5;
			height: 40px;
			margin-bottom: 24px;
			span {
				display: inline-block;
				border-bottom: 3px solid #409eff;
				height: 100%;
				padding: 0 5px;
			}
		}
	}
}
</style>

