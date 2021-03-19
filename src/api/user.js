import request from "@/utils/request";

export function getUserList() {
  return request({
    url: "/getUserList",
    method: "get",
  });
}

export function eidtUser(data) {
  return request({
    url: "/eidtUser",
    method: "post",
    data,
  });
}

export function uploadFile(data) {
  return request({
    url: "/profile",
    method: "post",
    data,
  });
}
