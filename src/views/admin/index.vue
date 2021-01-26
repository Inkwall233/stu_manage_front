<template>
  <div class="container_wrap">
    <div class="batchOption">
      <el-button icon="el-icon-plus" type="success" @click="newAdd($event)"
        >添加</el-button
      >
      <el-button
        icon="el-icon-delete"
        type="danger"
        @click="batchDelete($event)"
        >删除选中</el-button
      >
      <el-button icon="el-icon-refresh" type="warning" @click="refresh($event)"
        >刷新</el-button
      >
    </div>
    <el-table :data="tableData">
        <el-table-column type="selection" > </el-table-column>
      <el-table-column prop="ID" label="ID"> </el-table-column>
      <el-table-column prop="username" label="username"> </el-table-column>
      <el-table-column prop="nickname" label="昵称" align="center">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="position" label="身份"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { admin } from "@/api/request.js";
export default {
  name: "",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    admin().then((res) => {
      console.log(res);
      this.tableData = res.data;
    });
  },

  mounted() {},

  methods: {
    handleEdit() {},
    handleDelete() {},
    // 新增添加
    newAdd(event) {
      this.lostBlur(event)
      this.handleEdit()
    },
    batchDelete(event) {
       this.lostBlur(event)
    },
    refresh(event) {
      this.lostBlur(event)
      this.getStudentMes();
    },
    // element button自动失焦
    lostBlur(event) {
      let target = event.target;
      if (target.nodeName == "SPAN") {
        target = event.target.parentNode;
      }
      target.blur();
    },
  },
};
</script>
<style lang='scss' scoped>
.batchOption {
  margin-bottom: 5px;
  .el-button {
    font-size: 10px;
    padding: 5px;
  }
}
</style>