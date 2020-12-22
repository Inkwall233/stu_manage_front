<template>
  <div class="echarts">
    <div
      :class="className"
      :id="idName"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "echarts",
  props: {
    className: {
      type: String,
    },
    idName: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById(this.idName));
    },
  },
};
</script>
<style lang='scss' scoped>
</style>