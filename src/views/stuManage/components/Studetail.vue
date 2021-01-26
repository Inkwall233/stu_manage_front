<template>
  <div class="stu-detail">
    <Search @searchData="getSearchData" class="container_wrap"></Search>
    <div class="container_wrap">
      <div class="batchOption">
        <el-button icon="el-icon-plus" type="success" @click="newAdd($event)"
          >新生录入</el-button
        >
        <el-button
          icon="el-icon-delete"
          type="danger"
          @click="batchDelete($event)"
          >删除选中</el-button
        >
        <el-button
          icon="el-icon-refresh"
          type="warning"
          @click="refresh($event)"
          >刷新学生表</el-button
        >
      </div>

      <el-table
        :data="tableData"
        border
        class=""
        @selection-change="handleCurrentChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="studentid" label="学号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
        <el-table-column prop="sex" label="性别" width="80" align="center">
        </el-table-column>
        <el-table-column prop="xueyuan" label="学院" width="180">
        </el-table-column>
        <el-table-column prop="classname" label="班级" width="150">
        </el-table-column>
        <el-table-column prop="birthday" label="生日" width="80">
        </el-table-column>
        <el-table-column prop="native_place" width="80" label="籍贯">
        </el-table-column>

        <el-table-column
          prop="punishstatus"
          label="违纪情况"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span v-if="!scope.row.punishstatus">无</span>
              <el-tag
                v-else
                size="medium"
                type="warning"
                @click="seeDetails(scope.row, scope.$index)"
                >查看</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="rewardstatus"
          label="获奖记录"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span v-if="!scope.row.rewardstatus">无</span>
              <el-tag
                v-else
                size="medium"
                type="success"
                @click="seeDetailsReward(scope.row, scope.$index)"
                >查看</el-tag
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <Pagination
        :pageCount="pagiDataAll"
        @cpnPageJumpTo="currentChange"
      ></Pagination>
    </div>

    <!-- 弹窗 -->
    <Dialog
      :dialogTableVisible="dialogTableVisible"
      :dialogRewardVisible="dialogRewardVisible"
      :dialogEditVisible="dialogEditVisible"
      :punishData="punishData"
      :stuBaseInfo1="stuBaseInfo"
    ></Dialog>
  </div>
</template>

<script>
import {
  selectallstudent,
  selectStuName,
  selectStuid,
  selectReward,
  selectPunish,
  deleteStu,
} from "@/api/request";
import Search from "@/components/search/Search.vue";
import Pagination from "@/components/pagination";

