<template>
  <div class="nav x aic">
    <div
      class="cell x1 aic pointer white"
      v-hover
      @click="goto(item)"
      v-for="item in routes"
      :key="item.path"
    >
      {{ item.meta?.title || "sss" }}
    </div>
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
  created() {
    this.initRoutes();
  },
  methods: {
    initRoutes() {
      let routes = getRoutes();
      routes = routes.filter((e) => !e.hidden);
      this.routes = routes;
    },
    goto(item) {
      const { path } = item;
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  height: 30px;
  .cell {
    padding: 0 30px;
  }
}
</style>
