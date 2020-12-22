<template>
  <div
    class="echange"
    id="echange"
    ref="charts"
    :style="{ width: '100%', height: '400px' }"
  ></div>
</template>

<script>
// 引入基本模板
// let echarts = require('echarts/lib/echarts')
import echarts from "echarts";
import "echarts/map/js/china.js";
import { selectStatusChange } from "@/api/request";
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "Echange",
  data() {
    return {
      allData: [],
    };
  },
  created() {
    this.getSelectClassNuber();
  },
  mounted() {
    // console.log(this.allData);
    // 当数据加载成功调用

    setTimeout(() => {
      this.echartsInit();
    }, 500);
  },

  methods: {
    echartsInit() {
      // 基于准备好的dom，初始化echarts实例
      let ehartsref = this.$refs.charts;
      // let myChart = this.$echarts.init(document.getElementById("map"));
      let myChart = echarts.init(ehartsref);
      // 绘制表格
      myChart.setOption({
        title: {
          text: "学籍变动情况",
          top: "5%",
          left: "3%",
          textStyle: {
            fontSize: 18,
            fontWeight: "lighter",
          },
        },
        tooltip: {},
        legend: {
          orient: "vertical",
          left: "85%", //图例距离左的距离
          y: "center", //图例上下居中
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            type: "pie",
            radius: [30, 110],
            roseType: "area",
            data: this.allData,
          },
        ],
      });
    },

    // 数据请求
    async getSelectClassNuber() {
      let result = await selectStatusChange();
      // console.log(result);
      this.allData.push(...result.data);
      // console.log(this.allData);
    },
  },
};
</script>
<style lang='scss' scoped>
.echange {
  background-color: #fff;
  margin-top: 15px;
}
</style>