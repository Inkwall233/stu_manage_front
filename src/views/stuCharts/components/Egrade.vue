<template>
  <div
    class="egrade"
    id="egrade"
    ref="epie"
    :style="{ width: '100%', height: '400px' }"
  ></div>
</template>

<script>
// 引入基本模板
// let echarts = require('echarts/lib/echarts')
import echarts from "echarts";
import "echarts/map/js/china.js";
import { selectGradeAvg } from "@/api/request";
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "Egrade",
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
    setTimeout(() => {
      this.echartsInit();
    }, 500);
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
          text: "各个专业高数平均成绩分布图",
          top: "5%",
          left: "3%",
          textStyle: {
            fontSize: 18,
            fontWeight: "lighter",
          },
        },
        tooltip: {},
        // legend: {
        //   orient: "vertical",
        //   left: "75%", //图例距离左的距离
        //   y: "center", //图例上下居中
        // },

        xAxis: {
          type: "category",
          data: this.xData,
          nameLocation: "end", //坐标轴名称显示位置。
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0,
            rotate: "45",
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.sData,
            type: "line",
          },
        ],
      });
    },

    // 数据请求
    async getSelectClassNuber() {
      let result = await selectGradeAvg();
      // console.log(result);
      this.allData = result.data;
      let that = this;
      this.allData.forEach((element, index) => {
        that.xData[index] = element.name;
        that.sData[index] = element.value;
      });
      // this.allData.push(...result.data);
      console.log(this.xData);
    },
  },
};
</script>
<style lang='scss' scoped>
.egrade {
  margin-top: 15px;
  margin-bottom: 30px;
  background-color: #fff;
}
</style>