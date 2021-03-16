<template>
  <div class="sudoku">
    <div class="grid">
      <div v-for="x in size ** 2" :key="x">
        <div
          class="cell x1 aic"
          :class="{ active: SDMap[`${x}-${y}`].num }"
          v-for="y in size ** 2"
          :key="y"
        >
          {{ (SDMap[`${x}-${y}`] && SDMap[`${x}-${y}`].num) || `${x}-${y}` }}
        </div>
      </div>
    </div>
    <div>
      <el-button @click="createSDMap">生成</el-button>
      <el-button @click="resetSDMap">重置</el-button>
    </div>
  </div>
</template>

<script>
import { intersection } from "@/utils/tools";
export default {
  data() {
    return {
      SDMap: {},
      size: 4,
    };
  },
  created() {
    this.resetSDMap();
  },
  methods: {
    resetSDMap() {
      const { size } = this;
      const range = Array(size ** 2)
        .fill(1)
        .map((e, i) => e + i);
      for (let y = 1; y <= size ** 2; y++) {
        for (let x = 1; x <= size ** 2; x++) {
          let id = `${x}-${y}`;
          this.SDMap[id] = {
            x,
            y,
            range,
          };
        }
      }
    },
    createSDMap() {
      const { size, repeatSetCell, resetSDMap } = this;
      let repeat = true;
      let maxRepeatNum = 2 ** 8;
      while (repeat && maxRepeatNum > 0) {
        resetSDMap();
        repeatSetCell();
        let total = 0;
        maxRepeatNum--;
        for (let i in this.SDMap) {
          let item = this.SDMap[i];
          if (item.num) {
            total++;
          }
        }
        if (total === size ** 4) {
          repeat = false;
        }
      }
    },
    repeatSetCell() {
      const { size, setCell } = this;
      for (let i = 0; i < size ** 4; i++) {
        setCell();
      }
    },
    ceil(num) {
      const { size } = this;
      return Math.ceil(num / size);
    },
    setCell() {
      const { size, getRandom, setCell, SDMap, ceil, getRange } = this;
      let minLength = size ** 2;
      let obj = {};
      for (let i in SDMap) {
        let item = SDMap[i];
        const { range, x, y, num } = item;
        if (num) {
          continue;
        }
        let length = range.length;
        if (length <= minLength) {
          minLength = length;
          obj = {
            x,
            y,
          };
        }
        if (length === 1) {
          break;
        }
      }
      const { x, y } = obj;
      if (x && y) {
        const num = getRandom(x, y);
        let id = `${x}-${y}`;
        this.SDMap[id].num = num;
        this.checkAllSDMapRange();
        return this.SDMap[id];
      }
    },
    checkAllSDMapRange() {
      const { SDMap, getRange } = this;
      for (let i in SDMap) {
        let item = SDMap[i];
        const { x, y } = item;
        let id = `${x}-${y}`;
        SDMap[id].range = getRange(x, y);
      }
      this.SDMap = JSON.parse(JSON.stringify(SDMap));
    },
    getValidRange(range, id) {
      const { SDMap } = this;
      let cell = SDMap[id];
      if (cell) {
        const { num } = cell;
        let rSet = new Set(range);
        rSet.delete(num);
        range = [...rSet];
      }
      return range;
    },
    getRange(x, y) {
      const { size, ceil, getValidRange } = this;
      const length = size ** 2;
      const getItemRange = ({ isArea = false, isX = false }) => {
        let itemRange = Array(length)
          .fill(1)
          .map((e, i) => e + i);
        if (isArea) {
          let ax = ceil(x) - 1;
          let ay = ceil(y) - 1;
          for (let cx = 1; cx <= size; cx++) {
            let xIndex = ax * size + cx;
            for (let cy = 1; cy <= size; cy++) {
              let yIndex = ay * size + cy;
              let id = `${xIndex}-${yIndex}`;
              itemRange = getValidRange(itemRange, id);
            }
          }
        } else {
          for (let i = 1; i <= length; i++) {
            let id = isX ? `${i}-${y}` : `${x}-${i}`;
            itemRange = getValidRange(itemRange, id);
          }
        }
        return itemRange;
      };
      let xRange = getItemRange({ isX: true });
      let yRange = getItemRange({});
      let aRange = getItemRange({ isArea: true });
      let range = intersection(xRange, yRange);
      range = intersection(range, aRange);
      return range;
    },
    getRandom(x, y) {
      const range = this.getRange(x, y);
      let index = Math.floor(Math.random() * range.length);
      let random = range[index];
      return random;
    },
  },
};
</script>

<style lang="scss" scoped>
.sudoku {
  .grid {
    margin-bottom: 50px;
    display: flex;
    .cell {
      width: 50px;
      height: 50px;
      border: 1px solid #cccccc;
      &.active {
        background: red;
        color: #ffffff;
        border: 1px solid red;
      }
    }
  }
}
</style>
