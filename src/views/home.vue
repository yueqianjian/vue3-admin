<template>
  <div class="home fc2" id="home">
    <p>{{ $store.state }}</p>
    <p class="fc2" v-fs="32">homehomehomehomehome</p>
    <div class="txt fc5">txt</div>
    <slotDemo>
      <template #demo="{ txt }">
        {{ txt }}
      </template>
    </slotDemo>
    <div>
      sss
      <render />
    </div>
    <div ref="home">hhhhhhhhhhhh</div>
  </div>
</template>

<script setup>
import slotDemo from "@/components/slotDemo.vue";
import render from "@/components/render.vue";
import { reactive, ref, onMounted, getCurrentInstance } from "vue";
const state = reactive({ msg: "嘎嘎" });
const home = ref(null);
const { ctx } = getCurrentInstance();
onMounted(() => {
  console.log("home", getCurrentInstance());
});
</script>

<style lang="scss" scoped>
.home {
}
</style>
