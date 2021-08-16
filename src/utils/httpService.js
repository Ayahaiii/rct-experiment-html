import axios from 'axios';
import router from '../router'
import VueCookies from 'vue-cookies';
import {
  GetQueryValue1,
  isMobile
} from './utils';

axios.defaults.withCredentials = true;

// let _baseUrl = `192.168.0.132:8076/rctapi`;
let _baseUrl = `175.102.15.229:8076/rctapi`;

// let _baseUrl = `192.168.0.106:8073/ringsurveyapi`;
// let baseAuthUrl = `http://${_baseAuthUrl}`;
let baseUrl = `http://${_baseUrl}`;
// let baseUrl = 'http://175.102.15.229:18900/ringsurveyapi';
let baseAuthUrl = `http://175.102.15.229:18900/uums`;
// let baseAuthUrl = `http://192.168.0.121:8065/auth`;

const _isMobile = isMobile();

/**
 * get 请求
 */
const httpGet = async function (url = '', data = {}, type) {
  // 刷新Token
  let tempUrl = url.indexOf("centerAuth") != -1 ? baseAuthUrl : baseUrl;
  tempUrl = baseUrl;
  let _token = GetQueryValue1("tokenWeb")
  if (!_token) {
    _token = VueCookies.get("tokenWeb")
  }
  const instance = axios.create({
    baseURL: tempUrl,
    withCredentials: false,
    headers: {
      'Accept': 'application/json;charset=UTF-8',
      'content-type': 'application/json',
      'Authorization': _token ? 'Bearer ' + _token : ""
    }
  });
  return instance.get(url, {
    params: data
  }).then((result) => {
    var res = result.data;
    if (res && res.code === 0) {
      return Promise.resolve(res);
    } else {
      if (res.code === 15000) {
        this.$message({
          message: '系统异常',
          type: 'warning'
        });
        return res;
      } else if (res.code === 10000) {
        this.$message({
          message: res.message,
          type: 'warning'
        });
        return res;
      }
      return Promise.resolve(res);
    }
  }).catch((error) => {
    let res = error.response
    if ((res.status === 400 || res.status === 401) && !_isMobile) {
      if (res.data) {
        this.$message({
          message: res.data.message,
          type: 'warning'
        });
        this.$cookies.remove("tokenWeb");
        this.$cookies.remove("userInfo");
      } else {
        this.$message({
          message: '登录信息已失效,请重新登录',
          type: 'warning'
        });
      }
      router.push('/rct/login');
      return res;
    }
    res = {
      code: -1,
      message: '网络请求异常，请稍后再试或联系客服！'
    }
    console.log('网络请求错误');
    return res;
  })
}

/**
 * post 请求
 */
const httpPost = async function (url = '', data = {}) {
  let tempUrl = url.indexOf("centerAuth") != -1 ? baseAuthUrl : baseUrl;
  tempUrl = baseUrl;
  let _token = GetQueryValue1("tokenWeb")
  if (!_token) {
    _token = VueCookies.get("tokenWeb")
  }
  const instance = axios.create({
    baseURL: tempUrl,
    withCredentials: false,
    headers: {
      'Accept': 'application/json;charset=UTF-8',
      'content-type': 'application/json',
      'Authorization': _token ? 'Bearer ' + _token : ""
    }
  });
  return instance.post(url, JSON.stringify(data)).then((result) => {
    var res = result.data;
    if(res && res.code === 0) {
      return Promise.resolve(res);
    } else {
      if (res.code === 15000){
        this.$message({
          message: '网络请求异常，请稍后再试或联系客服！',
          type: 'warning'
        });
        return res;
      }
      return Promise.resolve(res);
    }
  }).catch((error) => {
    let res = error.response
    if (!res) {
      this.$cookies.remove("tokenWeb");
      this.$cookies.remove("userInfo");
      return
    }
    if ((res.status === 400 || res.status === 401) && !_isMobile) {
      if (res.data) {
        // this.$message.closeAll()
        this.$message({
          message: res.data.message,
          type: 'warning'
        });
        this.$cookies.remove("tokenWeb");
        this.$cookies.remove("userInfo");
      } else {
        this.$message({
          message: res.message,
          type: 'warning'
        });
      }
      router.push('/rct/login');

      // console.log(this)
      return res;
    }
    res = {
      code: -1,
      message: '网络请求异常，请稍后再试或联系客服！'
    }
    console.log('网络请求错误');
    return res;
  })
}

/**
 * post 请求 uums
 */
const httpPostIsAnonymous = function (url = '', data = {}) {
  const instance = axios.create({
    baseURL: baseAuthUrl,
    withCredentials: false,
    headers: {
      'Accept': 'application/json;charset=UTF-8',
      'content-type': 'application/json'
    }
  });
  return instance.post(url, JSON.stringify(data)).then((result) => {
    var res = result.data;
    if (res && res.code === 0) {
      return Promise.resolve(res);
    } else {
      if (res.code === 15000) {
        this.$message({
          message: '网络请求异常，请稍后再试或联系客服！',
          type: 'warning'
        });
        return res;
      }
      return Promise.resolve(res);
    }
  }).catch(() => {
    let res = {
      code: -1,
      message: '网络请求异常，请稍后再试或联系客服！'
    }
    console.log('网络请求错误');
    return res;
  })
}

/**
 * 认证请求
 */
const httpPostToken = function (url = '', data) {
  const instance = axios.create({
    baseURL: baseAuthUrl,
    withCredentials: false,
    headers: {
      'Authorization': 'Basic bW9uZXR3YXJlOm1vbmV0d2FyZTIwMTkuQHNoLmNvbQ==',
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  });
  return instance.post(url, data).then((result) => {
    var res = result.data;
    if (result && result.status === 200) {
      if (res != null && res.access_token != null && res.access_token != '') {
        this.$cookies.set("tokenWeb", res.access_token, 24 * 60 * 60);
        this.$cookies.set("userInfo", JSON.stringify(res.userInfo), 24 * 60 * 60);
        res = {
          code: 0,
          message: '登录成功'
        }
        return Promise.resolve(res);
      } else {
        res = {
          code: -1,
          message: '认证失败，请稍后再试或联系客服！'
        }
        return res;
      }
    }
  }).catch((error) => {
    let res = error.response
    console.log(error)
    if (res.status === 400 || res.status === 401 || res.status === 500) {
      res = {
        code: res.data.code,
        message: res.data.message
      }
      return res;
    }
    res = {
      code: -1,
      message: '网络请求异常，请稍后再试或联系客服！'
    }
    console.log('网络请求错误');
    return res;
  })
}



export {
  baseUrl,
  baseAuthUrl,
  httpGet,
  httpPost,
  httpPostIsAnonymous,
  httpPostToken
}
