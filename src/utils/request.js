import axios from "axios";
import router from "../routers";
import store from "../store/index";
import { ElMessage } from "element-plus";
import qs from "qs";
import { SUCCESS_CODE, BASE_URL, TIME_OUT } from "../config";
import { isFormData } from "../utils/tools";

const tip = (message) => {
  ElMessage.warning({
    message,
    type: "warning",
  });
};

const toLogin = () => {
  router.replace({
    path: "/login",
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      tip("没有访问权限");
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip("登录过期，请重新登录");
      localStorage.removeItem("token");
      store.commit("loginSuccess", null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    case 404:
      tip("请求的资源不存在");
      break;
    default:
      console.log(other);
  }
};

// 创建axios实例
const options = {
  baseURL: BASE_URL,
  // 开启以后则是form-data方式传输数据，否则则是payload方式
  // transformRequest: [
  //   function (data) {
  //     let query = data;
  //     // 如果不是FormData对象则序列化
  //     if (!isFormData(data)) {
  //       query = qs.stringify(data);
  //     }
  //     return query;
  //   },
  // ],
  timeout: TIME_OUT,
};
const instance = axios.create(options);
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  (config) => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => Promise.error(error)
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (response) => {
    const { status, data } = response;
    if (status === SUCCESS_CODE) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(response);
    }
  },
  // 请求失败
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
