import request from "@/utils/request";

const user = {
  getUserList() {
    return request({
      url: "/getUserList",
      method: "get",
    });
  },
  eidtUser(data) {
    return request({
      url: "/eidtUser",
      method: "post",
      data,
    });
  },
  uploadFile(data) {
    return request({
      url: "/profile",
      method: "post",
      data,
    });
  },
};

export default user;
