// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import http from "./utils/api";
import {
  baseUrl,
  baseAuthUrl,
  httpGet,
  httpPost,
  httpPostIsAnonymous,
  httpPostToken
} from "./utils/httpService";


// 引入element ui
import ElementUI ,{Message} from "element-ui";

//解决Message弹出多个提示框
const showMessage = Symbol("showMessage");
class DonMessage {
  success(options, single = true) {
    this[showMessage]("success", options, single);
  }
  warning(options, single = true) {
    this[showMessage]("warning", options, single);
  }
  info(options, single = true) {
    this[showMessage]("info", options, single);
  }
  error(options, single = true) {
    this[showMessage]("error", options, single);
  }

  [showMessage](type, options, single) {
    if (single) {
      // 判断是否已存在Message
      if (document.getElementsByClassName("el-message").length === 0) {
        Message[type](options);
      }
    } else {
      Message[type](options);
    }
  }
}




import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.prototype.$message1 = new DonMessage()
import VueCookies from "vue-cookies";
Vue.use(VueCookies);












//引入less
import less from "less";
Vue.use(less);

import "./assets/style/common.css";
import "./assets/iconfont/iconfont.css";

import * as Util from "./utils/utils";
import Video from "video.js";
import "video.js/dist/video-js.css";
Vue.config.productionTip = false;

Vue.prototype.$video = Video;
Vue.prototype.httpPostToken = httpPostToken;
Vue.prototype.$http = http;
Vue.prototype.httpGet = httpGet;
Vue.prototype.httpPost = httpPost;
Vue.prototype.httpPostIsAnonymous = httpPostIsAnonymous;
Vue.prototype.httpPostToken = httpPostToken;
Vue.prototype.baseUrl = baseUrl;
Vue.prototype.checkPhoneNum = Util.checkPhoneNum;
Vue.prototype.checkEmail = Util.checkEmail;
Vue.prototype.getRandomVerify = Util.getRandomVerify;

// 跳转后返回顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})
router.beforeEach((to, from, next) => {
    //
    next()
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
