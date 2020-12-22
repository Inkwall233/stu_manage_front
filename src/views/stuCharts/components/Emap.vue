<template>
  <div
    class="emap"
    id="emap"
    ref="charts"
    :style="{ width: '100%', height: '400px' }"
  ></div>
</template>

<script>
// 引入基本模板
// let echarts = require('echarts/lib/echarts')
import echarts from "echarts";
import "echarts/map/js/china.js";
import { selectProvince } from "@/api/request";
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "emap",
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
          text: "生源地学生分布",
          top: "5%",
          left: "3%",
          textStyle: {
            fontSize: 18,
            fontWeight: "lighter",
          },
        },
        tooltip: {},
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        visualMap: {
          min: 0,
          max: 2500,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"],
          },
        },
        series: [
          {
            name: "总数",
            type: "map",
            map: "china",
            label: {
              show: true,
            },
            data: this.allData,
          },
        ],
      });
    },

    // 数据请求
    async getSelectClassNuber() {
      let result = await selectProvince();
      // console.log(result);
      // this.allData = result.data.data;
      // // console.log(this.allData);
      // let that = this;
      // this.allData.forEach((element, index) => {
      //   that.xData[index] = element.name;
      //   that.sData[index] = element.number;
      // });
      // console.log(result);
      this.allData.push(...result.data);
      // console.log(this.allData);
    },
  },
};
</script>
<style lang='scss' scoped>
.emap {
  background-color: #fff;
}
</style>