<template>
  <div
    class="ereward"
    id="ereward"
    ref="charts"
    :style="{ width: '100%', height: '400px' }"
  ></div>
</template>

<script>
// 引入基本模板
// let echarts = require('echarts/lib/echarts')
import echarts from "echarts";
import "echarts/map/js/china.js";
import { selectRewardCount, selectPunishCount } from "@/api/request";
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "Ereward",
  data() {
    return {
      rewardData: [],
      punishData: [],
    };
  },
  created() {
    this.getSelectClassNuber();
  },
  mounted() {
    // 当数据加载成功调用

    setTimeout(() => {
      this.echartsInit();
    }, 900);
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
          text: "学校总奖惩情况",
          top: "5%",
          left: "3%",
          textStyle: {
            fontSize: 18,
            fontWeight: "lighter",
          },
        },
        tooltip: {},
        legend: {
          left: "center",
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: true },
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
            name: "处分",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              position: "inner",
            },
            labelLine: {
              show: false,
            },
            data: this.punishData,
          },
          {
            name: "奖学金",
            type: "pie",
            radius: ["40%", "55%"],
            // label: {
            //   formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
            //   backgroundColor: "#eee",
            //   borderColor: "#aaa",
            //   borderWidth: 1,
            //   borderRadius: 4,
            //   rich: {
            //     a: {
            //       color: "#999",
            //       lineHeight: 22,
            //       align: "center",
            //     },
            //     hr: {
            //       borderColor: "#aaa",
            //       width: "100%",
            //       borderWidth: 0.5,
            //       height: 0,
            //     },
            //     b: {
            //       fontSize: 16,
            //       lineHeight: 33,
            //     },
            //     per: {
            //       color: "#eee",
            //       backgroundColor: "#334455",
            //       padding: [2, 4],
            //       borderRadius: 2,
            //     },
            //   },
            // },
            data: this.rewardData,
          },
        ],
      });
    },

    // 数据请求
    async getSelectClassNuber() {
      let result0 = await selectRewardCount();
      let result1 = await selectPunishCount();
      // console.log(result);
      this.rewardData.push(...result0.data);
      this.punishData.push(...result1.data);
    },
  },
};
</script>
<style lang='scss' scoped>
.ereward {
  background-color: #fff;
  margin-top: 15px;
}
</style>