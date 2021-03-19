<template>
  <div class="y1 aic" v-pm="`20px`">
    <input type="file" @change="getFile" />
    <el-button @click="testApi">测试接口</el-button>
  </div>
</template>

<script>
import { getUserList, eidtUser, uploadFile } from "@/api/user";
export default {
  data() {
    return {
      vfile: "",
    };
  },
  methods: {
    testApi() {
      this.uploadFile();
    },
    getFile(e) {
      this.vfile = e.target.files[0];
    },
    async getUserList() {
      const res = await getUserList();
      console.log("res", res);
    },
    async uploadFile() {
      let formData = new FormData();
      formData.append("username", "Groucho");
      formData.append("accountnum", 123456);
      formData.append("file", this.vfile);
      console.log("formData", formData);
      let query = formData;
      const res = await uploadFile(query);
      console.log("res", res);
    },

    async eidtUser() {
      let query = {
        a: 1,
        b: {
          c: [2],
        },
      };
      const res = await eidtUser(query);
      console.log("res", res);
    },
  },
};
</script>
