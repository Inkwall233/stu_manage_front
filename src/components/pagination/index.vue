<template>
  <div class="pagination" v-if="pageCount > 0">
    <ul class="epages">
      <li class="page-item" v-if="curPage > 1">
        <button @click="JumpTo(curPage - 1)">&laquo;</button>
      </li>
      <li
        class="page-item"
        :class="{ active: curPage == 1 }"
        @click="JumpTo(1)"
      >
        <button>1</button>
      </li>
      <li class="page-item" v-show="curPage > 5 && pageCount > 10">
        <strong>...</strong>
      </li>
      <li
        class="page-item"
        :class="{ active: curPage == index + offset }"
        v-for="(item, index) in middlePages"
        :key="index"
        @click="JumpTo(index + offset)"
      >
        <button>{{ index + offset }}</button>
      </li>
      <li class="page-item" v-show="curPage < bigLimit && pageCount > 10">
        <strong>...</strong>
      </li>
      <li
        class="page-item"
        :class="{ active: curPage == pageCount }"
        @click="JumpTo(pageCount)"
        v-if="pageCount > 1"
      >
        <button>{{ pageCount }}</button>
      </li>
      <li
        class="page-item"
        :class="{ disabled: curPage == pageCount }"
        v-if="pageCount > 1 && curPage < pageCount - 1"
      >
        <button @click="JumpTo(curPage + 1)">&raquo;</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      curPage: 1,
    };
  },
  props: {
    pageCount: {
      type: Number,
    },
  },
  mounted() {},

  computed: {
    middlePages() {
      if (this.pageCount <= 2) {
        return 0;
      } else if (this.pageCount > 2 && this.pageCount <= 10) {
        return this.pageCount - 2;
      } else {
        return this.curPage > 999 ? 5 : 8;
      }
    },
    bigLimit() {
      return this.middlePages > 5 ? this.pageCount - 6 : this.pageCount - 3;
    },
    offset() {
      if (this.curPage <= 5) {
        return 2;
      } else if (this.curPage >= this.bigLimit) {
        return this.bigLimit - 2;
      } else {
        return this.middlePages > 5 ? this.curPage - 3 : this.curPage - 2;
      }
    },
  },
  methods: {
    JumpTo(index) {
      
      this.curPage = index;
      this.$emit("cpnPageJumpTo",index)
    },
  },
};
</script>
<style lang='scss' scoped>
.pagination ul {
  display: inline-block;
  width: 600px;
  font-size: 12px;
  li {
    display: inline-block;
    width: 30px;

    margin: 2px 5px;
    button {
      border: none;
      text-decoration: none;
      outline: none;
      width: 100%;
      height: 30px;
      background-color: #fff;
      line-height: 25px;
      border-radius: 4px;
      border: 1px solid #ddd;

      &:hover {
        background: #00a1d6;
        color: #fff;
      }
    }
  }
  .active {
    button {
      border: none;
      text-decoration: none;
      background: #00a1d6;
      color: #fff;
      border: 1px solid #00a1d6;
    }
  }
}
</style>