import Dialog from "./Dialog.vue";
export default {
  name: "Studetail",
  components: {
    Search,
    Pagination,
    Dialog,
  },
  created() {
    // 获取第0页学生信息
    this.getStudentMes();
  },
  data() {
    return {
      tableData: [],
      pagiDataAll: 0,
      // 设置flg，stu表示数据来源当前页面，name表示来自子组件searchname
      currentpage: "stu",
      searchName: "",
      // 弹窗
      dialogTableVisible: { value: false },
      dialogRewardVisible: { value: false },
      dialogEditVisible: { value: false },
      // punishData
      punishData: {},
      // 当前行学生信息
      stuBaseInfo: {},
      // 选中的项
      selectedData: [],
    };
  },

  mounted() {
    // console.log(this.tableData);
  },
  computed: {
    getpagiDataAll() {
      return this.pagiDataAll;
    },
  },
  methods: {
    /**
     * 数据请求
     */
    // 1.获取学生信息
    getStudentMes(page = 0) {
      // 请求
      selectallstudent(page).then((res) => {
        this.pagiDataAll = res.data.pageAll;
        // console.log(res);
        let result = res.data.data;

        // 过滤属性值为null的
        // this.resFilter(result);
        // 清空数组
        this.tableData.splice(0);
        this.tableData.push(...result);
      });
    },
    // 2.请求搜索name
    getselectStuName(name, page = 0) {
      selectStuName(name, page).then((res) => {
        this.pagiDataAll = res.data.pageAll;
        console.log(res);
        let result = res.data.data;

        // 清空数组
        this.tableData.splice(0);
        this.tableData.push(...result);
      });
    },
    // 3.请求搜索id
    getselectStuid(stuid, page = 0) {
      selectStuid(stuid, page).then((res) => {
        this.pagiDataAll = res.data.pageAll;
        // console.log(res);
        let result = res.data.data;

        // 清空数组
        this.tableData.splice(0);
        this.tableData.push(...result);
      });
    },
    // 4.请求查看违纪
    getSelectPunish(stuid) {
      selectPunish(stuid).then((res, err) => {
        console.log(res);
        return res.data;
      });
    },
    /**
     * 操作
     */

    // 分页跳转，获取学生信息
    currentChange(item) {
      // stu页面
      if (this.currentpage === "stu") {
        this.getStudentMes(item - 1);
      }
      if (this.currentpage === "name") {
        this.getselectStuName(this.searchName, item - 1);
      }
      if (this.currentpage === "studentid") {
        this.getselectStuid(this.searchName, item - 1);
      }
    },
    // 获取search组件发送的要查找数据
    getSearchData(searchData) {
      console.log(searchData);
      this.searchName = searchData.content;
      // 修改页面flg
      this.currentpage = searchData.type;
      // 修改此页内容
      // 1.姓名查询
      if (this.currentpage === "name") {
        this.getselectStuName(this.searchName);
      }
      // 2.学号查询
      else {
        this.getselectStuid(this.searchName);
      }
    },
    // 1.弹窗处罚
    async seeDetails(index, row) {
      // console.log(index,row);
      // 查询违纪
      let stuid = index.studentid;
      // 请求查询处罚
      let punishResult = await selectPunish(stuid);
      console.log(punishResult.data);
      this.punishData.studentid = stuid;
      this.punishData.name = index.name;
      this.punishData.punish = [];
      this.punishData.punish.push(...punishResult.data);
      // 处理时间
      this.punishData.punish.forEach((element) => {
        element.REC_TIME = element.REC_TIME.split("T")[0];
      });
      console.log(this.punishData);
      this.dialogTableVisible.value = true;
    },
    // 2.弹窗奖励
    async seeDetailsReward(index, row) {
      // console.log(index,row);
      // 查询违纪
      let stuid = index.studentid;
      // 请求查询奖励
      let punishResult = await selectReward(stuid);
      console.log(punishResult.data);
      this.punishData.studentid = stuid;
      this.punishData.name = index.name;
      this.punishData.punish = [];
      this.punishData.punish.push(...punishResult.data);
      // 处理时间
      this.punishData.punish.forEach((element) => {
        element.REC_TIME = element.REC_TIME.split("T")[0];
      });
      console.log(this.punishData);
      this.dialogRewardVisible.value = true;
    },
    // 3.弹窗修改
    handleEdit(index, row) {
      console.log(row);
      this.stuBaseInfo = row;
      this.dialogEditVisible.value = true;
    },
    // 删除学生信息
    handleDelete(index, row) {
      this.$confirm("确认删除？")
        .then(() => {
          console.log(index, row);
          deleteStu(row)
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((err) => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleCurrentChange(rows) {
      console.log(rows);
      //将选中赋值到回显和传参数组
      // this.templateRadio = rows;
      this.selectedData = [];
      if (rows) {
        rows.forEach((row) => {
          if (row) {
            this.selectedData.push(row);
          }
        });
      }
    },
    // 新增添加
    newAdd(event) {
      this.lostBlur(event);
      this.handleEdit();
    },
    // 全选删除
    batchDelete(event) {
      this.lostBlur(event);
      this.$confirm("确认删除选中？")
        .then(() => {
          this.selectedData.forEach(async (item, index) => {
            await deleteStu(item);
            this.$message({
              type: "info",
              message: "第" + index + 1 + "条记录，删除成功!",
            });
          });
          this.$message({
            type: "success",
            message: "全部删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除选中",
          });
        });
    },
    refresh(event) {
      this.lostBlur(event);
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
.pagination {
  text-align: center;
  margin-top: 15px;
}
.name-wrapper {
  .el-tag {
    cursor: pointer;
  }
}
</style>