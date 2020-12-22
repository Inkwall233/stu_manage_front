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
      width="25%"
    >
      <el-form
        :model="stuBaseInfo"
        ref="numberValidateForm"
        class="demo-ruleForm"
        label-width="80px"
      >
        <el-form-item
          label="学号"
          prop="studentid"
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
          <el-select v-model="stuBaseInfo.xueyuan" placeholder="请选择">
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
            @visible-change="getClass"
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
        <el-form-item label="违纪情况">
          <el-input :disabled="true" value="暂不支持修改"></el-input>
        </el-form-item>
        <el-form-item label="获奖情况">
          <el-input :disabled="true" value="暂不支持修改"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  data() {
    let stuBaseInfo = {};
    
    return {
      //  修改学生基本信息
      formLabelAlign: {
        name: "",
        region: "暂不支持修改",
        type: "暂不支持修改",
        radio: "1",
      },
      xueyuanOptions: [
        "计算机科学与工程学院",
        "艺术学院",
        "外国语学院",
        "信息与电气工程学院",
        "化学化工学院",
      ],
      classOptions: [],
      stuBaseInfo,
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
    parentStuBaseInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
created() {
    this.stuBaseInfo = JSON.parse(JSON.stringify(this.parentStuBaseInfo));
  },

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
    // 根据学院，返回二级选择框
    getClass() {
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
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