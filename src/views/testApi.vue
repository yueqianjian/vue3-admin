<template>
  <div class="y1 aic" v-pm="`20px`">
    <input type="file" @change="getFile" />
    <el-button @click="testApi">测试接口</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vfile: "",
    };
  },
  methods: {
    testApi() {
      this.eidtUser();
    },
    getFile(e) {
      this.vfile = e.target.files[0];
    },
    async getUserList() {
      const { getUserList } = this.$api.user;
      const res = await getUserList();
      console.log("res", res);
    },
    async uploadFile() {
      const { uploadFile } = this.$api.user;
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
      const { eidtUser } = this.$api.user;
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
