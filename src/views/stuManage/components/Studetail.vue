<template>
  <div class="stu-detail">
    <Search @searchData="getSearchData" class="container_wrap"></Search>
    <el-table :data="tableData" border class="container_wrap">
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
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
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
      dialogRewardVisible: {value: false},
      dialogEditVisible: {value: false},
      // punishData
      punishData: {},
      // 当前行学生信息
      stuBaseInfo: {},
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
    handleDelete(index, row) {
      console.log(index, row);
    },

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
      this.stuBaseInfo = row
      this.dialogEditVisible.value = true
    },
    handleJoinPeople(row, id) {
      console.log(row.ac_id);
    },
    handleCard(row, id) {
      console.log(row.ac_id);
    },
  },
};
</script>
<style lang='scss' scoped>
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