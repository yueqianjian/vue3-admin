<template>
  <div>
    <h2>
      该项目本身不提供后端服务，以下项目为node.js的Koa框架的后端服务，该页面仅为实现Get,Post请求,文件上传接口测试
    </h2>
    <p>tip:没必要也没钱去购买云服务器，只能酱紫了</p>
    <p v-pm:m="`40px 0 0`">
      <span class="title">项目地址：</span>
      <a :href="gitUrl">{{ gitUrl }}</a>
    </p>
    <div v-pm:m="`20px 0 0`">
      <p>
        <span class="title">GET</span>
        <el-button size="small" @click="getUserList">测试接口</el-button>
      </p>
      <p>{{ getRes }}</p>
    </div>
    <div v-pm:m="`20px 0 0`">
      <p>
        <span class="title">POST</span>
        <el-button size="small" @click="eidtUser">测试接口</el-button>
      </p>
      <p>{{ postRes }}</p>
    </div>
    <div v-pm:m="`20px 0 0`">
      <p>
        <span class="title">UPLOAD</span>
        <input type="file" @change="getFile" />
        <el-button size="small" @click="uploadFile">测试接口</el-button>
      </p>
      <p>{{ uploadRes }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gitUrl: `https://github.com/yueqianjian/koa-server`,
      vfile: "",
      getRes: "",
      postRes: "",
      uploadRes: "",
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
      this.getRes = res;
    },
    async uploadFile() {
      const { uploadFile } = this.$api.user;
      let formData = new FormData();
      formData.append("username", "Groucho");
      formData.append("accountnum", 123456);
      formData.append("file", this.vfile);
      let query = formData;
      const res = await uploadFile(query);
      this.uploadRes = res;
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
      this.postRes = res;
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  width: 80px;
  display: inline-block;
}
</style>
