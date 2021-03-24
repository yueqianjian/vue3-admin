<template>
  <div class="home">
    <p>
      <span class="title">作者：</span>
      yueqianjian
    </p>
    <p>
      <span class="title">邮箱：</span>
      yueqianjian@gmail.com
    </p>
    <p>
      <span class="title">项目地址：</span>
      <a :href="gitUrl">{{ gitUrl }}</a>
    </p>
    <p>
      <span class="title">技术栈：</span>
      Vite2.0,Vue3,Vuex,Vue-Router,Element-plus,Scss
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gitUrl: `https://github.com/yueqianjian/vue3-admin`,
    };
  },
  methods: {
    goto() {
      let role = this.$store.state.user.role;
      console.log("role", role);
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  .title {
    width: 80px;
    display: inline-block;
  }
}
</style>
