<template>
  <div class="user x aic white">
    <div class="white pointer" @click="logout">Logout</div>
  </div>
</template>

<script>
import { getRoutes } from "@/routers/index";

export default {
  data() {
    return {
      routes: [],
    };
  },
  methods: {
    logout() {
      this.$store.commit("user/clearUser");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  height: 30px;
  .cell {
    width: 80px;
  }
}
</style>
