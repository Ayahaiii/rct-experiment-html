<template>
	<div class="container-register">
	<!-- 头部 -->
    <div class="page-header">
			<router-link to="/login">
				<div class="wap">
							<!-- <img src="../assets/img/logo.png" alt="logo" class="logo-default"> -->
				</div>
			</router-link>
			<span style="vertical-align:middle;margin-left:270px;">实验教学中心</span>

      <span id="goLogin">登录</span><span style='float:right;font-size:14px;'>已注册？返回</span>
		</div>

		<!-- 中间 -->
		<div class="main_register">
			<el-row class="wrapper-register">
				<!-- 左边表单 -->
				<el-col :span="12" :offset="6">
					<!-- 注册板块 -->
					<el-tabs tab-position="top"  class="main_content">
						<!--手机注册-->
						<el-tab-pane label="手机注册">
							<el-form  ref="registerForm" class="registerForm">
								<!-- 用户名 -->
								<el-form-item prop="name">
									<el-input type="text" placeholder="请填写用户名" />
								</el-form-item>
								<!-- 手机号 -->
								<el-form-item prop="phone">
									<el-input type="text" placeholder="请填写手机号码" />
								</el-form-item>
								<!-- 密码 -->
								<el-form-item prop="password">
									<el-input type="password" placeholder="密码（6-16个字符，区分大小写）" />
								</el-form-item>
								<!-- 确认密码 -->
								<el-form-item prop="againPassword">
									<el-input type="password" placeholder="再次输入密码" />
								</el-form-item>
								<!-- 验证码 -->
								<el-form-item prop="code">
										<el-col :span="15">
											<el-input  placeholder="请输入短信中6位数字校验码" type="text" maxlength="6" />
										</el-col>
										<el-col :span="9" style="text-align:right">
											<el-button type="primary"></el-button>
										</el-col>
								</el-form-item>
								<!-- 同意 -->
								<el-form-item>
									<el-checkbox >
										我已看过并同意
										<a href>《用户注册协议》</a>
									</el-checkbox>
								</el-form-item>
								<!-- 注册 -->
								<el-form-item>
									<el-button type="primary">立即注册</el-button>
								</el-form-item>
							</el-form>
						</el-tab-pane>
					</el-tabs>
				</el-col>
			</el-row>
		</div>
			<!-- 底部 -->
		<div>
      <div class="footer-links">
        <div class="links">
          <ul>
            <li><a href="#">萌泰科技</a></li>
            <li><a href="#">关于我们</a></li>
            <li><a href="#">联系我们</a></li>
            <li><a href="#">服务协议</a></li>
            <li><a href="#">隐私政策</a></li>
          </ul>
        </div>
        <div class="copyright">Copyright © 2019 上海萌泰数据科技股份有限公司  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <a href="http://beian.miit.gov.cn" target="view_window">沪ICP备09099644号</a></div>
      </div>
    </div>
	</div>
</template>

<script>
export default {
	name: "register",
	data() {
    return {}
  },
};
</script>

<style lang="less" scoped>
#goLogin{
  float: right;
  margin-right: 20px;
  display: inline-block;
  margin-left: 10px;
  width: 60px;
  height: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
  line-height: 30px;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 8px;
}
.container-register {
.page-header{
      height: 72px;
      width: 100%;
      background-color: #eaeaea;
      overflow: hidden;
    img{
      position: absolute;
      top: 16px;
      left: 0;
      width: 250px;
      height: 40px;
      padding-left: 15px;
    }
    span{
      font-size: 20px;
      line-height: 72px;
      color: #777;
      margin-left: 270px;
    }
  }
	// 中间样式
	.main_register {
    width: 100%;
    position: absolute;
    top: 72px;
    bottom: 55px;
    left: 0;
		background-color: #fff;
		.wrapper-register {
			max-width: 900px;
      width: 70%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
			background: #fff;
			margin: auto;
			box-sizing: border-box;
		}
		// form 注册表单
		.main_content {
      height: 510px;
      padding: 15px 25px 10px 15px;
			border-radius: 5px;
			.ant-form {
				.ant-form-item-with-help {
					margin-bottom: 4.7px !important;
				}
				.ant-form-item {
					.ant-form-item-children {
						.ant-checkbox-wrapper {
							a {
								color: #409eff;
								&:hover {
									text-decoration: none;
								}
							}
						}
						.anticon {
							position: absolute;
							top: 4px;
							left: 5px;
							z-index: 9;
							color: #c0c4cc;
							height: 100%;
							text-align: center;
							margin: 0 auto;
						}
						.icon_lock {
							position: absolute;
							top: 12px;
							left: 8px;
						}
					}

					.ant-input {
						height: 40px;
						padding: 0 30px;
					}
					.now_register {
						width: 100%;
					}
					.ant-btn {
						padding: 0 12px;
						height: 40px;
					}
				}
			}
		}
	}
.login-title {
      font-size: 18px;
      font-weight: bold;
      color: #595959;
      border-bottom: 1px solid #d5d5d5;
      height: 41px;
      margin-bottom: 24px;
      span {
        display: inline-block;
        border-bottom: 3px solid #409eff;
        height: 100%;
        padding: 0 5px;
      }
    }

  }
  .footer-links{
    width: 100%;
    height: 55px;
    background-color: #eaeaea;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .links {
    overflow: hidden;
    width: 480px;
    margin: 0 auto;
    ul{
      overflow: hidden;
      margin: 12px 0 2px;
      li{
      float: left;
      width: 80px;
      text-align: center;
      }
    }
    a {
      color: #010101;
      font-size: 11px;
      text-decoration: none;
    }
    a ~ a {
      margin-left: 15px;
    }
  }
  .copyright {
    text-align: center;
    font-size: 11px;
    color: #333;
  }
button{
	outline:none;
}
</style>
