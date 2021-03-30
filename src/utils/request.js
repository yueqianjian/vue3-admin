import axios from "axios";
import { router } from "../routers";
import store from "../store/index";
import { ElMessage, ElLoading } from "element-plus";
// import qs from "qs";
import { SUCCESS_CODE, BASE_URL, TIME_OUT, LOADING_TIME } from "../config";
import { isFormData, setS } from "../utils/tools";

// 请求loading
let loading = null;
let timer = null;
const startLoading = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    loading = ElLoading.service({
      lock: true,
      background: "rgba(0, 0, 0, 0.7)",
    });
  }, LOADING_TIME);
};
const cleatLoading = () => {
  try {
    clearTimeout(timer);
    loading.close();
  } catch (error) {
    // loading error
  }
};

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
      redirect: router.currentRoute.value.fullPath,
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
      store.commit("user/clearUser");
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
  headers: {},
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

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = store.state.user.token;
    if (token) {
      config.headers.Authorization = token;
    }
    // loading定时器，请求超过100毫秒再显示
    startLoading();
    return config;
  },
  (error) => Promise.error(error)
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  (response) => {
    cleatLoading();
    const { status, data } = response;
    if (status === SUCCESS_CODE) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(response);
    }
  },
  // 请求失败
  (error) => {
    cleatLoading();
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
