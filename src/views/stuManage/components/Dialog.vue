<template>
  <div>
    <el-dialog
      title="违纪情况"
      :visible.sync="dialogTableVisible.value"
      @close="childClose1"
      align="center"
      width="25%"
    >
      <div class="dialog-stu">
        <div class="dia-item">
          <span class="dia-title">姓名</span>
          <span>{{ punishData.name }}</span>
        </div>
        <div class="dia-item">
          <span class="dia-title">学号</span>
          <span>{{ punishData.studentid }}</span>
        </div>
      </div>
      <el-table :data="punishData.punish" class="dialog-table">
        <el-table-column
          property="REC_TIME"
          label="日期"
          width="120"
        ></el-table-column>
        <el-table-column
          property="description"
          label="行为"
          width="80"
        ></el-table-column>
        <el-table-column
          property="DESCRIPTION"
          label="处罚"
          width="80"
        ></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      title="获奖情况"
      :visible.sync="dialogRewardVisible.value"
      @close="childClose2"
      align="center"
      width="30%"
    >
      <div class="dialog-stu">
        <div class="dia-itemdia-title">
          <span class="dia-title">姓名</span>
          <span>{{ punishData.name }}</span>
        </div>
        <div class="dia-item">
          <span class="dia-title">学号</span>
          <span>{{ punishData.studentid }}</span>
        </div>
      </div>
      <el-table :data="punishData.punish" class="dialog-table">
        <el-table-column
          property="REC_TIME"
          label="日期"
          width="120"
        ></el-table-column>
        <el-table-column
          property="description"
          label="获奖原因"
          width="120"
        ></el-table-column>
        <el-table-column
          property="DESCRIPTION"
          label="奖励"
          width="120"
        ></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 修改弹窗 -->
    <el-dialog
      :visible.sync="dialogEditVisible.value"
      @close="childClose3"
      @open="stuBaseDialogOpen"
      width="25%"
    >
      <el-form :model="stuBaseInfo" ref="stuBaseInfo" label-width="80px">
        <el-form-item
          label="学号"
          :rules="[
            { required: true, message: '请输入学号', trigger: 'blur' },
            {
              type: 'number',
              message: '请输入正确的学号',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model.number="stuBaseInfo.studentid"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="stuBaseInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="resource">
          <el-radio-group v-model="stuBaseInfo.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学院">
          <el-select
            v-model="stuBaseInfo.xueyuan"
            @visible-change="changeXueyuan"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in xueyuanOptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="stuBaseInfo.xueyuan"></el-input> -->
        </el-form-item>

        <el-form-item label="班级">
          <el-select
            v-model="stuBaseInfo.classname"
            @visible-change="changeClass"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in classOptions"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="stuBaseInfo.classname"></el-input> -->
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="stuBaseInfo.birthday"
            format="MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="违纪情况">
          <el-input :disabled="true" value="暂不支持修改"></el-input>
        </el-form-item>
        <el-form-item label="获奖情况">
          <el-input :disabled="true" value="暂不支持修改"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('stuBaseInfo')"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { isExit, updateStuInfo } from "@/api/request";
export default {
  name: "Dialog",
  data() {
    return {
      xueyuanOptions: [
        "计算机科学与工程学院",
        "艺术学院",
        "外国语学院",
        "信息与电气工程学院",
        "化学化工学院",
      ],
      classOptions: [],
      stuBaseInfo: {},
    };
  },
  props: {
    dialogTableVisible: {
      type: Object,
      default() {
        return {};
      },
    },
    dialogRewardVisible: {
      type: Object,
      default() {
        return {};
      },
    },
    dialogEditVisible: {
      type: Object,
      default() {
        return {};
      },
    },
    // 获奖，惩罚信息
    punishData: {
      type: Object,
      default() {
        return [];
      },
    },
    //  修改学生基本信息
    stuBaseInfo1: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {},

  methods: {
    childClose1() {
      this.dialogTableVisible.value = false;
    },
    childClose2() {
      this.dialogRewardVisible.value = false;
    },
    childClose3() {
      this.dialogEditVisible.value = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 更改学院时,返回二级专业班级选择框
    changeXueyuan() {
      if (this.stuBaseInfo.xueyuan === "计算机科学与工程学院") {
        this.classOptions = ["计算机科学与技术", "网络工程", "信息安全"];
      } else if (this.stuBaseInfo.xueyuan === "艺术学院") {
        this.classOptions = ["音乐与舞蹈学", "美术学", "设计学"];
      } else if (this.stuBaseInfo.xueyuan === "外国语学院") {
        this.classOptions = ["汉语国际教育", "日语", "翻译"];
      } else if (this.stuBaseInfo.xueyuan === "信息与电气工程学院") {
        this.classOptions = ["电气工程及其自动化", "电子信息工程", "通信工程"];
      } else {
        this.classOptions = ["应用化学", "化学工程与工艺", "环境工程"];
      }
      // 并将专业班级切换成所属学院
      this.stuBaseInfo.classname = this.classOptions[0];
    },
    // 修改班级
    changeClass() {
      if (this.stuBaseInfo.xueyuan === "计算机科学与工程学院") {
        this.classOptions = ["计算机科学与技术", "网络工程", "信息安全"];
      } else if (this.stuBaseInfo.xueyuan === "艺术学院") {
        this.classOptions = ["音乐与舞蹈学", "美术学", "设计学"];
      } else if (this.stuBaseInfo.xueyuan === "外国语学院") {
        this.classOptions = ["汉语国际教育", "日语", "翻译"];
      } else if (this.stuBaseInfo.xueyuan === "信息与电气工程学院") {
        this.classOptions = ["电气工程及其自动化", "电子信息工程", "通信工程"];
      } else {
        this.classOptions = ["应用化学", "化学工程与工艺", "环境工程"];
      }
    },
    // 提交修改
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 判断学号是否 修改
          // 1. 未修改
          if (this.stuBaseInfo1.studentid === this.stuBaseInfo.studentid) {
            // 提交修改
            updateStuInfo(this.stuBaseInfo)
              .then((res) => {
                this.$message({ message: "修改成功", type: "success" });
                this.childClose3();
                return true;
              })
              .catch((err) => {
                this.$message.error("修改失败!");
                this.childClose3();
                return true;
              });
          }
          // 2. 修改
          else {
            // 请求 判断学号是否已经在数据库存在
            let stuidExit = await isExit(this.stuBaseInfo.studentid);
            //
            if (stuidExit.data.length !== 0) {
              // console.log("error submit!!学号已经存在");
              this.$message({
                message: "该学号在数据库中已存在",
                type: "warning",
              });
              return false;
            } else {
              updateStuInfo(this.stuBaseInfo)
                .then((res) => {
                  this.$message({ message: "修改成功", type: "success" });
                  this.childClose3();
                  return true;
                })
                .catch((err) => {
                  this.$message.error("修改失败!");
                  this.childClose3();
                  return true;
                });
            }
          }
          // console.log(this.stuBaseInfo);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 弹窗被打开
    stuBaseDialogOpen() {
      this.stuBaseInfo = Object.assign({}, this.stuBaseInfo1);
    },

    /**
     * 请求部分
     */
    // 判断是否存在学号
    checkStuid(stuid) {
      isExit(stuid).then((res) => {
        if (res.data.length == 0) {
          return false;
        } else {
          return true;
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.dialog-stu {
  margin-bottom: 10px;
  font-size: 16px;
  span {
    display: inline-block;
  }
  .dia-item {
    margin-bottom: 10px;
  }
  .dia-title {
    margin-right: 15px;
    font-weight: 500;
    color: #909399;
  }
}
.dialog-table {
  font-size: 14px;
}
.dialog .el-dialog__body {
  padding: 10px 20px;
}
</style>