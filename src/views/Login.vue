<template>
  <div class="login">
    <h2>学生学籍信息管理系统</h2>
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm login-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          autocomplete="off"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="loginForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item login-form-submit>
        <el-button
          class="login-submit"
          type="primary"
          @click="submitForm('loginForm')"
          >登录</el-button
        >
      </el-form-item>
      <p>登录账号admin 密码123456</p>
    </el-form>
  </div>
</template>

<script>
import { getLogin } from "@/api/request.js";
export default {
  name: "Login",

  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("密码不能少于6位"));
        }
        callback();
      }
    };

    return {
      loginForm: {
        username: "",
        pass: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 提交登录
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          // console.log(this.loginForm);
          this.$store.dispatch("login", this.loginForm).then((res) => {
            let {data} = res
            console.log(data);
            if(data.code == 1000){
              this.$message({ message:data.message, type: "success" });
              // 获取登录用户信息
              // this.$store.dispatch("getInfo",data)

              this.$router.push({ path: this.redirect || '/' })
            }else {
              this.$message({ message:data.message, type: "warning" });
            }
          });
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
.login {
  padding-top: 100px;
  text-align: center;
}
h2 {
  color: #666666;
  padding: 20px;
}
.login-form {
  margin: auto;
  max-width: 500px;
  .el-form-item__label {
    color: #000000;
  }
  
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