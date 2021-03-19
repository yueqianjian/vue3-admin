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
 * @param {*} v
 * @return {Boolean}
 */
export const isFormData = (v) => {
  return Object.prototype.toString.call(v) === "[object FormData]";
};
