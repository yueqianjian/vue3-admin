<template>
  <div class="home fc2" id="home">
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
import { reactive, ref, onMounted } from "vue";
const state = reactive({ msg: "嘎嘎" });
const home = ref(null);
onMounted(() => {
  console.log("home", home.value);
});
</script>

<style lang="scss" scoped>
.home {
}
</style>
