<template>
  <div class="game">
    <div class="gameMenu x aic bgc4">
      <div
        class="cell pointer x1 aic white"
        v-hover
        v-for="item in gameList"
        :key="item.id"
        @click="chooseItem(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div v-pm:m="`20px 0 0`">
      <component v-if="activeId" :is="activeId"></component>
    </div>
  </div>
</template>

<script>
import sudoku from "./sudoku/index.vue";
export default {
  components: {
    sudoku,
  },
  data() {
    return {
      activeId: "",
      gameList: [
        {
          id: "sudoku",
          name: "数独",
        },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.activeId = this.gameList[0].id;
    },
    chooseItem(item) {
      this.activeId = item.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.game {
  .gameMenu {
    width: fit-content;
    .cell {
      width: 70px;
    }
  }
}
</style>
