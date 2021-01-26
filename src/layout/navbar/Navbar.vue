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
      <div class="user-menu">
        <div class="position">{{$store.state.position}}</div>
        <el-dropdown>
          <span class="el-dropdown-link avatar">
            <img
              :src="$store.state.avatar"
              alt=""
            />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="goHome">首页</el-dropdown-item>
            <el-dropdown-item>关于</el-dropdown-item>
            <el-dropdown-item  @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
  methods: {
    goHome(){
      this.$router.push(`/home`)
    },
    logout(){
      this.$store.dispatch('logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
  watch: {
    
    isCollapse(val, oldval) {
      // 发送isCollapse的状态
      console.log(val);
      console.log(oldval);
      this.$store.commit("changeSideBarIsOpen", val);
    },
  },
  computed: {},
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
.user-menu {
  float: right;
  height: 44px;
  line-height: 44px;
  padding-right: 40px;
  display: flex;
  font-size: 14px;

  .position {
    flex: 1;
    padding-right: 10px;
  }
  .avatar {
    display: block;
    height: 44px;
    padding: 5px;
  }
  img {
    height: 100%;
    border-radius: 50%;
    border: 1px solid #999999;
  }
}
</style>