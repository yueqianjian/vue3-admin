<template>
  <div class="home">
    home
    <el-button @click="goto">goto</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    goto() {
      let role = this.$store.state.user.role;
      console.log("role", role);
    },
  },
};
</script>
