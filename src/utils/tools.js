import store from "@/store/index";
/**
 * @description: 数组求交集
 * @param {Array} list1
 * @param {Array} list2
 * @return {Array} 交集数组
 */
export const intersection = (list1, list2) => {
  let list = list1.filter((v) => {
    return list2.indexOf(v) !== -1;
  });
  return list;
};

/**
 * @description: 判断一个数据是否为FormData
 * @param {*} e
 * @return {Boolean}
 */
export const isFormData = (e) => {
  return Object.prototype.toString.call(e) === "[object FormData]";
};

/**
 * @description: 深拷贝
 * @param {*} e
 * @return {*}
 */
export const copy = (e) => {
  return JSON.parse(JSON.stringify(e));
};

/**
 * @description: 获取存储值
 * @param {*} k
 * @return {*}
 */
export const getS = (k) => {
  let v = localStorage.getItem(k);
  v = JSON.parse(v);
  return v;
};

/**
 * @description: 设置存储值
 * @param {String} k
 * @param {*} v
 * @return {*}
 */
export const setS = (k, v) => {
  v = JSON.stringify(v);
  localStorage.setItem(k, v);
  return v;
};
