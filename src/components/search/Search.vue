<template>
  <div class="search">
    <el-form :inline="true" :model="select" class="demo-form-inline"
      ><el-form-item>
        <el-select v-model="select.type" placeholder="选择查找类型">
          <el-option label="学号查找" value="studentid"></el-option>
          <el-option label="姓名查找" value="name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="select.content"
          placeholder="请输入查找信息"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { selectStuName } from "@/api/request";
export default {
  name: "Search",
  data() {
    return {
      select: {
        type: "",
        content: "",
      },
    };
  },

  methods: {
    onSubmit() {
      if (!this.select.type) {
        this.$message({ message: "内容为空！请选择查找类型", type: "warning" });
        return;
      }
      if (!this.select.content) {
        this.$message({ message: "内容为空！请输入查找信息", type: "warning" });
        return;
      }
      this.$emit("searchData", this.select);
    },
    // 请求姓名查找
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>