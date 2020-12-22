<template>
  <div
    class="epie"
    id="epie"
    ref="epie"
    :style="{ width: '100%', height: '400px' }"
  ></div>
</template>

<script>
// 引入基本模板
// let echarts = require('echarts/lib/echarts')
import echarts from "echarts";
import "echarts/map/js/china.js";
import { selectClassNuber } from "@/api/request";
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "Epie",
  data() {
    return {
      allData: [],
      xData: [],
      sData: [],
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
    }, 800);
  },

  methods: {
    echartsInit() {
      // 基于准备好的dom，初始化echarts实例
      let ehartsref = this.$refs.epie;
      // let myChart = this.$echarts.init(document.getElementById("map"));
      let myChart = echarts.init(ehartsref);
      // 绘制表格
      myChart.setOption({
        title: {
          text: "各个专业人数分布图",
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
          left: "75%", //图例距离左的距离
          y: "center", //图例上下居中
        },
        series: [
          {
            name: "该专业总人数",
            type: "pie",
            center: ["40%", "50%"],
            data: this.allData,
          },
        ],
      });
    },

    // 数据请求
    async getSelectClassNuber() {
      let result = await selectClassNuber();
      // console.log(result);
      // this.allData = result.data.data;
      // // console.log(this.allData);
      let that = this;
      this.allData.forEach((element, index) => {
        that.xData[index] = element.name;
        that.sData[index] = element.number;
      });
      this.allData.push(...result.data.data);
      // console.log(this.allData);
    },
  },
};
</script>
<style lang='scss' scoped>
.epie {
  background-color: #fff;
}
</style>