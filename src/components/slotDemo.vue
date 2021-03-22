<template>
  <div>
    <h1>count{{ count }}</h1>
    <slot name="demo" :txt="txt"></slot>
    <zi></zi>

    <button @click="$forceUpdate()" v-pm="`0 20px`" v-fs="40">button</button>
    {{ txt }}sssss
    <teleport v-if="showTele" to=".home">
      <p>body</p>
    </teleport>
  </div>
</template>

<script>
import zi from "./zi.vue";
import { provide, reactive, ref } from "vue";
import { mixins } from "./mixins";
export default {
  components: {
    zi,
  },
  mixins: [mixins],
  data() {
    return {
      showTele: false,
      txt: "哈哈哈时候山山水水",
    };
  },
  computed: {
    count() {
      return this.$store.state.role;
    },
  },
  provide() {
    return {
      name: this.txt,
    };
  },
  // setup(props) {
  //   // name: this.txt
  //   console.log("props",props)
  // },
  mounted() {
    this.showTele = true;
    console.log("mname", this.mname);
  },
};
</script>
