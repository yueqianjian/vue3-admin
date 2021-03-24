<template>
  <div class="sudoku x">
    <div class="flex1 y aie">
      <h2>数独答案</h2>
      <div class="grid">
        <div v-for="x in size ** 2" :key="x" :class="{ xline: !(x % size) }">
          <div v-for="y in size ** 2" :key="y" :class="{ yline: !(y % size) }">
            <div
              class="cell x1 aic"
              :class="{ active: SDMap[`${x}-${y}`].num }"
            >
              {{
                (SDMap[`${x}-${y}`] && SDMap[`${x}-${y}`].num) || `${x}-${y}`
              }}
            </div>
          </div>
        </div>
      </div>
      <div v-pm="`20px 0 0`">
        <el-button @click="createSDMap">生成</el-button>
        <el-button @click="resetSDMap(`SDMap`)">重置</el-button>
      </div>
    </div>
    <div class="flex1">
      <div class="nemu">
        <div>
          <h2>填充初始单元</h2>
          <div>
            <div class="grid">
              <div
                v-for="x in size ** 2"
                :key="x"
                :class="{ xline: !(x % size) }"
              >
                <div
                  v-for="y in size ** 2"
                  :key="y"
                  :class="{ yline: !(y % size) }"
                >
                  <div
                    class="cell x1 aic"
                    :class="{ active: defaultMap[`${x}-${y}`].num }"
                  >
                    <input
                      class="cellInput"
                      type="number"
                      :max="size ** 2"
                      v-model.number="defaultMap[`${x}-${y}`].num"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-pm="`20px 0 0`">
            <el-button @click="initData">确认</el-button>
            <el-button @click="resetSDMap(`defaultMap`)">重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { intersection } from "@/utils/tools";
export default {
  data() {
    return {
      SDMap: {},
      defaultMap: {},
      size: 3,
      filledList: [],
      textarea: "",
    };
  },
  created() {
    this.resetSDMap(`SDMap`);
    this.resetSDMap(`defaultMap`);
  },
  methods: {
    initData() {
      const { size, textarea, defaultMap: SDMap } = this;
      this.filledList = [];
      // 筛选出可填选项最少的坐标
      for (let i in SDMap) {
        let item = SDMap[i];
        const { x, y, num } = item;
        if (num && num <= size ** 2) {
          this.filledList.push(item);
        }
      }
    },
    resetSDMap(name) {
      const { size } = this;
      const range = Array(size ** 2)
        .fill(1)
        .map((e, i) => e + i);
      for (let y = 1; y <= size ** 2; y++) {
        for (let x = 1; x <= size ** 2; x++) {
          let id = `${x}-${y}`;
          this[name][id] = {
            x,
            y,
            num: "",
          };
          if (name === `SDMap`) {
            this[name][id].range = range;
          }
        }
      }
    },
    createSDMap() {
      const { size, repeatFillCell, resetSDMap } = this;
      let repeat = true;
      // 定义一个值防止死循环
      let maxRepeatNum = 1000;
      while (repeat && maxRepeatNum > 0) {
        resetSDMap(`SDMap`);
        repeatFillCell();
        maxRepeatNum--;
        // 验证是否填充完毕
        let total = 0;
        for (let i in this.SDMap) {
          let item = this.SDMap[i];
          if (item.num) {
            total++;
          }
        }
        // 填充数等于所有格子，则跳出死循环
        if (total === size ** 4) {
          repeat = false;
        }
      }
    },
    repeatFillCell() {
      const { size, fillCell, filledList } = this;
      let list = this.$copy(filledList);
      for (let i = 0; i < size ** 4; i++) {
        let item = null;
        if (list.length) {
          item = list.pop();
        }
        fillCell(item);
      }
    },
    ceil(num) {
      const { size } = this;
      return Math.ceil(num / size);
    },
    getBestXY() {
      const { size, SDMap } = this;
      let minLength = size ** 2;
      let obj = {};
      // 筛选出可填选项最少的坐标
      for (let i in SDMap) {
        let item = SDMap[i];
        const { range, x, y, num } = item;
        if (!num) {
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
      }
      return obj;
    },
    fillCell(e) {
      const { getRandom, SDMap, getBestXY, checkAllSDMapRange } = this;
      checkAllSDMapRange();
      // 如果有默认填充数据则使用默认，否则获取最佳的坐标点
      let fillData = e || getBestXY();
      const { x, y } = fillData;
      if (x && y) {
        // 如果有默认填充数据则使用默认，否则获取一个可选随机数
        const num = fillData.num || getRandom(x, y);
        let id = `${x}-${y}`;
        this.SDMap[id].num = num;
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
$bdc: #409eff;
.sudoku {
  .grid {
    display: flex;
    border-top: 1px solid $bdc;
    border-left: 1px solid $bdc;
    height: fit-content;
    width: fit-content;
    .xline {
      border-right: 1px solid $bdc;
    }
    .yline {
      border-bottom: 1px solid $bdc;
    }
    .cell {
      width: 50px;
      height: 50px;
      &.active {
        color: #ff0000;
        font-weight: bold;
      }
    }
  }
  .nemu {
    padding-left: 50px;
    width: 500px;
    .grid {
      .cell {
        .cellInput {
          text-align: center;
          border: none;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
