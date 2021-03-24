<template>
  <div class="hearder bgc4 x3 aic">
    <navMenu />
    <userMenu />
  </div>
</template>

<script setup>
import navMenu from "./nav.vue";
import userMenu from "./user.vue";
</script>

<style lang="scss" scoped>
.hearder {
  padding: 0 20px;
  height: 64px;
}
</style>
