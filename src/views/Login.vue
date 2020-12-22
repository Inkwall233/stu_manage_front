<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm login-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          autocomplete="off"
          v-model="ruleForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item login-form-submit>
        <el-button class="login-submit" type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
      <p>登录账号admin
      密码123456
    </p>
    </el-form>
    
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        pass: "",
      },
      rules: {
        username: [{}],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  margin: 30px auto;
  max-width: 500px;
}
.login-form-submit {
  text-align: center;
}
.login-submit {
  display: block;
  margin: 0 auto;
  text-align: center;
  width: 200px;
}
</style>