<template>
  <div class="layout">
    <headerMenu />
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import headerMenu from "./components/headerMenu.vue";
</script>

<style lang="scss" scoped>
.body {
  width: 1400px;
  margin: 0 auto;
  padding-top: 32px;
}
</style>
