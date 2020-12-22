<template>
  <div class="introduce container_wrap">
    <div class="header">学生学籍管理系统 项目介绍</div>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :show-header="false"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="date"> </el-table-column>
      <el-table-column prop="name"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {},
  name: "introduce",
  data() {
    return {
      tableData: [
        {
          date: "开发",
          name: "韩梦园",
        },
        {
          date: "数据库",
          name: "MySQL",
        },
        {
          date: "后端服务器",
          name: "基于nodejs",
        },
        {
          date: "前端技术栈",
          name: "Vue ElementUi",
        },
      ],
    };
  },

  mounted() {},

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1 ) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
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
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>