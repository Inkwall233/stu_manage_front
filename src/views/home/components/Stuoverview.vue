<template>
  <div class="stu-overview container_wrap">
    <div class="header">全部学生信息概况</div>
    <div class="stu-container">
      <div class="stu-item" v-for="(item,index) in overviewCounts" :key="index">
        <div class="item-title">{{item.name}}</div>
        <div class="stu-number">{{item.num}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { overview } from "@/api/request";
export default {
  name: "Stuoverview",
  data() {
    return {
      overviewCounts: [],
    };
  },

  mounted() {
    this.getoverview();
  },

  methods: {
    getoverview() {
      overview().then((res, err) => {
        this.overviewCounts.push(...res.data.data);
      });
    },
  },
};
</script>
<style lang='scss' scoped>

.header {
  padding: 10px 0;
  border-bottom: 1px #eeeeee solid;
  font-size: 16px;
  color: #303133;
}
.stu-container {
  display: flex;
}
.stu-item {
  flex: 1;
  margin: 10px 5px 0;
  padding: 5px;
  background-color: #f2f2f2;
  cursor: pointer;
  &:hover {
    background-color: #ddd6d6e0;
  }
  .item-title {
    padding: 5px 0;
    color: #666666;
    font-size: 14px;
    margin-bottom: 5px;
  }
  .stu-number {
    font-size: 20px;
    color: #00a1d6;
  }
}
</style>