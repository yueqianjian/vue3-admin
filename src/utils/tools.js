/**
 * @description: 数组求交集
 * @param {*} list1 数组
 * @param {*} list2 数组
 * @return {*} 交集数组
 */
export const intersection = (list1, list2) => {
  let list = list1.filter((v) => {
    return list2.indexOf(v) !== -1;
  });
  return list;
};
