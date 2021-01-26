<template>
  <div class="stusearch">
    <el-table :data="tableData" border>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="studentid" label="学号" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="80" align="center">
      </el-table-column>
      <el-table-column prop="xueyuan" label="学院" width="180">
      </el-table-column>
      <el-table-column prop="classname" label="班级" width="180">
      </el-table-column>

      <el-table-column prop="punishstatus" label="违纪情况" width="120">
      </el-table-column>
      <el-table-column prop="rewardstatus" label="获奖情况" width="120">
      </el-table-column>
      <el-table-column prop="birthday" label="生日" width="80">
      </el-table-column>
      <el-table-column prop="native_place" width="80" label="籍贯">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pagiDataAll"
        style="margin: auto"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "StuSearch",
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>
<style lang='scss' scoped>
</style>