<template>
<div class="navbar-wrap">
  <div class="navbar clearfix">
    <div class="name float-left">学生信息管理系统</div>

    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <img src="~@/assets/icons/折叠.svg" alt="">
      <el-radio-button :label="isCollapse">展开</el-radio-button>
      <el-radio-button >收起</el-radio-button>
    </el-radio-group> -->

    <el-switch
      class="sideswitch float-left"
      style="display: block"
      v-model="isCollapse"
      active-color="#666666"
      inactive-color="#13ce66"
    >
    </el-switch>
  </div>
</div>
  
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {},
  watch: {
    isCollapse(val, oldval) {
      // 发送isCollapse的状态
      console.log(val);
      console.log(oldval);
      this.$store.commit("changeSideBarIsOpen", val);
    },
  },
  computed: {},
  methods: {
    radiobtn() {},
  },
};
</script>

<style lang="scss" scoped>
.navbar-wrap {
   width: 100%;
  height: 44px;
}
.navbar {
  width: 100%;
  height: 44px;
  position: fixed;
  line-height: 44px;
  z-index: 10;
  box-sizing: border-box;
  background: url("~@/assets/images/navbar_bg.webp") center;
}
.name {
  width: 210px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 14px;
  color: white;
}
.sideswitch {
  margin-left: 20px;
  margin-top: 10px;
}
</style>